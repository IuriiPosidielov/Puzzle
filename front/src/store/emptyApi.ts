// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../app/store'

function getCookie(name: string) {
    var cookieValue = null;
    console.log(document.cookie);
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    console.log(cookieValue);
    return cookieValue;
}

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://posidelov.pythonanywhere.com/',
  prepareHeaders: (headers, { getState }) => {
    let token = (getState() as RootState).auth.token;
    let csrfToken = getCookie('csrftoken');

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Token ${token}`)
    }
    if (csrfToken) {
      headers.set('X-CSRFToken', csrfToken);	
    }

    return headers
  },
  }),
  tagTypes:[],
  endpoints: () => ({}),
})
