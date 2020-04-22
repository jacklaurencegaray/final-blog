---
slug: web-storage-cookies-local-session
date: 2019-05-19
title: 'Web Storage: Cookies vs Local and Session Storage'
description: 'A simplified article describing cookies, local and session storage.'
published: true
keywords:
  [
    'cookie',
    'cookies',
    'local storage',
    'session storage',
    'web api',
    'web storage',
  ]
banner: './storage.jpg'
author: 'Jack Garay'
excerpt: "Getting to know the browser's storage capabilities, their use cases, differences, and specifics."
---

There are many times in our application where we need to store data on the user’s browser. This could be a token, a list of items in a cart, user theme preferences, or literally any other data! This article will walk you through cookies, local storage, and session storage: where they differ, their use-cases, and their specifics.

## Cookies

Before HTML5, there were no other means of storing retrievable user information apart from cookies. Cookies are accessed through `document.cookie` and can only store strings. They’re up to _4KB_ in size. Below is an example of how to use and retrieve cookies!

```
document.cookie = `name=Jack`
document.cookie = `theme=dark`
document.cookie = `expire=${new Date('2030 May 20').toUTCString()}`
```

Unlike other storage options, using Web API's cookies requires you to set `expire='dateInGMTorUTCString'`. Not setting the cookie's expiration date explicitly will make your set cookies expire by the end of the session (when the user closes the tab), so make sure you set them, always!

```
console.log(document.cookie)
// name=Jack; theme=dark
```

Every time you set `document.cookie` to value, you are essentially _creating a new record_ in the user's cookies. Accessing the final `document.cookie` returns to you an aggregate of all their assignments in a form of a string.

The format of the aggregate string goes as follows:

```
key=value; anotherKey=anotherValue
```

Cookies are just strings, they're not JSON serialiable data, this is why people build abstractions like [`js-cookie`](https://github.com/js-cookie/js-cookie) that allows you to set and parse data from the cookies with ease.

If you have used local or session storage before, you might ask "if local storage and session storage can achieve the same storage capability as cookies with an even bigger storage capacity, then why use it?"

Stormpath has written an amazing [article](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage) on how cookies are much safer than local or session storage when storing sensitive user data (e.g JWT tokens).

Cookies are also _sent to the server for every corresponding request_ you send to it, may it be an image, a CSS file, or a post request, the cookies are added to the request. This is the reason why cookies are limited to 4KB, so as not to add unnecessary overhead to _every single request you send to the server_.

## Local Storage

Since HTML5, local storage provided another alternative to storing key-value pairs with a maximum storage size of 10MB to the user's browser. It's a pretty much straightforward API to use:

```
/**
    window.localStorage is the more accurate way to
    access it, however, since anything we access
    in the global scope is assumed to be under `window`, you can skip `window` and just proceed with `localStorage.<function>`
**/

// Setting and updating a property
localStorage.setItem('theme', 'dark')

// Retrieving a property
localStorage.getItem('theme')
// 'dark'

// Deleting a property
localStorage.removeItem('theme')

// Clearing the localStorage
localStorage.clear()
```

Always take note that local storage stays in the user's browser _forever_, until they clear their browser's cache or manually clear their local storage via DevTools (will expound on this later) so there is no expiration unlike with cookies.

Local storage can also be accessed by the browser only and, unlike cookies, is _not_ sent to the server for every request. Therefore, adding more properties won't add to the network request overhead.

## Session Storage

Session storage is very similar to local storage, it shares the same interface! (They both share a [Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface).

You can use them the exact way with local storage, except with `sessionStorage` this time.

```
sessionStorage.setItem('key', 'value')
sessionStorage.getItem('key')
```

The key difference with this and local storage is the expiration and the storage capacity, session storage is much smaller (5MB), and expires _as soon as the user closes the tab_.

## DevTools Support

Most popular browsers support this. For chrome: you can open the developer tools (right-click anywhere on the page, then click Inspect). Go to "Application" tab. Under "Storage", you'll find all three of them:

![Dev Tools](./devtools.png 'Dev Tools')

## Summary

| Attribute          | Cookies                            |   Local Storage    |            Session Storage |
| ------------------ | ---------------------------------- | :----------------: | -------------------------: |
| Max size           | 4KB                                |        10MB        |                        5MB |
| Accessed via       | Any browser window                 | Any browser window |               The same tab |
| Lasts              | You have to set an expiration date |      Forever       | As long as the tab is open |
| Sent with Requests | Yes                                |         No         |                         No |
| Stored by          | Client and server                  |       Client       |                     Client |
