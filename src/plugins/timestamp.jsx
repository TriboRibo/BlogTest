export default {
    convert_date: (timestamp) => {
        const date = new Date(timestamp);

        // Define options for formatting the date in Lithuanian locale
        const options = {
            year: 'numeric', // 'numeric', '2-digit'
            month: 'numeric', // 'long', 'short', 'numeric', or '2-digit'
            day: 'numeric',
            weekday: 'short', // 'long', 'short', 'narrow'
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        return date.toLocaleDateString('lt-LT', options);
    }
}