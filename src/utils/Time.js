
export default class Time {
    toTimeString() {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 5) {
            return '凌晨';
        } else if (hour >= 5 && hour < 8) {
            return '早上';
        } else if (hour >= 8 && hour < 12) {
            return '上午';
        } else if (hour >= 12 && hour < 14) {
            return '中午';
        } else if (hour >= 14 && hour < 18) {
            return '下午';
        } else if (hour >= 18 && hour < 24) {
            return '晚上'
        }
    }
    formatDigit(n) {
        return n.toString().replace(/^(\d)$/, '0$1');
    }
}