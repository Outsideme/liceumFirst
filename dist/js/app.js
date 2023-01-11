(() => {
    "use strict";
    function ssr_window_esm_isObject(obj) {
        return null !== obj && "object" === typeof obj && "constructor" in obj && obj.constructor === Object;
    }
    function extend(target = {}, src = {}) {
        Object.keys(src).forEach((key => {
            if ("undefined" === typeof target[key]) target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
        }));
    }
    const ssrDocument = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        getElementById() {
            return null;
        },
        createEvent() {
            return {
                initEvent() {}
            };
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName() {
                    return [];
                }
            };
        },
        createElementNS() {
            return {};
        },
        importNode() {
            return null;
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function ssr_window_esm_getDocument() {
        const doc = "undefined" !== typeof document ? document : {};
        extend(doc, ssrDocument);
        return doc;
    }
    const ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return "";
                }
            };
        },
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia() {
            return {};
        },
        requestAnimationFrame(callback) {
            if ("undefined" === typeof setTimeout) {
                callback();
                return null;
            }
            return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
            if ("undefined" === typeof setTimeout) return;
            clearTimeout(id);
        }
    };
    function ssr_window_esm_getWindow() {
        const win = "undefined" !== typeof window ? window : {};
        extend(win, ssrWindow);
        return win;
    }
    function makeReactive(obj) {
        const proto = obj.__proto__;
        Object.defineProperty(obj, "__proto__", {
            get() {
                return proto;
            },
            set(value) {
                proto.__proto__ = value;
            }
        });
    }
    class Dom7 extends Array {
        constructor(items) {
            if ("number" === typeof items) super(items); else {
                super(...items || []);
                makeReactive(this);
            }
        }
    }
    function arrayFlat(arr = []) {
        const res = [];
        arr.forEach((el => {
            if (Array.isArray(el)) res.push(...arrayFlat(el)); else res.push(el);
        }));
        return res;
    }
    function arrayFilter(arr, callback) {
        return Array.prototype.filter.call(arr, callback);
    }
    function arrayUnique(arr) {
        const uniqueArray = [];
        for (let i = 0; i < arr.length; i += 1) if (-1 === uniqueArray.indexOf(arr[i])) uniqueArray.push(arr[i]);
        return uniqueArray;
    }
    function qsa(selector, context) {
        if ("string" !== typeof selector) return [ selector ];
        const a = [];
        const res = context.querySelectorAll(selector);
        for (let i = 0; i < res.length; i += 1) a.push(res[i]);
        return a;
    }
    function dom7_esm_$(selector, context) {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        let arr = [];
        if (!context && selector instanceof Dom7) return selector;
        if (!selector) return new Dom7(arr);
        if ("string" === typeof selector) {
            const html = selector.trim();
            if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
                let toCreate = "div";
                if (0 === html.indexOf("<li")) toCreate = "ul";
                if (0 === html.indexOf("<tr")) toCreate = "tbody";
                if (0 === html.indexOf("<td") || 0 === html.indexOf("<th")) toCreate = "tr";
                if (0 === html.indexOf("<tbody")) toCreate = "table";
                if (0 === html.indexOf("<option")) toCreate = "select";
                const tempParent = document.createElement(toCreate);
                tempParent.innerHTML = html;
                for (let i = 0; i < tempParent.childNodes.length; i += 1) arr.push(tempParent.childNodes[i]);
            } else arr = qsa(selector.trim(), context || document);
        } else if (selector.nodeType || selector === window || selector === document) arr.push(selector); else if (Array.isArray(selector)) {
            if (selector instanceof Dom7) return selector;
            arr = selector;
        }
        return new Dom7(arrayUnique(arr));
    }
    dom7_esm_$.fn = Dom7.prototype;
    function addClass(...classes) {
        const classNames = arrayFlat(classes.map((c => c.split(" "))));
        this.forEach((el => {
            el.classList.add(...classNames);
        }));
        return this;
    }
    function removeClass(...classes) {
        const classNames = arrayFlat(classes.map((c => c.split(" "))));
        this.forEach((el => {
            el.classList.remove(...classNames);
        }));
        return this;
    }
    function toggleClass(...classes) {
        const classNames = arrayFlat(classes.map((c => c.split(" "))));
        this.forEach((el => {
            classNames.forEach((className => {
                el.classList.toggle(className);
            }));
        }));
    }
    function hasClass(...classes) {
        const classNames = arrayFlat(classes.map((c => c.split(" "))));
        return arrayFilter(this, (el => classNames.filter((className => el.classList.contains(className))).length > 0)).length > 0;
    }
    function attr(attrs, value) {
        if (1 === arguments.length && "string" === typeof attrs) {
            if (this[0]) return this[0].getAttribute(attrs);
            return;
        }
        for (let i = 0; i < this.length; i += 1) if (2 === arguments.length) this[i].setAttribute(attrs, value); else for (const attrName in attrs) {
            this[i][attrName] = attrs[attrName];
            this[i].setAttribute(attrName, attrs[attrName]);
        }
        return this;
    }
    function removeAttr(attr) {
        for (let i = 0; i < this.length; i += 1) this[i].removeAttribute(attr);
        return this;
    }
    function transform(transform) {
        for (let i = 0; i < this.length; i += 1) this[i].style.transform = transform;
        return this;
    }
    function transition(duration) {
        for (let i = 0; i < this.length; i += 1) this[i].style.transitionDuration = "string" !== typeof duration ? `${duration}ms` : duration;
        return this;
    }
    function on(...args) {
        let [eventType, targetSelector, listener, capture] = args;
        if ("function" === typeof args[1]) {
            [eventType, listener, capture] = args;
            targetSelector = void 0;
        }
        if (!capture) capture = false;
        function handleLiveEvent(e) {
            const target = e.target;
            if (!target) return;
            const eventData = e.target.dom7EventData || [];
            if (eventData.indexOf(e) < 0) eventData.unshift(e);
            if (dom7_esm_$(target).is(targetSelector)) listener.apply(target, eventData); else {
                const parents = dom7_esm_$(target).parents();
                for (let k = 0; k < parents.length; k += 1) if (dom7_esm_$(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
            }
        }
        function handleEvent(e) {
            const eventData = e && e.target ? e.target.dom7EventData || [] : [];
            if (eventData.indexOf(e) < 0) eventData.unshift(e);
            listener.apply(this, eventData);
        }
        const events = eventType.split(" ");
        let j;
        for (let i = 0; i < this.length; i += 1) {
            const el = this[i];
            if (!targetSelector) for (j = 0; j < events.length; j += 1) {
                const event = events[j];
                if (!el.dom7Listeners) el.dom7Listeners = {};
                if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
                el.dom7Listeners[event].push({
                    listener,
                    proxyListener: handleEvent
                });
                el.addEventListener(event, handleEvent, capture);
            } else for (j = 0; j < events.length; j += 1) {
                const event = events[j];
                if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
                if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
                el.dom7LiveListeners[event].push({
                    listener,
                    proxyListener: handleLiveEvent
                });
                el.addEventListener(event, handleLiveEvent, capture);
            }
        }
        return this;
    }
    function off(...args) {
        let [eventType, targetSelector, listener, capture] = args;
        if ("function" === typeof args[1]) {
            [eventType, listener, capture] = args;
            targetSelector = void 0;
        }
        if (!capture) capture = false;
        const events = eventType.split(" ");
        for (let i = 0; i < events.length; i += 1) {
            const event = events[i];
            for (let j = 0; j < this.length; j += 1) {
                const el = this[j];
                let handlers;
                if (!targetSelector && el.dom7Listeners) handlers = el.dom7Listeners[event]; else if (targetSelector && el.dom7LiveListeners) handlers = el.dom7LiveListeners[event];
                if (handlers && handlers.length) for (let k = handlers.length - 1; k >= 0; k -= 1) {
                    const handler = handlers[k];
                    if (listener && handler.listener === listener) {
                        el.removeEventListener(event, handler.proxyListener, capture);
                        handlers.splice(k, 1);
                    } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                        el.removeEventListener(event, handler.proxyListener, capture);
                        handlers.splice(k, 1);
                    } else if (!listener) {
                        el.removeEventListener(event, handler.proxyListener, capture);
                        handlers.splice(k, 1);
                    }
                }
            }
        }
        return this;
    }
    function trigger(...args) {
        const window = ssr_window_esm_getWindow();
        const events = args[0].split(" ");
        const eventData = args[1];
        for (let i = 0; i < events.length; i += 1) {
            const event = events[i];
            for (let j = 0; j < this.length; j += 1) {
                const el = this[j];
                if (window.CustomEvent) {
                    const evt = new window.CustomEvent(event, {
                        detail: eventData,
                        bubbles: true,
                        cancelable: true
                    });
                    el.dom7EventData = args.filter(((data, dataIndex) => dataIndex > 0));
                    el.dispatchEvent(evt);
                    el.dom7EventData = [];
                    delete el.dom7EventData;
                }
            }
        }
        return this;
    }
    function transitionEnd(callback) {
        const dom = this;
        function fireCallBack(e) {
            if (e.target !== this) return;
            callback.call(this, e);
            dom.off("transitionend", fireCallBack);
        }
        if (callback) dom.on("transitionend", fireCallBack);
        return this;
    }
    function dom7_esm_outerWidth(includeMargins) {
        if (this.length > 0) {
            if (includeMargins) {
                const styles = this.styles();
                return this[0].offsetWidth + parseFloat(styles.getPropertyValue("margin-right")) + parseFloat(styles.getPropertyValue("margin-left"));
            }
            return this[0].offsetWidth;
        }
        return null;
    }
    function dom7_esm_outerHeight(includeMargins) {
        if (this.length > 0) {
            if (includeMargins) {
                const styles = this.styles();
                return this[0].offsetHeight + parseFloat(styles.getPropertyValue("margin-top")) + parseFloat(styles.getPropertyValue("margin-bottom"));
            }
            return this[0].offsetHeight;
        }
        return null;
    }
    function offset() {
        if (this.length > 0) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            const el = this[0];
            const box = el.getBoundingClientRect();
            const body = document.body;
            const clientTop = el.clientTop || body.clientTop || 0;
            const clientLeft = el.clientLeft || body.clientLeft || 0;
            const scrollTop = el === window ? window.scrollY : el.scrollTop;
            const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
            return {
                top: box.top + scrollTop - clientTop,
                left: box.left + scrollLeft - clientLeft
            };
        }
        return null;
    }
    function styles() {
        const window = ssr_window_esm_getWindow();
        if (this[0]) return window.getComputedStyle(this[0], null);
        return {};
    }
    function css(props, value) {
        const window = ssr_window_esm_getWindow();
        let i;
        if (1 === arguments.length) if ("string" === typeof props) {
            if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
        } else {
            for (i = 0; i < this.length; i += 1) for (const prop in props) this[i].style[prop] = props[prop];
            return this;
        }
        if (2 === arguments.length && "string" === typeof props) {
            for (i = 0; i < this.length; i += 1) this[i].style[props] = value;
            return this;
        }
        return this;
    }
    function each(callback) {
        if (!callback) return this;
        this.forEach(((el, index) => {
            callback.apply(el, [ el, index ]);
        }));
        return this;
    }
    function filter(callback) {
        const result = arrayFilter(this, callback);
        return dom7_esm_$(result);
    }
    function html(html) {
        if ("undefined" === typeof html) return this[0] ? this[0].innerHTML : null;
        for (let i = 0; i < this.length; i += 1) this[i].innerHTML = html;
        return this;
    }
    function dom7_esm_text(text) {
        if ("undefined" === typeof text) return this[0] ? this[0].textContent.trim() : null;
        for (let i = 0; i < this.length; i += 1) this[i].textContent = text;
        return this;
    }
    function is(selector) {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        const el = this[0];
        let compareWith;
        let i;
        if (!el || "undefined" === typeof selector) return false;
        if ("string" === typeof selector) {
            if (el.matches) return el.matches(selector);
            if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
            if (el.msMatchesSelector) return el.msMatchesSelector(selector);
            compareWith = dom7_esm_$(selector);
            for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
            return false;
        }
        if (selector === document) return el === document;
        if (selector === window) return el === window;
        if (selector.nodeType || selector instanceof Dom7) {
            compareWith = selector.nodeType ? [ selector ] : selector;
            for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
            return false;
        }
        return false;
    }
    function index() {
        let child = this[0];
        let i;
        if (child) {
            i = 0;
            while (null !== (child = child.previousSibling)) if (1 === child.nodeType) i += 1;
            return i;
        }
        return;
    }
    function eq(index) {
        if ("undefined" === typeof index) return this;
        const length = this.length;
        if (index > length - 1) return dom7_esm_$([]);
        if (index < 0) {
            const returnIndex = length + index;
            if (returnIndex < 0) return dom7_esm_$([]);
            return dom7_esm_$([ this[returnIndex] ]);
        }
        return dom7_esm_$([ this[index] ]);
    }
    function append(...els) {
        let newChild;
        const document = ssr_window_esm_getDocument();
        for (let k = 0; k < els.length; k += 1) {
            newChild = els[k];
            for (let i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = newChild;
                while (tempDiv.firstChild) this[i].appendChild(tempDiv.firstChild);
            } else if (newChild instanceof Dom7) for (let j = 0; j < newChild.length; j += 1) this[i].appendChild(newChild[j]); else this[i].appendChild(newChild);
        }
        return this;
    }
    function prepend(newChild) {
        const document = ssr_window_esm_getDocument();
        let i;
        let j;
        for (i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = newChild;
            for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        } else if (newChild instanceof Dom7) for (j = 0; j < newChild.length; j += 1) this[i].insertBefore(newChild[j], this[i].childNodes[0]); else this[i].insertBefore(newChild, this[i].childNodes[0]);
        return this;
    }
    function next(selector) {
        if (this.length > 0) {
            if (selector) {
                if (this[0].nextElementSibling && dom7_esm_$(this[0].nextElementSibling).is(selector)) return dom7_esm_$([ this[0].nextElementSibling ]);
                return dom7_esm_$([]);
            }
            if (this[0].nextElementSibling) return dom7_esm_$([ this[0].nextElementSibling ]);
            return dom7_esm_$([]);
        }
        return dom7_esm_$([]);
    }
    function nextAll(selector) {
        const nextEls = [];
        let el = this[0];
        if (!el) return dom7_esm_$([]);
        while (el.nextElementSibling) {
            const next = el.nextElementSibling;
            if (selector) {
                if (dom7_esm_$(next).is(selector)) nextEls.push(next);
            } else nextEls.push(next);
            el = next;
        }
        return dom7_esm_$(nextEls);
    }
    function prev(selector) {
        if (this.length > 0) {
            const el = this[0];
            if (selector) {
                if (el.previousElementSibling && dom7_esm_$(el.previousElementSibling).is(selector)) return dom7_esm_$([ el.previousElementSibling ]);
                return dom7_esm_$([]);
            }
            if (el.previousElementSibling) return dom7_esm_$([ el.previousElementSibling ]);
            return dom7_esm_$([]);
        }
        return dom7_esm_$([]);
    }
    function prevAll(selector) {
        const prevEls = [];
        let el = this[0];
        if (!el) return dom7_esm_$([]);
        while (el.previousElementSibling) {
            const prev = el.previousElementSibling;
            if (selector) {
                if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
            } else prevEls.push(prev);
            el = prev;
        }
        return dom7_esm_$(prevEls);
    }
    function dom7_esm_parent(selector) {
        const parents = [];
        for (let i = 0; i < this.length; i += 1) if (null !== this[i].parentNode) if (selector) {
            if (dom7_esm_$(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
        } else parents.push(this[i].parentNode);
        return dom7_esm_$(parents);
    }
    function parents(selector) {
        const parents = [];
        for (let i = 0; i < this.length; i += 1) {
            let parent = this[i].parentNode;
            while (parent) {
                if (selector) {
                    if (dom7_esm_$(parent).is(selector)) parents.push(parent);
                } else parents.push(parent);
                parent = parent.parentNode;
            }
        }
        return dom7_esm_$(parents);
    }
    function closest(selector) {
        let closest = this;
        if ("undefined" === typeof selector) return dom7_esm_$([]);
        if (!closest.is(selector)) closest = closest.parents(selector).eq(0);
        return closest;
    }
    function find(selector) {
        const foundElements = [];
        for (let i = 0; i < this.length; i += 1) {
            const found = this[i].querySelectorAll(selector);
            for (let j = 0; j < found.length; j += 1) foundElements.push(found[j]);
        }
        return dom7_esm_$(foundElements);
    }
    function children(selector) {
        const children = [];
        for (let i = 0; i < this.length; i += 1) {
            const childNodes = this[i].children;
            for (let j = 0; j < childNodes.length; j += 1) if (!selector || dom7_esm_$(childNodes[j]).is(selector)) children.push(childNodes[j]);
        }
        return dom7_esm_$(children);
    }
    function remove() {
        for (let i = 0; i < this.length; i += 1) if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
        return this;
    }
    const noTrigger = "resize scroll".split(" ");
    function shortcut(name) {
        function eventHandler(...args) {
            if ("undefined" === typeof args[0]) {
                for (let i = 0; i < this.length; i += 1) if (noTrigger.indexOf(name) < 0) if (name in this[i]) this[i][name](); else dom7_esm_$(this[i]).trigger(name);
                return this;
            }
            return this.on(name, ...args);
        }
        return eventHandler;
    }
    shortcut("click");
    shortcut("blur");
    shortcut("focus");
    shortcut("focusin");
    shortcut("focusout");
    shortcut("keyup");
    shortcut("keydown");
    shortcut("keypress");
    shortcut("submit");
    shortcut("change");
    shortcut("mousedown");
    shortcut("mousemove");
    shortcut("mouseup");
    shortcut("mouseenter");
    shortcut("mouseleave");
    shortcut("mouseout");
    shortcut("mouseover");
    shortcut("touchstart");
    shortcut("touchend");
    shortcut("touchmove");
    shortcut("resize");
    shortcut("scroll");
    const Methods = {
        addClass,
        removeClass,
        hasClass,
        toggleClass,
        attr,
        removeAttr,
        transform,
        transition,
        on,
        off,
        trigger,
        transitionEnd,
        outerWidth: dom7_esm_outerWidth,
        outerHeight: dom7_esm_outerHeight,
        styles,
        offset,
        css,
        each,
        html,
        text: dom7_esm_text,
        is,
        index,
        eq,
        append,
        prepend,
        next,
        nextAll,
        prev,
        prevAll,
        parent: dom7_esm_parent,
        parents,
        closest,
        find,
        children,
        filter,
        remove
    };
    Object.keys(Methods).forEach((methodName => {
        Object.defineProperty(dom7_esm_$.fn, methodName, {
            value: Methods[methodName],
            writable: true
        });
    }));
    const dom = dom7_esm_$;
    function deleteProps(obj) {
        const object = obj;
        Object.keys(object).forEach((key => {
            try {
                object[key] = null;
            } catch (e) {}
            try {
                delete object[key];
            } catch (e) {}
        }));
    }
    function utils_nextTick(callback, delay = 0) {
        return setTimeout(callback, delay);
    }
    function utils_now() {
        return Date.now();
    }
    function utils_getComputedStyle(el) {
        const window = ssr_window_esm_getWindow();
        let style;
        if (window.getComputedStyle) style = window.getComputedStyle(el, null);
        if (!style && el.currentStyle) style = el.currentStyle;
        if (!style) style = el.style;
        return style;
    }
    function utils_getTranslate(el, axis = "x") {
        const window = ssr_window_esm_getWindow();
        let matrix;
        let curTransform;
        let transformMatrix;
        const curStyle = utils_getComputedStyle(el, null);
        if (window.WebKitCSSMatrix) {
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
            transformMatrix = new window.WebKitCSSMatrix("none" === curTransform ? "" : curTransform);
        } else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
            matrix = transformMatrix.toString().split(",");
        }
        if ("x" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (16 === matrix.length) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
        if ("y" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (16 === matrix.length) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
        return curTransform || 0;
    }
    function utils_isObject(o) {
        return "object" === typeof o && null !== o && o.constructor && "Object" === Object.prototype.toString.call(o).slice(8, -1);
    }
    function isNode(node) {
        if ("undefined" !== typeof window && "undefined" !== typeof window.HTMLElement) return node instanceof HTMLElement;
        return node && (1 === node.nodeType || 11 === node.nodeType);
    }
    function utils_extend(...args) {
        const to = Object(args[0]);
        const noExtend = [ "__proto__", "constructor", "prototype" ];
        for (let i = 1; i < args.length; i += 1) {
            const nextSource = args[i];
            if (void 0 !== nextSource && null !== nextSource && !isNode(nextSource)) {
                const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (void 0 !== desc && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                        to[nextKey] = {};
                        if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                    } else to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
    function utils_setCSSProperty(el, varName, varValue) {
        el.style.setProperty(varName, varValue);
    }
    function animateCSSModeScroll({swiper, targetPosition, side}) {
        const window = ssr_window_esm_getWindow();
        const startPosition = -swiper.translate;
        let startTime = null;
        let time;
        const duration = swiper.params.speed;
        swiper.wrapperEl.style.scrollSnapType = "none";
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        const dir = targetPosition > startPosition ? "next" : "prev";
        const isOutOfBound = (current, target) => "next" === dir && current >= target || "prev" === dir && current <= target;
        const animate = () => {
            time = (new Date).getTime();
            if (null === startTime) startTime = time;
            const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
            const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
            let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
            if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
            swiper.wrapperEl.scrollTo({
                [side]: currentPosition
            });
            if (isOutOfBound(currentPosition, targetPosition)) {
                swiper.wrapperEl.style.overflow = "hidden";
                swiper.wrapperEl.style.scrollSnapType = "";
                setTimeout((() => {
                    swiper.wrapperEl.style.overflow = "";
                    swiper.wrapperEl.scrollTo({
                        [side]: currentPosition
                    });
                }));
                window.cancelAnimationFrame(swiper.cssModeFrameID);
                return;
            }
            swiper.cssModeFrameID = window.requestAnimationFrame(animate);
        };
        animate();
    }
    let support;
    function calcSupport() {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        return {
            smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
            passiveListener: function checkPassiveListener() {
                let supportsPassive = false;
                try {
                    const opts = Object.defineProperty({}, "passive", {
                        get() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener("testPassiveListener", null, opts);
                } catch (e) {}
                return supportsPassive;
            }(),
            gestures: function checkGestures() {
                return "ongesturestart" in window;
            }()
        };
    }
    function getSupport() {
        if (!support) support = calcSupport();
        return support;
    }
    let deviceCached;
    function calcDevice({userAgent} = {}) {
        const support = getSupport();
        const window = ssr_window_esm_getWindow();
        const platform = window.navigator.platform;
        const ua = userAgent || window.navigator.userAgent;
        const device = {
            ios: false,
            android: false
        };
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        const windows = "Win32" === platform;
        let macos = "MacIntel" === platform;
        const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
        if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
            ipad = ua.match(/(Version)\/([\d.]+)/);
            if (!ipad) ipad = [ 0, 1, "13_0_0" ];
            macos = false;
        }
        if (android && !windows) {
            device.os = "android";
            device.android = true;
        }
        if (ipad || iphone || ipod) {
            device.os = "ios";
            device.ios = true;
        }
        return device;
    }
    function getDevice(overrides = {}) {
        if (!deviceCached) deviceCached = calcDevice(overrides);
        return deviceCached;
    }
    let browser;
    function calcBrowser() {
        const window = ssr_window_esm_getWindow();
        function isSafari() {
            const ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
        }
        return {
            isSafari: isSafari(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
        };
    }
    function getBrowser() {
        if (!browser) browser = calcBrowser();
        return browser;
    }
    function Resize({swiper, on, emit}) {
        const window = ssr_window_esm_getWindow();
        let observer = null;
        let animationFrame = null;
        const resizeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("beforeResize");
            emit("resize");
        };
        const createObserver = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            observer = new ResizeObserver((entries => {
                animationFrame = window.requestAnimationFrame((() => {
                    const {width, height} = swiper;
                    let newWidth = width;
                    let newHeight = height;
                    entries.forEach((({contentBoxSize, contentRect, target}) => {
                        if (target && target !== swiper.el) return;
                        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                    }));
                    if (newWidth !== width || newHeight !== height) resizeHandler();
                }));
            }));
            observer.observe(swiper.el);
        };
        const removeObserver = () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            if (observer && observer.unobserve && swiper.el) {
                observer.unobserve(swiper.el);
                observer = null;
            }
        };
        const orientationChangeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("orientationchange");
        };
        on("init", (() => {
            if (swiper.params.resizeObserver && "undefined" !== typeof window.ResizeObserver) {
                createObserver();
                return;
            }
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("orientationchange", orientationChangeHandler);
        }));
        on("destroy", (() => {
            removeObserver();
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", orientationChangeHandler);
        }));
    }
    function Observer({swiper, extendParams, on, emit}) {
        const observers = [];
        const window = ssr_window_esm_getWindow();
        const attach = (target, options = {}) => {
            const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            const observer = new ObserverFunc((mutations => {
                if (1 === mutations.length) {
                    emit("observerUpdate", mutations[0]);
                    return;
                }
                const observerUpdate = function observerUpdate() {
                    emit("observerUpdate", mutations[0]);
                };
                if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
            }));
            observer.observe(target, {
                attributes: "undefined" === typeof options.attributes ? true : options.attributes,
                childList: "undefined" === typeof options.childList ? true : options.childList,
                characterData: "undefined" === typeof options.characterData ? true : options.characterData
            });
            observers.push(observer);
        };
        const init = () => {
            if (!swiper.params.observer) return;
            if (swiper.params.observeParents) {
                const containerParents = swiper.$el.parents();
                for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
            }
            attach(swiper.$el[0], {
                childList: swiper.params.observeSlideChildren
            });
            attach(swiper.$wrapperEl[0], {
                attributes: false
            });
        };
        const destroy = () => {
            observers.forEach((observer => {
                observer.disconnect();
            }));
            observers.splice(0, observers.length);
        };
        extendParams({
            observer: false,
            observeParents: false,
            observeSlideChildren: false
        });
        on("init", init);
        on("destroy", destroy);
    }
    const events_emitter = {
        on(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if ("function" !== typeof handler) return self;
            const method = priority ? "unshift" : "push";
            events.split(" ").forEach((event => {
                if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                self.eventsListeners[event][method](handler);
            }));
            return self;
        },
        once(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if ("function" !== typeof handler) return self;
            function onceHandler(...args) {
                self.off(events, onceHandler);
                if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                handler.apply(self, args);
            }
            onceHandler.__emitterProxy = handler;
            return self.on(events, onceHandler, priority);
        },
        onAny(handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if ("function" !== typeof handler) return self;
            const method = priority ? "unshift" : "push";
            if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
            return self;
        },
        offAny(handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsAnyListeners) return self;
            const index = self.eventsAnyListeners.indexOf(handler);
            if (index >= 0) self.eventsAnyListeners.splice(index, 1);
            return self;
        },
        off(events, handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            events.split(" ").forEach((event => {
                if ("undefined" === typeof handler) self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                    if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                }));
            }));
            return self;
        },
        emit(...args) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            let events;
            let data;
            let context;
            if ("string" === typeof args[0] || Array.isArray(args[0])) {
                events = args[0];
                data = args.slice(1, args.length);
                context = self;
            } else {
                events = args[0].events;
                data = args[0].data;
                context = args[0].context || self;
            }
            data.unshift(context);
            const eventsArray = Array.isArray(events) ? events : events.split(" ");
            eventsArray.forEach((event => {
                if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                    eventHandler.apply(context, [ event, ...data ]);
                }));
                if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                    eventHandler.apply(context, data);
                }));
            }));
            return self;
        }
    };
    function updateSize() {
        const swiper = this;
        let width;
        let height;
        const $el = swiper.$el;
        if ("undefined" !== typeof swiper.params.width && null !== swiper.params.width) width = swiper.params.width; else width = $el[0].clientWidth;
        if ("undefined" !== typeof swiper.params.height && null !== swiper.params.height) height = swiper.params.height; else height = $el[0].clientHeight;
        if (0 === width && swiper.isHorizontal() || 0 === height && swiper.isVertical()) return;
        width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
        height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
        if (Number.isNaN(width)) width = 0;
        if (Number.isNaN(height)) height = 0;
        Object.assign(swiper, {
            width,
            height,
            size: swiper.isHorizontal() ? width : height
        });
    }
    function updateSlides() {
        const swiper = this;
        function getDirectionLabel(property) {
            if (swiper.isHorizontal()) return property;
            return {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[property];
        }
        function getDirectionPropertyValue(node, label) {
            return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
        }
        const params = swiper.params;
        const {$wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
        const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        let snapGrid = [];
        const slidesGrid = [];
        const slidesSizesGrid = [];
        let offsetBefore = params.slidesOffsetBefore;
        if ("function" === typeof offsetBefore) offsetBefore = params.slidesOffsetBefore.call(swiper);
        let offsetAfter = params.slidesOffsetAfter;
        if ("function" === typeof offsetAfter) offsetAfter = params.slidesOffsetAfter.call(swiper);
        const previousSnapGridLength = swiper.snapGrid.length;
        const previousSlidesGridLength = swiper.slidesGrid.length;
        let spaceBetween = params.spaceBetween;
        let slidePosition = -offsetBefore;
        let prevSlideSize = 0;
        let index = 0;
        if ("undefined" === typeof swiperSize) return;
        if ("string" === typeof spaceBetween && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
        swiper.virtualSize = -spaceBetween;
        if (rtl) slides.css({
            marginLeft: "",
            marginBottom: "",
            marginTop: ""
        }); else slides.css({
            marginRight: "",
            marginBottom: "",
            marginTop: ""
        });
        if (params.centeredSlides && params.cssMode) {
            utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
            utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
        }
        const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
        if (gridEnabled) swiper.grid.initSlides(slidesLength);
        let slideSize;
        const shouldResetSlideSize = "auto" === params.slidesPerView && params.breakpoints && Object.keys(params.breakpoints).filter((key => "undefined" !== typeof params.breakpoints[key].slidesPerView)).length > 0;
        for (let i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            const slide = slides.eq(i);
            if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
            if ("none" === slide.css("display")) continue;
            if ("auto" === params.slidesPerView) {
                if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                const slideStyles = getComputedStyle(slide[0]);
                const currentTransform = slide[0].style.transform;
                const currentWebKitTransform = slide[0].style.webkitTransform;
                if (currentTransform) slide[0].style.transform = "none";
                if (currentWebKitTransform) slide[0].style.webkitTransform = "none";
                if (params.roundLengths) slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true); else {
                    const width = getDirectionPropertyValue(slideStyles, "width");
                    const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                    const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                    const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                    const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                    const boxSizing = slideStyles.getPropertyValue("box-sizing");
                    if (boxSizing && "border-box" === boxSizing) slideSize = width + marginLeft + marginRight; else {
                        const {clientWidth, offsetWidth} = slide[0];
                        slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                    }
                }
                if (currentTransform) slide[0].style.transform = currentTransform;
                if (currentWebKitTransform) slide[0].style.webkitTransform = currentWebKitTransform;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
            } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
            }
            if (slides[i]) slides[i].swiperSlideSize = slideSize;
            slidesSizesGrid.push(slideSize);
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (0 === prevSlideSize && 0 !== i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (0 === i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
            } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }
            swiper.virtualSize += slideSize + spaceBetween;
            prevSlideSize = slideSize;
            index += 1;
        }
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
        if (rtl && wrongRTL && ("slide" === params.effect || "coverflow" === params.effect)) $wrapperEl.css({
            width: `${swiper.virtualSize + params.spaceBetween}px`
        });
        if (params.setWrapperSize) $wrapperEl.css({
            [getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
        });
        if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
        if (!params.centeredSlides) {
            const newSlidesGrid = [];
            for (let i = 0; i < snapGrid.length; i += 1) {
                let slidesGridItem = snapGrid[i];
                if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
        }
        if (0 === snapGrid.length) snapGrid = [ 0 ];
        if (0 !== params.spaceBetween) {
            const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
            slides.filter(((_, slideIndex) => {
                if (!params.cssMode) return true;
                if (slideIndex === slides.length - 1) return false;
                return true;
            })).css({
                [key]: `${spaceBetween}px`
            });
        }
        if (params.centeredSlides && params.centeredSlidesBounds) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
            }));
            allSlidesSize -= params.spaceBetween;
            const maxSnap = allSlidesSize - swiperSize;
            snapGrid = snapGrid.map((snap => {
                if (snap < 0) return -offsetBefore;
                if (snap > maxSnap) return maxSnap + offsetAfter;
                return snap;
            }));
        }
        if (params.centerInsufficientSlides) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
            }));
            allSlidesSize -= params.spaceBetween;
            if (allSlidesSize < swiperSize) {
                const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                snapGrid.forEach(((snap, snapIndex) => {
                    snapGrid[snapIndex] = snap - allSlidesOffset;
                }));
                slidesGrid.forEach(((snap, snapIndex) => {
                    slidesGrid[snapIndex] = snap + allSlidesOffset;
                }));
            }
        }
        Object.assign(swiper, {
            slides,
            snapGrid,
            slidesGrid,
            slidesSizesGrid
        });
        if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
            utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
            utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
            const addToSnapGrid = -swiper.snapGrid[0];
            const addToSlidesGrid = -swiper.slidesGrid[0];
            swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
            swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
        }
        if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
        if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            swiper.emit("snapGridLengthChange");
        }
        if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (!isVirtual && !params.cssMode && ("slide" === params.effect || "fade" === params.effect)) {
            const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
            const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);
            if (slidesLength <= params.maxBackfaceHiddenSlides) {
                if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
            } else if (hasClassBackfaceClassAdded) swiper.$el.removeClass(backFaceHiddenClass);
        }
    }
    function updateAutoHeight(speed) {
        const swiper = this;
        const activeSlides = [];
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let newHeight = 0;
        let i;
        if ("number" === typeof speed) swiper.setTransition(speed); else if (true === speed) swiper.setTransition(swiper.params.speed);
        const getSlideByIndex = index => {
            if (isVirtual) return swiper.slides.filter((el => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index))[0];
            return swiper.slides.eq(index)[0];
        };
        if ("auto" !== swiper.params.slidesPerView && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || dom([])).each((slide => {
            activeSlides.push(slide);
        })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
        } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
        for (i = 0; i < activeSlides.length; i += 1) if ("undefined" !== typeof activeSlides[i]) {
            const height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight;
        }
        if (newHeight || 0 === newHeight) swiper.$wrapperEl.css("height", `${newHeight}px`);
    }
    function updateSlidesOffset() {
        const swiper = this;
        const slides = swiper.slides;
        for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
    function updateSlidesProgress(translate = this && this.translate || 0) {
        const swiper = this;
        const params = swiper.params;
        const {slides, rtlTranslate: rtl, snapGrid} = swiper;
        if (0 === slides.length) return;
        if ("undefined" === typeof slides[0].swiperSlideOffset) swiper.updateSlidesOffset();
        let offsetCenter = -translate;
        if (rtl) offsetCenter = translate;
        slides.removeClass(params.slideVisibleClass);
        swiper.visibleSlidesIndexes = [];
        swiper.visibleSlides = [];
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            let slideOffset = slide.swiperSlideOffset;
            if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
            const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
            const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
            const slideBefore = -(offsetCenter - slideOffset);
            const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
            const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
            if (isVisible) {
                swiper.visibleSlides.push(slide);
                swiper.visibleSlidesIndexes.push(i);
                slides.eq(i).addClass(params.slideVisibleClass);
            }
            slide.progress = rtl ? -slideProgress : slideProgress;
            slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
        }
        swiper.visibleSlides = dom(swiper.visibleSlides);
    }
    function updateProgress(translate) {
        const swiper = this;
        if ("undefined" === typeof translate) {
            const multiplier = swiper.rtlTranslate ? -1 : 1;
            translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
        }
        const params = swiper.params;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        let {progress, isBeginning, isEnd} = swiper;
        const wasBeginning = isBeginning;
        const wasEnd = isEnd;
        if (0 === translatesDiff) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
        } else {
            progress = (translate - swiper.minTranslate()) / translatesDiff;
            isBeginning = progress <= 0;
            isEnd = progress >= 1;
        }
        Object.assign(swiper, {
            progress,
            isBeginning,
            isEnd
        });
        if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
        if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
        if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
        if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
        swiper.emit("progress", progress);
    }
    function updateSlidesClasses() {
        const swiper = this;
        const {slides, params, $wrapperEl, activeIndex, realIndex} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
        let activeSlide;
        if (isVirtual) activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides.eq(activeIndex);
        activeSlide.addClass(params.slideActiveClass);
        if (params.loop) if (activeSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
        let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
        if (params.loop && 0 === nextSlide.length) {
            nextSlide = slides.eq(0);
            nextSlide.addClass(params.slideNextClass);
        }
        let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
        if (params.loop && 0 === prevSlide.length) {
            prevSlide = slides.eq(-1);
            prevSlide.addClass(params.slidePrevClass);
        }
        if (params.loop) {
            if (nextSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
            if (prevSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
        }
        swiper.emitSlidesClasses();
    }
    function updateActiveIndex(newActiveIndex) {
        const swiper = this;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        const {slidesGrid, snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
        let activeIndex = newActiveIndex;
        let snapIndex;
        if ("undefined" === typeof activeIndex) {
            for (let i = 0; i < slidesGrid.length; i += 1) if ("undefined" !== typeof slidesGrid[i + 1]) {
                if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
            } else if (translate >= slidesGrid[i]) activeIndex = i;
            if (params.normalizeSlideIndex) if (activeIndex < 0 || "undefined" === typeof activeIndex) activeIndex = 0;
        }
        if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
            const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
            snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
        }
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        if (activeIndex === previousIndex) {
            if (snapIndex !== previousSnapIndex) {
                swiper.snapIndex = snapIndex;
                swiper.emit("snapIndexChange");
            }
            return;
        }
        const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
        Object.assign(swiper, {
            snapIndex,
            realIndex,
            previousIndex,
            activeIndex
        });
        swiper.emit("activeIndexChange");
        swiper.emit("snapIndexChange");
        if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
        if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
    }
    function updateClickedSlide(e) {
        const swiper = this;
        const params = swiper.params;
        const slide = dom(e).closest(`.${params.slideClass}`)[0];
        let slideFound = false;
        let slideIndex;
        if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
        }
        if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(dom(slide).attr("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
        } else {
            swiper.clickedSlide = void 0;
            swiper.clickedIndex = void 0;
            return;
        }
        if (params.slideToClickedSlide && void 0 !== swiper.clickedIndex && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
    }
    const update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
    };
    function getSwiperTranslate(axis = (this.isHorizontal() ? "x" : "y")) {
        const swiper = this;
        const {params, rtlTranslate: rtl, translate, $wrapperEl} = swiper;
        if (params.virtualTranslate) return rtl ? -translate : translate;
        if (params.cssMode) return translate;
        let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
        if (rtl) currentTranslate = -currentTranslate;
        return currentTranslate || 0;
    }
    function setTranslate(translate, byController) {
        const swiper = this;
        const {rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress} = swiper;
        let x = 0;
        let y = 0;
        const z = 0;
        if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
        if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
        }
        if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y;
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (0 === translatesDiff) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== progress) swiper.updateProgress(translate);
        swiper.emit("setTranslate", swiper.translate, byController);
    }
    function minTranslate() {
        return -this.snapGrid[0];
    }
    function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
    }
    function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
        const swiper = this;
        const {params, wrapperEl} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition) return false;
        const minTranslate = swiper.minTranslate();
        const maxTranslate = swiper.maxTranslate();
        let newTranslate;
        if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
        swiper.updateProgress(newTranslate);
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            if (0 === speed) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: -newTranslate,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: -newTranslate,
                    behavior: "smooth"
                });
            }
            return true;
        }
        if (0 === speed) {
            swiper.setTransition(0);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionEnd");
            }
        } else {
            swiper.setTransition(speed);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionStart");
            }
            if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.onTranslateToWrapperTransitionEnd = null;
                    delete swiper.onTranslateToWrapperTransitionEnd;
                    if (runCallbacks) swiper.emit("transitionEnd");
                };
                swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
            }
        }
        return true;
    }
    const translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
    };
    function setTransition(duration, byController) {
        const swiper = this;
        if (!swiper.params.cssMode) swiper.$wrapperEl.transition(duration);
        swiper.emit("setTransition", duration, byController);
    }
    function transitionEmit({swiper, runCallbacks, direction, step}) {
        const {activeIndex, previousIndex} = swiper;
        let dir = direction;
        if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
        swiper.emit(`transition${step}`);
        if (runCallbacks && activeIndex !== previousIndex) {
            if ("reset" === dir) {
                swiper.emit(`slideResetTransition${step}`);
                return;
            }
            swiper.emit(`slideChangeTransition${step}`);
            if ("next" === dir) swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
        }
    }
    function transitionStart(runCallbacks = true, direction) {
        const swiper = this;
        const {params} = swiper;
        if (params.cssMode) return;
        if (params.autoHeight) swiper.updateAutoHeight();
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "Start"
        });
    }
    function transitionEnd_transitionEnd(runCallbacks = true, direction) {
        const swiper = this;
        const {params} = swiper;
        swiper.animating = false;
        if (params.cssMode) return;
        swiper.setTransition(0);
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "End"
        });
    }
    const core_transition = {
        setTransition,
        transitionStart,
        transitionEnd: transitionEnd_transitionEnd
    };
    function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
        if ("number" !== typeof index && "string" !== typeof index) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
        if ("string" === typeof index) {
            const indexAsNumber = parseInt(index, 10);
            const isValidNumber = isFinite(indexAsNumber);
            if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
            index = indexAsNumber;
        }
        const swiper = this;
        let slideIndex = index;
        if (slideIndex < 0) slideIndex = 0;
        const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
        let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        const translate = -snapGrid[snapIndex];
        if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
            const normalizedTranslate = -Math.floor(100 * translate);
            const normalizedGrid = Math.floor(100 * slidesGrid[i]);
            const normalizedGridNext = Math.floor(100 * slidesGrid[i + 1]);
            if ("undefined" !== typeof slidesGrid[i + 1]) {
                if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
            } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
        }
        if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) return false;
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
        }
        if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
        swiper.updateProgress(translate);
        let direction;
        if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
        if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
            swiper.updateActiveIndex(slideIndex);
            if (params.autoHeight) swiper.updateAutoHeight();
            swiper.updateSlidesClasses();
            if ("slide" !== params.effect) swiper.setTranslate(translate);
            if ("reset" !== direction) {
                swiper.transitionStart(runCallbacks, direction);
                swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
        }
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            const t = rtl ? translate : -translate;
            if (0 === speed) {
                const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                if (isVirtual) {
                    swiper.wrapperEl.style.scrollSnapType = "none";
                    swiper._immediateVirtual = true;
                }
                wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                if (isVirtual) requestAnimationFrame((() => {
                    swiper.wrapperEl.style.scrollSnapType = "";
                    swiper._swiperImmediateVirtual = false;
                }));
            } else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: t,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: t,
                    behavior: "smooth"
                });
            }
            return true;
        }
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (0 === speed) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
            swiper.animating = true;
            if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                if (!swiper || swiper.destroyed) return;
                if (e.target !== this) return;
                swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
                swiper.onSlideToWrapperTransitionEnd = null;
                delete swiper.onSlideToWrapperTransitionEnd;
                swiper.transitionEnd(runCallbacks, direction);
            };
            swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
        }
        return true;
    }
    function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
        if ("string" === typeof index) {
            const indexAsNumber = parseInt(index, 10);
            const isValidNumber = isFinite(indexAsNumber);
            if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
            index = indexAsNumber;
        }
        const swiper = this;
        let newIndex = index;
        if (swiper.params.loop) newIndex += swiper.loopedSlides;
        return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }
    function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
        const swiper = this;
        const {animating, enabled, params} = swiper;
        if (!enabled) return swiper;
        let perGroup = params.slidesPerGroup;
        if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
        const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
        if (params.loop) {
            if (animating && params.loopPreventsSlide) return false;
            swiper.loopFix();
            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        }
        if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
        return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }
    function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
        const swiper = this;
        const {params, animating, snapGrid, slidesGrid, rtlTranslate, enabled} = swiper;
        if (!enabled) return swiper;
        if (params.loop) {
            if (animating && params.loopPreventsSlide) return false;
            swiper.loopFix();
            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        }
        const translate = rtlTranslate ? swiper.translate : -swiper.translate;
        function normalize(val) {
            if (val < 0) return -Math.floor(Math.abs(val));
            return Math.floor(val);
        }
        const normalizedTranslate = normalize(translate);
        const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
        let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
        if ("undefined" === typeof prevSnap && params.cssMode) {
            let prevSnapIndex;
            snapGrid.forEach(((snap, snapIndex) => {
                if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
            }));
            if ("undefined" !== typeof prevSnapIndex) prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
        let prevIndex = 0;
        if ("undefined" !== typeof prevSnap) {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
            if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) {
                prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                prevIndex = Math.max(prevIndex, 0);
            }
        }
        if (params.rewind && swiper.isBeginning) {
            const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
            return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
        }
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }
    function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
        const swiper = this;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }
    function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = .5) {
        const swiper = this;
        let index = swiper.activeIndex;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
        const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        if (translate >= swiper.snapGrid[snapIndex]) {
            const currentSnap = swiper.snapGrid[snapIndex];
            const nextSnap = swiper.snapGrid[snapIndex + 1];
            if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
        } else {
            const prevSnap = swiper.snapGrid[snapIndex - 1];
            const currentSnap = swiper.snapGrid[snapIndex];
            if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
        }
        index = Math.max(index, 0);
        index = Math.min(index, swiper.slidesGrid.length - 1);
        return swiper.slideTo(index, speed, runCallbacks, internal);
    }
    function slideToClickedSlide() {
        const swiper = this;
        const {params, $wrapperEl} = swiper;
        const slidesPerView = "auto" === params.slidesPerView ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        let slideToIndex = swiper.clickedIndex;
        let realIndex;
        if (params.loop) {
            if (swiper.animating) return;
            realIndex = parseInt(dom(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
            if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                swiper.loopFix();
                slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                swiper.loopFix();
                slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex);
        } else swiper.slideTo(slideToIndex);
    }
    const slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
    };
    function loopCreate() {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const {params, $wrapperEl} = swiper;
        const $selector = $wrapperEl.children().length > 0 ? dom($wrapperEl.children()[0].parentNode) : $wrapperEl;
        $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
        let slides = $selector.children(`.${params.slideClass}`);
        if (params.loopFillGroupWithBlank) {
            const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
            if (blankSlidesNum !== params.slidesPerGroup) {
                for (let i = 0; i < blankSlidesNum; i += 1) {
                    const blankNode = dom(document.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
                    $selector.append(blankNode);
                }
                slides = $selector.children(`.${params.slideClass}`);
            }
        }
        if ("auto" === params.slidesPerView && !params.loopedSlides) params.loopedSlides = slides.length;
        swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
        swiper.loopedSlides += params.loopAdditionalSlides;
        if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) swiper.loopedSlides = slides.length;
        const prependSlides = [];
        const appendSlides = [];
        slides.each(((el, index) => {
            const slide = dom(el);
            slide.attr("data-swiper-slide-index", index);
        }));
        for (let i = 0; i < swiper.loopedSlides; i += 1) {
            const index = i - Math.floor(i / slides.length) * slides.length;
            appendSlides.push(slides.eq(index)[0]);
            prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
        }
        for (let i = 0; i < appendSlides.length; i += 1) $selector.append(dom(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
        for (let i = prependSlides.length - 1; i >= 0; i -= 1) $selector.prepend(dom(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
    function loopFix() {
        const swiper = this;
        swiper.emit("beforeLoopFix");
        const {activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl} = swiper;
        let newIndex;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        const snapTranslate = -snapGrid[activeIndex];
        const diff = snapTranslate - swiper.getTranslate();
        if (activeIndex < loopedSlides) {
            newIndex = slides.length - 3 * loopedSlides + activeIndex;
            newIndex += loopedSlides;
            const slideChanged = swiper.slideTo(newIndex, 0, false, true);
            if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        } else if (activeIndex >= slides.length - loopedSlides) {
            newIndex = -slides.length + activeIndex + loopedSlides;
            newIndex += loopedSlides;
            const slideChanged = swiper.slideTo(newIndex, 0, false, true);
            if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        swiper.emit("loopFix");
    }
    function loopDestroy() {
        const swiper = this;
        const {$wrapperEl, params, slides} = swiper;
        $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
        slides.removeAttr("data-swiper-slide-index");
    }
    const loop = {
        loopCreate,
        loopFix,
        loopDestroy
    };
    function setGrabCursor(moving) {
        const swiper = this;
        if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        const el = "container" === swiper.params.touchEventsTarget ? swiper.el : swiper.wrapperEl;
        el.style.cursor = "move";
        el.style.cursor = moving ? "grabbing" : "grab";
    }
    function unsetGrabCursor() {
        const swiper = this;
        if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        swiper["container" === swiper.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "";
    }
    const grab_cursor = {
        setGrabCursor,
        unsetGrabCursor
    };
    function closestElement(selector, base = this) {
        function __closestFrom(el) {
            if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
            if (el.assignedSlot) el = el.assignedSlot;
            const found = el.closest(selector);
            if (!found && !el.getRootNode) return null;
            return found || __closestFrom(el.getRootNode().host);
        }
        return __closestFrom(base);
    }
    function onTouchStart(event) {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const window = ssr_window_esm_getWindow();
        const data = swiper.touchEventsData;
        const {params, touches, enabled} = swiper;
        if (!enabled) return;
        if (swiper.animating && params.preventInteractionOnTransition) return;
        if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        let $targetEl = dom(e.target);
        if ("wrapper" === params.touchEventsTarget) if (!$targetEl.closest(swiper.wrapperEl).length) return;
        data.isTouchEvent = "touchstart" === e.type;
        if (!data.isTouchEvent && "which" in e && 3 === e.which) return;
        if (!data.isTouchEvent && "button" in e && e.button > 0) return;
        if (data.isTouched && data.isMoved) return;
        const swipingClassHasValue = !!params.noSwipingClass && "" !== params.noSwipingClass;
        const eventPath = event.composedPath ? event.composedPath() : event.path;
        if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) $targetEl = dom(eventPath[0]);
        const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
        const isTargetShadow = !!(e.target && e.target.shadowRoot);
        if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
            swiper.allowClick = true;
            return;
        }
        if (params.swipeHandler) if (!$targetEl.closest(params.swipeHandler)[0]) return;
        touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX;
        touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
        const startX = touches.currentX;
        const startY = touches.currentY;
        const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
        const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
        if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if ("prevent" === edgeSwipeDetection) event.preventDefault(); else return;
        Object.assign(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: void 0,
            startMoving: void 0
        });
        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = utils_now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = void 0;
        if (params.threshold > 0) data.allowThresholdMove = false;
        if ("touchstart" !== e.type) {
            let preventDefault = true;
            if ($targetEl.is(data.focusableElements)) {
                preventDefault = false;
                if ("SELECT" === $targetEl[0].nodeName) data.isTouched = false;
            }
            if (document.activeElement && dom(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) document.activeElement.blur();
            const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
            if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) e.preventDefault();
        }
        if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
        swiper.emit("touchStart", e);
    }
    function onTouchMove(event) {
        const document = ssr_window_esm_getDocument();
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, enabled} = swiper;
        if (!enabled) return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
            return;
        }
        if (data.isTouchEvent && "touchmove" !== e.type) return;
        const targetTouch = "touchmove" === e.type && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
        const pageX = "touchmove" === e.type ? targetTouch.pageX : e.pageX;
        const pageY = "touchmove" === e.type ? targetTouch.pageY : e.pageY;
        if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
        }
        if (!swiper.allowTouchMove) {
            if (!dom(e.target).is(data.focusableElements)) swiper.allowClick = false;
            if (data.isTouched) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    currentX: pageX,
                    currentY: pageY
                });
                data.touchStartTime = utils_now();
            }
            return;
        }
        if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
            if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                data.isTouched = false;
                data.isMoved = false;
                return;
            }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
        if (data.isTouchEvent && document.activeElement) if (e.target === document.activeElement && dom(e.target).is(data.focusableElements)) {
            data.isMoved = true;
            swiper.allowClick = false;
            return;
        }
        if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
        if (e.targetTouches && e.targetTouches.length > 1) return;
        touches.currentX = pageX;
        touches.currentY = pageY;
        const diffX = touches.currentX - touches.startX;
        const diffY = touches.currentY - touches.startY;
        if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
        if ("undefined" === typeof data.isScrolling) {
            let touchAngle;
            if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                touchAngle = 180 * Math.atan2(Math.abs(diffY), Math.abs(diffX)) / Math.PI;
                data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
            }
        }
        if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
        if ("undefined" === typeof data.startMoving) if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
        if (data.isScrolling) {
            data.isTouched = false;
            return;
        }
        if (!data.startMoving) return;
        swiper.allowClick = false;
        if (!params.cssMode && e.cancelable) e.preventDefault();
        if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
        if (!data.isMoved) {
            if (params.loop && !params.cssMode) swiper.loopFix();
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
            data.allowMomentumBounce = false;
            if (params.grabCursor && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(true);
            swiper.emit("sliderFirstMove", e);
        }
        swiper.emit("sliderMove", e);
        data.isMoved = true;
        let diff = swiper.isHorizontal() ? diffX : diffY;
        touches.diff = diff;
        diff *= params.touchRatio;
        if (rtl) diff = -diff;
        swiper.swipeDirection = diff > 0 ? "prev" : "next";
        data.currentTranslate = diff + data.startTranslate;
        let disableParentSwiper = true;
        let resistanceRatio = params.resistanceRatio;
        if (params.touchReleaseOnEdges) resistanceRatio = 0;
        if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
            disableParentSwiper = false;
            if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
        } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
            disableParentSwiper = false;
            if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
        }
        if (disableParentSwiper) e.preventedByNestedSwiper = true;
        if (!swiper.allowSlideNext && "next" === swiper.swipeDirection && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && "prev" === swiper.swipeDirection && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
        if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
            if (!data.allowThresholdMove) {
                data.allowThresholdMove = true;
                touches.startX = touches.currentX;
                touches.startY = touches.currentY;
                data.currentTranslate = data.startTranslate;
                touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                return;
            }
        } else {
            data.currentTranslate = data.startTranslate;
            return;
        }
        if (!params.followFinger || params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
        swiper.updateProgress(data.currentTranslate);
        swiper.setTranslate(data.currentTranslate);
    }
    function onTouchEnd(event) {
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
        if (!enabled) return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
        data.allowTouchCallbacks = false;
        if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        if (params.grabCursor && data.isMoved && data.isTouched && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(false);
        const touchEndTime = utils_now();
        const timeDiff = touchEndTime - data.touchStartTime;
        if (swiper.allowClick) {
            const pathTree = e.path || e.composedPath && e.composedPath();
            swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
            swiper.emit("tap click", e);
            if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
        }
        data.lastClickTime = utils_now();
        utils_nextTick((() => {
            if (!swiper.destroyed) swiper.allowClick = true;
        }));
        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || 0 === touches.diff || data.currentTranslate === data.startTranslate) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        let currentPos;
        if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
        if (params.cssMode) return;
        if (swiper.params.freeMode && params.freeMode.enabled) {
            swiper.freeMode.onTouchEnd({
                currentPos
            });
            return;
        }
        let stopIndex = 0;
        let groupSize = swiper.slidesSizesGrid[0];
        for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
            const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if ("undefined" !== typeof slidesGrid[i + increment]) {
                if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                    stopIndex = i;
                    groupSize = slidesGrid[i + increment] - slidesGrid[i];
                }
            } else if (currentPos >= slidesGrid[i]) {
                stopIndex = i;
                groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
        }
        let rewindFirstIndex = null;
        let rewindLastIndex = null;
        if (params.rewind) if (swiper.isBeginning) rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
        const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
        const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
        if (timeDiff > params.longSwipesMs) {
            if (!params.longSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if ("next" === swiper.swipeDirection) if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
            if ("prev" === swiper.swipeDirection) if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (null !== rewindLastIndex && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
        } else {
            if (!params.shortSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
            if (!isNavButtonTarget) {
                if ("next" === swiper.swipeDirection) swiper.slideTo(null !== rewindFirstIndex ? rewindFirstIndex : stopIndex + increment);
                if ("prev" === swiper.swipeDirection) swiper.slideTo(null !== rewindLastIndex ? rewindLastIndex : stopIndex);
            } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
        }
    }
    function onResize() {
        const swiper = this;
        const {params, el} = swiper;
        if (el && 0 === el.offsetWidth) return;
        if (params.breakpoints) swiper.setBreakpoint();
        const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateSlidesClasses();
        if (("auto" === params.slidesPerView || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.run();
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
    }
    function onClick(e) {
        const swiper = this;
        if (!swiper.enabled) return;
        if (!swiper.allowClick) {
            if (swiper.params.preventClicks) e.preventDefault();
            if (swiper.params.preventClicksPropagation && swiper.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
    }
    function onScroll() {
        const swiper = this;
        const {wrapperEl, rtlTranslate, enabled} = swiper;
        if (!enabled) return;
        swiper.previousTranslate = swiper.translate;
        if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
        if (0 === swiper.translate) swiper.translate = 0;
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (0 === translatesDiff) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
        swiper.emit("setTranslate", swiper.translate, false);
    }
    let dummyEventAttached = false;
    function dummyEventListener() {}
    const events = (swiper, method) => {
        const document = ssr_window_esm_getDocument();
        const {params, touchEvents, el, wrapperEl, device, support} = swiper;
        const capture = !!params.nested;
        const domMethod = "on" === method ? "addEventListener" : "removeEventListener";
        const swiperMethod = method;
        if (!support.touch) {
            el[domMethod](touchEvents.start, swiper.onTouchStart, false);
            document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
            document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
        } else {
            const passiveListener = "touchstart" === touchEvents.start && support.passiveListener && params.passiveListeners ? {
                passive: true,
                capture: false
            } : false;
            el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
            el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
                passive: false,
                capture
            } : capture);
            el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
            if (touchEvents.cancel) el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }
        if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
        if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
        if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
    };
    function attachEvents() {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const {params, support} = swiper;
        swiper.onTouchStart = onTouchStart.bind(swiper);
        swiper.onTouchMove = onTouchMove.bind(swiper);
        swiper.onTouchEnd = onTouchEnd.bind(swiper);
        if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
        swiper.onClick = onClick.bind(swiper);
        if (support.touch && !dummyEventAttached) {
            document.addEventListener("touchstart", dummyEventListener);
            dummyEventAttached = true;
        }
        events(swiper, "on");
    }
    function detachEvents() {
        const swiper = this;
        events(swiper, "off");
    }
    const core_events = {
        attachEvents,
        detachEvents
    };
    const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
    function setBreakpoint() {
        const swiper = this;
        const {activeIndex, initialized, loopedSlides = 0, params, $el} = swiper;
        const breakpoints = params.breakpoints;
        if (!breakpoints || breakpoints && 0 === Object.keys(breakpoints).length) return;
        const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
        if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
        const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
        const breakpointParams = breakpointOnlyParams || swiper.originalParams;
        const wasMultiRow = isGridEnabled(swiper, params);
        const isMultiRow = isGridEnabled(swiper, breakpointParams);
        const wasEnabled = params.enabled;
        if (wasMultiRow && !isMultiRow) {
            $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        } else if (!wasMultiRow && isMultiRow) {
            $el.addClass(`${params.containerModifierClass}grid`);
            if (breakpointParams.grid.fill && "column" === breakpointParams.grid.fill || !breakpointParams.grid.fill && "column" === params.grid.fill) $el.addClass(`${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        }
        [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
            const wasModuleEnabled = params[prop] && params[prop].enabled;
            const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
            if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
            if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
        }));
        const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
        if (directionChanged && initialized) swiper.changeDirection();
        utils_extend(swiper.params, breakpointParams);
        const isEnabled = swiper.params.enabled;
        Object.assign(swiper, {
            allowTouchMove: swiper.params.allowTouchMove,
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev
        });
        if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
        swiper.currentBreakpoint = breakpoint;
        swiper.emit("_beforeBreakpoint", breakpointParams);
        if (needsReLoop && initialized) {
            swiper.loopDestroy();
            swiper.loopCreate();
            swiper.updateSlides();
            swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
        }
        swiper.emit("breakpoint", breakpointParams);
    }
    function getBreakpoint(breakpoints, base = "window", containerEl) {
        if (!breakpoints || "container" === base && !containerEl) return;
        let breakpoint = false;
        const window = ssr_window_esm_getWindow();
        const currentHeight = "window" === base ? window.innerHeight : containerEl.clientHeight;
        const points = Object.keys(breakpoints).map((point => {
            if ("string" === typeof point && 0 === point.indexOf("@")) {
                const minRatio = parseFloat(point.substr(1));
                const value = currentHeight * minRatio;
                return {
                    value,
                    point
                };
            }
            return {
                value: point,
                point
            };
        }));
        points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
        for (let i = 0; i < points.length; i += 1) {
            const {point, value} = points[i];
            if ("window" === base) {
                if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
            } else if (value <= containerEl.clientWidth) breakpoint = point;
        }
        return breakpoint || "max";
    }
    const breakpoints = {
        setBreakpoint,
        getBreakpoint
    };
    function prepareClasses(entries, prefix) {
        const resultClasses = [];
        entries.forEach((item => {
            if ("object" === typeof item) Object.keys(item).forEach((classNames => {
                if (item[classNames]) resultClasses.push(prefix + classNames);
            })); else if ("string" === typeof item) resultClasses.push(prefix + item);
        }));
        return resultClasses;
    }
    function addClasses() {
        const swiper = this;
        const {classNames, params, rtl, $el, device, support} = swiper;
        const suffixes = prepareClasses([ "initialized", params.direction, {
            "pointer-events": !support.touch
        }, {
            "free-mode": swiper.params.freeMode && params.freeMode.enabled
        }, {
            autoheight: params.autoHeight
        }, {
            rtl
        }, {
            grid: params.grid && params.grid.rows > 1
        }, {
            "grid-column": params.grid && params.grid.rows > 1 && "column" === params.grid.fill
        }, {
            android: device.android
        }, {
            ios: device.ios
        }, {
            "css-mode": params.cssMode
        }, {
            centered: params.cssMode && params.centeredSlides
        }, {
            "watch-progress": params.watchSlidesProgress
        } ], params.containerModifierClass);
        classNames.push(...suffixes);
        $el.addClass([ ...classNames ].join(" "));
        swiper.emitContainerClasses();
    }
    function removeClasses() {
        const swiper = this;
        const {$el, classNames} = swiper;
        $el.removeClass(classNames.join(" "));
        swiper.emitContainerClasses();
    }
    const classes = {
        addClasses,
        removeClasses
    };
    function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
        const window = ssr_window_esm_getWindow();
        let image;
        function onReady() {
            if (callback) callback();
        }
        const isPicture = dom(imageEl).parent("picture")[0];
        if (!isPicture && (!imageEl.complete || !checkForComplete)) if (src) {
            image = new window.Image;
            image.onload = onReady;
            image.onerror = onReady;
            if (sizes) image.sizes = sizes;
            if (srcset) image.srcset = srcset;
            if (src) image.src = src;
        } else onReady(); else onReady();
    }
    function preloadImages() {
        const swiper = this;
        swiper.imagesToLoad = swiper.$el.find("img");
        function onReady() {
            if ("undefined" === typeof swiper || null === swiper || !swiper || swiper.destroyed) return;
            if (void 0 !== swiper.imagesLoaded) swiper.imagesLoaded += 1;
            if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
                if (swiper.params.updateOnImagesReady) swiper.update();
                swiper.emit("imagesReady");
            }
        }
        for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
            const imageEl = swiper.imagesToLoad[i];
            swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
        }
    }
    const core_images = {
        loadImage,
        preloadImages
    };
    function checkOverflow() {
        const swiper = this;
        const {isLocked: wasLocked, params} = swiper;
        const {slidesOffsetBefore} = params;
        if (slidesOffsetBefore) {
            const lastSlideIndex = swiper.slides.length - 1;
            const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + 2 * slidesOffsetBefore;
            swiper.isLocked = swiper.size > lastSlideRightEdge;
        } else swiper.isLocked = 1 === swiper.snapGrid.length;
        if (true === params.allowSlideNext) swiper.allowSlideNext = !swiper.isLocked;
        if (true === params.allowSlidePrev) swiper.allowSlidePrev = !swiper.isLocked;
        if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
        if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
    const check_overflow = {
        checkOverflow
    };
    const defaults = {
        init: true,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        enabled: true,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: false,
        userAgent: null,
        url: null,
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        autoHeight: false,
        setWrapperSize: false,
        virtualTranslate: false,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        watchOverflow: true,
        roundLengths: false,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 0,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        uniqueNavElements: true,
        resistance: true,
        resistanceRatio: .85,
        watchSlidesProgress: false,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        preloadImages: true,
        updateOnImagesReady: true,
        loop: false,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopedSlidesLimit: true,
        loopFillGroupWithBlank: false,
        loopPreventsSlide: true,
        rewind: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: true,
        _emitClasses: false
    };
    function moduleExtendParams(params, allModulesParams) {
        return function extendParams(obj = {}) {
            const moduleParamName = Object.keys(obj)[0];
            const moduleParams = obj[moduleParamName];
            if ("object" !== typeof moduleParams || null === moduleParams) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if ([ "navigation", "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && true === params[moduleParamName]) params[moduleParamName] = {
                auto: true
            };
            if (!(moduleParamName in params && "enabled" in moduleParams)) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (true === params[moduleParamName]) params[moduleParamName] = {
                enabled: true
            };
            if ("object" === typeof params[moduleParamName] && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
            if (!params[moduleParamName]) params[moduleParamName] = {
                enabled: false
            };
            utils_extend(allModulesParams, obj);
        };
    }
    const prototypes = {
        eventsEmitter: events_emitter,
        update,
        translate,
        transition: core_transition,
        slide,
        loop,
        grabCursor: grab_cursor,
        events: core_events,
        breakpoints,
        checkOverflow: check_overflow,
        classes,
        images: core_images
    };
    const extendedDefaults = {};
    class Swiper {
        constructor(...args) {
            let el;
            let params;
            if (1 === args.length && args[0].constructor && "Object" === Object.prototype.toString.call(args[0]).slice(8, -1)) params = args[0]; else [el, params] = args;
            if (!params) params = {};
            params = utils_extend({}, params);
            if (el && !params.el) params.el = el;
            if (params.el && dom(params.el).length > 1) {
                const swipers = [];
                dom(params.el).each((containerEl => {
                    const newParams = utils_extend({}, params, {
                        el: containerEl
                    });
                    swipers.push(new Swiper(newParams));
                }));
                return swipers;
            }
            const swiper = this;
            swiper.__swiper__ = true;
            swiper.support = getSupport();
            swiper.device = getDevice({
                userAgent: params.userAgent
            });
            swiper.browser = getBrowser();
            swiper.eventsListeners = {};
            swiper.eventsAnyListeners = [];
            swiper.modules = [ ...swiper.__modules__ ];
            if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
            const allModulesParams = {};
            swiper.modules.forEach((mod => {
                mod({
                    swiper,
                    extendParams: moduleExtendParams(params, allModulesParams),
                    on: swiper.on.bind(swiper),
                    once: swiper.once.bind(swiper),
                    off: swiper.off.bind(swiper),
                    emit: swiper.emit.bind(swiper)
                });
            }));
            const swiperParams = utils_extend({}, defaults, allModulesParams);
            swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = utils_extend({}, swiper.params);
            swiper.passedParams = utils_extend({}, params);
            if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                swiper.on(eventName, swiper.params.on[eventName]);
            }));
            if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
            swiper.$ = dom;
            Object.assign(swiper, {
                enabled: swiper.params.enabled,
                el,
                classNames: [],
                slides: dom(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return "horizontal" === swiper.params.direction;
                },
                isVertical() {
                    return "vertical" === swiper.params.direction;
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: true,
                isEnd: false,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: false,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,
                touchEvents: function touchEvents() {
                    const touch = [ "touchstart", "touchmove", "touchend", "touchcancel" ];
                    const desktop = [ "pointerdown", "pointermove", "pointerup" ];
                    swiper.touchEventsTouch = {
                        start: touch[0],
                        move: touch[1],
                        end: touch[2],
                        cancel: touch[3]
                    };
                    swiper.touchEventsDesktop = {
                        start: desktop[0],
                        move: desktop[1],
                        end: desktop[2]
                    };
                    return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
                }(),
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: swiper.params.focusableElements,
                    lastClickTime: utils_now(),
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    isTouchEvent: void 0,
                    startMoving: void 0
                },
                allowClick: true,
                allowTouchMove: swiper.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            });
            swiper.emit("_swiper");
            if (swiper.params.init) swiper.init();
            return swiper;
        }
        enable() {
            const swiper = this;
            if (swiper.enabled) return;
            swiper.enabled = true;
            if (swiper.params.grabCursor) swiper.setGrabCursor();
            swiper.emit("enable");
        }
        disable() {
            const swiper = this;
            if (!swiper.enabled) return;
            swiper.enabled = false;
            if (swiper.params.grabCursor) swiper.unsetGrabCursor();
            swiper.emit("disable");
        }
        setProgress(progress, speed) {
            const swiper = this;
            progress = Math.min(Math.max(progress, 0), 1);
            const min = swiper.minTranslate();
            const max = swiper.maxTranslate();
            const current = (max - min) * progress + min;
            swiper.translateTo(current, "undefined" === typeof speed ? 0 : speed);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        emitContainerClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const cls = swiper.el.className.split(" ").filter((className => 0 === className.indexOf("swiper") || 0 === className.indexOf(swiper.params.containerModifierClass)));
            swiper.emit("_containerClasses", cls.join(" "));
        }
        getSlideClasses(slideEl) {
            const swiper = this;
            if (swiper.destroyed) return "";
            return slideEl.className.split(" ").filter((className => 0 === className.indexOf("swiper-slide") || 0 === className.indexOf(swiper.params.slideClass))).join(" ");
        }
        emitSlidesClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const updates = [];
            swiper.slides.each((slideEl => {
                const classNames = swiper.getSlideClasses(slideEl);
                updates.push({
                    slideEl,
                    classNames
                });
                swiper.emit("_slideClass", slideEl, classNames);
            }));
            swiper.emit("_slideClasses", updates);
        }
        slidesPerViewDynamic(view = "current", exact = false) {
            const swiper = this;
            const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
            let spv = 1;
            if (params.centeredSlides) {
                let slideSize = slides[activeIndex].swiperSlideSize;
                let breakLoop;
                for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
                for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
            } else if ("current" === view) for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                if (slideInView) spv += 1;
            } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                if (slideInView) spv += 1;
            }
            return spv;
        }
        update() {
            const swiper = this;
            if (!swiper || swiper.destroyed) return;
            const {snapGrid, params} = swiper;
            if (params.breakpoints) swiper.setBreakpoint();
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
            function setTranslate() {
                const translateValue = swiper.rtlTranslate ? -1 * swiper.translate : swiper.translate;
                const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                swiper.setTranslate(newTranslate);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            let translated;
            if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                setTranslate();
                if (swiper.params.autoHeight) swiper.updateAutoHeight();
            } else {
                if (("auto" === swiper.params.slidesPerView || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true); else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                if (!translated) setTranslate();
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
            swiper.emit("update");
        }
        changeDirection(newDirection, needUpdate = true) {
            const swiper = this;
            const currentDirection = swiper.params.direction;
            if (!newDirection) newDirection = "horizontal" === currentDirection ? "vertical" : "horizontal";
            if (newDirection === currentDirection || "horizontal" !== newDirection && "vertical" !== newDirection) return swiper;
            swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
            swiper.emitContainerClasses();
            swiper.params.direction = newDirection;
            swiper.slides.each((slideEl => {
                if ("vertical" === newDirection) slideEl.style.width = ""; else slideEl.style.height = "";
            }));
            swiper.emit("changeDirection");
            if (needUpdate) swiper.update();
            return swiper;
        }
        changeLanguageDirection(direction) {
            const swiper = this;
            if (swiper.rtl && "rtl" === direction || !swiper.rtl && "ltr" === direction) return;
            swiper.rtl = "rtl" === direction;
            swiper.rtlTranslate = "horizontal" === swiper.params.direction && swiper.rtl;
            if (swiper.rtl) {
                swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "rtl";
            } else {
                swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "ltr";
            }
            swiper.update();
        }
        mount(el) {
            const swiper = this;
            if (swiper.mounted) return true;
            const $el = dom(el || swiper.params.el);
            el = $el[0];
            if (!el) return false;
            el.swiper = swiper;
            const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
            const getWrapper = () => {
                if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                    const res = dom(el.shadowRoot.querySelector(getWrapperSelector()));
                    res.children = options => $el.children(options);
                    return res;
                }
                if (!$el.children) return dom($el).children(getWrapperSelector());
                return $el.children(getWrapperSelector());
            };
            let $wrapperEl = getWrapper();
            if (0 === $wrapperEl.length && swiper.params.createElements) {
                const document = ssr_window_esm_getDocument();
                const wrapper = document.createElement("div");
                $wrapperEl = dom(wrapper);
                wrapper.className = swiper.params.wrapperClass;
                $el.append(wrapper);
                $el.children(`.${swiper.params.slideClass}`).each((slideEl => {
                    $wrapperEl.append(slideEl);
                }));
            }
            Object.assign(swiper, {
                $el,
                el,
                $wrapperEl,
                wrapperEl: $wrapperEl[0],
                mounted: true,
                rtl: "rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction"),
                rtlTranslate: "horizontal" === swiper.params.direction && ("rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction")),
                wrongRTL: "-webkit-box" === $wrapperEl.css("display")
            });
            return true;
        }
        init(el) {
            const swiper = this;
            if (swiper.initialized) return swiper;
            const mounted = swiper.mount(el);
            if (false === mounted) return swiper;
            swiper.emit("beforeInit");
            if (swiper.params.breakpoints) swiper.setBreakpoint();
            swiper.addClasses();
            if (swiper.params.loop) swiper.loopCreate();
            swiper.updateSize();
            swiper.updateSlides();
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
            if (swiper.params.preloadImages) swiper.preloadImages();
            if (swiper.params.loop) swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
            swiper.attachEvents();
            swiper.initialized = true;
            swiper.emit("init");
            swiper.emit("afterInit");
            return swiper;
        }
        destroy(deleteInstance = true, cleanStyles = true) {
            const swiper = this;
            const {params, $el, $wrapperEl, slides} = swiper;
            if ("undefined" === typeof swiper.params || swiper.destroyed) return null;
            swiper.emit("beforeDestroy");
            swiper.initialized = false;
            swiper.detachEvents();
            if (params.loop) swiper.loopDestroy();
            if (cleanStyles) {
                swiper.removeClasses();
                $el.removeAttr("style");
                $wrapperEl.removeAttr("style");
                if (slides && slides.length) slides.removeClass([ params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
            }
            swiper.emit("destroy");
            Object.keys(swiper.eventsListeners).forEach((eventName => {
                swiper.off(eventName);
            }));
            if (false !== deleteInstance) {
                swiper.$el[0].swiper = null;
                deleteProps(swiper);
            }
            swiper.destroyed = true;
            return null;
        }
        static extendDefaults(newDefaults) {
            utils_extend(extendedDefaults, newDefaults);
        }
        static get extendedDefaults() {
            return extendedDefaults;
        }
        static get defaults() {
            return defaults;
        }
        static installModule(mod) {
            if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
            const modules = Swiper.prototype.__modules__;
            if ("function" === typeof mod && modules.indexOf(mod) < 0) modules.push(mod);
        }
        static use(module) {
            if (Array.isArray(module)) {
                module.forEach((m => Swiper.installModule(m)));
                return Swiper;
            }
            Swiper.installModule(module);
            return Swiper;
        }
    }
    Object.keys(prototypes).forEach((prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }));
    }));
    Swiper.use([ Resize, Observer ]);
    const core = Swiper;
    function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
        const document = ssr_window_esm_getDocument();
        if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
            if (!params[key] && true === params.auto) {
                let element = swiper.$el.children(`.${checkProps[key]}`)[0];
                if (!element) {
                    element = document.createElement("div");
                    element.className = checkProps[key];
                    swiper.$el.append(element);
                }
                params[key] = element;
                originalParams[key] = element;
            }
        }));
        return params;
    }
    function Navigation({swiper, extendParams, on, emit}) {
        extendParams({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: false,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        });
        swiper.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null
        };
        function getEl(el) {
            let $el;
            if (el) {
                $el = dom(el);
                if (swiper.params.uniqueNavElements && "string" === typeof el && $el.length > 1 && 1 === swiper.$el.find(el).length) $el = swiper.$el.find(el);
            }
            return $el;
        }
        function toggleEl($el, disabled) {
            const params = swiper.params.navigation;
            if ($el && $el.length > 0) {
                $el[disabled ? "addClass" : "removeClass"](params.disabledClass);
                if ($el[0] && "BUTTON" === $el[0].tagName) $el[0].disabled = disabled;
                if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
            }
        }
        function update() {
            if (swiper.params.loop) return;
            const {$nextEl, $prevEl} = swiper.navigation;
            toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
            toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
        }
        function onPrevClick(e) {
            e.preventDefault();
            if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slidePrev();
            emit("navigationPrev");
        }
        function onNextClick(e) {
            e.preventDefault();
            if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slideNext();
            emit("navigationNext");
        }
        function init() {
            const params = swiper.params.navigation;
            swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            });
            if (!(params.nextEl || params.prevEl)) return;
            const $nextEl = getEl(params.nextEl);
            const $prevEl = getEl(params.prevEl);
            if ($nextEl && $nextEl.length > 0) $nextEl.on("click", onNextClick);
            if ($prevEl && $prevEl.length > 0) $prevEl.on("click", onPrevClick);
            Object.assign(swiper.navigation, {
                $nextEl,
                nextEl: $nextEl && $nextEl[0],
                $prevEl,
                prevEl: $prevEl && $prevEl[0]
            });
            if (!swiper.enabled) {
                if ($nextEl) $nextEl.addClass(params.lockClass);
                if ($prevEl) $prevEl.addClass(params.lockClass);
            }
        }
        function destroy() {
            const {$nextEl, $prevEl} = swiper.navigation;
            if ($nextEl && $nextEl.length) {
                $nextEl.off("click", onNextClick);
                $nextEl.removeClass(swiper.params.navigation.disabledClass);
            }
            if ($prevEl && $prevEl.length) {
                $prevEl.off("click", onPrevClick);
                $prevEl.removeClass(swiper.params.navigation.disabledClass);
            }
        }
        on("init", (() => {
            if (false === swiper.params.navigation.enabled) disable(); else {
                init();
                update();
            }
        }));
        on("toEdge fromEdge lock unlock", (() => {
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            const {$nextEl, $prevEl} = swiper.navigation;
            if ($nextEl) $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
            if ($prevEl) $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
        }));
        on("click", ((_s, e) => {
            const {$nextEl, $prevEl} = swiper.navigation;
            const targetEl = e.target;
            if (swiper.params.navigation.hideOnClick && !dom(targetEl).is($prevEl) && !dom(targetEl).is($nextEl)) {
                if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                let isHidden;
                if ($nextEl) isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass); else if ($prevEl) isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
                if (true === isHidden) emit("navigationShow"); else emit("navigationHide");
                if ($nextEl) $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
                if ($prevEl) $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
            }
        }));
        const enable = () => {
            swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);
            init();
            update();
        };
        const disable = () => {
            swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);
            destroy();
        };
        Object.assign(swiper.navigation, {
            enable,
            disable,
            update,
            init,
            destroy
        });
    }
    function classes_to_selector_classesToSelector(classes = "") {
        return `.${classes.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function Pagination({swiper, extendParams, on, emit}) {
        const pfx = "swiper-pagination";
        extendParams({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: false,
                hideOnClick: false,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: false,
                type: "bullets",
                dynamicBullets: false,
                dynamicMainBullets: 1,
                formatFractionCurrent: number => number,
                formatFractionTotal: number => number,
                bulletClass: `${pfx}-bullet`,
                bulletActiveClass: `${pfx}-bullet-active`,
                modifierClass: `${pfx}-`,
                currentClass: `${pfx}-current`,
                totalClass: `${pfx}-total`,
                hiddenClass: `${pfx}-hidden`,
                progressbarFillClass: `${pfx}-progressbar-fill`,
                progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                clickableClass: `${pfx}-clickable`,
                lockClass: `${pfx}-lock`,
                horizontalClass: `${pfx}-horizontal`,
                verticalClass: `${pfx}-vertical`,
                paginationDisabledClass: `${pfx}-disabled`
            }
        });
        swiper.pagination = {
            el: null,
            $el: null,
            bullets: []
        };
        let bulletSize;
        let dynamicBulletIndex = 0;
        function isPaginationDisabled() {
            return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || 0 === swiper.pagination.$el.length;
        }
        function setSideBullets($bulletEl, position) {
            const {bulletActiveClass} = swiper.params.pagination;
            $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
        }
        function update() {
            const rtl = swiper.rtl;
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            const $el = swiper.pagination.$el;
            let current;
            const total = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
            if (swiper.params.loop) {
                current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
                if (current > slidesLength - 1 - 2 * swiper.loopedSlides) current -= slidesLength - 2 * swiper.loopedSlides;
                if (current > total - 1) current -= total;
                if (current < 0 && "bullets" !== swiper.params.paginationType) current = total + current;
            } else if ("undefined" !== typeof swiper.snapIndex) current = swiper.snapIndex; else current = swiper.activeIndex || 0;
            if ("bullets" === params.type && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                const bullets = swiper.pagination.bullets;
                let firstIndex;
                let lastIndex;
                let midIndex;
                if (params.dynamicBullets) {
                    bulletSize = bullets.eq(0)[swiper.isHorizontal() ? "outerWidth" : "outerHeight"](true);
                    $el.css(swiper.isHorizontal() ? "width" : "height", `${bulletSize * (params.dynamicMainBullets + 4)}px`);
                    if (params.dynamicMainBullets > 1 && void 0 !== swiper.previousIndex) {
                        dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);
                        if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                    }
                    firstIndex = Math.max(current - dynamicBulletIndex, 0);
                    lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                    midIndex = (lastIndex + firstIndex) / 2;
                }
                bullets.removeClass([ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)).join(" "));
                if ($el.length > 1) bullets.each((bullet => {
                    const $bullet = dom(bullet);
                    const bulletIndex = $bullet.index();
                    if (bulletIndex === current) $bullet.addClass(params.bulletActiveClass);
                    if (params.dynamicBullets) {
                        if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) $bullet.addClass(`${params.bulletActiveClass}-main`);
                        if (bulletIndex === firstIndex) setSideBullets($bullet, "prev");
                        if (bulletIndex === lastIndex) setSideBullets($bullet, "next");
                    }
                })); else {
                    const $bullet = bullets.eq(current);
                    const bulletIndex = $bullet.index();
                    $bullet.addClass(params.bulletActiveClass);
                    if (params.dynamicBullets) {
                        const $firstDisplayedBullet = bullets.eq(firstIndex);
                        const $lastDisplayedBullet = bullets.eq(lastIndex);
                        for (let i = firstIndex; i <= lastIndex; i += 1) bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
                        if (swiper.params.loop) if (bulletIndex >= bullets.length) {
                            for (let i = params.dynamicMainBullets; i >= 0; i -= 1) bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                            bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                        } else {
                            setSideBullets($firstDisplayedBullet, "prev");
                            setSideBullets($lastDisplayedBullet, "next");
                        } else {
                            setSideBullets($firstDisplayedBullet, "prev");
                            setSideBullets($lastDisplayedBullet, "next");
                        }
                    }
                }
                if (params.dynamicBullets) {
                    const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                    const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                    const offsetProp = rtl ? "right" : "left";
                    bullets.css(swiper.isHorizontal() ? offsetProp : "top", `${bulletsOffset}px`);
                }
            }
            if ("fraction" === params.type) {
                $el.find(classes_to_selector_classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
                $el.find(classes_to_selector_classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
            }
            if ("progressbar" === params.type) {
                let progressbarDirection;
                if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                const scale = (current + 1) / total;
                let scaleX = 1;
                let scaleY = 1;
                if ("horizontal" === progressbarDirection) scaleX = scale; else scaleY = scale;
                $el.find(classes_to_selector_classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
            }
            if ("custom" === params.type && params.renderCustom) {
                $el.html(params.renderCustom(swiper, current + 1, total));
                emit("paginationRender", $el[0]);
            } else emit("paginationUpdate", $el[0]);
            if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
        }
        function render() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            const $el = swiper.pagination.$el;
            let paginationHTML = "";
            if ("bullets" === params.type) {
                let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
                $el.html(paginationHTML);
                swiper.pagination.bullets = $el.find(classes_to_selector_classesToSelector(params.bulletClass));
            }
            if ("fraction" === params.type) {
                if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
                $el.html(paginationHTML);
            }
            if ("progressbar" === params.type) {
                if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
                $el.html(paginationHTML);
            }
            if ("custom" !== params.type) emit("paginationRender", swiper.pagination.$el[0]);
        }
        function init() {
            swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                el: "swiper-pagination"
            });
            const params = swiper.params.pagination;
            if (!params.el) return;
            let $el = dom(params.el);
            if (0 === $el.length) return;
            if (swiper.params.uniqueNavElements && "string" === typeof params.el && $el.length > 1) {
                $el = swiper.$el.find(params.el);
                if ($el.length > 1) $el = $el.filter((el => {
                    if (dom(el).parents(".swiper")[0] !== swiper.el) return false;
                    return true;
                }));
            }
            if ("bullets" === params.type && params.clickable) $el.addClass(params.clickableClass);
            $el.addClass(params.modifierClass + params.type);
            $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            if ("bullets" === params.type && params.dynamicBullets) {
                $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
                dynamicBulletIndex = 0;
                if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
            }
            if ("progressbar" === params.type && params.progressbarOpposite) $el.addClass(params.progressbarOppositeClass);
            if (params.clickable) $el.on("click", classes_to_selector_classesToSelector(params.bulletClass), (function onClick(e) {
                e.preventDefault();
                let index = dom(this).index() * swiper.params.slidesPerGroup;
                if (swiper.params.loop) index += swiper.loopedSlides;
                swiper.slideTo(index);
            }));
            Object.assign(swiper.pagination, {
                $el,
                el: $el[0]
            });
            if (!swiper.enabled) $el.addClass(params.lockClass);
        }
        function destroy() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const $el = swiper.pagination.$el;
            $el.removeClass(params.hiddenClass);
            $el.removeClass(params.modifierClass + params.type);
            $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);
            if (params.clickable) $el.off("click", classes_to_selector_classesToSelector(params.bulletClass));
        }
        on("init", (() => {
            if (false === swiper.params.pagination.enabled) disable(); else {
                init();
                render();
                update();
            }
        }));
        on("activeIndexChange", (() => {
            if (swiper.params.loop) update(); else if ("undefined" === typeof swiper.snapIndex) update();
        }));
        on("snapIndexChange", (() => {
            if (!swiper.params.loop) update();
        }));
        on("slidesLengthChange", (() => {
            if (swiper.params.loop) {
                render();
                update();
            }
        }));
        on("snapGridLengthChange", (() => {
            if (!swiper.params.loop) {
                render();
                update();
            }
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            const {$el} = swiper.pagination;
            if ($el) $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.pagination.lockClass);
        }));
        on("lock unlock", (() => {
            update();
        }));
        on("click", ((_s, e) => {
            const targetEl = e.target;
            const {$el} = swiper.pagination;
            if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el && $el.length > 0 && !dom(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
                if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);
                if (true === isHidden) emit("paginationShow"); else emit("paginationHide");
                $el.toggleClass(swiper.params.pagination.hiddenClass);
            }
        }));
        const enable = () => {
            swiper.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
            if (swiper.pagination.$el) swiper.pagination.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
            init();
            render();
            update();
        };
        const disable = () => {
            swiper.$el.addClass(swiper.params.pagination.paginationDisabledClass);
            if (swiper.pagination.$el) swiper.pagination.$el.addClass(swiper.params.pagination.paginationDisabledClass);
            destroy();
        };
        Object.assign(swiper.pagination, {
            enable,
            disable,
            render,
            update,
            init,
            destroy
        });
    }
    function create_shadow_createShadow(params, $slideEl, side) {
        const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ""}`;
        const $shadowContainer = params.transformEl ? $slideEl.find(params.transformEl) : $slideEl;
        let $shadowEl = $shadowContainer.children(`.${shadowClass}`);
        if (!$shadowEl.length) {
            $shadowEl = dom(`<div class="swiper-slide-shadow${side ? `-${side}` : ""}"></div>`);
            $shadowContainer.append($shadowEl);
        }
        return $shadowEl;
    }
    function effect_init_effectInit(params) {
        const {effect, swiper, on, setTranslate, setTransition, overwriteParams, perspective, recreateShadows, getEffectParams} = params;
        on("beforeInit", (() => {
            if (swiper.params.effect !== effect) return;
            swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
            if (perspective && perspective()) swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
            const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
            Object.assign(swiper.params, overwriteParamsResult);
            Object.assign(swiper.originalParams, overwriteParamsResult);
        }));
        on("setTranslate", (() => {
            if (swiper.params.effect !== effect) return;
            setTranslate();
        }));
        on("setTransition", ((_s, duration) => {
            if (swiper.params.effect !== effect) return;
            setTransition(duration);
        }));
        on("transitionEnd", (() => {
            if (swiper.params.effect !== effect) return;
            if (recreateShadows) {
                if (!getEffectParams || !getEffectParams().slideShadows) return;
                swiper.slides.each((slideEl => {
                    const $slideEl = swiper.$(slideEl);
                    $slideEl.find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove();
                }));
                recreateShadows();
            }
        }));
        let requireUpdateOnVirtual;
        on("virtualUpdate", (() => {
            if (swiper.params.effect !== effect) return;
            if (!swiper.slides.length) requireUpdateOnVirtual = true;
            requestAnimationFrame((() => {
                if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
                    setTranslate();
                    requireUpdateOnVirtual = false;
                }
            }));
        }));
    }
    function effect_target_effectTarget(effectParams, $slideEl) {
        if (effectParams.transformEl) return $slideEl.find(effectParams.transformEl).css({
            "backface-visibility": "hidden",
            "-webkit-backface-visibility": "hidden"
        });
        return $slideEl;
    }
    function effect_virtual_transition_end_effectVirtualTransitionEnd({swiper, duration, transformEl, allSlides}) {
        const {slides, activeIndex, $wrapperEl} = swiper;
        if (swiper.params.virtualTranslate && 0 !== duration) {
            let eventTriggered = false;
            let $transitionEndTarget;
            if (allSlides) $transitionEndTarget = transformEl ? slides.find(transformEl) : slides; else $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides.eq(activeIndex);
            $transitionEndTarget.transitionEnd((() => {
                if (eventTriggered) return;
                if (!swiper || swiper.destroyed) return;
                eventTriggered = true;
                swiper.animating = false;
                const triggerEvents = [ "webkitTransitionEnd", "transitionend" ];
                for (let i = 0; i < triggerEvents.length; i += 1) $wrapperEl.trigger(triggerEvents[i]);
            }));
        }
    }
    function EffectCards({swiper, extendParams, on}) {
        extendParams({
            cardsEffect: {
                slideShadows: true,
                transformEl: null,
                rotate: true,
                perSlideRotate: 2,
                perSlideOffset: 8
            }
        });
        const setTranslate = () => {
            const {slides, activeIndex} = swiper;
            const params = swiper.params.cardsEffect;
            const {startTranslate, isTouched} = swiper.touchEventsData;
            const currentTranslate = swiper.translate;
            for (let i = 0; i < slides.length; i += 1) {
                const $slideEl = slides.eq(i);
                const slideProgress = $slideEl[0].progress;
                const progress = Math.min(Math.max(slideProgress, -4), 4);
                let offset = $slideEl[0].swiperSlideOffset;
                if (swiper.params.centeredSlides && !swiper.params.cssMode) swiper.$wrapperEl.transform(`translateX(${swiper.minTranslate()}px)`);
                if (swiper.params.centeredSlides && swiper.params.cssMode) offset -= slides[0].swiperSlideOffset;
                let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
                let tY = 0;
                const tZ = -100 * Math.abs(progress);
                let scale = 1;
                let rotate = -params.perSlideRotate * progress;
                let tXAdd = params.perSlideOffset - .75 * Math.abs(progress);
                const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
                const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
                const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
                if (isSwipeToNext || isSwipeToPrev) {
                    const subProgress = (1 - Math.abs((Math.abs(progress) - .5) / .5)) ** .5;
                    rotate += -28 * progress * subProgress;
                    scale += -.5 * subProgress;
                    tXAdd += 96 * subProgress;
                    tY = `${-25 * subProgress * Math.abs(progress)}%`;
                }
                if (progress < 0) tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`; else if (progress > 0) tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`; else tX = `${tX}px`;
                if (!swiper.isHorizontal()) {
                    const prevY = tY;
                    tY = tX;
                    tX = prevY;
                }
                const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
                const transform = `\n        translate3d(${tX}, ${tY}, ${tZ}px)\n        rotateZ(${params.rotate ? rotate : 0}deg)\n        scale(${scaleString})\n      `;
                if (params.slideShadows) {
                    let $shadowEl = $slideEl.find(".swiper-slide-shadow");
                    if (0 === $shadowEl.length) $shadowEl = create_shadow_createShadow(params, $slideEl);
                    if ($shadowEl.length) $shadowEl[0].style.opacity = Math.min(Math.max((Math.abs(progress) - .5) / .5, 0), 1);
                }
                $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
                const $targetEl = effect_target_effectTarget(params, $slideEl);
                $targetEl.transform(transform);
            }
        };
        const setTransition = duration => {
            const {transformEl} = swiper.params.cardsEffect;
            const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
            $transitionElements.transition(duration).find(".swiper-slide-shadow").transition(duration);
            effect_virtual_transition_end_effectVirtualTransitionEnd({
                swiper,
                duration,
                transformEl
            });
        };
        effect_init_effectInit({
            effect: "cards",
            swiper,
            on,
            setTranslate,
            setTransition,
            perspective: () => true,
            overwriteParams: () => ({
                watchSlidesProgress: true,
                virtualTranslate: !swiper.params.cssMode
            })
        });
    }
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const burger = document.querySelector("[data-burger]");
    const burgerLine = document.querySelector(".burger__line");
    const mobileNav = document.querySelector("[data-nav]");
    const header = document.querySelector(".header");
    const mobilePageMenu = document.querySelectorAll(".mobile-page-menu");
    const accorTitle = document.querySelectorAll(".accor-title");
    const cateLeapFix = document.querySelector(".cate-leap");
    const wrapper = document.querySelector(".wrapper");
    const catLeapLi = document.querySelectorAll(".cat-leap-li");
    const menuObj = {
        openHoverMainMenu: function() {
            this.children[0].classList.add("showHide");
        },
        closeHoverMainMenu: function() {
            this.children[0].classList.remove("showHide");
        },
        burgerClose: function() {
            burger.classList.remove("burger-active");
            mobileNav.classList.remove("open-mobile");
        },
        burgerOpen: function() {
            burger.classList.toggle("burger-active");
            mobileNav.classList.toggle("open-mobile");
            topLine.classList.remove("top-line-active");
            eyeBtn.classList.remove("eyeActive");
        },
        headerResize: function() {
            const headerHeight = header.offsetHeight;
            mobileNav.style.top = `${headerHeight - 1}px`;
            if (null !== cateLeapFix) if ("fixed" === cateLeapFix.style.position) cateLeapFix.style.top = `${headerHeight + 20}px`;
        },
        resizeHideMobile: function() {
            if (document.documentElement.clientWidth > 768) menuObj.burgerClose();
            menuObj.headerResize();
        },
        openMainMenu: function() {
            const menu = document.querySelectorAll(".menu-item");
            if (menu) for (let i = 0; i < menu.length; i++) {
                let item = menu[i];
                item.addEventListener("mouseenter", menuObj.openHoverMainMenu, false);
                item.addEventListener("mouseleave", menuObj.closeHoverMainMenu, false);
            }
        }
    };
    menuObj.headerResize();
    menuObj.openMainMenu();
    window.addEventListener("resize", menuObj.resizeHideMobile, false);
    window.addEventListener("load", menuObj.resizeHideMobile, false);
    burger.addEventListener("click", menuObj.burgerOpen, false);
    function mobileAccor() {
        const accors = document.querySelectorAll(".accor");
        document.querySelectorAll(".accor-content");
        accors.forEach((el => {
            el.addEventListener("click", (e => {
                const accorIcons = document.querySelectorAll(".accor-icon");
                const self = e.currentTarget.children[1].classList;
                const rotateArrow = e.currentTarget.children[0].children[1].children[0].classList;
                accorIcons.forEach((icon => {
                    icon.children[0].classList.remove("open-accor");
                }));
                if (!e.currentTarget.children[1].classList.contains("open-accor")) {
                    self.add("open-accor");
                    rotateArrow.add("open-accor");
                } else if (e.currentTarget.children[1].classList.contains("open-accor")) {
                    rotateArrow.remove("open-accor");
                    self.remove("open-accor");
                }
            }));
        }));
    }
    mobileAccor();
    const container = document.querySelector(".header__container");
    const search = document.querySelector(".search-btn");
    const topLineObj = {
        searchTranslate: function() {
            if (search.style.transform) search.style.transform = `translateX(-${search.offsetLeft - 15}px)`;
            return container.offsetWidth;
        },
        showTopInput: function() {
            search.style.transform = `translateX(-${search.offsetLeft - 15}px)`;
            input.classList.add("inputActive");
            setTimeout((() => {
                input.focus();
            }), 500);
        },
        hideTopInput: function() {
            setTimeout((() => {
                input.value = "", 0;
            }));
            search.style.removeProperty("transform");
            input.classList.remove("inputActive");
        },
        closeSearch: function() {
            search.style.removeProperty("transform");
            input.classList.remove("inputActive");
            setTimeout((() => {
                input.value = "", 300;
            }));
        }
    };
    const left = () => {
        window.addEventListener("resize", topLineObj.searchTranslate, false);
    };
    left();
    const input = document.querySelector("#input-top");
    function searchTranslate() {
        search.addEventListener("click", (e => {
            if (!search.style.transform) topLineObj.showTopInput(); else topLineObj.hideTopInput();
        }));
    }
    window.addEventListener("click", (e => {
        if (!e.target.closest(".search-btn") && e.target !== input) topLineObj.closeSearch();
    }));
    window.addEventListener("keydown", (e => {
        if ("Escape" === e.key) topLineObj.closeSearch();
    }));
    searchTranslate();
    const widthProgResize = () => {
        if (educationH3) window.addEventListener("resize", (e => educationH3.offsetWidth + "px"));
    };
    const widthEducationTable = () => {
        const educationH3 = document.querySelector("#educationH3");
        const periodEducation = document.querySelectorAll(".ourWidth-education");
        if (educationH3 && periodEducation) for (let i = 0; i < periodEducation.length; i++) {
            const element = periodEducation[i];
            element.style.width = widthProgResize();
        }
    };
    widthEducationTable();
    document.querySelectorAll(".btn-education-accor").forEach((e => {
        e.addEventListener("click", btnAccorEducationOpen, false);
    }));
    function btnAccorEducationOpen() {
        const accor = this.nextElementSibling;
        const content = this.nextElementSibling.children[0];
        if (content) if (!accor.classList.contains("education-accor-active")) {
            accor.classList.add("education-accor-active");
            content.classList.add("educationContentAccor");
            this.classList.add("btn-education-radio");
            this.children[0].children[1].style.transform = "rotate(-180deg)";
        } else {
            accor.classList.remove("education-accor-active");
            content.classList.remove("educationContentAccor");
            setTimeout((() => {
                this.children[0].children[1].style.transform = "rotate(0deg)";
            }), 210);
            setTimeout((() => {
                this.classList.remove("btn-education-radio");
            }), 310);
        }
    }
    window.addEventListener("load", (e => {
        heightHours();
    }));
    window.addEventListener("resize", (e => {
        heightHours();
    }));
    const heightHours = () => {
        const progTable = document.querySelector(".prog-table");
        if (progTable) {
            const tableList1 = document.querySelector(".prof-table-list-1").offsetHeight;
            const tableList2 = document.querySelector(".prof-table-list-2").offsetHeight;
            const tableList3 = document.querySelector(".prof-table-list-3").offsetHeight;
            const tableList4 = document.querySelector(".prof-table-list-4").offsetHeight;
            const tableList5 = document.querySelector(".prof-table-list-5").offsetHeight;
            const tableList6 = document.querySelector(".prof-table-list-6").offsetHeight;
            const tableList7 = document.querySelector(".prof-table-list-7").offsetHeight;
            document.querySelector(".prof-table-hours-1").style.height = tableList1 + "px";
            document.querySelector(".prof-table-hours-2").style.height = tableList2 + "px";
            document.querySelector(".prof-table-hours-3").style.height = tableList3 + "px";
            document.querySelector(".prof-table-hours-4").style.height = tableList4 + "px";
            document.querySelector(".prof-table-hours-5").style.height = tableList5 + "px";
            document.querySelector(".prof-table-hours-6").style.height = tableList6 + "px";
            document.querySelector(".prof-table-hours-7").style.height = tableList7 + "px";
        }
    };
    heightHours();
    const btnSelectOne = document.querySelector(".btn-select-one");
    const btnSelectTwo = document.querySelector(".btn-select-two");
    const btnSelectThree = document.querySelector(".btn-select-three");
    if (btnSelectOne) {
        btnSelectOne.addEventListener("click", openSelect, false);
        btnSelectTwo.addEventListener("click", openSelect, false);
        btnSelectThree.addEventListener("click", openSelect, false);
        function openSelect() {
            this.classList.toggle("btn-education-radio");
            this.children[0].innerHTML = arrInfoFirstSecond.select;
            if (!this.nextElementSibling.classList.contains("quarter-active")) {
                this.nextElementSibling.classList.toggle("quarter-active");
                this.children[1].style.transform = `rotate(-180deg)`;
                this.nextElementSibling.addEventListener("click", (e => {
                    this.nextElementSibling.classList.remove("quarter-active");
                    this.classList.remove("btn-education-radio");
                    this.children[1].style.transform = `rotate(0deg)`;
                }));
            } else {
                this.nextElementSibling.classList.remove("quarter-active");
                this.children[1].style.transform = `rotate(0deg)`;
            }
        }
    }
    const outputJun = document.querySelector(".output-jun-first");
    const outputSin = document.querySelector(".output-sin-first");
    const outputJunSecond = document.querySelector(".output-jun-second");
    const outputSinSecond = document.querySelector(".output-sin-second");
    const outputJunThird = document.querySelector(".output-jun-third");
    const outputSinThird = document.querySelector(".output-sin-third");
    document.querySelectorAll(".table-quarter");
    const tableIf = document.querySelectorAll(".education-tables__table");
    const arrInfoFirstSecond = {
        one: "01.09 - 26.10 (8 уч. недель)",
        oneTitle: "1 четверть",
        two: "07.11 - 24.12 (7 уч. недель)",
        twoTitle: "2 четверть",
        three: "09.01 - 04.03 (8 уч. недель)",
        threeTitle: "3 четверть",
        four: "13.03 - 27.05 (11 уч. недель)",
        fourTitle: "4 четверть",
        pa: "29.05 - 10.06 (2 уч. недель)",
        paTwo: "15.05 - 20.05 (1 уч. недель)",
        paTitle: "ПА",
        select: "Период",
        sinOne: "01.09 - 26.10 (8 уч. недель)",
        sinTwo: "07.11 - 24.12 (7 уч. недель)",
        sinThree: "09.01 - 04.03 (8 уч. недель)",
        sinFour: "13.03 - 13.05 (9 уч. недель)",
        oneSecond: "01.09 - 24.12 (15 уч. недель)",
        oneTitleSecond: "1 полугодие",
        twoSecond: "09.01 - 27.05 (19 уч. недель)",
        twoTitleSecond: "2 полугодие",
        sinOneSecond: "01.09 - 24.12 (15 уч. недель)",
        sinTwoSecond: "09.01 - 13.05 (17 уч. недель)",
        seasonFirst: "27.10 - 06.11 (11 дней)",
        sinSeasonFirst: "27.10 - 06.11 (11 дней)",
        seasonFirstTitle: "Осенние",
        seasonSecond: "25.12 - 08.01 (15 дней)",
        sinSeasonSecond: "25.12 - 08.01 (15 дней)",
        seasonSecondTitle: "Зимние",
        seasonThird: "05.03 - 12.03 (8 дней)",
        sinSeasonThird: "05.03 - 12.03 (8 дней)",
        seasonThirdTitle: "Весенние",
        seasonFourth: "11.06 - 31.08 (82 дня)",
        sinSeasonFourth: "ГИА",
        seasonFourthTitle: "Летние"
    };
    const dateObj = {
        currentDate: new Date,
        startFirstQuarter: new Date("2022-09-01"),
        endFirstQuarter: new Date("2022-10-26"),
        startSecondQuarter: new Date("2022-10-07"),
        endSecondQuarter: new Date("2022-12-24"),
        startThirdQuarter: new Date("2022-12-24"),
        endThirdQuarter: new Date("2023-03-04"),
        startFourthQuarter: new Date("2023-03-04"),
        endFourthQuarter: new Date("2023-05-27"),
        teachersExpYears2023: new Date(2023, 9, 1, 0, 0),
        teachersExpYears2024: new Date(2024, 9, 1, 0, 0),
        teachersExpYears2025: new Date(2025, 9, 1, 0, 0),
        teachersExpYears2026: new Date(2026, 9, 1, 0, 0),
        teachersExpYears2027: new Date(2027, 9, 1, 0, 0),
        teachersExpYears2028: new Date(2028, 9, 1, 0, 0),
        teachersExpYears2029: new Date(2029, 9, 1, 0, 0),
        teachersExpYears2030: new Date(2030, 9, 1, 0, 0),
        teachersExpYears2031: new Date(2031, 9, 1, 0, 0),
        teachersExpYears2032: new Date(2032, 9, 1, 0, 0)
    };
    const showTableInQuarter = () => {
        if (tableIf.length > 0) {
            if (new Date >= dateObj.startFirstQuarter && new Date <= dateObj.endFirstQuarter) {
                console.log("work?");
                outputJun.innerHTML = arrInfoFirstSecond.one;
                outputSin.innerHTML = arrInfoFirstSecond.sinOne;
                btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.oneTitle;
                outputJunSecond.innerHTML = arrInfoFirstSecond.oneSecond;
                outputSinSecond.innerHTML = arrInfoFirstSecond.sinOneSecond;
                btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.oneTitleSecond;
            } else if (dateObj.currentDate >= dateObj.startSecondQuarter && dateObj.currentDate <= dateObj.endSecondQuarter) {
                console.log("work?");
                outputJun.innerHTML = arrInfoFirstSecond.two;
                outputSin.innerHTML = arrInfoFirstSecond.sinTwo;
                btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.twoTitle;
                outputJunSecond.innerHTML = arrInfoFirstSecond.oneSecond;
                outputSinSecond.innerHTML = arrInfoFirstSecond.sinOneSecond;
                btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.oneTitleSecond;
                outputJunThird.innerHTML = arrInfoFirstSecond.seasonFirst;
                outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFirst;
                btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonFirstTitle;
            }
            console.log(dateObj.currentDate <= dateObj.endThirdQuarter);
            if (dateObj.currentDate >= dateObj.startThirdQuarter && dateObj.currentDate <= dateObj.endThirdQuarter) {
                console.log("work?");
                outputJun.innerHTML = arrInfoFirstSecond.three;
                outputSin.innerHTML = arrInfoFirstSecond.sinThree;
                btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.threeTitle;
                outputJunThird.innerHTML = arrInfoFirstSecond.seasonSecond;
                outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonSecond;
                btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonSecondTitle;
                outputJunSecond.innerHTML = arrInfoFirstSecond.twoSecond;
                outputSinSecond.innerHTML = arrInfoFirstSecond.sinTwoSecond;
                btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.twoTitleSecond;
                outputJunThird.innerHTML = arrInfoFirstSecond.seasonThird;
                outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonThird;
                btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonThirdTitle;
            } else if (new Date >= dateObj.startFourthQuarter && new Date <= dateObj.endFourthQuarter) {
                console.log("work?");
                outputJun.innerHTML = arrInfoFirstSecond.four;
                outputSin.innerHTML = arrInfoFirstSecond.sinFour;
                btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.fourTitle;
                outputJunSecond.innerHTML = arrInfoFirstSecond.twoSecond;
                outputSinSecond.innerHTML = arrInfoFirstSecond.sinTwoSecond;
                btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.twoTitleSecond;
                outputJunThird.innerHTML = arrInfoFirstSecond.seasonFirst;
                outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFourth;
                btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonFourthTitle;
            }
        }
    };
    showTableInQuarter();
    document.querySelectorAll(".li-select").forEach((e => e.addEventListener("click", (function(event) {
        if (event.target.contains(document.getElementById("quarter-li-1"))) {
            outputJun.innerHTML = arrInfoFirstSecond.one;
            outputSin.innerHTML = arrInfoFirstSecond.sinOne;
            btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.oneTitle;
        } else if (event.target.contains(document.getElementById("quarter-li-2"))) {
            outputJun.innerHTML = arrInfoFirstSecond.two;
            outputSin.innerHTML = arrInfoFirstSecond.sinTwo;
            btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.twoTitle;
        } else if (event.target.contains(document.getElementById("quarter-li-3"))) {
            outputJun.innerHTML = arrInfoFirstSecond.three;
            outputSin.innerHTML = arrInfoFirstSecond.sinThree;
            btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.threeTitle;
        } else if (event.target.contains(document.getElementById("quarter-li-4"))) {
            outputJun.innerHTML = arrInfoFirstSecond.four;
            outputSin.innerHTML = arrInfoFirstSecond.sinFour;
            btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.fourTitle;
        } else if (event.target.contains(document.getElementById("quarter-li-5"))) {
            outputJun.innerHTML = arrInfoFirstSecond.pa;
            outputSin.innerHTML = arrInfoFirstSecond.paTwo;
            btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.paTitle;
        }
        if (event.target.contains(document.getElementById("quarter-li-1-second"))) {
            outputJunSecond.innerHTML = arrInfoFirstSecond.oneSecond;
            outputSinSecond.innerHTML = arrInfoFirstSecond.sinOneSecond;
            btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.oneTitleSecond;
        } else if (event.target.contains(document.getElementById("quarter-li-2-second"))) {
            outputJunSecond.innerHTML = arrInfoFirstSecond.twoSecond;
            outputSinSecond.innerHTML = arrInfoFirstSecond.sinTwoSecond;
            btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.twoTitleSecond;
        } else if (event.target.contains(document.getElementById("quarter-li-3-second"))) {
            outputJunSecond.innerHTML = arrInfoFirstSecond.pa;
            outputSinSecond.innerHTML = arrInfoFirstSecond.paTwo;
            btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.paTitle;
        }
        if (event.target.contains(document.getElementById("quarter-li-1-third"))) {
            outputJunThird.innerHTML = arrInfoFirstSecond.seasonFirst;
            outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFirst;
            btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonFirstTitle;
        } else if (event.target.contains(document.getElementById("quarter-li-2-third"))) {
            outputJunThird.innerHTML = arrInfoFirstSecond.seasonSecond;
            outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonSecond;
            btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonSecondTitle;
        } else if (event.target.contains(document.getElementById("quarter-li-3-third"))) {
            outputJunThird.innerHTML = arrInfoFirstSecond.seasonThird;
            outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonThird;
            btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonThirdTitle;
        } else if (event.target.contains(document.getElementById("quarter-li-4-third"))) {
            outputJunThird.innerHTML = arrInfoFirstSecond.seasonFourth;
            outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFourth;
            btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonFourthTitle;
        }
    }))));
    const endYears = {
        let: "лет",
        goda: "года",
        god: "год"
    };
    function changeExp() {
        let workExp = document.querySelectorAll(".expTeach");
        let yearExpCounter = workExp[0].textContent.split(" ")[0];
        yearExpCounter = String(Number(yearExpCounter) + 1);
        let yearExpArray = new Array(yearExpCounter)[0].split("");
        let lastComparsion = yearExpCounter[yearExpArray.length - 1];
        if (yearExpCounter >= 5 && yearExpCounter <= 20 || lastComparsion >= 5 && lastComparsion <= 9 || 0 == lastComparsion) return workExp[0].textContent = `${yearExpCounter} ${endYears.let}`;
        if (2 == lastComparsion || 3 == lastComparsion || 4 == lastComparsion) workExp[0].textContent = `${yearExpCounter} ${endYears.goda}`;
        if (1 == lastComparsion) workExp[0].textContent = `${yearExpCounter} ${endYears.god}`;
    }
    function changeExpSec() {
        let workExpSec = document.querySelectorAll(".expTeachSec");
        let yearExpCounterSec = workExpSec[0].textContent.split(" ")[0];
        yearExpCounterSec = String(Number(yearExpCounterSec) + 1);
        let yearExpArraySec = new Array(yearExpCounterSec)[0].split("");
        let lastComparsionSec = yearExpCounterSec[yearExpArraySec.length - 1];
        if (yearExpCounterSec >= 5 && yearExpCounterSec <= 20 || lastComparsionSec >= 5 && lastComparsionSec <= 9 || 0 == lastComparsionSec) return workExpSec[0].textContent = `${yearExpCounterSec} ${endYears.let}`;
        if (2 == lastComparsionSec || 3 == lastComparsionSec || 4 == lastComparsionSec) workExpSec[0].textContent = `${yearExpCounterSec} ${endYears.goda}`;
        if (1 == lastComparsionSec) workExpSec[0].textContent = `${yearExpCounterSec} ${endYears.god}`;
    }
    if (dateObj.currentDate > dateObj.teachersExpYears2023) {
        changeExp();
        changeExpSec();
    }
    if (dateObj.currentDate > dateObj.teachersExpYears2024) {
        changeExp();
        changeExpSec();
    }
    if (dateObj.currentDate > dateObj.teachersExpYears2025) {
        changeExp();
        changeExpSec();
    }
    if (dateObj.currentDate > dateObj.teachersExpYears2026) {
        changeExp();
        changeExpSec();
    }
    if (dateObj.currentDate > dateObj.teachersExpYears2027) {
        changeExp();
        changeExpSec();
    }
    if (dateObj.currentDate > dateObj.teachersExpYears2028) {
        changeExp();
        changeExpSec();
    }
    if (dateObj.currentDate > dateObj.teachersExpYears2029) {
        changeExp();
        changeExpSec();
    }
    if (dateObj.currentDate > dateObj.teachersExpYears2030) {
        changeExp();
        changeExpSec();
    }
    if (dateObj.currentDate > dateObj.teachersExpYears2031) {
        changeExp();
        changeExpSec();
    }
    if (dateObj.currentDate > dateObj.teachersExpYears2032) {
        changeExp();
        changeExpSec();
    }
    const eyeBtn = document.querySelector(".buttom-top-eye");
    const topLine = document.querySelector(".header__top-line");
    eyeBtn.addEventListener("click", (e => {
        menuObj.burgerClose();
        topLine.classList.toggle("top-line-active");
        eyeBtn.classList.toggle("eyeActive");
    }));
    window.addEventListener("scroll", (e => {
        menuObj.burgerClose();
        topLine.classList.remove("top-line-active");
        eyeBtn.classList.remove("eyeActive");
    }));
    const menuItem = document.querySelectorAll(".menu-item");
    const organizationSubs = document.querySelectorAll(".organization-subs");
    const educationTable = document.querySelectorAll(".education-tables__table");
    const educationTitles = document.querySelectorAll(".education-tables__titles");
    const educationTablesBorderLeft = document.querySelectorAll(".education-tables-border-left");
    const btnEducationAccor = document.querySelectorAll(".btn-education-accor");
    const cardTeam = document.querySelectorAll(".card-team");
    const cardTeamPosition = document.querySelectorAll(".card-team__position");
    const footerLinkChange = document.querySelectorAll(".footer-link-change");
    const boxEducationContent = document.querySelectorAll(".box-content-accor");
    const quarterMobile = document.querySelectorAll(".quarter-mobile");
    const buttonSelect = document.querySelectorAll(".button-select");
    const quarterMobileContentLi = document.querySelectorAll(".quarter-mobile-content");
    const quarterMobileContainer = document.querySelectorAll(".quarter-mobile-box__container");
    const menuHidden = document.querySelectorAll(".menu-hidden");
    const menuLinkA = document.querySelectorAll(".link-a");
    const menuLink = document.querySelectorAll(".menu-link");
    const changeHeader = document.querySelector(".header__body");
    const body = document.querySelector("main");
    const footer = document.querySelector(".footer");
    const crumbs = document.querySelector(".crumbs");
    const crumbsTitle = document.querySelectorAll(".crumbs-link");
    const mainTableBox = document.querySelector(".main-table-box");
    const progTable = document.querySelector(".prog-table");
    const mainDescription = document.querySelector(".leaders__main-description");
    const hunterSection = document.querySelector(".hunter-section");
    const hunterSectionLink = document.querySelector(".hunter-section__link");
    const organizationSvgs = document.querySelectorAll(".organization-svg");
    const organizationSvgsColor = document.querySelectorAll(".svg-footer-color");
    const footerButtons = document.querySelectorAll(".footer-buttons");
    const docSvg = document.querySelectorAll("#doc");
    const docSvgEdu = document.querySelectorAll("#doc-edu");
    const progMiddleEducation = document.querySelector(".prog-middle-education");
    const progTopList = document.querySelector(".prog-top-list");
    const progTopListBorderBottom = document.querySelectorAll(".prog-top-list-border-bottom");
    const progBottomList = document.querySelectorAll(".prog-bottom-list");
    const progBottomHours = document.querySelector(".prog-bottom-hours");
    const quarterMobileTitleClasses = document.querySelectorAll(".quarter-mobile-box__title-classes");
    const quarterMobileJun = document.querySelectorAll(".quarter-mobile-box__classes-jun");
    const quarterMobileSelect = document.querySelectorAll(".quarter-mobile-box__select");
    const mainInfoTable = document.querySelectorAll(".main-info-table");
    const mainInfoTableBorder = document.querySelectorAll(".main-table-item-border-bottom");
    const links = document.querySelectorAll("a");
    const mtoTable = document.querySelectorAll(".mto-table");
    const mtoTableItem = document.querySelectorAll(".mto-table-item");
    const mtoCountBorder = document.querySelectorAll(".mto-count-border");
    const mtoCount = document.querySelectorAll(".mto-count");
    const teachersMainPhrase = document.querySelectorAll(".teachers-main__phrase");
    const teachersPoint = document.querySelectorAll(".teachers-point");
    const teachersPosition = document.querySelectorAll(".teachers-main__position");
    const teachersRaising = document.querySelectorAll(".teachers__raising");
    const orgItems = document.querySelectorAll(".organization__items");
    const mainInfoLinks = document.querySelectorAll(".main-info-link");
    const orgSubsBorderLeft = document.querySelectorAll(".orgSubsBorderLeft");
    const orgSubsBorderTop = document.querySelectorAll(".orgSubsBorderTop");
    const arrowEducation = document.querySelectorAll("#arrow-education");
    const quarterAllOutputJun = document.querySelectorAll(".quarter-mobile-box__classes-output-jun");
    const quarterAllOutputSin = document.querySelectorAll(".quarter-mobile-box__classes-output-sin");
    const linksMiddleScreenAdded = document.querySelectorAll(".links-middle-screen__added");
    const structureBorderRight = document.querySelectorAll(".structure-border-right");
    menuLink.forEach((elem => {
        elem.classList.add("hover-add");
    }));
    const educationTablesRow1 = document.querySelectorAll(".education-tables__row-1");
    const mainInfoPseudoLeft = document.querySelectorAll(".main-table-item-pseudo-left");
    let themesNames = [];
    const hoverAdd = [ "hover-add", "hover-add-color-" ];
    const docColor = [ "doc-color-" ];
    const tasksColor = [ "tasks-color-" ];
    const pageColor = [ "page-color-" ];
    const logoArr = [ "logo-color-" ];
    const mtoCountPseudo = [ "mto-count-pdeudo-before", "mto-count-pdeudo-before-" ];
    const mainTablePseudo = [ "main-table-item-pseudo-left-add", "main-table-item-pseudo-left-add-" ];
    const quarterPseudo = [ "quarter-mobile-box__select-pseudo-before", "quarter-mobile-box__select-pseudo-before-" ];
    const arrowEdu = [ "arrow-education-" ];
    const organizationSvg = [ "organization-svg", "organization-svg-" ];
    const infraLiActive = [ "li-active", "li-active-" ];
    const beforeLiPointColor = [ "before-li-point-active", "before-li-point-active-" ];
    const progTopHoursPseudo = [ "prog-top-hours-pseudo-before", "prog-top-hours-pseudo-before-" ];
    const progProfilePseudo = [ "prog-profile-pseudo-before", "prog-profile-pseudo-before-" ];
    const burgerColor = [ "burger-test-" ];
    mainInfoPseudoLeft.forEach((e => {
        e.classList.add("main-table-item-pseudo-left-add");
    }));
    const progBoxTitle = document.querySelectorAll(".prog-box-title");
    progBoxTitle.forEach((e => {
        e.classList.add("prog-profile-pseudo-before");
    }));
    const logo = document.querySelector("#logo");
    mtoCount.forEach((elem => {
        elem.classList.add("mto-count-pdeudo-before");
    }));
    quarterMobileSelect.forEach((e => {
        e.classList.add("quarter-mobile-box__select-pseudo-before");
    }));
    quarterAllOutputJun.forEach((e => {
        e.classList.add("quarter-mobile-box__select-pseudo-before");
    }));
    quarterAllOutputSin.forEach((e => {
        e.classList.add("quarter-mobile-box__select-pseudo-before");
    }));
    const progTopHours = document.querySelectorAll(".prog-top-hours-before");
    progTopHours.forEach((e => {
        e.classList.add("prog-top-hours-pseudo-before");
    }));
    burger.classList.add("burger-test");
    const elementsReAdd = {
        mainInfoTablePseudo: elem => {
            elem.classList.remove(`${mainTablePseudo[0]}`, `${mainTablePseudo[1] + themesNames[1]}`, `${mainTablePseudo[1] + themesNames[2]}`, `${mainTablePseudo[1] + themesNames[3]}`, `${mainTablePseudo[1] + themesNames[4]}`);
            elem.classList.add(`${mainTablePseudo[1] + themesNames[0]}`);
        },
        resetMainInfoTablePseudo: elem => {
            elem.classList.remove(`${mainTablePseudo[1] + themesNames[1]}`, `${mainTablePseudo[1] + themesNames[2]}`, `${mainTablePseudo[1] + themesNames[3]}`, `${mainTablePseudo[1] + themesNames[4]}`, `${mainTablePseudo[1] + themesNames[0]}`);
            elem.classList.add(`${mainTablePseudo[0]}`);
        },
        arrowEducation: elem => {
            elem.classList.remove(`${arrowEdu[0] + themesNames[1]}`, `${arrowEdu[0] + themesNames[2]}`, `${arrowEdu[0] + themesNames[3]}`, `${arrowEdu[0] + themesNames[4]}`);
            elem.classList.add(`${arrowEdu[0] + themesNames[0]}`);
        },
        resetArrowEducation: elem => {
            elem.classList.remove(`${arrowEdu[0] + themesNames[1]}`, `${arrowEdu[0] + themesNames[2]}`, `${arrowEdu[0] + themesNames[3]}`, `${arrowEdu[0] + themesNames[4]}`, `${arrowEdu[0] + themesNames[0]}`);
        },
        quarterSelect: elem => {
            elem.classList.remove(`${quarterPseudo[0]}`, `${quarterPseudo[1] + themesNames[1]}`, `${quarterPseudo[1] + themesNames[2]}`, `${quarterPseudo[1] + themesNames[3]}`, `${quarterPseudo[1] + themesNames[4]}`);
            elem.classList.add(`${quarterPseudo[1] + themesNames[0]}`);
        },
        resetQuarterSelect: elem => {
            elem.classList.remove(`${quarterPseudo[1] + themesNames[0]}`, `${quarterPseudo[1] + themesNames[1]}`, `${quarterPseudo[1] + themesNames[2]}`, `${quarterPseudo[1] + themesNames[3]}`, `${quarterPseudo[1] + themesNames[4]}`);
            elem.classList.add(`${quarterPseudo[0]}`);
        },
        orgItemsReAdd: elem => {
            elem.style.backgroundColor = localStorage.getItem("1");
            elem.style.border = `1px solid ${localStorage.getItem("2")}`;
        },
        resetOrgItemsReAdd: elem => {
            elem.style.backgroundColor = "#DDF0F2";
            elem.style.border = `0px solid #ffffff`;
        },
        outputJunReAdd: elem => {
            elem.classList.remove(`${quarterPseudo[0]}`, `${quarterPseudo[1] + themesNames[1]}`, `${quarterPseudo[1] + themesNames[2]}`, `${quarterPseudo[1] + themesNames[3]}`, `${quarterPseudo[1] + themesNames[4]}`);
            elem.classList.add(`${quarterPseudo[1] + themesNames[0]}`);
        },
        resetOutputJunReAdd: elem => {
            elem.classList.remove(`${quarterPseudo[1] + themesNames[0]}`, `${quarterPseudo[1] + themesNames[1]}`, `${quarterPseudo[1] + themesNames[2]}`, `${quarterPseudo[1] + themesNames[3]}`, `${quarterPseudo[1] + themesNames[4]}`);
            elem.classList.add(`${quarterPseudo[0]}`);
        },
        outputSinReAdd: elem => {
            elem.classList.remove(`${quarterPseudo[0]}`, `${quarterPseudo[1] + themesNames[1]}`, `${quarterPseudo[1] + themesNames[2]}`, `${quarterPseudo[1] + themesNames[3]}`, `${quarterPseudo[1] + themesNames[4]}`);
            elem.classList.add(`${quarterPseudo[1] + themesNames[0]}`);
        },
        resetOutputSinReAdd: elem => {
            elem.classList.remove(`${quarterPseudo[1] + themesNames[0]}`, `${quarterPseudo[1] + themesNames[1]}`, `${quarterPseudo[1] + themesNames[2]}`, `${quarterPseudo[1] + themesNames[3]}`, `${quarterPseudo[1] + themesNames[4]}`);
            elem.classList.add(`${quarterPseudo[0]}`);
        },
        organizationSvgReAdd: elem => {
            elem.classList.remove(`${organizationSvg[1] + themesNames[1]}`, `${organizationSvg[1] + themesNames[2]}`, `${organizationSvg[1] + themesNames[3]}`, `${organizationSvg[1] + themesNames[4]}`);
            elem.classList.add(`${organizationSvg[1] + themesNames[0]}`);
        },
        infraLiActiveReAdd: elem => {
            elem.classList.remove(`${infraLiActive[1] + themesNames[1]}`, `${infraLiActive[1] + themesNames[2]}`, `${infraLiActive[1] + themesNames[3]}`, `${infraLiActive[1] + themesNames[4]}`);
            elem.classList.add(`${infraLiActive[1] + themesNames[0]}`);
        },
        resetInfraLiActiveReAdd: elem => {
            elem.classList.remove(`${organizationSvg[1] + themesNames[0]}`, `${infraLiActive[1] + themesNames[1]}`, `${infraLiActive[1] + themesNames[2]}`, `${infraLiActive[1] + themesNames[3]}`, `${infraLiActive[1] + themesNames[4]}`);
            elem.classList.add(`${infraLiActive[0]}`);
        },
        beforeLiPointColorReAdd: elem => {
            elem.classList.remove(`${beforeLiPointColor[0]}`, `${beforeLiPointColor[1] + themesNames[1]}`, `${beforeLiPointColor[1] + themesNames[2]}`, `${beforeLiPointColor[1] + themesNames[3]}`, `${beforeLiPointColor[1] + themesNames[4]}`);
            elem.classList.add(`${beforeLiPointColor[1] + themesNames[0]}`);
        },
        resetBeforeLiPointColorReAdd: elem => {
            elem.classList.remove(`${beforeLiPointColor[0]}`, `${beforeLiPointColor[1] + themesNames[1]}`, `${beforeLiPointColor[1] + themesNames[2]}`, `${beforeLiPointColor[1] + themesNames[3]}`, `${beforeLiPointColor[1] + themesNames[4]}`, `${beforeLiPointColor[1] + themesNames[0]}`);
        },
        resetOrganizationSvgReAdd: elem => {
            elem.classList.remove(`${organizationSvg[1] + themesNames[1]}`, `${organizationSvg[1] + themesNames[2]}`, `${organizationSvg[1] + themesNames[3]}`, `${organizationSvg[1] + themesNames[4]}`, `${organizationSvg[1] + themesNames[0]}`);
        },
        organizationSvgColorReAdd: elem => {
            elem.classList.remove(`${organizationSvg[1] + themesNames[1]}`, `${organizationSvg[1] + themesNames[2]}`, `${organizationSvg[1] + themesNames[3]}`, `${organizationSvg[1] + themesNames[4]}`);
            elem.classList.add(`${organizationSvg[1] + themesNames[0]}`);
        },
        resetOrganizationSvgColorReAdd: elem => {
            elem.classList.remove(`${organizationSvg[1] + themesNames[1]}`, `${organizationSvg[1] + themesNames[2]}`, `${organizationSvg[1] + themesNames[3]}`, `${organizationSvg[1] + themesNames[4]}`, `${organizationSvg[1] + themesNames[0]}`);
        },
        progTopHoursReAdd: elem => {
            elem.classList.remove(`${progTopHoursPseudo[0]}`, `${progTopHoursPseudo[1] + themesNames[1]}`, `${progTopHoursPseudo[1] + themesNames[2]}`, `${progTopHoursPseudo[1] + themesNames[3]}`, `${progTopHoursPseudo[1] + themesNames[4]}`);
            elem.classList.add(`${progTopHoursPseudo[1] + themesNames[0]}`);
        },
        resetProgTopHoursReAdd: elem => {
            elem.classList.remove(`${progTopHoursPseudo[1] + themesNames[0]}`, `${progTopHoursPseudo[1] + themesNames[1]}`, `${progTopHoursPseudo[1] + themesNames[2]}`, `${progTopHoursPseudo[1] + themesNames[3]}`, `${progTopHoursPseudo[1] + themesNames[4]}`);
            elem.classList.add(`${progTopHoursPseudo[0]}`);
        },
        progBoxTitleReAdd: elem => {
            elem.classList.remove(`${progProfilePseudo[0]}`, `${progProfilePseudo[1] + themesNames[1]}`, `${progProfilePseudo[1] + themesNames[2]}`, `${progProfilePseudo[1] + themesNames[3]}`, `${progProfilePseudo[1] + themesNames[4]}`);
            elem.classList.add(`${progProfilePseudo[1] + themesNames[0]}`);
        },
        resetProgBoxTitleReAdd: elem => {
            elem.classList.remove(`${progProfilePseudo[1] + themesNames[0]}`, `${progProfilePseudo[1] + themesNames[1]}`, `${progProfilePseudo[1] + themesNames[2]}`, `${progProfilePseudo[1] + themesNames[3]}`, `${progProfilePseudo[1] + themesNames[4]}`);
            elem.classList.add(`${progProfilePseudo[0]}`);
        },
        mtoCountReAdd: elem => {
            elem.classList.remove(`${mtoCountPseudo[0]}`, `${mtoCountPseudo[1] + themesNames[1]}`, `${mtoCountPseudo[1] + themesNames[2]}`, `${mtoCountPseudo[1] + themesNames[3]}`, `${mtoCountPseudo[1] + themesNames[4]}`);
            elem.classList.add(`${mtoCountPseudo[1] + themesNames[0]}`);
        },
        resetMtoCountReAdd: elem => {
            elem.classList.remove(`${mtoCountPseudo[1] + themesNames[0]}`, `${mtoCountPseudo[1] + themesNames[1]}`, `${mtoCountPseudo[1] + themesNames[2]}`, `${mtoCountPseudo[1] + themesNames[3]}`, `${mtoCountPseudo[1] + themesNames[4]}`);
            elem.classList.add(`${mtoCountPseudo[0]}`);
        },
        logoColorReAdd: () => {
            logo.classList.remove(`${logoArr[0] + themesNames[1]}`, `${logoArr[0] + themesNames[2]}`, `${logoArr[0] + themesNames[3]}`, `${logoArr[0] + themesNames[4]}`);
            logo.classList.add(`${logoArr[0] + themesNames[0]}`);
        },
        resetLogoColorReAdd: () => {
            logo.classList.remove(`${logoArr[0] + themesNames[1]}`, `${logoArr[0] + themesNames[2]}`, `${logoArr[0] + themesNames[3]}`, `${logoArr[0] + themesNames[4]}`, `${logoArr[0] + themesNames[0]}`);
        },
        docSvgReAdd: elem => {
            elem.classList.remove(`${docColor[0] + themesNames[1]}`, `${docColor[0] + themesNames[2]}`, `${docColor[0] + themesNames[3]}`, `${docColor[0] + themesNames[4]}`);
            elem.classList.add(`${docColor[0] + themesNames[0]}`);
        },
        resetDocSvgReAdd: elem => {
            elem.classList.remove(`${docColor[0] + themesNames[1]}`, `${docColor[0] + themesNames[2]}`, `${docColor[0] + themesNames[3]}`, `${docColor[0] + themesNames[4]}`, `${docColor[0] + themesNames[0]}`);
        },
        pageColorReAdd: elem => {
            elem.classList.remove(`${pageColor[0] + themesNames[1]}`, `${pageColor[0] + themesNames[2]}`, `${pageColor[0] + themesNames[3]}`, `${pageColor[0] + themesNames[4]}`);
            elem.classList.add(`${pageColor[0] + themesNames[0]}`);
        },
        resetPageColorReAdd: elem => {
            elem.classList.remove(`${pageColor[0] + themesNames[1]}`, `${pageColor[0] + themesNames[2]}`, `${pageColor[0] + themesNames[3]}`, `${pageColor[0] + themesNames[4]}`, `${pageColor[0] + themesNames[0]}`);
        },
        docSvgEduReAdd: elem => {
            elem.classList.remove(`${docColor[0] + themesNames[1]}`, `${docColor[0] + themesNames[2]}`, `${docColor[0] + themesNames[3]}`, `${docColor[0] + themesNames[4]}`);
            elem.classList.add(`${docColor[0] + themesNames[0]}`);
        },
        tasksSvgArrow: elem => {
            elem.classList.remove(`${tasksColor[0] + themesNames[1]}`, `${tasksColor[0] + themesNames[2]}`, `${tasksColor[0] + themesNames[3]}`, `${tasksColor[0] + themesNames[4]}`);
            elem.classList.add(`${tasksColor[0] + themesNames[0]}`);
        },
        resetTasksSvgArrow: elem => {
            elem.classList.remove(`${tasksColor[0] + themesNames[1]}`, `${tasksColor[0] + themesNames[2]}`, `${tasksColor[0] + themesNames[3]}`, `${tasksColor[0] + themesNames[4]}`, `${tasksColor[0] + themesNames[0]}`);
        },
        resetDocSvgEduReAdd: elem => {
            elem.classList.remove(`${docColor[0] + themesNames[1]}`, `${docColor[0] + themesNames[2]}`, `${docColor[0] + themesNames[3]}`, `${docColor[0] + themesNames[4]}`, `${docColor[0] + themesNames[0]}`);
        },
        menuLinkReAdd: elem => {
            elem.classList.remove(`${hoverAdd[0]}`, `${hoverAdd[1] + themesNames[1]}`, `${hoverAdd[1] + themesNames[2]}`, `${hoverAdd[1] + themesNames[3]}`, `${hoverAdd[1] + themesNames[4]}`);
            elem.classList.add(`${hoverAdd[1] + themesNames[0]}`);
        },
        resetMenuLinkReAdd: elem => {
            elem.classList.remove(`${hoverAdd[1] + themesNames[1]}`, `${hoverAdd[1] + themesNames[2]}`, `${hoverAdd[1] + themesNames[3]}`, `${hoverAdd[1] + themesNames[4]}`, `${hoverAdd[1] + themesNames[0]}`);
            elem.classList.add(`${hoverAdd[0]}`);
        },
        burger: () => {
            burger.classList.remove(`${burgerColor[0] + themesNames[1]}`, `${burgerColor[0] + themesNames[2]}`, `${burgerColor[0] + themesNames[3]}`, `${burgerColor[0] + themesNames[4]}`);
            burger.classList.add(`${burgerColor[0] + themesNames[0]}`);
            burgerLine.style.backgroundColor = localStorage.getItem("2");
        },
        resetBurger: () => {
            burger.classList.remove(`${burgerColor[0] + themesNames[1]}`, `${burgerColor[0] + themesNames[2]}`, `${burgerColor[0] + themesNames[3]}`, `${burgerColor[0] + themesNames[4]}`, `${burgerColor[0] + themesNames[0]}`);
            burgerLine.style.backgroundColor = "#ffffff";
        },
        menuItemReAdd: elem => {
            elem.style.color = localStorage.getItem("2");
        },
        resetMenuItemReAdd: elem => {
            elem.style.color = `${normalColors.white}`;
        }
    };
    const normalColors = {
        white: "#ffffff",
        color: "#25282B",
        bg: "#F5F6F9",
        tif: "#00b2b5",
        descTif: "#C9ECED",
        borderTif: "#6CD3D3"
    };
    const elementsStyle = {
        color: elem => {
            elem.style.color = localStorage.getItem("2");
        },
        resetColor: elem => {
            elem.style.color = `${normalColors.color}`;
        },
        border: elem => {
            elem.style.border = `1px solid ${localStorage.getItem("2")}`;
        },
        resetBorder: elem => {
            elem.style.border = `${normalColors.borderTif}`;
        },
        borderTop: elem => {
            elem.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
        },
        resetBorderTop: elem => {
            elem.style.borderTop = `1px solid ${normalColors.borderTif}`;
        },
        borderRight: elem => {
            elem.style.borderRight = `1px solid ${localStorage.getItem("2")}`;
        },
        resetBorderRight: elem => {
            elem.style.borderRight = `1px solid ${normalColors.borderTif}`;
        },
        borderBottom: elem => {
            elem.style.borderBottom = `1px solid ${localStorage.getItem("2")}`;
        },
        resetBorderBottom: elem => {
            elem.style.borderBottom = `1px solid ${normalColors.borderTif}`;
        },
        borderLeft: elem => {
            elem.style.borderLeft = `1px solid ${localStorage.getItem("2")}`;
        },
        resetBorderLeft: elem => {
            elem.style.borderLeft = `1px solid ${normalColors.borderTif}`;
        },
        background: elem => {
            elem.style.backgroundColor = localStorage.getItem("1");
        },
        resetBackground: elem => {
            elem.style.backgroundColor = `${normalColors.bg}`;
        },
        resetBackgroundWhite: elem => {
            elem.style.backgroundColor = `${normalColors.white}`;
        }
    };
    const elementBody = {
        body: () => {
            body.style.backgroundColor = localStorage.getItem("1");
            body.style.color = localStorage.getItem("2");
        },
        resetBody: () => {
            body.style.backgroundColor = normalColors.bg;
            body.style.color = normalColors.color;
        },
        header: () => {
            changeHeader.style.backgroundColor = localStorage.getItem("1");
            changeHeader.style.color = localStorage.getItem("2");
            changeHeader.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
            changeHeader.style.borderBottom = `1px solid ${localStorage.getItem("1")}`;
        },
        resetHeader: () => {
            changeHeader.style.backgroundColor = normalColors.tif;
            changeHeader.style.color = normalColors.color;
            changeHeader.style.borderTop = `0px solid #ffffff`;
            changeHeader.style.borderBottom = `0px solid #ffffff`;
        },
        crumbs: () => {
            crumbs.style.backgroundColor = localStorage.getItem("1");
            crumbs.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
            crumbs.style.borderBottom = `1px solid ${localStorage.getItem("2")}`;
        },
        resetCrumbs: () => {
            crumbs.style.backgroundColor = normalColors.white;
            crumbs.style.color = "#A4A4AF";
            crumbs.style.borderTop = `0px solid #ffffff`;
            crumbs.style.borderBottom = `0px solid #ffffff`;
        },
        footer: () => {
            footer.style.backgroundColor = localStorage.getItem("1");
            footer.style.color = localStorage.getItem("2");
            footer.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
        },
        resetFooter: () => {
            footer.style.backgroundColor = "#25282B";
            footer.style.color = "#ffffff";
            footer.style.borderTop = `0px solid #ffffff`;
        }
    };
    const bodySections = {
        hunter: () => {
            hunterSection.style.backgroundColor = localStorage.getItem("1");
            hunterSection.style.border = `1px solid ${localStorage.getItem("2")}`;
            hunterSectionLink.style.backgroundColor = localStorage.getItem("1");
            hunterSectionLink.style.border = `1px solid ${localStorage.getItem("2")}`;
            hunterSectionLink.style.color = localStorage.getItem("2");
        },
        resetHunter: () => {
            hunterSection.style.backgroundColor = "#DDF0F2";
            hunterSection.style.border = `0px solid #ffffff`;
            hunterSectionLink.style.backgroundColor = normalColors.tif;
            hunterSectionLink.style.border = `0px solid #ffffff`;
            hunterSectionLink.style.color = `${normalColors.white}`;
        },
        mainDesc: () => {
            mainDescription.style.backgroundColor = localStorage.getItem("1");
            mainDescription.style.border = `1px solid ${localStorage.getItem("2")}`;
        },
        resetMainDesc: () => {
            mainDescription.style.backgroundColor = normalColors.descTif;
            mainDescription.style.border = `0px solid #ffffff`;
        },
        mainTableBox: () => {
            mainTableBox.style.backgroundColor = localStorage.getItem("1");
            mainTableBox.style.color = localStorage.getItem("2");
        },
        resetMainTableBox: () => {
            mainTableBox.style.backgroundColor = normalColors.white;
            mainTableBox.style.color = normalColors.color;
        },
        progEdu: () => {
            progTable.style.backgroundColor = localStorage.getItem("1");
            progTable.style.color = localStorage.getItem("2");
            progTable.style.border = `1px solid ${localStorage.getItem("2")}`;
            progMiddleEducation.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
            progTopList.style.borderLeft = `1px solid ${localStorage.getItem("2")}`;
        },
        resetProgEdu: () => {
            progTable.style.backgroundColor = normalColors.white;
            progTable.style.color = normalColors.color;
            progTable.style.border = `1px solid ${normalColors.borderTif}`;
            progMiddleEducation.style.borderTop = `1px solid ${normalColors.borderTif}`;
            progTopList.style.borderLeft = `1px solid ${normalColors.borderTif}`;
        }
    };
    const tgOkVk = document.querySelectorAll(".tgOkVk");
    const pageColorChange = document.querySelectorAll(".page-color-change");
    const pageSocial = document.querySelectorAll(".page-social");
    const infraContentBox = document.querySelector(".scroll-content-box ");
    const infraTab = document.querySelector(".infrastructure__tab-bar ");
    const swiperArrows = document.querySelectorAll(".swiper-arrows");
    const infraTabLiActive = document.querySelectorAll(".li-active");
    const cateLeapBtnColor = document.querySelectorAll(".cate-leap");
    const cateLeapContent = document.querySelectorAll(".cate-leap__box");
    document.querySelector(".cate-leap-content");
    const cateLeapLi = document.querySelectorAll(".cat-leap-li");
    document.querySelectorAll("#arrow-infra-leap");
    const swiperSlide = document.querySelectorAll(".cards-box");
    const resetDisplayFaculty = document.querySelector(".reset-display-faculty");
    const filterSpoller = document.querySelectorAll(".filter-spoller");
    const filterSpollerBox = document.querySelectorAll(".filter-spoller__box");
    const filterSpollerLi = document.querySelectorAll(".filter-spoller-li");
    const scrollContentTitle = document.querySelectorAll(".scroll-content__title");
    const arrowEduSelect = document.querySelectorAll(".arrow-edu-select");
    const filterSpollerContent = document.querySelectorAll(".filter-spoller__content");
    const contactsLinks = document.querySelectorAll(".contacts-links");
    if (window.innerWidth > 605) {
        document.querySelectorAll(".structure-border").forEach((elem => elem.style.borderRight = "1px solid #6CD3D3"));
        document.querySelectorAll(".structure-border-bottom").forEach((elem => elem.style.borderBottom = "0px solid #fff"));
    } else {
        document.querySelectorAll(".structure-border").forEach((elem => elem.style.borderRight = "0px solid #fff"));
        document.querySelectorAll(".structure-border-bottom").forEach((elem => elem.style.borderBottom = "1px solid #6CD3D3"));
    }
    window.addEventListener("resize", (ev => {
        if (window.innerWidth > 605) {
            document.querySelectorAll(".structure-border").forEach((elem => elem.style.borderRight = "1px solid #6CD3D3"));
            document.querySelectorAll(".structure-border-bottom").forEach((elem => elem.style.borderBottom = "0px solid #fff"));
        } else {
            document.querySelectorAll(".structure-border").forEach((elem => elem.style.borderRight = "0px solid #fff"));
            document.querySelectorAll(".structure-border-bottom").forEach((elem => elem.style.borderBottom = "1px solid #6CD3D3"));
        }
    }));
    const svgFooterHover = document.querySelectorAll(".svg-footer-color");
    const currentCrumbs = document.querySelector(".crumbs__title-current-text-content ");
    const exTasksArrows = document.querySelectorAll(".arrow-filter-spoller");
    const beforeLiPoint = document.querySelectorAll(".before-li-point");
    const minjustSpan = document.querySelectorAll(".minjust-span");
    const spanBorder = document.querySelector(".span-border");
    const arrowInfraLeapColor = document.querySelectorAll(".arrow-infra-leap-color");
    const liInfraActive = document.querySelectorAll(".li-active");
    beforeLiPoint.forEach((e => e.classList.add("before-li-point-active")));
    pageSocial.forEach((elem => {
        elem.classList.add("page-social-normal");
    }));
    function themeToggle() {
        elementBody.body();
        elementBody.header();
        elementBody.footer();
        elementBody.crumbs();
        crumbsTitle.forEach((elem => {
            elementsStyle.color(elem);
        }));
        if (null !== hunterSection && null !== hunterSectionLink) bodySections.hunter();
        if (null !== mainDescription) bodySections.mainDesc();
        exTasksArrows.forEach((elem => {
            elementsReAdd.tasksSvgArrow(elem);
        }));
        arrowInfraLeapColor.forEach((elem => {
            elementsReAdd.tasksSvgArrow(elem);
        }));
        if (null !== mainTableBox) bodySections.mainTableBox();
        teachersMainPhrase.forEach((elem => {
            elementsStyle.background(elem);
            elementsStyle.border(elem);
        }));
        if (null !== resetDisplayFaculty) {
            elementsStyle.background(resetDisplayFaculty);
            elementsStyle.border(resetDisplayFaculty);
        }
        if (null !== catLeapLi) catLeapLi.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        contactsLinks.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        teachersPoint.forEach((elem => {
            elementsStyle.color(elem);
        }));
        teachersPosition.forEach((elem => {
            elementsStyle.color(elem);
        }));
        beforeLiPoint.forEach((elem => {
            elementsReAdd.beforeLiPointColorReAdd(elem);
        }));
        minjustSpan.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        if (null !== spanBorder) spanBorder.style.borderBottom = `1px dashed ${localStorage.getItem("2")}`;
        elementsStyle.color(currentCrumbs);
        svgFooterHover.forEach((e => e.classList.remove("svg-footer-hover")));
        if (null !== swiperSlide) {
            swiperSlide.forEach((elem => elementsStyle.background(elem)));
            swiperSlide.forEach((elem => elementsStyle.border(elem)));
        }
        teachersRaising.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        if (null !== infraContentBox) {
            elementsStyle.border(infraContentBox);
            elementsStyle.background(infraContentBox);
            elementsStyle.border(infraTab);
            elementsStyle.background(infraTab);
            cateLeapBtnColor.forEach((elem => elementsStyle.background(elem)));
            cateLeapContent.forEach((elem => elementsStyle.background(elem)));
            document.querySelector(".cate-leap__content").style.borderTop = "0px solid #000";
            cateLeapContent.forEach((elem => elementsStyle.border(elem)));
            cateLeapBtnColor.forEach((elem => elementsStyle.border(elem)));
            cateLeapBtnColor.forEach((elem => elementsStyle.color(elem)));
            swiperArrows.forEach((elem => elementsReAdd.docSvgEduReAdd(elem)));
            liInfraActive.forEach((elem => elementsReAdd.infraLiActiveReAdd(elem)));
            infraTabLiActive.forEach((elem => elementsReAdd.docSvgEduReAdd(elem)));
        }
        if (null !== scrollContentTitle) scrollContentTitle.forEach((elem => elementsStyle.color(elem)));
        if (null !== filterSpoller) {
            filterSpoller.forEach((elem => {
                elementsStyle.border(elem);
                elementsStyle.background(elem);
                elementsStyle.color(elem);
            }));
            filterSpollerBox.forEach((elem => {
                elementsStyle.background(elem);
                elementsStyle.border(elem);
                elementsStyle.borderBottom(elem);
                elem.style.borderBottom = "0px solid #fff";
            }));
            filterSpollerLi.forEach((elem => {
                elementsStyle.borderBottom(elem);
            }));
            filterSpollerContent.forEach((elem => {
                elementsStyle.borderTop(elem);
                elem.style.borderTop = "0px solid #fff";
            }));
        }
        footerButtons.forEach((elem => {
            elementsStyle.background(elem);
            elementsStyle.border(elem);
        }));
        mtoTable.forEach((elem => {
            elementsStyle.border(elem);
        }));
        pageColorChange.forEach((elem => {
            elementsStyle.color(elem);
        }));
        mobilePageMenu.forEach((elem => elementsStyle.background(elem)));
        mtoTableItem.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        mtoCountBorder.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        elementsReAdd.burger();
        orgSubsBorderLeft.forEach((elem => elementsStyle.borderLeft(elem)));
        orgSubsBorderTop.forEach((elem => elementsStyle.borderTop(elem)));
        linksMiddleScreenAdded.forEach((elem => elementsStyle.borderTop(elem)));
        if (null !== mainInfoTable) {
            mainInfoLinks.forEach((elem => elementsStyle.borderBottom(elem)));
            mainInfoTable.forEach((elem => {
                elementsStyle.border(elem);
            }));
            mainInfoTableBorder.forEach((elem => {
                elementsStyle.borderBottom(elem);
            }));
            links.forEach((elem => {
                elementsStyle.color(elem);
            }));
        }
        if (null !== progTable) {
            bodySections.progEdu();
            document.querySelector(".prog-profile").classList.remove("pog-profile-pseudo-before");
            educationTable.forEach((elem => {
                elementsStyle.background(elem);
                elementsStyle.color(elem);
                elementsStyle.border(elem);
            }));
        }
        arrowEducation.forEach((elem => elementsReAdd.arrowEducation(elem)));
        arrowEduSelect.forEach((elem => elementsReAdd.arrowEducation(elem)));
        progBottomList.forEach((elem => {
            elementsStyle.borderLeft(elem);
            elementsStyle.borderTop(elem);
        }));
        if (null !== progBottomHours) {
            progBottomHours.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
            quarterMobile.forEach((elem => {
                elementsStyle.border(elem);
            }));
        }
        accorTitle.forEach((elem => elementsStyle.color(elem)));
        quarterMobileTitleClasses.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        quarterMobileJun.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        quarterAllOutputJun.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        quarterMobileSelect.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        progTopListBorderBottom.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        cardTeamPosition.forEach((elem => {
            elementsStyle.color(elem);
        }));
        educationTablesBorderLeft.forEach((elem => {
            elementsStyle.borderLeft(elem);
        }));
        educationTablesRow1.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        educationTitles.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        if (window.innerWidth > 605) {
            document.querySelectorAll(".structure-border").forEach((elem => elementsStyle.borderRight(elem)));
            document.querySelectorAll(".structure-border-bottom").forEach((elem => elem.style.borderBottom = "0px solid #fff"));
        } else {
            document.querySelectorAll(".structure-border").forEach((elem => elem.style.borderRight = "0px solid #fff"));
            document.querySelectorAll(".structure-border-bottom").forEach((elem => elementsStyle.borderBottom(elem)));
        }
        window.addEventListener("resize", (ev => {
            if (window.innerWidth > 605) {
                document.querySelectorAll(".structure-border").forEach((elem => elementsStyle.borderRight(elem)));
                document.querySelectorAll(".structure-border-bottom").forEach((elem => elem.style.borderBottom = "0px solid #fff"));
            } else {
                document.querySelectorAll(".structure-border").forEach((elem => elem.style.borderRight = "0px solid #fff"));
                document.querySelectorAll(".structure-border-bottom").forEach((elem => elementsStyle.borderBottom(elem)));
            }
        }));
        progBoxTitle.forEach((elem => {
            elementsStyle.borderBottom(elem);
        }));
        boxEducationContent.forEach((elem => {
            elementsStyle.background(elem);
            elementsStyle.border(elem);
        }));
        quarterMobileContainer.forEach((elem => {
            elementsStyle.background(elem);
            elementsStyle.borderBottom(elem);
            elementsStyle.borderLeft(elem);
            elementsStyle.borderRight(elem);
        }));
        cardTeam.forEach((elem => {
            elem.style.padding = "8px";
            elementsStyle.background(elem);
            elementsStyle.borderLeft(elem);
            elementsStyle.borderRight(elem);
        }));
        quarterMobileContentLi.forEach((elem => {
            elementsStyle.background(elem);
            elementsStyle.borderBottom(elem);
        }));
        buttonSelect.forEach((elem => {
            elementsStyle.background(elem);
            elementsStyle.border(elem);
        }));
        quarterMobile.forEach((elem => {
            elementsStyle.background(elem);
        }));
        btnEducationAccor.forEach((elem => {
            elementsStyle.background(elem);
            elementsStyle.border(elem);
        }));
        menuHidden.forEach((elem => {
            elementsStyle.background(elem);
            elementsStyle.color(elem);
            elementsStyle.border(elem);
        }));
        menuLinkA.forEach((elem => {
            elementsStyle.color(elem);
        }));
        organizationSubs.forEach((elem => {
            elementsStyle.color(elem);
        }));
        footerLinkChange.forEach((elem => {
            elementsStyle.color(elem);
        }));
        elementsReAdd.logoColorReAdd();
        orgItems.forEach((elem => elementsReAdd.orgItemsReAdd(elem)), false);
        menuItem.forEach((elem => elementsReAdd.menuItemReAdd(elem)), false);
        menuLink.forEach((elem => elementsReAdd.menuLinkReAdd(elem)), false);
        docSvgEdu.forEach((elem => elementsReAdd.docSvgEduReAdd(elem)), false);
        docSvg.forEach((elem => elementsReAdd.docSvgReAdd(elem)), false);
        tgOkVk.forEach((elem => elementsReAdd.pageColorReAdd(elem)), false);
        pageSocial.forEach((elem => elementsReAdd.docSvgReAdd(elem)), false);
        mtoCount.forEach((elem => elementsReAdd.mtoCountReAdd(elem)), false);
        mainInfoPseudoLeft.forEach((elem => elementsReAdd.mainInfoTablePseudo(elem)), false);
        quarterMobileSelect.forEach((elem => elementsReAdd.quarterSelect(elem)), false);
        quarterAllOutputJun.forEach((elem => elementsReAdd.outputJunReAdd(elem)), false);
        quarterAllOutputSin.forEach((elem => elementsReAdd.outputSinReAdd(elem)), false);
        organizationSvgs.forEach((elem => elementsReAdd.organizationSvgReAdd(elem)));
        organizationSvgsColor.forEach((elem => elementsReAdd.docSvgReAdd(elem)));
        progTopHours.forEach((elem => elementsReAdd.progTopHoursReAdd(elem)), false);
        progBoxTitle.forEach((elem => elementsReAdd.progBoxTitleReAdd(elem)), false);
    }
    const btnEduc = document.querySelectorAll(".btn-education-accor");
    function normalToggle() {
        elementBody.resetBody();
        elementBody.resetHeader();
        elementBody.resetFooter();
        elementBody.resetCrumbs();
        crumbsTitle.forEach((elem => {
            elementsStyle.resetColor(elem);
        }));
        if (null !== hunterSection && null !== hunterSectionLink) bodySections.resetHunter();
        if (null !== mainDescription) bodySections.resetMainDesc();
        if (null !== infraContentBox) {
            elementsStyle.resetBorder(infraContentBox);
            elementsStyle.resetBackgroundWhite(infraContentBox);
            elementsStyle.resetBorder(infraTab);
            elementsStyle.resetBackgroundWhite(infraTab);
            cateLeapBtnColor.forEach((elem => elem.style.backgroundColor = ""));
            cateLeapContent.forEach((elem => elementsStyle.resetBackgroundWhite(elem)));
            cateLeapContent.forEach((elem => elem.style.border = ``));
            cateLeapBtnColor.forEach((elem => elem.style.border = ``));
            cateLeapBtnColor.forEach((elem => elem.style.color = ``));
            cateLeapLi.forEach((elem => elem.style.borderTop = ``));
            cateLeapLi.forEach((elem => elem.style.borderBottom = ``));
            swiperArrows.forEach((elem => elementsReAdd.resetDocSvgEduReAdd(elem)));
            infraTabLiActive.forEach((elem => elementsReAdd.resetDocSvgEduReAdd(elem)));
            document.querySelector(".cate-leap__content").style.borderTop = "";
        }
        svgFooterHover.forEach((e => e.classList.add("svg-footer-hover")));
        if (null !== scrollContentTitle) scrollContentTitle.forEach((elem => elem.style.color = ``));
        if (null !== resetDisplayFaculty) {
            resetDisplayFaculty.style.border = "";
            resetDisplayFaculty.style.backgroundColor = "";
        }
        currentCrumbs.style.color = "";
        if (null !== swiperSlide) {
            swiperSlide.forEach((elem => elem.style.backgroundColor = ""));
            swiperSlide.forEach((elem => elem.style.border = ""));
        }
        exTasksArrows.forEach((elem => {
            elementsReAdd.resetTasksSvgArrow(elem);
        }));
        arrowInfraLeapColor.forEach((elem => {
            elementsReAdd.resetTasksSvgArrow(elem);
        }));
        arrowEduSelect.forEach((elem => elementsReAdd.resetArrowEducation(elem)));
        minjustSpan.forEach((elem => {
            elem.style.borderBottom = "";
        }));
        if (null !== spanBorder) spanBorder.style.borderBottom = ``;
        if (null !== filterSpoller) {
            filterSpoller.forEach((elem => {
                elem.style.color = "";
                elem.style.border = "";
                elem.style.backgroundColor = "";
            }));
            filterSpollerBox.forEach((elem => {
                elem.style.border = "";
                elem.style.backgroundColor = "";
            }));
            filterSpollerLi.forEach((elem => {
                elem.style.borderTop = "";
                elem.style.borderBottom = "";
            }));
            filterSpollerContent.forEach((elem => {
                elem.style.borderTop = "";
            }));
        }
        if (null !== mainTableBox) bodySections.resetMainTableBox();
        teachersMainPhrase.forEach((elem => {
            elem.style.backgroundColor = `${normalColors.descTif}`;
            elementsStyle.resetBorder(elem);
        }));
        teachersPoint.forEach((elem => {
            elem.style.color = `#9696A0`;
        }));
        teachersPosition.forEach((elem => {
            elem.style.color = `${normalColors.tif}`;
        }));
        teachersRaising.forEach((elem => {
            elementsStyle.resetBorderBottom(elem);
        }));
        footerButtons.forEach((elem => {
            elementsStyle.resetBackground(elem);
            elementsStyle.resetBorder(elem);
        }));
        mtoTable.forEach((elem => {
            elem.style.border = ``;
        }));
        pageColorChange.forEach((elem => {
            elem.style.color = `#ffffff`;
        }));
        mobilePageMenu.forEach((elem => {
            elem.style.backgroundColor = `${normalColors.tif}`;
        }));
        mtoTableItem.forEach((elem => {
            elementsStyle.resetBorderBottom(elem);
        }));
        mtoCountBorder.forEach((elem => {
            elementsStyle.resetBorderBottom(elem);
        }));
        elementsReAdd.resetBurger();
        orgSubsBorderLeft.forEach((elem => elementsStyle.resetBorderLeft(elem)));
        orgSubsBorderTop.forEach((elem => elementsStyle.resetBorderTop(elem)));
        linksMiddleScreenAdded.forEach((elem => elementsStyle.resetBorderTop(elem)));
        if (null !== mainInfoTable) {
            mainInfoLinks.forEach((elem => {
                elem.style.borderBottom = ``;
            }));
            mainInfoTable.forEach((elem => {
                elem.style.border = ``;
            }));
            mainInfoTableBorder.forEach((elem => {
                elem.style.borderBottom = ``;
            }));
            links.forEach((elem => {
                elem.style.color = ``;
            }));
        }
        if (null !== progTable) {
            bodySections.resetProgEdu();
            document.querySelector(".prog-profile").classList.remove("pog-profile-pseudo-before");
            educationTable.forEach((elem => {
                elementsStyle.resetBackground(elem);
                elementsStyle.resetColor(elem);
                elementsStyle.resetBorder(elem);
            }));
        }
        arrowEducation.forEach((elem => elementsReAdd.resetArrowEducation(elem)));
        progBottomList.forEach((elem => {
            elementsStyle.resetBorderLeft(elem);
            elementsStyle.resetBorderTop(elem);
        }));
        if (null !== progBottomHours) {
            progBottomHours.style.borderTop = `1px solid ${normalColors.borderTif}`;
            quarterMobile.forEach((elem => {
                elementsStyle.resetBorder(elem);
            }));
        }
        accorTitle.forEach((elem => {
            elem.style.color = ``;
        }));
        quarterMobile.forEach((elem => {
            elem.style.border = "";
            elem.style.backgroundColor = "#ffffff";
        }));
        quarterMobileTitleClasses.forEach((elem => {
            elementsStyle.resetBorderBottom(elem);
        }));
        quarterMobileJun.forEach((elem => {
            elementsStyle.resetBorderBottom(elem);
        }));
        quarterAllOutputJun.forEach((elem => {
            elem.style.borderBottom = `1px solid ${normalColors.borderTif}`;
        }));
        quarterMobileSelect.forEach((elem => {
            elementsStyle.resetBorderBottom(elem);
        }));
        progTopListBorderBottom.forEach((elem => {
            elementsStyle.resetBorderBottom(elem);
        }));
        cardTeamPosition.forEach((elem => {
            elementsStyle.resetColor(elem);
        }));
        educationTablesBorderLeft.forEach((elem => {
            elem.style.borderLeft = `1px solid ${normalColors.borderTif}`;
        }));
        tableIf.forEach((elem => {
            elem.style.border = ``;
            elem.style.backgroundColor = ``;
        }));
        btnEduc.forEach((elem => {
            elem.backgroundColor = "white";
        }));
        educationTablesRow1.forEach((elem => {
            elementsStyle.resetBorderBottom(elem);
        }));
        educationTitles.forEach((elem => {
            elementsStyle.resetBorderBottom(elem);
        }));
        structureBorderRight.forEach((elem => elementsStyle.resetBorderRight(elem)));
        progBoxTitle.forEach((elem => {
            elementsStyle.resetBorderBottom(elem);
        }));
        boxEducationContent.forEach((elem => {
            elem.style.backgroundColor = "";
            elementsStyle.resetBorder(elem);
        }));
        quarterMobileContainer.forEach((elem => {
            elem.style.backgroundColor = ``;
            elem.style.borderBottom = ``;
            elem.style.borderLeft = ``;
            elem.style.borderRight = ``;
        }));
        cardTeam.forEach((elem => {
            elem.style.padding = "0px";
            elem.style.backgroundColor = normalColors.bg;
            elem.style.borderLeft = `0px solid ${normalColors.borderTif}`;
            elem.style.borderRight = `0px solid ${normalColors.borderTif}`;
        }));
        quarterMobileContentLi.forEach((elem => {
            elem.style.backgroundColor = ``;
            elem.style.borderBottom = ``;
        }));
        buttonSelect.forEach((elem => {
            elem.style.backgroundColor = ``;
            elem.style.border = ``;
        }));
        quarterMobile.forEach((elem => {
            elem.style.backgroundColor = ``;
        }));
        btnEducationAccor.forEach((elem => {
            elem.style.backgroundColor = ``;
            elem.style.border = ``;
        }));
        menuHidden.forEach((elem => {
            elem.style.backgroundColor = "#fff";
            elementsStyle.resetColor(elem);
            elementsStyle.resetBorder(elem);
        }));
        menuLinkA.forEach((elem => {
            elementsStyle.resetColor(elem);
        }));
        organizationSubs.forEach((elem => {
            elem.style.color = "";
        }));
        footerLinkChange.forEach((elem => {
            elem.style.color = normalColors.tif;
        }));
        elementsReAdd.resetLogoColorReAdd();
        orgItems.forEach((elem => elementsReAdd.resetOrgItemsReAdd(elem)), false);
        menuItem.forEach((elem => elementsReAdd.resetMenuItemReAdd(elem)), false);
        menuLink.forEach((elem => elementsReAdd.resetMenuLinkReAdd(elem)), false);
        docSvgEdu.forEach((elem => elementsReAdd.resetDocSvgEduReAdd(elem)), false);
        docSvg.forEach((elem => elementsReAdd.resetDocSvgReAdd(elem)), false);
        tgOkVk.forEach((elem => elementsReAdd.resetPageColorReAdd(elem)), false);
        pageSocial.forEach((elem => elementsReAdd.resetDocSvgReAdd(elem)), false);
        mtoCount.forEach((elem => elementsReAdd.resetMtoCountReAdd(elem)), false);
        mainInfoPseudoLeft.forEach((elem => elementsReAdd.resetMainInfoTablePseudo(elem)), false);
        quarterMobileSelect.forEach((elem => elementsReAdd.resetQuarterSelect(elem)), false);
        quarterAllOutputJun.forEach((elem => elementsReAdd.resetOutputJunReAdd(elem)), false);
        quarterAllOutputSin.forEach((elem => elementsReAdd.resetOutputSinReAdd(elem)), false);
        organizationSvgs.forEach((elem => elementsReAdd.resetOrganizationSvgReAdd(elem)));
        organizationSvgsColor.forEach((elem => elementsReAdd.resetDocSvgReAdd(elem)));
        progTopHours.forEach((elem => elementsReAdd.resetProgTopHoursReAdd(elem)), false);
        progBoxTitle.forEach((elem => elementsReAdd.resetProgBoxTitleReAdd(elem)), false);
    }
    function whiteColor() {
        window.localStorage.clear();
        webColorItems.forEach((elem => elem.classList.remove("impaired-item-active-vanilla", "impaired-item-active-black", "impaired-item-active-brown", "impaired-item-active-blue")));
        webColorWhite.classList.add("impaired-item-active-white");
        window.localStorage.setItem("1", "#ffffff");
        window.localStorage.setItem("2", "#000000");
        themesNames = [];
        themesNames.push("white", "black", "vanilla", "blue", "brown");
    }
    function blackColor() {
        window.localStorage.clear();
        webColorItems.forEach((elem => elem.classList.remove("impaired-item-active-vanilla", "impaired-item-active-white", "impaired-item-active-brown", "impaired-item-active-blue")));
        webColorBlack.classList.add("impaired-item-active-black");
        window.localStorage.setItem("1", "#000000");
        window.localStorage.setItem("2", "#ffffff");
        themesNames = [];
        themesNames.push("black", "white", "vanilla", "blue", "brown");
    }
    function vanillaColor() {
        window.localStorage.clear();
        webColorItems.forEach((elem => elem.classList.remove("impaired-item-active-white", "impaired-item-active-black", "impaired-item-active-brown", "impaired-item-active-blue")));
        webColorVanilla.classList.add("impaired-item-active-vanilla");
        window.localStorage.setItem("1", "#F7F3D6");
        window.localStorage.setItem("2", "#4D4B43");
        themesNames = [];
        themesNames.push("vanilla", "black", "white", "blue", "brown");
    }
    function blueColor() {
        window.localStorage.clear();
        webColorItems.forEach((elem => elem.classList.remove("impaired-item-active-white", "impaired-item-active-black", "impaired-item-active-brown", "impaired-item-active-vanilla")));
        webColorBlue.classList.add("impaired-item-active-blue");
        window.localStorage.setItem("1", "#9DD1FF");
        window.localStorage.setItem("2", "#25282B");
        themesNames = [];
        themesNames.push("blue", "black", "vanilla", "white", "brown");
    }
    function brownColor() {
        window.localStorage.clear();
        webColorItems.forEach((elem => elem.classList.remove("impaired-item-active-white", "impaired-item-active-black", "impaired-item-active-blue", "impaired-item-active-vanilla")));
        webColorBrown.classList.add("impaired-item-active-brown");
        window.localStorage.setItem("1", "#3B2716");
        window.localStorage.setItem("2", "#A9E44D");
        themesNames = [];
        themesNames.push("brown", "black", "vanilla", "blue", "white");
    }
    const webColorItems = document.querySelectorAll(".webColorItem");
    const webColorWhite = document.querySelector(".colorWhite");
    const webColorBlack = document.querySelector(".colorBlack");
    const webColorBlue = document.querySelector(".colorBlue");
    const webColorVanilla = document.querySelector(".colorVanilla");
    const webColorBrown = document.querySelector(".colorBrown");
    document.querySelector(".web-color-active");
    document.querySelector(".web-color__brown").addEventListener("click", (e => {
        brownColor();
        themeToggle();
    }));
    document.querySelector(".web-color__blue").addEventListener("click", (e => {
        blueColor();
        themeToggle();
    }));
    document.querySelector(".web-color__vanilla").addEventListener("click", (e => {
        vanillaColor();
        themeToggle();
    }));
    document.querySelector(".web-color__white").addEventListener("click", (e => {
        whiteColor();
        themeToggle();
    }));
    document.querySelector(".web-color__black").addEventListener("click", (e => {
        blackColor();
        themeToggle();
    }));
    if ("#3B2716" === localStorage.getItem("1")) {
        brownColor();
        themeToggle();
    } else if ("#9DD1FF" === localStorage.getItem("1")) {
        blueColor();
        themeToggle();
    } else if ("#F7F3D6" === localStorage.getItem("1")) {
        vanillaColor();
        themeToggle();
    } else if ("#ffffff" === localStorage.getItem("1")) {
        whiteColor();
        themeToggle();
    } else if ("#000000" === localStorage.getItem("1")) {
        blackColor();
        themeToggle();
    } else window.localStorage.clear();
    const leadersMainDescription = document.querySelector(".leaders__main-description");
    const imparedImagesHide = document.querySelector(".impared-images__hide");
    const imparedImagesGray = document.querySelector(".impared-images__gray");
    const imparedImagesShow = document.querySelector(".impared-images__show");
    document.querySelectorAll(".teachers__card");
    const imgChanger = {
        hideImgs: () => {
            body.classList.add("hide-imgs");
            imparedImagesGray.classList.remove("impaired-item-active");
            imparedImagesHide.classList.add("impaired-item-active");
            imparedImagesShow.classList.remove("impaired-item-active");
            cardTeam.forEach((elem => {
                elem.style.padding = "8px";
                elem.style.borderLeft = `1px solid ${localStorage.getItem("0")}`;
                elem.style.borderRight = `1px solid ${localStorage.getItem("0")}`;
                sessionStorage.setItem(1, "noimg");
            }));
            if (null !== leadersMainDescription) {
                leadersMainDescription.style.paddingBottom = "36px";
                leadersMainDescription.classList.remove("gray-background");
            }
        },
        grayImgs: () => {
            body.classList.add("gray-imgs");
            sessionStorage.setItem(2, "grayimg");
            imparedImagesGray.classList.add("impaired-item-active");
            imparedImagesHide.classList.remove("impaired-item-active");
            imparedImagesShow.classList.remove("impaired-item-active");
            if (!body.classList.contains("hide-imgs")) if (leadersMainDescription) leadersMainDescription.classList.add("gray-background");
        },
        showImg: () => {
            sessionStorage.setItem(2, " ");
            if (null !== leadersMainDescription) leadersMainDescription.classList.remove("gray-background");
            imparedImagesGray.classList.remove("impaired-item-active");
            imparedImagesHide.classList.remove("impaired-item-active");
            imparedImagesShow.classList.add("impaired-item-active");
            body.classList.remove("hide-imgs");
            body.classList.remove("gray-imgs");
        }
    };
    imparedImagesHide.addEventListener("click", (e => {
        imgChanger.hideImgs();
    }));
    imparedImagesGray.addEventListener("click", (e => {
        imgChanger.grayImgs();
    }));
    imparedImagesShow.addEventListener("click", (e => {
        imgChanger.showImg();
    }));
    const fontsLittle = document.querySelector(".fonts-change__little");
    const fontsMiddle = document.querySelector(".fonts-change__middle");
    const fontsLarge = document.querySelector(".fonts-change__large");
    const letterDistancMiddle = document.querySelector(".letter-distance__middle");
    const letterFistanceLarge = document.querySelector(".letter-distance__large");
    const letterDistanceLittle = document.querySelector(".letter-distance__little");
    const infraMobileContentBox = document.querySelector(".mobile-content-box");
    const infraScrollContentBox = document.querySelector(".scroll-content-box");
    const infraTabBar = document.querySelector(".infrastructure__tab-bar");
    const cateLeap = document.querySelector(".cate-leap");
    const cateLeapTitle = document.querySelector(".cate-leap__title");
    const filterSpollerTitle = document.querySelectorAll(".filter-spoller__title");
    document.querySelectorAll(".contacts-svg");
    const fontsCharger = {
        permLittleFonts: () => {
            sessionStorage.setItem(3, "littlefonts");
            body.classList.add("little-font");
            fontsMiddle.classList.remove("impaired-item-active");
            fontsLarge.classList.remove("impaired-item-active");
            fontsLittle.classList.add("impaired-item-active");
            filterSpollerTitle.forEach((elem => elem.style.top = "13px"));
            if (null !== cateLeapTitle) cateLeapTitle.style.top = "12px";
            menuItem.forEach((e => {
                e.classList.add("little-font");
                heightHours();
            }));
        },
        permMiddleFonts: () => {
            sessionStorage.setItem(3, " ");
            body.classList.remove("little-font");
            body.classList.remove("large-font");
            fontsLarge.classList.remove("impaired-item-active");
            fontsLittle.classList.remove("impaired-item-active");
            fontsMiddle.classList.add("impaired-item-active");
            filterSpollerTitle.forEach((elem => elem.style.top = ""));
            if (null !== document.querySelector(".leaders__main-description")) {
                document.querySelector(".leaders__main-description").style.minHeight = "";
                document.querySelector(".main-description").style.paddingBottom = "";
            }
            if (null !== cateLeapTitle) cateLeapTitle.style.top = "7px";
            heightHours();
        },
        permLargeFonts: () => {
            sessionStorage.setItem(3, "largefonts");
            body.classList.remove("little-font");
            body.classList.add("large-font");
            fontsLittle.classList.remove("impaired-item-active");
            fontsMiddle.classList.remove("impaired-item-active");
            fontsLarge.classList.add("impaired-item-active");
            filterSpollerTitle.forEach((elem => elem.style.top = "4px"));
            if (null !== document.querySelectorAll(".contacts-br")) document.querySelectorAll(".contacts-br").forEach((e => e.style.display = "block"));
            if (null !== document.querySelectorAll(".font-large")) document.querySelectorAll(".font-large").forEach((e => {
                e.style.display = "block";
            }));
            if (null !== document.querySelector(".main-description")) document.querySelector(".main-description").style.paddingBottom = "200px";
            if (null !== infraMobileContentBox) {
                infraMobileContentBox.style.display = "block";
                infraScrollContentBox.style.display = "none";
                infraTabBar.style.display = "none";
                cateLeapTitle.style.top = "1.5px";
            }
            heightHours();
        },
        normalDistance: () => {
            sessionStorage.setItem(4, "");
            body.classList.remove("big-distance");
            body.classList.remove("biggest-distance");
            letterDistancMiddle.classList.remove("impaired-item-active");
            letterFistanceLarge.classList.remove("impaired-item-active");
            letterDistanceLittle.classList.add("impaired-item-active");
            heightHours();
        },
        bigDistance: () => {
            sessionStorage.setItem(4, "bigDistance");
            body.classList.add("big-distance");
            letterDistancMiddle.classList.add("impaired-item-active");
            letterFistanceLarge.classList.remove("impaired-item-active");
            letterDistanceLittle.classList.remove("impaired-item-active");
            if (null !== infraMobileContentBox) {
                infraMobileContentBox.style.display = "block";
                infraScrollContentBox.style.display = "none";
                infraTabBar.style.display = "none";
            }
            heightHours();
        },
        biggestDistance: () => {
            sessionStorage.setItem(4, "biggestDistance");
            body.classList.remove("big-distance");
            body.classList.add("biggest-distance");
            letterDistancMiddle.classList.remove("impaired-item-active");
            letterFistanceLarge.classList.add("impaired-item-active");
            letterDistanceLittle.classList.remove("impaired-item-active");
            if (null !== infraMobileContentBox) {
                infraMobileContentBox.style.display = "block";
                infraScrollContentBox.style.display = "none";
                infraTabBar.style.display = "none";
            }
            heightHours();
        }
    };
    fontsLittle.addEventListener("click", (e => fontsCharger.permLittleFonts()));
    fontsMiddle.addEventListener("click", (e => fontsCharger.permMiddleFonts()));
    fontsLarge.addEventListener("click", (e => fontsCharger.permLargeFonts()));
    letterDistanceLittle.addEventListener("click", (e => fontsCharger.normalDistance()));
    letterFistanceLarge.addEventListener("click", (e => fontsCharger.biggestDistance()));
    letterDistancMiddle.addEventListener("click", (e => fontsCharger.bigDistance()));
    document.querySelector(".impaired-bar__ussually-mode").addEventListener("click", (e => {
        window.localStorage.clear();
        window.sessionStorage.clear();
        webColorItems.forEach((elem => elem.classList.remove("impaired-item-active-white", "impaired-item-active-black", "impaired-item-active-blue", "impaired-item-active-vanilla", "impaired-item-active-brown")));
        beforeLiPoint.forEach((elem => elementsReAdd.resetBeforeLiPointColorReAdd(elem)));
        beforeLiPoint.forEach((elem => elem.classList.add("before-li-point-active")));
        if (null !== document.querySelector(".leaders__main-description")) {
            document.querySelector(".leaders__main-description").style.minHeight = "";
            document.querySelector(".main-description").style.paddingBottom = "";
        }
        normalToggle();
        if (infraScrollContentBox) {
            infraScrollContentBox.style.display = "";
            infraTabBar.style.display = "";
            infraMobileContentBox.style.display = "";
        }
        fontsCharger.normalDistance();
        fontsCharger.permMiddleFonts();
        imgChanger.showImg();
    }));
    if ("noimg" === sessionStorage.getItem(1)) imgChanger.hideImgs(); else if ("grayimg" === sessionStorage.getItem(2)) imgChanger.grayImgs();
    if ("littlefonts" === sessionStorage.getItem(3)) fontsCharger.permLittleFonts(); else if ("largefonts" === sessionStorage.getItem(3)) fontsCharger.permLargeFonts();
    if ("bigDistance" === sessionStorage.getItem(4)) fontsCharger.bigDistance(); else if ("biggestDistance" === sessionStorage.getItem(4)) fontsCharger.biggestDistance();
    core.use([ Navigation ]);
    core.use([ Pagination ]);
    core.use([ EffectCards ]);
    new core(".swiper-container-1", {
        lazy: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-1",
            prevEl: ".swiper-button-prev-1"
        },
        pagination: {
            el: ".swiper-pagination-1",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-2", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-2",
            prevEl: ".swiper-button-prev-2"
        },
        pagination: {
            el: ".swiper-pagination-2",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-3", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-3",
            prevEl: ".swiper-button-prev-3"
        },
        pagination: {
            el: ".swiper-pagination-3",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-4", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-4",
            prevEl: ".swiper-button-prev-4"
        },
        pagination: {
            el: ".swiper-pagination-4",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-5", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-5",
            prevEl: ".swiper-button-prev-5"
        },
        pagination: {
            el: ".swiper-pagination-5",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-6", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-6",
            prevEl: ".swiper-button-prev-6"
        },
        pagination: {
            el: ".swiper-pagination-6",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-7", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-7",
            prevEl: ".swiper-button-prev-7"
        },
        pagination: {
            el: ".swiper-pagination-7",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-8", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-8",
            prevEl: ".swiper-button-prev-8"
        },
        pagination: {
            el: ".swiper-pagination-8",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-mob-1", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-1",
            prevEl: ".swiper-button-prev-1"
        },
        pagination: {
            el: ".swiper-pagination-mob-1",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-mob-2", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-2",
            prevEl: ".swiper-button-prev-2"
        },
        pagination: {
            el: ".swiper-pagination-mob-2",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-mob-3", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-3",
            prevEl: ".swiper-button-prev-3"
        },
        pagination: {
            el: ".swiper-pagination-mob-3",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-mob-4", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-4",
            prevEl: ".swiper-button-prev-4"
        },
        pagination: {
            el: ".swiper-pagination-mob-4",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-mob-5", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-5",
            prevEl: ".swiper-button-prev-5"
        },
        pagination: {
            el: ".swiper-pagination-mob-5",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-mob-6", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-6",
            prevEl: ".swiper-button-prev-6"
        },
        pagination: {
            el: ".swiper-pagination-mob-6",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-mob-7", {
        lazy: true,
        loop: true,
        spaceBetween: 50,
        centeredSlidesBounds: true,
        navigation: {
            nextEl: ".swiper-button-next-7",
            prevEl: ".swiper-button-prev-7"
        },
        pagination: {
            el: ".swiper-pagination-mob-7",
            type: "fraction",
            formatFractionCurrent: function(number) {
                return number;
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        }
    });
    new core(".swiper-container-10", {
        effect: "cards",
        grabCursor: true
    });
    if (document.querySelector(".infrastructure__li-1")) document.querySelector(".infrastructure__li-1").addEventListener("click", (e => {
        document.querySelector(".scroll-content-box").scroll({
            top: 0,
            behavior: "smooth"
        });
    }));
    if (document.querySelector(".infrastructure__li-2")) document.querySelector(".infrastructure__li-2").addEventListener("click", (e => {
        document.querySelector(".scroll-content-box").scroll({
            top: 890,
            behavior: "smooth"
        });
    }));
    if (document.querySelector(".infrastructure__li-3")) document.querySelector(".infrastructure__li-3").addEventListener("click", (e => {
        document.querySelector(".scroll-content-box").scroll({
            top: 1620,
            behavior: "smooth"
        });
    }));
    if (document.querySelector(".infrastructure__li-4")) document.querySelector(".infrastructure__li-4").addEventListener("click", (e => {
        document.querySelector(".scroll-content-box").scroll({
            top: 2305,
            behavior: "smooth"
        });
    }));
    if (document.querySelector(".infrastructure__li-5")) document.querySelector(".infrastructure__li-5").addEventListener("click", (e => {
        document.querySelector(".scroll-content-box").scroll({
            top: 3030,
            behavior: "smooth"
        });
    }));
    if (document.querySelector(".infrastructure__li-6")) document.querySelector(".infrastructure__li-6").addEventListener("click", (e => {
        document.querySelector(".scroll-content-box").scroll({
            top: 3920,
            behavior: "smooth"
        });
    }));
    if (document.querySelector(".infrastructure__li-7")) document.querySelector(".infrastructure__li-7").addEventListener("click", (e => {
        document.querySelector(".scroll-content-box").scroll({
            top: 4745,
            behavior: "smooth"
        });
    }));
    if (document.querySelector(".infrastructure__li-8")) document.querySelector(".infrastructure__li-8").addEventListener("click", (e => {
        document.querySelector(".scroll-content-box").scroll({
            top: 5850,
            behavior: "smooth"
        });
    }));
    if (null !== document.querySelector(".infrastructure__li-1")) {
        document.querySelector(".infrastructure__li-1").classList.add("li-active");
        document.querySelector(".scroll-content-box").addEventListener("scroll", (function() {
            if (this.scrollTop <= 683 || 0 === this.scrollTop) {
                document.querySelectorAll(".infrastructure__li").forEach((elem => {
                    elem.classList.remove("li-active");
                }));
                document.querySelector(".infrastructure__li-1").classList.add("li-active");
            }
            if (this.scrollTop >= 683 && this.scrollTop <= 1463) {
                document.querySelectorAll(".infrastructure__li").forEach((elem => {
                    elem.classList.remove("li-active");
                }));
                document.querySelector(".infrastructure__li-2").classList.add("li-active");
            }
            if (this.scrollTop >= 1463 && this.scrollTop <= 2145) {
                document.querySelectorAll(".infrastructure__li").forEach((elem => {
                    elem.classList.remove("li-active");
                }));
                document.querySelector(".infrastructure__li-3").classList.add("li-active");
            }
            if (this.scrollTop >= 2145 && this.scrollTop <= 2925) {
                document.querySelectorAll(".infrastructure__li").forEach((elem => {
                    elem.classList.remove("li-active");
                }));
                document.querySelector(".infrastructure__li-4").classList.add("li-active");
            }
            if (this.scrollTop >= 2925 && this.scrollTop <= 3780) {
                document.querySelectorAll(".infrastructure__li").forEach((elem => {
                    elem.classList.remove("li-active");
                }));
                document.querySelector(".infrastructure__li-5").classList.add("li-active");
            }
            if (this.scrollTop >= 3780 && this.scrollTop <= 4537) {
                document.querySelectorAll(".infrastructure__li").forEach((elem => {
                    elem.classList.remove("li-active");
                }));
                document.querySelector(".infrastructure__li-6").classList.add("li-active");
            }
            if (this.scrollTop >= 4537 && this.scrollTop <= 5671) {
                document.querySelectorAll(".infrastructure__li").forEach((elem => {
                    elem.classList.remove("li-active");
                }));
                document.querySelector(".infrastructure__li-7").classList.add("li-active");
            }
            if (this.scrollTop >= 5671) {
                document.querySelectorAll(".infrastructure__li").forEach((elem => {
                    elem.classList.remove("li-active");
                }));
                document.querySelector(".infrastructure__li-8").classList.add("li-active");
            }
        }));
    }
    if (document.querySelector(".li-1-psy")) document.querySelector(".li-1-psy").addEventListener("click", (e => {
        document.querySelector(".scroll-content-box").scroll({
            top: 0,
            behavior: "smooth"
        });
    }));
    if (document.querySelector(".li-2-psy")) document.querySelector(".li-2-psy").addEventListener("click", (e => {
        document.querySelector(".scroll-content-box").scroll({
            top: 1400,
            behavior: "smooth"
        });
    }));
    if (document.querySelector(".li-3-psy")) document.querySelector(".li-3-psy").addEventListener("click", (e => {
        document.querySelector(".scroll-content-box").scroll({
            top: 1875,
            behavior: "smooth"
        });
    }));
    if (document.querySelector(".li-4-psy")) document.querySelector(".li-4-psy").addEventListener("click", (e => {
        document.querySelector(".scroll-content-box").scroll({
            top: 2600,
            behavior: "smooth"
        });
    }));
    if (null !== document.querySelector(".scroll-content-box-psy")) document.querySelector(".scroll-content-box-psy").addEventListener("scroll", (function() {
        if (this.scrollTop <= 1300 || 0 === this.scrollTop) {
            document.querySelectorAll(".infrastructure__li").forEach((elem => {
                elem.classList.remove("li-active");
            }));
            document.querySelector(".li-1-psy").classList.add("li-active");
        }
        if (this.scrollTop >= 1300 && this.scrollTop <= 1900) {
            document.querySelectorAll(".infrastructure__li").forEach((elem => {
                elem.classList.remove("li-active");
            }));
            document.querySelector(".li-2-psy").classList.add("li-active");
        }
        if (this.scrollTop >= 1800 && this.scrollTop <= 2200) {
            document.querySelectorAll(".infrastructure__li").forEach((elem => {
                elem.classList.remove("li-active");
            }));
            document.querySelector(".li-3-psy").classList.add("li-active");
        }
        if (this.scrollTop >= 2200) {
            document.querySelectorAll(".infrastructure__li").forEach((elem => {
                elem.classList.remove("li-active");
            }));
            document.querySelector(".li-4-psy").classList.add("li-active");
        }
    }));
    let oldScrollY = 0;
    function headerFix() {
        window.addEventListener("scroll", (function() {
            let scrolled = window.scrollY || document.documentElement.scrollTop;
            if (scrolled > 300) {
                header.classList.add("scroll200");
                cateLeapObj.addOutClass();
                cateLeapObj.titleMargin();
            }
            let dY = scrolled - oldScrollY;
            if (dY < 0) {
                header.classList.add("header-top-fixed");
                wrapper.style.paddingTop = "135px";
                if (null !== cateLeapFix) {
                    cateLeapObj.removeOutClass();
                    cateLeapFix.classList.add("cateLeapFix");
                }
            } else {
                wrapper.style.paddingTop = "0px";
                header.classList.remove("header-top-fixed");
                header.classList.add("scroll200");
                cateLeapObj.removeCateFix();
            }
            if (scrolled < 50) {
                wrapper.style.paddingTop = "0px";
                cateLeapObj.removeCateFix();
                cateLeapObj.removeOutClass();
                cateLeapObj.removeTitleMargin();
                header.classList.remove("scroll200");
                header.classList.remove("header-top-fixed");
            }
            oldScrollY = scrolled;
        }));
    }
    const cateLeapObj = {
        titleMargin: () => {
            if (null !== cateLeapFix) document.querySelector(".infra-title").classList.add("infra-titleNew");
        },
        removeTitleMargin: () => {
            if (null !== cateLeapFix) document.querySelector(".infra-title").classList.remove("infra-titleNew");
        },
        addOutClass: () => {
            if (null !== cateLeapFix) cateLeapFix.classList.add("cate-leap-opacity");
        },
        removeOutClass: () => {
            if (null !== cateLeapFix) cateLeapFix.classList.remove("cate-leap-opacity");
        },
        addCateFix: () => {
            if (null !== cateLeapFix) cateLeapFix.classList.add("cateLeapFix");
        },
        removeCateFix: () => {
            if (null !== cateLeapFix) cateLeapFix.classList.remove("cateLeapFix");
        }
    };
    headerFix();
    const cateLeapBox = document.querySelector(".cate-leap__box");
    if (null !== cateLeap) cateLeap.addEventListener("click", (e => {
        if (!cateLeapBox.classList.contains("cate-active")) {
            e.currentTarget.children[0].children[0].style.transform = `rotate(-180deg)`;
            cateLeapBox.classList.add("cate-active");
            cateLeap.classList.add("cate-btn-active");
        } else {
            e.currentTarget.children[0].children[0].style.transform = `rotate(0deg)`;
            cateLeap.classList.remove("cate-btn-active");
            cateLeapBox.classList.remove("cate-active");
        }
    }));
    function openCloseFilter() {
        if (null !== document.querySelectorAll(".filter-spoller")) document.querySelectorAll(".filter-spoller").forEach((el => {
            el.addEventListener("click", (eve => {
                if (!eve.currentTarget.children[1].classList.contains("filter-spoller-active")) {
                    document.querySelectorAll("#arrow-filter-spoller").forEach((e => e.style.transform = `rotate(0deg)`));
                    el.children[0].children[1].style.transform = `rotate(-180deg)`;
                    const filterBtns = document.querySelectorAll(".filter-spoller");
                    for (let i = 0; i < filterBtns.length; i++) {
                        const element = filterBtns[i];
                        if (void 0 !== element) {
                            element.classList.remove("filter-spoller-btn-active");
                            for (let i = 0; i < element.children.length; i++) {
                                const asd = element.children[i];
                                asd.classList.remove("filter-spoller-active");
                            }
                        }
                    }
                    eve.currentTarget.children[1].classList.add("filter-spoller-active");
                    eve.currentTarget.classList.add("filter-spoller-btn-active");
                } else {
                    el.children[0].children[1].style.transform = `rotate(0deg)`;
                    eve.currentTarget.children[1].classList.remove("filter-spoller-active");
                    eve.currentTarget.classList.remove("filter-spoller-btn-active");
                }
            }));
        }));
    }
    openCloseFilter();
    document.querySelectorAll(".filter-spoller-a-all").forEach((e => {
        e.addEventListener("click", (eve => {
            const arrParts = [ "7", "8", "9", "10", "math", "chemistry", "biology", "informatics", "physics", "ruLang" ];
            let partClass = e.classList[0].split("-")[3];
            arrParts.includes(partClass) ? displayFaculty(partClass) : false;
        })), false;
    }));
    let filterLiCollection = [ ...document.querySelectorAll(".exTasksLi") ];
    const displayFaculty = faculty => {
        filterLiCollection.forEach((e => {
            const arrSubjects = [ "math", "chemistry", "biology", "informatics", "physics", "ruLang" ];
            if (arrSubjects.includes(faculty)) {
                let ewq = filterLiCollection.filter((filter => filter.dataset.subject !== faculty));
                filterLiCollection.forEach((el => el.classList.remove("subject-none")));
                let subjTitle = document.querySelector(".title-subject");
                "math" == faculty ? subjTitle.innerHTML = `Математика` : false;
                "chemistry" == faculty ? subjTitle.innerHTML = `Химия` : false;
                "biology" == faculty ? subjTitle.innerHTML = `Биология` : false;
                "informatics" == faculty ? subjTitle.innerHTML = `Информатика` : false;
                "physics" == faculty ? subjTitle.innerHTML = `Физика` : false;
                "ruLang" == faculty ? subjTitle.innerHTML = `Русский язык` : false;
                ewq.forEach((el => el.classList.add("subject-none")));
            }
        }));
        const arrClasses = [ "7", "8", "9", "10" ];
        if (arrClasses.includes(faculty)) {
            filterLiCollection.forEach((el => el.classList.remove("class-none")));
            let ewq = filterLiCollection.filter((filter => filter.dataset.class !== faculty));
            document.querySelector(".title-class").innerHTML = `${faculty} класс`;
            ewq.forEach((el => el.classList.add("class-none")));
        }
    };
    if (document.querySelector(".reset-display-faculty")) document.querySelector(".reset-display-faculty").addEventListener("click", (e => {
        filterLiCollection.forEach((e => {
            document.querySelector(".title-subject").innerHTML = `Выберите предмет`;
            document.querySelector(".title-class").innerHTML = `Выберите класс`;
            e.classList.remove("subject-none", "class-none");
        }));
    }));
    const teamCrumbs = document.querySelector(".crumbs__title-last-teacher");
    const pathNameArr = [ "main-info", "structure", "documents", "education", "education-standarts", "MTO", "paid", "financial-activities", "translate-students", "available", "international" ];
    const showOrg = () => {
        document.querySelector(".crumbs__title-last").style.display = "block";
    };
    const hideOrg = () => {
        document.querySelector(".crumbs__title-last").style.display = "none";
    };
    let crumbsChanger = () => {
        currentCrumbs.innerHTML = `<svg id="arrow-bread" width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path d="M1 9.6001L5 5.6001L1 1.6001"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n  </svg>\n  ${document.title}`;
        const pathName = [ ...location.pathname ];
        console.log();
        pathName.shift();
        "index" == pathName.join("") || void 0 == pathName ? currentCrumbs.style.display = "none" : false;
        pathName.length <= 0 ? currentCrumbs.style.display = "none" : false;
        for (let i = 0; i < 5; i++) pathName.pop()[i];
        let teacherResult = pathName.slice(0, 7).join("");
        "teacher" == teacherResult ? teamCrumbs.style.display = "block" : false;
        let resultPathName = pathName.join("");
        pathNameArr.includes(resultPathName) ? showOrg() : hideOrg();
        "index" == resultPathName ? currentCrumbs.style.display = "none" : false;
    };
    crumbsChanger();
    window["FLS"] = true;
    isWebp();
})();