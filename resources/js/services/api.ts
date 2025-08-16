
import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/',
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

apiClient.interceptors.request.use(config => {
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
    if (csrfToken) {
        config.headers['X-CSRF-TOKEN'] = csrfToken.getAttribute('content');
    }
    return config;
});

export default apiClient;
