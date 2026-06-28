/**
 * 常用工具函数集合
 * 包含：日期格式化、防抖节流、深拷贝、数组去重等
 */

// ========== 日期时间 ==========

/** 格式化日期为 YYYY-MM-DD HH:mm:ss */
function formatDate(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
    const d = new Date(date);
    const map = {
        YYYY: d.getFullYear(),
        MM: String(d.getMonth() + 1).padStart(2, '0'),
        DD: String(d.getDate()).padStart(2, '0'),
        HH: String(d.getHours()).padStart(2, '0'),
        mm: String(d.getMinutes()).padStart(2, '0'),
        ss: String(d.getSeconds()).padStart(2, '0'),
    };
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (key) => map[key]);
}

/** 获取相对时间描述（如 "3分钟前"） */
function timeAgo(date) {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    const intervals = [
        { label: '年',   value: 31536000 },
        { label: '个月', value: 2592000 },
        { label: '天',   value: 86400 },
        { label: '小时', value: 3600 },
        { label: '分钟', value: 60 },
    ];
    for (const { label, value } of intervals) {
        const count = Math.floor(seconds / value);
        if (count >= 1) return `${count}${label}前`;
    }
    return '刚刚';
}

// ========== 防抖 & 节流 ==========

/** 防抖：延迟执行，期间重复调用重新计时 */
function debounce(fn, delay = 300) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

/** 节流：固定间隔内只执行一次 */
function throttle(fn, interval = 300) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// ========== 数据操作 ==========

/** 深拷贝 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}

/** 数组去重 */
function unique(arr) {
    return [...new Set(arr)];
}

/** 数组按指定 key 分组 */
function groupBy(arr, key) {
    return arr.reduce((groups, item) => {
        const groupKey = typeof key === 'function' ? key(item) : item[key];
        (groups[groupKey] = groups[groupKey] || []).push(item);
        return groups;
    }, {});
}

// ========== 随机 & 编码 ==========

/** 生成指定范围的随机整数 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 生成随机 ID */
function generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[randomInt(0, chars.length - 1)]).join('');
}

// ========== 导出 ==========
module.exports = {
    formatDate,
    timeAgo,
    debounce,
    throttle,
    deepClone,
    unique,
    groupBy,
    randomInt,
    generateId,
};