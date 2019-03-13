// 7.缓存版本
const CACHE_NAME = 'cache_v' + 4;
// serviceWorker会监听这个sw注册文件，变化之后重新注册


// 8.缓存列表
const CACHE_LIST = [
    '/',
    '/index.html',
    '/index.css',
    '/main.js',
    '/api/img'
];
function fetchAddSave(request) { // 获取数据后 进行缓存
    // 11.如果请求到了 需要更新缓存  如果请求失败了，那么就去catch异常然后去拿缓存结果
    return fetch(request).then(res => {
        // 12.请求成功，更新缓存 node res 可独流
        let r = res.clone(); // res必须克隆 因为使用一次就销毁
        caches.open(CACHE_NAME).then(cache => cache.put(request, r))
        return res;
    });
}

//4. 拦截请求
self.addEventListener('fetch', (e) => {
    // e: 请求原对象，每请求一次，就触发一次fetch
    // 线程中 不能发ajax  －》 fetch fetchApi
    // 如果联网的话就发请求 
    // 缓存策略 缓存优先  网络优先

    // 10. 请求的是接口
    if (e.request.url.includes('/api/')) {
        return e.respondWith(
            fetchAddSave(e.request).catch(err => {
                // 13.打开缓存  把缓存中匹配到的结果 返还回去
                return caches.open(CACHE_NAME).then(cache => cache.match(e.request));
            }))
    }
    console.log(e)
    e.respondWith( // 用什么内容 返回当前响应
        fetch(e.request).catch(err => {
            // 打开缓存  把缓存中匹配到的结果 返还回去
            return caches.open(CACHE_NAME).then(cache => cache.match(e.request));
        })
    )
});

// 9.缓存 需要缓存内容
function preCache() {
    // 开启了一个缓存空间，传入缓存版本
    return caches.open(CACHE_NAME).then(cache => {
        // 添加列表到缓存中
        return cache.addAll(CACHE_LIST)
    })
}


/**
 * 这里有一个问题：当版本号发生变化之后，上一个serviceWorker没有卸载，当前serviceWorker怎么激活呢
 *     1. 在缓存完成之后手动激活
 *        第二个问题：手动激活之后，上一个serviceWorker中缓存的内容怎么清楚呢
 */



// 5. 监听install 安装成功触发
self.addEventListener('install', (e) => {
    // 手动激活的两个方法： 1.如果上一个serviceWorker不销毁  需要手动skipWating()才能安装
    e.waitUntil(
        preCache().then(skipWaiting)
    ) // 等待promise执行完成
    console.log('install')
});
// 当
//手动激活的两个方法： 2.激活当前serviceWorker, 让service立即生效 self.clients.claim()
//如果不手动激活的话，不会自动激活，只能等着上一个卸载之后，才会生效
function clearCache() {
    return caches.keys().then(keys => {
        return Promise.all(keys.map(key => {
            if (key !== CACHE_NAME) {
                return caches.delete(key)
            }
        }));
    })
}

// 6. 监听active事件：激活当前serviceWorker
//    当前serviceWorker安装完毕后
self.addEventListener('activate', (e) => {
    console.log('activate')
    e.waitUntil(
        Promise.all([
            clearCache(),
            // 立即生效
            self.clients.claim()
        ])
    )
});

// 添加主屏幕 两次访问 间隔5分钟 会弹出横条
// 手动点是没问题的