/*!
 * Squarespace Universal Filter - Filter any data on your site
 * Author: Michael Mashay <michael@squarespacewebsites.com>
 * License: Commercial License
 * 09.10.25
 */
!function() {
    function t() {
        return "ontouchstart"in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
    }
    function e() {
        const t = document.querySelector("meta[name=viewport]");
        if (null !== t) {
            let e = t.getAttribute("content")
              , i = /maximum\-scale=[0-9\.]+/g;
            e = i.test(e) ? e.replace(i, "maximum-scale=1.0") : [e, "maximum-scale=1.0"].join(", "),
            t.setAttribute("content", e)
        }
    }
    function i() {
        return /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !window.MSStream
    }
    function r(t) {
        var e = t ? new Date(t).toISOString() : (new Date).toISOString();
        return e.split(".")[0].substring(0, 15).replace(/\:/g, "-")
    }
    function a(t) {
        for (var e = {}, i = ("?" === t[0] ? t.substr(1) : t).split("&"), r = 0; r < i.length; r++) {
            var a = i[r].split("=");
            e[decodeURIComponent(a[0])] = decodeURIComponent((a[1] || "").replace(/\+/g, " "))
        }
        return e
    }
    function o(t) {
        for (var e = 0, i = t.length, r = 0; r < i; r++)
            e = (e << 5) - e + t.charCodeAt(r),
            e |= 0;
        return e
    }
    function s(t) {
        var e = {};
        return t.filter(function(t) {
            return !e.hasOwnProperty(t) && (e[t] = !0)
        })
    }
    function n(t, e, i) {
        if (t === e)
            return !0;
        if (null == t || null == e)
            return !1;
        if (t.length !== e.length)
            return !1;
        i && (t = t.slice(0).sort(),
        e = e.slice(0).sort());
        for (var r = 0; r < t.length; ++r)
            if (t[r] !== e[r])
                return !1;
        return !0
    }
    function l(t, e, i) {
        var r = document.getElementById(e);
        if (r && r.parentElement.removeChild(r),
        !document.getElementById(e)) {
            r = document.createElement("style");
            r.type = "text/css",
            r.id = e,
            r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(document.createTextNode(t)),
            i.appendChild(r)
        }
    }
    function c(t, e) {
        var i = []
          , r = t.nestedCategories.categoriesHash || t.nestedCategories.tree
          , a = t.nestedCategories.all;
        return e && e.categoryIds && r && (a && -1 == i.indexOf(a.displayName) && i.push(a.displayName),
        e.categoryIds.forEach(function(t) {
            var e = r[t];
            if (e && (-1 == i.indexOf(e.displayName) && i.push(e.displayName),
            e.parentCategoryId && r[e.parentCategoryId])) {
                -1 == i.indexOf(r[e.parentCategoryId].displayName) && i.push(r[e.parentCategoryId].displayName);
                var a = r[e.parentCategoryId].parentCategoryId;
                a && r[a] && -1 == i.indexOf(r[a].displayName) && i.push(r[a].displayName)
            }
        })),
        i
    }
    function d(t, e, i) {
        var r;
        return function() {
            var a = this
              , o = arguments
              , s = function() {
                r = null,
                i || t.apply(a, o)
            }
              , n = i && !r;
            clearTimeout(r),
            r = setTimeout(s, e),
            n && t.apply(a, o)
        }
    }
    function g(t) {
        for (var e = 0; e < t.childNodes.length; e++) {
            var i = t.childNodes[e];
            8 === i.nodeType || 3 === i.nodeType && !/\S/.test(i.nodeValue) ? (t.removeChild(i),
            e--) : 1 === i.nodeType && g(i)
        }
    }
    function u(t) {
        return t && 0 == t.indexOf("/") && (t = t.substr(1)),
        t && "/" == t[t.length - 1] && (t = t.substr(0, t.length - 1)),
        t
    }
    function p(t) {
        return t && (t = t.replace(/[\u00A0-\u9999<>\&]/g, function(t) {
            return "&#" + t.charCodeAt(0) + ";"
        })),
        t
    }
    function m(t, e, i, r, a, o) {
        if (i = i || document.getElementsByTagName("head")[0],
        i.querySelector("#" + e))
            return console.log("Already loaded", i.querySelector("#" + e)),
            void (r && r(this));
        var s = document.createElement("script");
        s.src = t,
        s.id = e,
        s.onload = function() {
            o && this.remove(),
            r && r(this)
        }
        ,
        s.onerror = function() {
            o && this.remove(),
            a && a(this)
        }
        ,
        i.appendChild(s)
    }
    function h(t, e) {
        for (var i = "", r = 0; r < t.childNodes.length; r++) {
            var a = t.childNodes[r];
            if ("#text" === a.nodeName && (i += a.nodeValue,
            e))
                break
        }
        return i.trim()
    }
    function f(t) {
        return t.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
    function v(t, e) {
        var i = parseFloat((t + "").replace(/[^.0-9]/g, ""))
          , r = (t + "").replace(/[^a-zA-Z-]/g, "").trim()
          , a = {
            k: 1e3,
            M: 1e6,
            G: 1e9,
            T: 1e12,
            P: 1e15,
            E: 1e18
        };
        return r && a[r] && (i *= a[r]),
        i
    }
    function b(t, e) {
        if (e = e || 0,
        window.IntlS && window.Intl.NumberFormat)
            return Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
                maximumSignificantDigits: e + 2
            }).format(t);
        var i, r = t < 0 ? "-" : "", a = [{
            value: 1,
            symbol: ""
        }, {
            value: 1e3,
            symbol: "k"
        }, {
            value: 1e6,
            symbol: "M"
        }, {
            value: 1e9,
            symbol: "G"
        }, {
            value: 1e12,
            symbol: "T"
        }, {
            value: 1e15,
            symbol: "P"
        }, {
            value: 1e18,
            symbol: "E"
        }], o = /\.0+$|(\.[0-9]*[1-9])0+$/;
        for (i = a.length - 1; i > 0 && !(t >= a[i].value); i--)
            ;
        return r + (t / a[i].value).toFixed(e).replace(o, "$1") + a[i].symbol
    }
    function y(t) {
        if (t.container && (t.container.one(".lightbox-link") || t.container.hasClass("lightbox-plugin-there"))) {
            try {
                window.openBundleLinksInLightbox && openBundleLinksInLightbox(".summary-title[href]:not(.lightbox-link),.summary-title-link[href]:not(.lightbox-link),.summary-read-more-link[href]:not(.lightbox-link),.summary-thumbnail-container[href]:not(.lightbox-link)"),
                window.pluginLightbox && pluginLightbox()
            } catch (t) {
                console.log(t)
            }
            t.container.addClass("lightbox-plugin-there")
        }
    }
    function w(t, e) {
        var i = document.createElement("div")
          , r = window.DOMParser && new window.DOMParser
          , a = null;
        try {
            if (r ? a = r.parseFromString(t, "text/html").body : (i.innerHTML = t,
            a = i),
            !e) {
                const t = a.querySelectorAll("style,script");
                t && t.forEach && t.forEach(function(t) {
                    t.remove()
                })
            }
            return a
        } catch (t) {
            console.log(t)
        }
    }
    function _(t, e) {
        var i, r = t.split("."), a = r.length, o = e || this;
        for (i = 0; i < a; i++)
            o = o && o[r[i]];
        return o
    }
    function C(t) {
        var e = []
          , i = function(t) {
            for (var r in t)
                if (t.hasOwnProperty(r) && t[r])
                    if (e.push(r),
                    t[r].length && "string" == typeof t[r] && t[r].indexOf(",") > -1) {
                        t[r] = t[r].split(",");
                        for (var a = 0; a < t[r].length; a++)
                            t[r][a] = (t[r][a] + "").trim(),
                            e.push(t[r][a])
                    } else
                        "object" != typeof t[r] || t[r].length ? "object" == typeof t[r] && t[r].forEach && t[r].forEach(function(t) {
                            "object" != typeof t || t.length ? e.push(t.trim()) : i(t)
                        }) : i(t[r])
        };
        return i(t),
        e
    }
    function S() {
        var t = document.createEvent("HTMLEvents");
        t.initEvent("resize", !0, !1),
        window.dispatchEvent(t)
    }
    function x(t, e) {
        return (Math.random() * (e - t) + t).toFixed(2)
    }
    function k(t, e) {
        var i = []
          , r = [];
        for (t.replace(/(\d+)|(\D+)/g, function(t, e, r) {
            i.push([e || 1 / 0, r || ""])
        }),
        e.replace(/(\d+)|(\D+)/g, function(t, e, i) {
            r.push([e || 1 / 0, i || ""])
        }); i.length && r.length; ) {
            var a = i.shift()
              , o = r.shift()
              , s = a[0] - o[0] || a[1].localeCompare(o[1]);
            if (s)
                return s
        }
        return i.length - r.length
    }
    function F(t, e, i) {
        var r = [];
        for (t = t.nextElementSibling; t && !t.f_matches(e); )
            !i || t.f_matches(i) ? (r.push(t),
            t = t.nextElementSibling) : t = t.nextElementSibling;
        return r
    }
    function O(t, e, i) {
        if (t = t && t.toString && t.toString(),
        !t)
            return "";
        var r = e ? "_no_change_case" : ""
          , a = t + r;
        if (yt[a])
            return yt[a];
        t = t.replace(/\u0401/g, "YO").replace(/\u0419/g, "I").replace(/\u0426/g, "TS").replace(/\u0423/g, "U").replace(/\u041A/g, "K").replace(/\u0415/g, "E").replace(/\u041D/g, "N").replace(/\u0413/g, "G").replace(/\u0428/g, "SH").replace(/\u0429/g, "SCH").replace(/\u0417/g, "Z").replace(/\u0425/g, "H").replace(/\u042A/g, "").replace(/\u0451/g, "yo").replace(/\u0439/g, "i").replace(/\u0446/g, "ts").replace(/\u0443/g, "u").replace(/\u043A/g, "k").replace(/\u0435/g, "e").replace(/\u043D/g, "n").replace(/\u0433/g, "g").replace(/\u0448/g, "sh").replace(/\u0449/g, "sch").replace(/\u0437/g, "z").replace(/\u0445/g, "h").replace(/\u044A/g, "'").replace(/\u0424/g, "F").replace(/\u042B/g, "I").replace(/\u0412/g, "V").replace(/\u0410/g, "a").replace(/\u041F/g, "P").replace(/\u0420/g, "R").replace(/\u041E/g, "O").replace(/\u041B/g, "L").replace(/\u0414/g, "D").replace(/\u0416/g, "ZH").replace(/\u042D/g, "E").replace(/\u0444/g, "f").replace(/\u044B/g, "i").replace(/\u0432/g, "v").replace(/\u0430/g, "a").replace(/\u043F/g, "p").replace(/\u0440/g, "r").replace(/\u043E/g, "o").replace(/\u043B/g, "l").replace(/\u0434/g, "d").replace(/\u0436/g, "zh").replace(/\u044D/g, "e").replace(/\u042F/g, "Ya").replace(/\u0427/g, "CH").replace(/\u0421/g, "S").replace(/\u041C/g, "M").replace(/\u0418/g, "I").replace(/\u0422/g, "T").replace(/\u042C/g, "'").replace(/\u0411/g, "B").replace(/\u042E/g, "YU").replace(/\u044F/g, "ya").replace(/\u0447/g, "ch").replace(/\u0441/g, "s").replace(/\u043C/g, "m").replace(/\u0438/g, "i").replace(/\u0442/g, "t").replace(/\u044C/g, "'").replace(/\u0431/g, "b").replace(/\u044E/g, "yu");
        var o = wt
          , s = _t;
        t = t.replace(/^\s+|\s+$/g, "").replace(/\'/g, "-").replace(/\"/g, "-").replace(/\#/g, "-hash-").replace(/\=/g, "-").replace(/\+/g, "plus-sign"),
        e || (t = t.toLowerCase(),
        o = Ct,
        s = St);
        var n = function() {
            for (var e = 0, i = o.length; e < i; e++)
                if (t.indexOf(o.charAt(e)) > -1)
                    return !0;
            return !1
        };
        if (n(t))
            for (var l = 0, c = o.length; l < c; l++) {
                var d = o.charAt(l);
                t.indexOf(o.charAt(l)) > -1 && (t = t.replace(new RegExp(d,"g"), s.charAt(l)))
            }
        for (l = 0; l < xt.length; l++)
            for (; -1 !== t.indexOf(xt[l]); )
                t = t.replace(xt[l], kt[l]);
        return t = t.replace(/\s+/g, "-").replace(/\-\-+/g, "-").replace(/\₤/g, "-gbp").replace(/\£/g, "-gbp").replace(/\$/g, "-usd").replace(/\€/g, "-eur").replace(/\&/g, "and").replace(/[^a-zA-Z0-9_\u3400-\u9FBF\s-]/g, "").replace(/\,/g, "-").replace(/\//g, "-").replace(/\:/g, "-").replace(/\;/g, "-"),
        yt[a] = t,
        o = s = null,
        t
    }
    function A(t) {
        if (!t)
            return t;
        for (var e = wt, i = _t, r = 0, a = e.length; r < a; r++) {
            var o = e.charAt(r);
            t.indexOf(e.charAt(r)) > -1 && (t = t.replace(new RegExp(o,"g"), i.charAt(r)))
        }
        return e = i = null,
        t
    }
    function P(t, e, i, r) {
        var a = 6372795;
        t *= Math.PI / 180,
        i *= Math.PI / 180,
        e *= Math.PI / 180,
        r *= Math.PI / 180;
        var o = Math.cos(t)
          , s = Math.cos(i)
          , n = Math.sin(t)
          , l = Math.sin(i)
          , c = r - e
          , d = Math.cos(c)
          , g = Math.sin(c)
          , u = Math.sqrt(Math.pow(s * g, 2) + Math.pow(o * l - n * s * d, 2))
          , p = n * l + o * s * d
          , m = Math.atan2(u, p);
        return parseFloat((m * a / 1e3).toFixed(2))
    }
    function I() {
        if (pt && pt.length) {
            var t = !1;
            Y.one("body").hasClass("collection-type-products") && (t = !0),
            pt.forEach(function(t) {
                t.isotope && (t.itemsWidthStyleNode && t._setItemsMaxWidthStyle(),
                t.isotope.layout()),
                t.loadImages(t.items),
                t.target.settings.hooks && t.target.settings.hooks.onResize && "function" == typeof t.target.settings.hooks.onResize && t.target.settings.hooks.onResize(t)
            }),
            t && Y.Global.fire("tweak:reset")
        }
    }
    function L(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }
    function q(t) {
        return t.replace(/(^\w{1})|(\s+\w{1})/g, function(t) {
            return t.toUpperCase()
        })
    }
    function d(t, e, i) {
        var r;
        return function() {
            var a = this
              , o = arguments
              , s = function() {
                r = null,
                i || t.apply(a, o)
            }
              , n = i && !r;
            clearTimeout(r),
            r = setTimeout(s, e),
            n && t.apply(a, o)
        }
    }
    function T(t, e) {
        return new Promise(function(i) {
            var r = {
                collection: {},
                items: []
            }
              , a = function() {
                Y.io(t, {
                    on: {
                        success: function(a, o) {
                            var s = o.responseText
                              , n = function(a) {
                                if (a)
                                    try {
                                        r = 0 == a.indexOf("LZString") ? JSON.parse(bt.decompressFromEncodedURIComponent(a.slice(8))) : JSON.parse(a),
                                        e && D(r, t, !0),
                                        i(r)
                                    } catch (t) {
                                        console.warn("error : " + t),
                                        i(r)
                                    }
                                else
                                    i(r)
                            };
                            if (s && s.indexOf('id="collectionsIndex"') > -1) {
                                if (s.indexOf('<textarea id="collectionsIndex" class="hidden" style="display:none">') > -1)
                                    s = s.split('<textarea id="collectionsIndex" class="hidden" style="display:none">')[1].split("</textarea>")[0];
                                else {
                                    var l = document.createElement("div");
                                    l.innerHTML = s;
                                    var c = l.querySelector("#collectionsIndex");
                                    s = c.value || c.querySelector(".sqs-block-content") && c.querySelector(".sqs-block-content").innerText || ""
                                }
                                n(s)
                            } else
                                n(s)
                        },
                        failure: function(t, e) {
                            console.warn("error : " + e.status),
                            i(r)
                        }
                    }
                })
            }
              , o = t
              , s = N(o);
            s && e ? i(s) : a()
        }
        )
    }
    function N(t) {
        try {
            var e = window.localStorage;
            t = t.replace(/\//g, "") + "_json";
            var i = t + "_expires";
            if (!t || !e)
                return !1;
            try {
                var r = e.getItem(i);
                if (r) {
                    r = parseInt(r);
                    var a = (new Date).getTime();
                    if (a > r)
                        return !1;
                    var o = JSON.parse(e.getItem(t));
                    return o
                }
                return !1
            } catch (t) {
                return console.log(t),
                !1
            }
        } catch (t) {
            return console.log(t),
            !1
        }
    }
    function D(t, e, i, r) {
        try {
            var a = window.localStorage
              , o = e;
            e = e.replace(/\//g, "").replace(/\,/g, "-") + "_json";
            var s = e + "_expires";
            if (r = r || 10,
            t && a) {
                var n = (new Date).getTime() + 6e4 * r
                  , l = {};
                if (l = JSON.stringify(t),
                l.length) {
                    o.indexOf("/") > -1 && a.getItem(o) && a.removeItem(o);
                    try {
                        a.setItem(e, l)
                    } catch (r) {
                        if (console.log(r.message || r),
                        !i && t && t.items && t.items.length)
                            for (var c = t.items.length - 1; c >= 0; c--)
                                t.items[c].body && (t.items[c].body = "y");
                        l = JSON.stringify(t);
                        try {
                            a.setItem(e, l),
                            console.log("Items body was reduced to fit localStorage quota")
                        } catch (t) {
                            console.log(t.message || t, "Still too heavy collection to save local.")
                        }
                    }
                    a.setItem(s, n)
                }
            }
        } catch (t) {
            console.log(t)
        }
    }
    function M(t) {
        if (t) {
            var e = t.search && (t.search.indexOf("?category=") > -1 || t.search.indexOf("?tag=") > -1 || t.search.indexOf("?year=") > -1 || t.search.indexOf("?month=") > -1) || t.pathname.indexOf("/category/") > -1 || t.pathname.indexOf("/tag/") > -1;
            return e
        }
        return !1
    }
    function E(t, e, i) {
        var r = e && e.target && e.target.settings.useSQSProxy;
        return new Promise(function(a) {
            function o(t, a) {
                var c = "";
                a && (c = "?" + a,
                t.indexOf("?") > -1 && (c = "&" + a));
                var d = "";
                fetch(t + c + d).then(function(t) {
                    return t.text()
                }).then(function(a) {
                    if (a) {
                        var c = n.parseFromString(a, "text/html").body
                          , d = l(c);
                        if (c.querySelector(e.target.items))
                            try {
                                d ? (s.html += c.querySelector(e.target.container) && c.querySelector(e.target.container).outerHTML || c.querySelector(e.target.items).parentElement.outerHTML || !1,
                                o(t, d)) : (s.html += c.querySelector(e.target.container) && c.querySelector(e.target.container).outerHTML || c.querySelector(e.target.items).parentElement.outerHTML || !1,
                                r && r.enabled && (!i || i && !i.noServerSave) && U(t, s, "main-content", r),
                                u(s))
                            } catch (t) {
                                console.warn("error : " + t),
                                u(s)
                            }
                        else
                            u(s)
                    } else
                        u(s)
                }).catch(function(t) {
                    console.warn("error : " + t),
                    u(s)
                })
            }
            var s = {
                html: ""
            }
              , n = window.DOMParser && new window.DOMParser
              , l = function(t) {
                var e = "";
                if (t) {
                    var i = t.querySelectorAll('a[href*="?offset="]');
                    if (!i || i.length,
                    i && i.length)
                        for (var r = i.length - 1; r >= 0; r--) {
                            var a = i[r];
                            a && -1 == a.search.indexOf("reverse") && (e = a.search.replace("?", ""))
                        }
                    else
                        i = t.querySelectorAll(".BlogList-item[data-offset]"),
                        e = i && i.length && i[i.length - 1] && i[i.length - 1],
                        e = (!e || !e.dataset.lastPage) && (!(!e || !e.dataset.offset) && "offset=" + e.dataset.offset)
                }
                return e
            }
              , c = ""
              , d = l(e.container._node.parentNode) || !0
              , g = M(window.location) || e.multipleCollectionsFetched && e.multipleCollectionsFetched.length || e.products_category_page || e.listCollection
              , u = function(t) {
                n = null,
                a(t)
            }
              , p = function() {
                d || g ? o(t, c) : u(s)
            };
            p()
        }
        )
    }
    function z(t, e, i, r) {
        var a = e.collection && e.collection.typeName;
        if (mt && mt.authenticatedAccount)
            return new Promise(function(t) {
                var i = !1
                  , r = "/api/content-service/product/1.1/websites/" + mt.website.id + "/products/" + e.collection.id + "/categories/tree";
                "lessons" == a && (r = "/api/lesson-service/1.0/websites/" + mt.website.id + "/lessons/" + e.collection.id + "/categories/tree");
                try {
                    Y.io(r, {
                        on: {
                            success: function(e, r) {
                                var a = r.responseText;
                                if (a && a.indexOf("categoryTree") > -1) {
                                    if (i = JSON.parse(a),
                                    i && i.categoryTree && i.categoryTree.length)
                                        for (var o = i.categoryTree.length - 1; o >= 0; o--)
                                            i.categoryTree[o] = {
                                                type: i.categoryTree[o].type,
                                                displayName: i.categoryTree[o].displayName,
                                                count: i.categoryTree[o].orderedItemCount,
                                                shortSlug: i.categoryTree[o].shortSlug,
                                                parentCategoryId: i.categoryTree[o].parentCategoryId,
                                                orderedItemIds: i.categoryTree[o].orderedItemIds,
                                                id: i.categoryTree[o].id
                                            };
                                    i && t(i)
                                } else
                                    t(i)
                            },
                            failure: function(e, r) {
                                console.warn("Get Nested Categories error : " + r.status),
                                t(i)
                            }
                        }
                    })
                } catch (e) {
                    t(i)
                }
            }
            );
        if (r && r.generated)
            return console.log("No need to try fetch new nested"),
            new Promise(function(t, e) {
                t(r)
            }
            );
        var o = mt && mt.website && mt.website.baseUrl && new URL(mt.website.baseUrl) || window.location
          , s = "https://tools.squarewebsites.org/sqs-response/" + o.hostname.replace(/\./g, "-") + "/" + i + "/" + (u(decodeURIComponent(t)).replace("?", "--query--").replace(/[^A-Za-z0-9-]+/g, "-") || "-") + "--categoriesSorting--.js";
        return new Promise(function(t, e) {
            fetch(s, {
                headers: {
                    "Content-Type": "text/javascript;charset=UTF-8"
                }
            }).then(function(t) {
                if (t.ok || t.status < 400)
                    return t.text();
                throw new Error("Something went wrong, response statis is: " + t.status)
            }).then(function(e) {
                if (e) {
                    var i = JSON.parse(e);
                    "object" == typeof i && (i.gotFromServer = !0),
                    t(i)
                } else
                    t(!1)
            }).catch(function(e) {
                console.log(e),
                t(!1)
            })
        }
        )
    }
    function B(t, e, i) {
        var a = i && i.target && i.target.settings.useSQSProxy
          , o = !1;
        i && i.target && i.target.settings.timelog && console.time("Get Items with HTML");
        var s = i.target.settings.hasOwnProperty("fetchCollectionSeparately") && null !== i.target.settings.fetchCollectionSeparately ? i.target.settings.fetchCollectionSeparately : !!i.container.ancestor('[data-controller="LessonsList"]') || !(i.itemsParent.hasClass("BlogList-inner") || i.items.size() && (i.items._nodes[0].classList.contains("blog-item") || i.items._nodes[0].classList.contains("ProductItem") || i.items._nodes[0].classList.contains("post-type-store-item")) || i.listCollection);
        return new Promise(function(n) {
            function l(t, g) {
                if (e)
                    fetch(t).then(function(t) {
                        if (t.ok || t.status < 400)
                            return t.text();
                        throw new Error("Something went wrong, response statis is: " + t.status)
                    }).then(function(r) {
                        if (r && r.indexOf('id="collectionsIndex"') > -1) {
                            if (r.indexOf('<textarea id="collectionsIndex" class="hidden" style="display:none">') > -1)
                                r = r.split('<textarea id="collectionsIndex" class="hidden" style="display:none">')[1].split("</textarea>")[0];
                            else {
                                var o = document.createElement("div");
                                o.innerHTML = r;
                                var s = o.querySelector("#collectionsIndex");
                                r = s.value || s.querySelector(".sqs-block-content") && s.querySelector(".sqs-block-content").innerText || ""
                            }
                            if (r)
                                try {
                                    0 == r.indexOf("LZString") ? d.items = JSON.parse(bt.decompressFromEncodedURIComponent(r.slice(8))) : d.items = JSON.parse(r),
                                    i.target.settings.useSessionCache && D(d, e, !0),
                                    a && a.enabled && U(t, d, "main-content", a),
                                    i && i.target && i.target.settings.timelog && console.timeEnd("Get Items with HTML"),
                                    d.items[0] && d.items[0].nestedCategories && d.items[0].nestedCategories.tree && (d.nestedCategories = d.items[0].nestedCategories,
                                    d.items.splice(0, 1)),
                                    n(d)
                                } catch (t) {
                                    console.warn("error : " + t),
                                    n(d)
                                }
                            else
                                n(d),
                                i && i.target && i.target.settings.timelog && console.timeEnd("Get Items with HTML")
                        } else
                            n(d),
                            i && i.target && i.target.settings.timelog && console.timeEnd("Get Items with HTML")
                    }).catch(function(t) {
                        console.error(t),
                        n(d)
                    });
                else if (s)
                    V(t, i, {
                        noServerSave: !0
                    }).then(function(e) {
                        E(t, i, {
                            noServerSave: !0
                        }).then(function(r) {
                            if (e.html = r.html,
                            d = e,
                            e.nestedCategories && e.nestedCategories.categories && e.nestedCategories.categories.length && e.nestedCategories.categories && e.nestedCategories.categories[0].id && (console.log("we have categories ids there!!"),
                            e.nestedCategories.all && (e.nestedCategories.all.allCategory = !0,
                            e.nestedCategories.categories.unshift(e.nestedCategories.all)),
                            d.nestedCategories = e.nestedCategories,
                            i.target.settings.filter && i.target.settings.filter.followNewProductsCategories && i.regenerateAllowedStructure(d.nestedCategories)),
                            r.html || console.log("No additional items were fetched", r.html),
                            a) {
                                o && i._updateFilterData(d);
                                var s = function() {
                                    n(d),
                                    !i.multipleCollectionsFetched && U(t, d, "page-context", a, !1)
                                };
                                e.nestedCategories && i.target.settings.filter.followCategoriesSorting && (!i.categoriesSorting || i.categoriesSorting && (i.categoriesSorting + "").length > 3) ? (console.log("Filter is trying to get categories sorting..."),
                                z(t, e, "page-context", {}).then(function(t) {
                                    t && t.categoryTree && t.categoryTree.length ? (d.categoriesSorting = {},
                                    t.categoryTree.forEach(function(t) {
                                        "ROOT" !== t.type && (d.categoriesSorting[t.displayName] = t.orderedItemIds)
                                    }),
                                    i.categoriesSorting = d.categoriesSorting,
                                    i._sortGrid()) : t.gotFromServer && (delete t.gotFromServer,
                                    i.categoriesSorting = t,
                                    i._sortGrid()),
                                    console.log("Filter got categories sorting..."),
                                    s()
                                })) : s()
                            } else
                                n(d);
                            i && i.target && i.target.settings.timelog && console.timeEnd("Get Items with HTML")
                        })
                    });
                else {
                    var u = t.indexOf("?") > -1 ? "&format=page-context" : "?format=page-context";
                    u += "&cache=" + r(),
                    g && (u += "&offset=" + g),
                    i.isEventsCollection && (u += "&view=list"),
                    fetch(t + u).then(function(t) {
                        if (t.ok || t.status < 400)
                            return t.json();
                        throw new Error("Something went wrong, response statis is: " + t.status)
                    }).then(function(e) {
                        var r = !!e.upcoming || !!e.past || !!e.items || !!e.collection && !!e.collection.collections;
                        if (r && (e.collection && (e.collection.tags && delete e.collection.tags,
                        e.collection.categories && delete e.collection.categories,
                        d.collection = e.collection),
                        e.upcoming && (d.upcoming = d.upcoming.concat(e.upcoming)),
                        e.past && (d.past = d.past.concat(e.past)),
                        e.items && (d.items = d.items.concat(e.items)),
                        e.collection.collections && (d.items = d.items.concat(e.collection.collections)),
                        e.collection && e.collection.typeName && "events" == e.collection.typeName && (d.items = d.items.concat(e.upcoming, e.past))),
                        g = e.offset && e.offset !== g ? e.offset : e.pagination && e.pagination.nextPageOffset && g !== e.pagination.nextPageOffset ? e.pagination.nextPageOffset : "",
                        (e.collection && "products" === e.collection.typeName || e.collection && "lessons" === e.collection.typeName) && !0,
                        e.squarespace && e.squarespace["main-content"] && d.items && d.items.length > i.existedItems.size()) {
                            var s = e.squarespace["main-content"].replace(/<squarespace:escape>/g, "").replace(/<\/squarespace:escape>/g, "")
                              , u = w(s) || Y.Node.create(s);
                            u && (i.target && i.target.settings && i.target.settings.listCollection && i.target.settings.listCollection.getItemsHTMLOnly ? u._node || u._nodes ? u.all(i.target.items).each(function(t) {
                                d.html += t._node.outerHTML || t._node.nodeValue
                            }) : u.querySelectorAll && u.querySelectorAll(i.target.items).forEach(function(t) {
                                d.html += t.outerHTML || t.nodeValue
                            }) : d.html += u.innerHTML ? u.innerHTML : u.get("innerHTML"))
                        }
                        if (e.nestedCategories && !d.nestedCategories && (d.nestedCategories = e.nestedCategories),
                        g && !0,
                        g) {
                            i.hasOwnProperty("__all_loaded") ? r ? {
                                collection: e.collection || {},
                                items: e.items,
                                past: e.past,
                                nestedCategories: e.nestedCategories,
                                upcoming: e.upcoming
                            } : {
                                items: e.items
                            } : d,
                            i.__all_loaded = !1,
                            l(t, g)
                        } else {
                            if (!d.html && e.squarespace && e.squarespace["main-content"]) {
                                s = e.squarespace["main-content"].replace(/<squarespace:escape>/g, "").replace(/<\/squarespace:escape>/g, ""),
                                u = w(s) || Y.Node.create(s);
                                u && (i.target && i.target.settings && i.target.settings.listCollection && i.target.settings.listCollection.getItemsHTMLOnly ? u._node || u._nodes ? u.all(i.target.items).each(function(t) {
                                    d.html += t._node.outerHTML || t._node.nodeValue
                                }) : u.querySelectorAll && u.querySelectorAll(i.target.items).forEach(function(t) {
                                    d.html += t.outerHTML || t.nodeValue
                                }) : d.html += u.innerHTML ? u.innerHTML : u.get("innerHTML"))
                            }
                            i.__all_loaded = !0,
                            i.target.settings.useSessionCache && D(d, t),
                            c = d.items && d.items.length;
                            var p = d.items;
                            if (c || !d.upcoming.length && !d.past.length || (p = d.upcoming.concat(d.past),
                            c = p.length),
                            c && p.forEach(function(t) {
                                t.updatedOn && t.updatedOn + "-"
                            }),
                            e.nestedCategories && e.nestedCategories.categories && e.nestedCategories.categories.length && e.nestedCategories.categories && e.nestedCategories.categories[0].id && (console.log("we have categories ids there!!"),
                            e.nestedCategories.all && (e.nestedCategories.all.allCategory = !0,
                            e.nestedCategories.categories.unshift(e.nestedCategories.all)),
                            d.nestedCategories = e.nestedCategories,
                            i.target.settings.filter && i.target.settings.filter.followNewProductsCategories && i.regenerateAllowedStructure(d.nestedCategories)),
                            a) {
                                o && i._updateFilterData(d);
                                var m = function() {
                                    n(d),
                                    !i.multipleCollectionsFetched && U(t, d, "page-context", a, !1)
                                };
                                e.nestedCategories && i.target.settings.filter.followCategoriesSorting && (!i.categoriesSorting || i.categoriesSorting && (i.categoriesSorting + "").length > 3) ? (console.log("Filter is trying to get categories sorting..."),
                                z(t, e, "page-context", {}).then(function(t) {
                                    t && t.categoryTree && t.categoryTree.length ? (d.categoriesSorting = {},
                                    t.categoryTree.forEach(function(t) {
                                        "ROOT" !== t.type && (d.categoriesSorting[t.displayName] = t.orderedItemIds)
                                    }),
                                    i.categoriesSorting = d.categoriesSorting,
                                    i._sortGrid()) : t.gotFromServer && (delete t.gotFromServer,
                                    i.categoriesSorting = t,
                                    i._sortGrid()),
                                    console.log("Filter got categories sorting..."),
                                    m()
                                })) : m()
                            } else
                                n(d);
                            i && i.target && i.target.settings.timelog && console.timeEnd("Get Items with HTML")
                        }
                    }).catch(function(t) {
                        console.error(t),
                        n(d)
                    })
                }
            }
            var c, d = {
                collection: {},
                past: [],
                upcoming: [],
                items: [],
                html: "",
                nestedCategories: null
            };
            e && (e.indexOf("http://") > -1 || e.indexOf("https://") > -1) && (t = e + "",
            e = !1);
            var g = e || t
              , u = function() {
                var e = N(g);
                e && i.target.settings.useSessionCache ? (setTimeout(function() {
                    l(t)
                }, 1e3),
                n(e)) : l(t)
            };
            if (a && a.enabled && (!i || i && !i.multipleCollectionsFetched)) {
                var p = e ? "main-content" : "page-context"
                  , m = window.location.hostname.replace(/\./g, "-") + "_" + p + "_" + t
                  , h = N(m);
                R(t, p, h, a).then(function(e) {
                    if (e && e.items && (e.html || "page-context" == p) && (e.items.length || e.upcoming && e.upcoming.length || e.past && e.past.length)) {
                        var r = e.items && e.items.length
                          , s = e.items;
                        if (r || !d.upcoming.length && !d.past.length || (s = d.upcoming.concat(d.past),
                        r = s.length),
                        r && s.forEach(function(t) {
                            t.updatedOn && t.updatedOn + "-"
                        }),
                        e.timestamp && (d.timestamp = e.timestamp),
                        e.categoriesSorting)
                            if ("string" == typeof e.categoriesSorting)
                                try {
                                    i.categoriesSorting = JSON.parse(e.categoriesSorting)
                                } catch (t) {
                                    console.log(t)
                                }
                            else
                                i.categoriesSorting = e.categoriesSorting;
                        (e.nestedCategories && e.nestedCategories.tree || e.nestedCategories && e.nestedCategories.categories && e.nestedCategories.categories.length) && (d.nestedCategories = e.nestedCategories,
                        i.target.settings.filter && i.target.settings.filter.followNewProductsCategories && i.regenerateAllowedStructure(e.nestedCategories)),
                        e.html && 0 == e.html.indexOf("LZString") && (e.html = bt.decompressFromEncodedURIComponent(e.html.slice(8))),
                        n(e),
                        o = !0,
                        e.nestedCategories && !e.nestedCategories.categoriesHash || !r || !h || !h.saved || h && h.minutes && h.minutes != a.cacheTime || !a.cacheTime || window.top.Static && window.top.Static.IN_BACKEND ? (console.log("run usual additionally"),
                        u()) : e.nestedCategories && i.target.settings.filter.followCategoriesSorting && (!i.categoriesSorting || i.categoriesSorting && (i.categoriesSorting + "").length > 3) && (console.log("Filter is trying to get categories sorting there..."),
                        z(t, e, "page-context", {}).then(function(t) {
                            t && t.categoryTree && t.categoryTree.length ? (d.categoriesSorting = {},
                            t.categoryTree.forEach(function(t) {
                                "ROOT" !== t.type && (d.categoriesSorting[t.displayName] = t.orderedItemIds)
                            }),
                            i.categoriesSorting = d.categoriesSorting,
                            i._sortGrid()) : t.gotFromServer && (delete t.gotFromServer,
                            i.categoriesSorting = t,
                            i._sortGrid()),
                            console.log("Filter got categories sorting...")
                        }))
                    } else
                        u()
                }).catch(function(t) {
                    console.log(t),
                    u()
                })
            } else
                u()
        }
        )
    }
    function W(t, e) {
        return t && t.replace ? t.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x60;/g, "`") : t
    }
    function j(t) {
        if (t = W(t),
        t) {
            var e = document.createElement("div");
            e.innerHTML = t,
            t = e.textContent,
            e = null
        }
        return t
    }
    function U(t, e, i, a, s) {
        if (!a.enabled)
            return !1;
        var n = function() {
            if (a.removeFields && a.removeFields.length && (a.removeFields = (a.removeFields + "").split(","),
            e && e.items && e.items.length))
                for (var n = e.items.length - 1; n >= 0; n--)
                    if (e.items[n].postItemInjectCode && delete e.items[n].postItemInjectCode,
                    a.removeFields.forEach(function(t) {
                        t = t.trim(),
                        e.items[n].hasOwnProperty(t) && delete e.items[n][t]
                    }),
                    e.items[n].items && e.items[n].items.length && a.removeFields.indexOf("internalImages") > -1)
                        for (var l = e.items[n].items.length - 1; l >= 0; l--) {
                            var c = e.items[n].items[l].oembed;
                            e.items[n].items[l] = {
                                assetUrl: e.items[n].items[l].assetUrl,
                                systemDataId: e.items[n].items[l].systemDataId,
                                id: e.items[n].items[l].id,
                                originalSize: e.items[n].items[l].originalSize || "",
                                parentId: e.items[n].items[l].parentId
                            },
                            c && (e.items[n].items[l].oembed = c)
                        }
            var d = mt && mt.website && mt.website.baseUrl || window.location.origin;
            e.timestamp = r(),
            t.length > 250 && (t = "/" + o(t)),
            e.nestedCategories && e.nestedCategories.categoryTree && (e.nestedCategories.categoryTree = !1),
            e.html && e.html;
            var g = JSON.stringify({
                url: d + decodeURIComponent(t),
                content: e
            });
            console.log("Size to save: ", (g.length / 1048576).toFixed(2) + "MB");
            var u = function(e) {
                var r = window.location.hostname.replace(/\./g, "-") + "_" + i + "_" + t;
                if (e) {
                    r = r.replace(/\//g, "").replace(/\,/g, "-") + "_json";
                    var o = r + "_expires";
                    try {
                        window.localStorage.removeItem(r),
                        window.localStorage.removeItem(o)
                    } catch (t) {
                        console.warn(t)
                    }
                } else
                    D({
                        saved: !0,
                        minutes: a.cacheTime,
                        timestamp: (new Date).getTime()
                    }, r, !0, a.cacheTime),
                    console.log("Saved")
            };
            s ? (console.log("Saving"),
            u()) : (console.log("Pushing"),
            fetch("https://tools.squarewebsites.org/api/save-sqs-response/" + i + "/", {
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                },
                method: "POST",
                mode: "cors",
                credentials: "omit",
                body: g
            }).then(function(t) {
                return t.json()
            }).then(function(t) {
                t.success && t.file_saved ? u() : (console.warn(t),
                u(!0))
            }).catch(function(t) {
                console.log(t),
                u(!0)
            }))
        };
        "requestIdleCallback"in window ? window.requestIdleCallback(function() {
            n()
        }) : n()
    }
    function R(t, e, i, a) {
        var s = mt && mt.website && mt.website.baseUrl && new URL(mt.website.baseUrl) || window.location;
        t.length > 250 && (t = o(t));
        var n = s.hostname.replace(/\./g, "-") + "/" + e + "/" + (u(decodeURIComponent(t)).replace("?", "--query--").replace(/[^A-Za-z0-9-]+/g, "-") || "-")
          , l = "https://tools.squarewebsites.org/sqs-response/" + n + ".js";
        !i || !i.saved || i && i.minutes && i.minutes != a.cacheTime || !a.cacheTime ? l += "?ver=" + r() : i && i.timestamp && (l += "?ver=" + r());
        var c = l.replace(".js", "-jsonp.js")
          , d = !1;
        return new Promise(function(t, e) {
            var i = function() {
                return fetch(l, {
                    headers: {
                        "content-type": "text/javascript;charset=UTF-8",
                        "x-requested-with": "XMLHttpRequest"
                    },
                    method: "GET",
                    mode: "cors",
                    credentials: "omit"
                }).then(function(t) {
                    if (!t.ok)
                        throw new Error("HTTP status " + response.status);
                    return t.json()
                }).then(function(e) {
                    t(e)
                }).catch(function(t) {
                    e(t)
                })
            };
            c && d ? m(c, "uf-data-" + (new Date).getTime(), null, function() {
                window.__universal_filter_data && window.__universal_filter_data[n] ? t(window.__universal_filter_data[n]) : i()
            }, function() {
                i()
            }) : i()
        }
        )
    }
    function V(t, e, i) {
        var a = e && e.target && e.target.settings.useSQSProxy
          , o = ""
          , s = ""
          , n = !1;
        return new Promise(function(l) {
            function c(t, g) {
                var u = {
                    format: "json",
                    view: "list",
                    cache: r()
                };
                g = g && (g.indexOf("%26") > -1 || g.indexOf("&") > -1) ? g.split("%26")[0].split("&")[0] : g || "",
                g && (u.offset = g),
                fetch(t + (t.indexOf("?") > -1 ? "&" : "?") + new URLSearchParams(u).toString()).then(function(t) {
                    if (t.ok || t.status < 400)
                        return t.json();
                    throw new Error("Something went wrong, response statis is: " + t.status)
                }).then(function(r) {
                    var u;
                    try {
                        if (r.collection.tags && delete r.collection.tags,
                        r.collection.categories && delete r.collection.categories,
                        d.collection = r.collection,
                        r.items && r.items.length || r.upcoming && r.upcoming.length || r.past && r.past.length)
                            d.items = r.items ? d.items.concat(r.items) : d.items.concat(r.upcoming, r.past),
                            r.pagination && r.pagination.nextPage && g !== r.pagination.nextPageUrl.split("offset=")[1] ? c(t, r.pagination.nextPageUrl.split("offset=")[1]) : (e.target.settings.useSessionCache && D(d, t),
                            u = d.items && d.items.length,
                            u && d.items.forEach(function(t) {
                                t.updatedOn && (s += t.updatedOn + "-")
                            }),
                            r.nestedCategories && r.nestedCategories && r.nestedCategories.categories.length && r.nestedCategories.categories[0].id && (r.nestedCategories.all && (r.nestedCategories.all.allCategory = !0,
                            r.nestedCategories.categories.unshift(r.nestedCategories.all)),
                            d.nestedCategories = r.nestedCategories,
                            e.target.settings.filter && e.target.settings.filter.followNewProductsCategories && e.regenerateAllowedStructure(d.nestedCategories)),
                            a ? (n && e._updateFilterData(d),
                            (!i || i && !i.noServerSave) && U(t, d, "json", a, !1),
                            l(d)) : l(d));
                        else if (e.target.settings.useSessionCache && D(d, t),
                        u = d.items && d.items.length,
                        u && d.items.forEach(function(t) {
                            t.updatedOn && (s += t.updatedOn + "-")
                        }),
                        a) {
                            n && e._updateFilterData(d);
                            var p = o == s || !0;
                            window.top.Static && window.top.Static.IN_BACKEND && (p = !1),
                            d.collection && d.collection.collections && (p = !1);
                            var m = function() {
                                l(d),
                                U(t, d, "json", a, p)
                            };
                            d.nestedCategories && e.target.settings.filter.followCategoriesSorting && (!e.categoriesSorting || e.categoriesSorting && (e.categoriesSorting + "").length > 3) ? (console.log("Filter is trying to get categories sorting..."),
                            z(t, r, "page-context", {}).then(function(t) {
                                t && t.categoryTree && t.categoryTree.length ? (d.categoriesSorting = {},
                                t.categoryTree.forEach(function(t) {
                                    "ROOT" !== t.type && (d.categoriesSorting[t.displayName] = t.orderedItemIds)
                                }),
                                e.categoriesSorting = d.categoriesSorting,
                                e._sortGrid()) : t.gotFromServer && (delete t.gotFromServer,
                                e.categoriesSorting = t,
                                e._sortGrid()),
                                console.log("Filter got categories sorting..."),
                                m()
                            })) : m()
                        } else
                            l(d)
                    } catch (t) {
                        return ft && console.log("JSON Parse failed!"),
                        l([]),
                        !1
                    }
                }).catch(function(t) {
                    return console.error(t),
                    l([]),
                    !1
                })
            }
            var d = {
                collection: {},
                items: []
            }
              , g = t
              , u = function() {
                var i = N(g);
                i && e.target.settings.useSessionCache ? (setTimeout(function() {
                    c(t)
                }, 1e4),
                l(i)) : c(t)
            };
            if (a && a.enabled && (!i || i && !i.noServerSave)) {
                var p = "json"
                  , m = window.location.hostname.replace(/\./g, "-") + "_" + p + "_" + t
                  , h = N(m);
                R(t, p, h, a).then(function(t) {
                    if (t && t.items) {
                        var i = t.items && t.items.length;
                        i && t.items.forEach(function(t) {
                            t.updatedOn && (o += t.updatedOn + "-")
                        }),
                        (t.nestedCategories && t.nestedCategories.tree || t.nestedCategories && t.nestedCategories.categories && t.nestedCategories.categories.length) && (d.nestedCategories = t.nestedCategories,
                        e.target.settings.filter && e.target.settings.filter.followNewProductsCategories && e.regenerateAllowedStructure(t.nestedCategories)),
                        l(t),
                        n = !0,
                        (!i || !h || !h.saved || h && h.minutes && h.minutes != a.cacheTime || !a.cacheTime || window.top.Static && window.top.Static.IN_BACKEND) && u()
                    } else
                        u()
                }).catch(function(t) {
                    console.log(t),
                    u()
                })
            } else
                u()
        }
        )
    }
    function G() {
        function t() {
            window.innerWidth != window.prevWindowWidth && (window.prevWindowWidth = window.innerWidth),
            I(),
            ct = null,
            window._scrollBarWidth = window.innerWidth && document.body && document.body.offsetWidth ? window.innerWidth - document.body.offsetWidth : 0
        }
        window._scrollBarWidth = window.innerWidth && document.body && document.body.offsetWidth ? window.innerWidth - document.body.offsetWidth : 0,
        ct && clearTimeout(ct),
        ct = setTimeout(t, 400)
    }
    function Z() {
        function t() {
            pt && pt.length && pt.forEach(function(t) {
                t.container._node.getBoundingClientRect().top < 10 && t.target.settings.closeOnOverScroll && (t.container.hasClass("mobile-panel-open") || (t.customFiltersWrapper.all(".archive-dropdown-toggle-checkbox").set("checked", !1),
                t.customFiltersWrapper.all(".archive-dropdown-toggle-checkbox").each(function(t) {
                    t._node.dispatchEvent(new Event("change"))
                }),
                t.searchContainer && t.searchContainer.removeClass("active"))),
                t.target.settings.hooks && t.target.settings.hooks.onScroll && "function" == typeof t.target.settings.hooks.onScroll && t.target.settings.hooks.onScroll(t)
            }),
            dt = null
        }
        dt && clearTimeout(dt),
        dt = setTimeout(t, 60)
    }
    function H() {
        pt && pt.length && pt.forEach(function(t) {
            t._destroy()
        }),
        gt && (window.clearInterval(gt),
        gt = null),
        pt = [],
        ut && (ut.detach(),
        ut = null),
        window.removeEventListener("resize", G),
        ft && console.log("destroy")
    }
    function Q(t, e) {
        for (var i in e)
            e.hasOwnProperty(i) && (t[i] && "object" == typeof e[i] ? Q(t[i], e[i]) : t[i] = e[i]);
        return t
    }
    function J(t, e) {
        var i = !1
          , r = [];
        if (e && "string" != typeof e)
            return r;
        if (e && e.indexOf("--noQtyInStock") > -1 && (i = !0,
        e = e.replace("--noQtyInStock", "")),
        t.variantOptions && t.variantOptions.hasOwnProperty(e) && i)
            return t.variantOptions[e];
        var a = t && t.variants ? t.variants : !(!t || !t.structuredContent) && t.structuredContent.variants;
        if (a && a.length)
            for (var o = 0; o < a.length; o++) {
                var s = i ? !!i && (a[o].attributes[e] || a[o][e]) : (a[o].hasOwnProperty("qtyInStock") && a[o].qtyInStock || a[o].hasOwnProperty("unlimited") && a[o].unlimited) && (a[o].attributes[e] || a[o][e]);
                "string" == typeof s && (s = s.trim()),
                s && -1 == r.indexOf(s) && r.push(s)
            }
        return r[0] && r[0].indexOf && r[0].indexOf(","),
        r.length && ((r + "").split(",").length,
        r.length),
        "68644f552298e56c57b15e5b" == t.id && console.log("arr", r, t),
        r
    }
    function $(t) {
        var e = {
            width: [],
            height: [],
            weight: [],
            sku: [],
            prices: [],
            qtyInStock: 0
        }
          , i = t.structuredContent;
        i && 2 === i.productType && (e.qtyInStock = 1e10);
        var r = t && t.variants ? t.variants : !(!t || !t.structuredContent) && t.structuredContent.variants;
        if (r && r.length) {
            for (var a = 0, o = 0; o < r.length; o++) {
                var s = (r[o].onSale ? r[o].salePrice : r[o].price) / 100;
                -1 === e.prices.indexOf(s) && e.prices.push(s);
                var n = r[o].optionValues;
                ["width", "height", "len", "weight", "sku"].forEach(function(t) {
                    var i = r[o][t] && (r[o][t] + "").trim();
                    i && e[t] && -1 == e[t].indexOf(i) && e[t].push(i)
                }),
                e.qtyInStock || (r[o].unlimited ? e.qtyInStock = 1e10 : a += r[o].qtyInStock),
                n && n.length && n.forEach(function(t) {
                    var i = t.optionName
                      , r = t.value;
                    "string" == typeof r && (r = r.trim()),
                    e[i] || (e[i] = []),
                    r && -1 == e[i].indexOf(r) && e[i].push(r)
                })
            }
            e.qtyInStock || (e.qtyInStock = a)
        }
        for (var l in e.prices.sort(function(t, e) {
            return t - e
        }),
        e)
            e.hasOwnProperty(l) && e[l].length && (e[l] + "").indexOf(", ") > -1 && (e[l] = (e[l] + "").split(", ").map(function(t) {
                return t.trim()
            }));
        return e
    }
    function X(t) {
        if (t.variantOptions && t.variantOptions.hasOwnProperty("qtyInStock"))
            return t.variantOptions.qtyInStock;
        var e = t.structuredContent;
        if (!e)
            return "";
        if (e && e.productType && 2 === e.productType)
            return 1e10;
        for (var i = 0, r = 0; r < e.variants.length; r++) {
            var a = e.variants[r];
            if (a.unlimited)
                return 1e10;
            i += a.qtyInStock
        }
        return i
    }
    function K(t) {
        if (t && t.container && t.settings && t.settings.virtualFilter && t.settings.virtualFilter.enabled && (t.items = ".virtual-filter-item"),
        t && t.container && t.items) {
            var e = Y.all(t.container)
              , i = e.size();
            if (i || (console.log("containers were not found"),
            window.wm$ && (console.log("WM scripts on page, check if container has  div[data-controller] and replace with .collection-content-wrapper"),
            t.container && (t.container + "").indexOf("div[data-controller]") > -1 && (t.container = t.container.replace("div[data-controller]", ".collection-content-wrapper"),
            e = Y.all(t.container),
            i = e.size()))),
            i) {
                var r = "Container: " + t.container + "\nItems: " + t.items;
                if (t.settings && t.settings.isotope && t.settings.isotope.enabled && (r = r + "\nIsotope: " + JSON.stringify(t.settings.isotope)),
                setTimeout(function() {
                    rt(r)
                }, 8e4),
                window.customFiltersInitInterval) {
                    var a = 0;
                    gt = setInterval(function() {
                        if (a >= i)
                            window.clearInterval(gt),
                            gt = null,
                            ft && console.log("customFilters built");
                        else {
                            var r = e.item(a);
                            (r.ancestor(".sqs-block-summary-v2") || r.ancestor(".sqs-block-gallery")) && (r = r.ancestor(".sqs-block")),
                            r.hasClass("custom-filter-container") || (t.index = a,
                            r.CustomFilter = new it(r,t),
                            pt.push(r.CustomFilter))
                        }
                        a++
                    }, window.customFiltersInitInterval)
                } else
                    e.each(function(e, i) {
                        if (e.CustomFilter && e.CustomFilter.target.settings.noDestroy)
                            return console.log("No Filter reload there because of noDestroy setting!"),
                            !1;
                        t.settings.hooks && t.settings.hooks.beforeCreate && "function" == typeof t.settings.hooks.beforeCreate && t.settings.hooks.beforeCreate(t, e),
                        (e.ancestor(".sqs-block-summary-v2") || e.ancestor(".sqs-block-gallery")) && (e = e.ancestor(".sqs-block")),
                        e.hasClass("custom-filter-container") || t.noNeedCreate || e.hasClass("ProductItem-relatedProducts") || e.hasClass("relatedProducts") || e.get("parentNode").hasClass("relatedProducts") || e.get("parentNode").hasClass("product-related-products") || (t.index = i,
                        e.CustomFilter = new it(e,t),
                        pt.push(e.CustomFilter))
                    })
            } else
                Y.one("body") && Y.one("body").addClass("no-custom-filter-activated"),
                ft && console.log("No Filter containers found", e)
        } else
            Y.one("body") && Y.one("body").addClass("no-custom-filter-activated")
    }
    function tt(t, e) {
        return t = t.replace(/{{(\w+)}}/g, function(t, i) {
            return e && e.hasOwnProperty(i) ? e[i] : "auto"
        }),
        t
    }
    function et(t, e, i) {
        var r = document.createElement("link");
        r.href = t,
        r.rel = "stylesheet",
        r.onload = function() {
            i && i(null, {
                nodes: [this]
            })
        }
        ,
        e = e || document.getElementsByTagName("head")[0],
        e.appendChild(r)
    }
    function it(t, e) {
        if (t) {
            var i = {
                container: ".ProductList, .product-list [data-product-list-layout]",
                items: ".hentry, .product-list-item",
                settings: {
                    loadFastClick: !0,
                    hidden: !1,
                    noDestroy: !1,
                    runOnDOMReady: !1,
                    wrapFilterContainer: !1,
                    placeFiltersTo: null,
                    shuffle: !1,
                    position: "top",
                    align: "left",
                    sticky: {
                        enabled: !1,
                        top: "6%"
                    },
                    noResultMessage: "",
                    noResultOnStart: !1,
                    customClasses: "",
                    view: "dropdowns",
                    showItemsCount: !0,
                    itemsCount: {
                        enabled: !0,
                        text: "",
                        positionOrder: 1
                    },
                    showCheckboxes: !1,
                    closeOptionsOnSelect: !0,
                    closeOnOverScroll: !1,
                    closeOnMouseOut: !1,
                    accordionDropdowns: !1,
                    keepDropdownsOpen: !1,
                    keepDropdownsOpenOnInit: !1,
                    handleImagesLoading: !0,
                    stripHTMLComments: !1,
                    deEscapeHTML: !0,
                    urlQuery: !0,
                    listCollection: {
                        enabled: !0,
                        container: null,
                        getItemsHTMLOnly: !0,
                        itemLinkSelector: "a"
                    },
                    reInitSSLayoutForNewItems: !1,
                    requestAttrWithAjax: !0,
                    waitForAjax: !1,
                    collectionUrl: null,
                    useLocalCache: !1,
                    compatCatTagInQuery: !0,
                    useSQSProxy: {
                        enabled: !0,
                        cacheTime: 10,
                        removeFields: "commentState,commentCount,fulfilledExternally,excerpt,variants,digitalGoods,salePriceCents,salePriceMoney,priceMoney,priceCents,isSubscribable,onSale,variantOptionOrdering,additionalFieldsForm,additionalFieldsFormId,authorId,internalImages,contentType,customAddButtonText,useCustomAddButtonText,unsaved,systemDataVariants,systemDataSourceType,pendingPushedServices,pushedServices,displayIndex"
                    },
                    useHistory: !1,
                    initState: {},
                    parentFilter: null,
                    performanceMode: !1,
                    optionsDescription: {
                        container: null
                    },
                    topSection: {
                        enabled: !1,
                        align: "center",
                        display: "flex",
                        items: "Location|Home-Type|Search|Sort"
                    },
                    virtualFilter: {
                        enabled: !1,
                        realFilterPageUrl: "/all",
                        goButton: {
                            title: "Results"
                        },
                        showResults: {
                            enabled: !0
                        }
                    },
                    updateFilterOptions: {
                        enabled: !0,
                        nonExistOptions: {
                            hide: !1,
                            disable: !1,
                            disableHard: !1,
                            moveBottom: !1
                        },
                        showOptionsCounters: !1,
                        optionsCounterWrap: "- ()"
                    },
                    colorSwatches: {
                        enabled: !1,
                        circles: !1,
                        align: "center",
                        size: {
                            width: "32px",
                            height: "32px"
                        },
                        tooltips: {
                            enabled: !1,
                            background: "#000",
                            color: "#fff",
                            position: "top",
                            borderRadius: "2px",
                            padding: "5px 10px",
                            fontSize: "14px",
                            fontFamily: "inherit"
                        },
                        backgrounds: {
                            Black: "#000000",
                            Red: "#B90116",
                            Yellow: "#FFD35C",
                            Pink: "#FDBFC7"
                        },
                        getAttr: "variant|Color"
                    },
                    pagination: {
                        enabled: !1,
                        pageSize: 20,
                        place: "bottom",
                        scrollToTop: {
                            duration: 600
                        },
                        backgroundColor: "transparent",
                        margin: "3% 0",
                        padding: "0",
                        align: "center",
                        pagesRange: 3,
                        pagesAround: 2,
                        showPrevNext: {
                            enabled: !1,
                            hideItems: !1,
                            next: "Next",
                            prev: "Prev"
                        },
                        items: {
                            style: "square",
                            width: "32px",
                            margin: "20px",
                            borderWidth: "2px",
                            backgroundColor: "#fff",
                            activeBackgroundColor: "#555",
                            color: "#000",
                            activeColor: "#fff"
                        },
                        loadMoreButton: {
                            enabled: !1,
                            text: "Load more...",
                            alignment: "center",
                            size: "small",
                            style: "primary",
                            ignoreLZSSetings: !1
                        }
                    },
                    mobilePanel: {
                        enabled: !0,
                        forceOnWidth: "500px",
                        useAsDesktop: !1,
                        triggerButtonName: "Filter",
                        align: "left",
                        closeButtonPosition: "bottom",
                        closeButtonText: "",
                        keepDropdownsOpen: null,
                        closeOnSelect: !1,
                        closeOnSearch: !1,
                        closeOnOutsideClick: !1
                    },
                    advancedMap: {
                        advancedMapContainer: null,
                        activateMarkerInfoOnItemHover: !0,
                        activateItemOnMarkerClick: !0,
                        activateMarkerInfoOnItemClick: !1,
                        desactivateMarkerOnItemMouseOut: !1,
                        updateMapBound: !0,
                        followMapBounds: !1,
                        autocomplete: {
                            enabled: !1,
                            positionOrder: 100,
                            text: "Search Zip",
                            minLength: 3,
                            customSearchFunc: !1,
                            timeout: 300,
                            dimension: {
                                enabled: !0,
                                val: "",
                                values: {}
                            },
                            radius: {
                                enabled: !0,
                                hidden: !1,
                                val: 100,
                                step: 1,
                                max: 200,
                                min: 10
                            },
                            circle: {
                                strokeColor: "#65bedc",
                                strokeWeight: 1,
                                strokeOpacity: 1,
                                fillColor: "#65bedc",
                                fillOpacity: .4
                            },
                            options: {
                                types: ["(regions)"],
                                componentRestrictions: {
                                    country: "usa"
                                }
                            }
                        }
                    },
                    externalFilterLinks: {
                        enabled: !1,
                        hideFilters: !1,
                        ignoreFilterName: !1,
                        container: null,
                        items: "a[href]"
                    },
                    simpleFilter: {
                        anim: !0,
                        layoutAnim: !1,
                        respectSSAnimations: !1,
                        show: {
                            effect: "scale",
                            transitionDuration: 300,
                            stagger: 16,
                            easing: "ease-in-out"
                        },
                        hide: {
                            effect: "scale",
                            transitionDuration: 200,
                            stagger: 36,
                            easing: "ease-in-out"
                        }
                    },
                    isotope: {
                        enabled: !1,
                        transitionDuration: 300,
                        columnWidth: null,
                        gutter: null,
                        layoutMode: null,
                        stamp: null
                    },
                    mixitup: {
                        enabled: !1,
                        transitionDuration: 300
                    },
                    clearAllButton: {
                        enabled: !1,
                        show: !1,
                        text: "Clear All",
                        place: "before"
                    },
                    sort: {
                        enabled: !0,
                        title: "Sort",
                        positionOrder: 99,
                        soldGoAfter: !1,
                        items: []
                    },
                    filter: {
                        enabled: !0,
                        useItemsClassesForData: !1,
                        cacheOptions: !0,
                        setCategoriesClasses: !0,
                        setTagsClasses: !0,
                        followNewProductsCategories: !0,
                        useDataAttributes: !0,
                        transliterateFunction: null,
                        followCategoriesSorting: !0,
                        category: {
                            positionOrder: 2,
                            main: "categoriesDropdown",
                            name: "Category",
                            sort: "asc",
                            getAttr: "categories",
                            multiple: !0,
                            strict: !0,
                            hideDefaultLabelIfDirty: !1,
                            hideValueLabel: !1,
                            showAll: !1
                        },
                        tag: {
                            positionOrder: 3,
                            main: "tagsDropdown",
                            hideValueLabel: !1,
                            name: "Tag",
                            sort: "asc",
                            getAttr: "tags",
                            multiple: !0,
                            strict: !0,
                            hideDefaultLabelIfDirty: !1,
                            showAll: !1
                        },
                        items: []
                    },
                    search: {
                        enabled: !0,
                        positionOrder: 100,
                        text: "Search",
                        minLength: 1,
                        submitOnEnter: !1,
                        timeout: 400,
                        latinize: !0,
                        ignoreChars: "",
                        avoidSmartyPunctuation: !0,
                        regExpWordsDelimiter: null,
                        highlightSearch: !1,
                        searchFunc: "title|exst_text|body|categories|tags|excerpt",
                        excludeRelatedSummaries: !0,
                        customSearchFunc: !1
                    },
                    productsBadges: null,
                    products: {
                        purchaseButtons: {
                            enabled: !1
                        }
                    },
                    hooks: {
                        beforeCreate: null,
                        beforeInit: null,
                        onInit: null,
                        afterInit: null,
                        htmlListFetched: null,
                        htmlListJSONTransform: null,
                        onStart: null,
                        onDropdownsBuilt: null,
                        afterRequest: null,
                        beforeFilter: null,
                        onFilter: null,
                        afterFilter: null,
                        onResize: null
                    }
                }
            };
            if (this.target = Q(i, e),
            this.container = t,
            this.target.settings.filter.transliterateFunction && "function" == typeof this.target.settings.filter.transliterateFunction) {
                var r = this
                  , o = O;
                O = function(t) {
                    return t = o(r.target.settings.filter.transliterateFunction(t) || t),
                    t
                }
            }
            this.slugify = O;
            r = this;
            if (window.location.search && window.location.search.indexOf("=") > -1) {
                var s = window.location.search.substring(1);
                try {
                    var n = a(s);
                    n["filter-timelog"] && (this.target.settings.timelog = !0),
                    n["filter-debug"] && (ft = !0),
                    n["filter-disable-images-loading"] && (this.target.settings.handleImagesLoading = !1),
                    n["filter-enable-pagination"] && (this.target.settings.pagination.enabled = !0,
                    this.target.settings.pagination.pageSize = parseInt(n["filter-enable-pagination"])),
                    n["filter-enable-load-more"] && (this.target.settings.pagination.enabled = !0,
                    this.target.settings.pagination.pageSize = parseInt(n["filter-enable-load-more"]),
                    this.target.settings.pagination.loadMoreButton.ignoreLZSSetings = !0,
                    this.target.settings.pagination.loadMoreButton.enabled = !0)
                } catch (t) {
                    console.log(t)
                }
            }
            this.table_block = this.container.one("table.custom-table-block");
            var l = this.container._node && this.container._node.dataset.controller && this.container._node.dataset.controller.indexOf("Gallery") > -1;
            try {
                if (this.table_block)
                    this.table_block.hasClass("custom-table-inited") ? this._init() : this.table_block._node.addEventListener("table-init", function(t) {
                        r._init()
                    }, !0);
                else if (l) {
                    var c = this.container.one('>div[class*="-wrapper"]')
                      , d = this.container._node.dataset.controller;
                    if (c && (d.indexOf("Strips") > -1 || d.indexOf("Masonry") > -1 || d.indexOf("Reel") > -1))
                        if (c._node.className && c._node.className.indexOf("--ready") > -1 || d.indexOf("Reel") > -1)
                            setTimeout(function() {
                                r._init()
                            }, 60);
                        else {
                            var g = !1
                              , u = new MutationObserver(function(t) {
                                t.forEach(function(t) {
                                    if ("class" == t.attributeName) {
                                        var e = t.target.className && t.target.className.indexOf("--ready") > -1;
                                        e && !g && (console.log("class ready added!"),
                                        g = !0,
                                        setTimeout(function() {
                                            r._init()
                                        }, 60))
                                    }
                                })
                            }
                            );
                            u.observe(c._node, {
                                attributes: !0
                            })
                        }
                    else
                        setTimeout(function() {
                            r._init()
                        }, 60)
                } else
                    this._init()
            } catch (t) {
                console.log("Init Error", t)
            }
        }
    }
    function rt(t) {}
    function at(t) {
        t = t || window;
        var e = t.document.body;
        if (!t.SQSLayoutObserver && e) {
            var i = d(function(t) {
                Y.Global.fire("SQSLayout:edit", {
                    context: t
                })
            }, 2e3, !1);
            t.SQSLayoutObserver = new MutationObserver(function(e) {
                e.forEach(function(e) {
                    e.type && "attributes" == e.type && "class" === e.attributeName && e.target.className && e.target.className.length && (e.target.className.indexOf("sqs-layout-rendering") > -1 || e.target.className.indexOf("sqs-editing") > -1) && i(t)
                })
            }
            ),
            t.SQSLayoutObserver.observe(e, {
                childList: !0,
                subtree: !0,
                attributes: !0
            })
        }
    }
    function ot() {
        let t = document.querySelectorAll('.sqs-block[data-definition-name="website.components.map"]');
        for (let e = 0; e < t.length; e++) {
            const i = t[e];
            if (i.classList.add("sqs-block-map", "map-block"),
            i) {
                const t = i.querySelector("div[data-context]") && i.querySelector("div[data-context]").dataset.context;
                t && (t + "").indexOf("terrain") > -1 && i.setAttribute("data-map-json", t)
            }
        }
    }
    function st() {
        ht = ht || window.Y.one("body");
        try {
            window.customFilterSettings || (window.customFilterSettings = {
                targets: [{
                    container: ".ProductList,.collection-type-products.view-list .main-content",
                    items: ".hentry, .product-list-item",
                    settings: {
                        pagination: {
                            enabled: !0,
                            pageSize: 30
                        },
                        search: {
                            enabled: !0
                        },
                        sort: {
                            enabled: !0,
                            items: [{
                                name: "Price",
                                order: "asc|desc"
                            }]
                        }
                    }
                }]
            }),
            window.customFilterSettings && (ut = Y.Global.on("advanced-maps:initialized", function(t) {
                if (t = t._node || t,
                t) {
                    var e = t.parentNode && t.parentNode.className && t.parentNode.className.indexOf("map-block") > -1 ? t.parentNode.id : t && t.closest && t.closest(".map-block") || "";
                    pt && pt.length && pt.forEach(function(i) {
                        var r = i.target.settings.advancedMap;
                        if (e && r && r.advancedMapContainer) {
                            if (t._map_data && (!i.coll_data || !i.coll_data.items || i.coll_data.items.length < t._map_data.length) && (i.coll_data.items = t._map_data),
                            t.classList.add("map-is-used-with-filter"),
                            t._map_config && t._markers && t._markers[0] && t._markers[0].outsideItem && !i.items.size() ? (i.target.items = ".outside-marker-item",
                            i.target.settings.performanceMode = !0,
                            i.container.one('.custom-maps-outside-markers-info[data-position="relative"]') || (r.activateMarkerInfoOnItemHover = !1),
                            i.items = i.container.all(".outside-marker-item"),
                            i.items.size() && i.items.addClass("custom-filter-grid-item"),
                            i.itemsParent = i.items.item(0) && i.items.item(0).get("parentNode"),
                            i.itemsParent && i.itemsParent.addClass("custom-filter-grid"),
                            i.container.addClass("cf-request-finished"),
                            i._addItemsAttributes(),
                            i._buildDropdowns(),
                            i._checkInitState(),
                            i._sortGrid(!0)) : (i._addItemsAttributes(),
                            i._buildDropdowns(),
                            i._checkInitState(),
                            i._sortGrid(!0)),
                            i.target.settings.noResultMessage && i.container.get("parentNode").one(".cf-no-results-wrapper"),
                            r.autocomplete && r.autocomplete.enabled && i.mapAutocompleteContainer && i._initMapAutoComplete(),
                            r.followMapBounds && t.__map) {
                                r.updateMapBound = !1;
                                var a = d(function(e) {
                                    i.needBoundsChange || i._followMapBounds(t),
                                    i.needBoundsChange = !1
                                }, 100, !1);
                                t.__map.addListener("bounds_changed", a)
                            }
                            i.target.settings.hooks && i.target.settings.hooks.onMapInit && "function" == typeof i.target.settings.hooks.onMapInit && i.target.settings.hooks.onMapInit(i)
                        } else
                            console.log("Can not work with Map")
                    })
                }
            }),
            window.customFilterSettings.targets && window.customFilterSettings.targets.length && (ft && console.log("find targets"),
            window.customFilterSettings.targets.forEach(function(t) {
                t.container && t.items && (t.container + "").indexOf(".collection-type-products.view-list .list-grid") > -1 && (t.container = (t.container + "").replace(/\.collection-type-products.view-list \.list-grid/g, ".collection-type-products.view-list .list-grid, .product-list [data-product-list-layout]"),
                t.items = (t.items + "").indexOf(".product-list-item") > -1 ? t.items : t.items.replace(/\.hentry/g, ".hentry, .product-list-item")),
                t.settings ? ((t.container && (t.container + "").indexOf("sqs-block-map") || t.settings && t.settings.advancedMap && t.settings.advancedMap.advancedMapContainer) && ot(),
                t.settings.runOnDOMReady ? (ft && console.log("Waiting DOM Ready"),
                Y.once("domready", function() {
                    ft && console.log("DOM Ready"),
                    setTimeout(function() {
                        K(t),
                        pt && pt.length && pt.forEach(function(t) {
                            t._registerChildFilters()
                        })
                    }, t.settings.runDelay || 60)
                })) : t.settings.runDelay ? setTimeout(function() {
                    K(t),
                    pt && pt.length && pt.forEach(function(t) {
                        t._registerChildFilters()
                    })
                }, t.settings.runDelay) : K(t)) : (console.log("No Settings"),
                document.body && document.body.removeAttribute && document.body.removeAttribute("data-cf-filter-not-active"))
            }),
            S()),
            window.addEventListener("resize", G, !1),
            window.addEventListener("scroll", Z, !1)),
            Y.fire("custom-filter:check-child-filters")
        } catch (t) {
            console.warn(t)
        }
    }
    function nt() {
        console.log("Run Universal Filter"),
        document.body && document.body.setAttribute && (document.body.setAttribute("data-cf-filter-not-active", !0),
        window.customFilterSettings && window.customFilterSettings.enableDefaultCategoriesNav && document.body.setAttribute("data-enable-default-categories-nav", !0)),
        st(),
        at(window),
        window._scrollBarWidth = window.innerWidth && document.body && document.body.offsetWidth ? window.innerWidth - document.body.offsetWidth : 0,
        setTimeout(function() {
            pt && pt.length && pt.forEach(function(t) {
                t._registerChildFilters()
            })
        }, 100)
    }
    function lt() {
        window.CustomSQSFilter = it;
        var t = function() {
            window.Y && (window.addEventListener("mercury:load", nt),
            window.addEventListener("mercury:unload", H),
            nt())
        };
        !window.Y || "interactive" !== document.readyState && "complete" !== document.readyState ? document.addEventListener("DOMContentLoaded", function e() {
            document.removeEventListener("DOMContentLoaded", e, !1),
            setTimeout(function() {
                ft && console.log("before Filter", window.Y, document.readyState),
                t()
            }, 16)
        }, !1) : t()
    }
    var ct, dt, gt, ut, pt = [], mt = window.Static && window.Static.SQUARESPACE_CONTEXT && window.Static.SQUARESPACE_CONTEXT, ht = window.Y && Y.one("body"), ft = !1, vt = "undefined" != typeof InstallTrigger;
    Element.prototype.f_matches || (Element.prototype.f_matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(t) {
        var e = this.parentElement || this.parentNode;
        e || (e = document.createDocumentFragment(),
        e.appendChild(this));
        for (var i = e.querySelectorAll(t), r = i.length; --r >= 0 && i.item(r) !== this; )
            ;
        return r > -1
    }
    ),
    Object.size = function(t) {
        var e, i = 0;
        for (e in t)
            t.hasOwnProperty(e) && i++;
        return i
    }
    ;
    var bt = function() {
        function t(t, e) {
            if (!r[t]) {
                r[t] = {};
                for (var i = 0; i < t.length; i++)
                    r[t][t.charAt(i)] = i
            }
            return r[t][e]
        }
        var e = String.fromCharCode
          , i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$"
          , r = {}
          , a = {
            compressToEncodedURIComponent: function(t) {
                return null == t ? "" : a._compress(t, 6, function(t) {
                    return i.charAt(t)
                })
            },
            decompressFromEncodedURIComponent: function(e) {
                return null == e ? "" : "" == e ? null : (e = e.replace(/ /g, "+"),
                a._decompress(e.length, 32, function(r) {
                    return t(i, e.charAt(r))
                }))
            },
            compress: function(t) {
                return a._compress(t, 16, function(t) {
                    return e(t)
                })
            },
            _compress: function(t, e, i) {
                if (null == t)
                    return "";
                var r, a, o, s = {}, n = {}, l = "", c = "", d = "", g = 2, u = 3, p = 2, m = [], h = 0, f = 0;
                for (o = 0; o < t.length; o += 1)
                    if (l = t.charAt(o),
                    Object.prototype.hasOwnProperty.call(s, l) || (s[l] = u++,
                    n[l] = !0),
                    c = d + l,
                    Object.prototype.hasOwnProperty.call(s, c))
                        d = c;
                    else {
                        if (Object.prototype.hasOwnProperty.call(n, d)) {
                            if (d.charCodeAt(0) < 256) {
                                for (r = 0; r < p; r++)
                                    h <<= 1,
                                    f == e - 1 ? (f = 0,
                                    m.push(i(h)),
                                    h = 0) : f++;
                                for (a = d.charCodeAt(0),
                                r = 0; r < 8; r++)
                                    h = h << 1 | 1 & a,
                                    f == e - 1 ? (f = 0,
                                    m.push(i(h)),
                                    h = 0) : f++,
                                    a >>= 1
                            } else {
                                for (a = 1,
                                r = 0; r < p; r++)
                                    h = h << 1 | a,
                                    f == e - 1 ? (f = 0,
                                    m.push(i(h)),
                                    h = 0) : f++,
                                    a = 0;
                                for (a = d.charCodeAt(0),
                                r = 0; r < 16; r++)
                                    h = h << 1 | 1 & a,
                                    f == e - 1 ? (f = 0,
                                    m.push(i(h)),
                                    h = 0) : f++,
                                    a >>= 1
                            }
                            g--,
                            0 == g && (g = Math.pow(2, p),
                            p++),
                            delete n[d]
                        } else
                            for (a = s[d],
                            r = 0; r < p; r++)
                                h = h << 1 | 1 & a,
                                f == e - 1 ? (f = 0,
                                m.push(i(h)),
                                h = 0) : f++,
                                a >>= 1;
                        g--,
                        0 == g && (g = Math.pow(2, p),
                        p++),
                        s[c] = u++,
                        d = String(l)
                    }
                if ("" !== d) {
                    if (Object.prototype.hasOwnProperty.call(n, d)) {
                        if (d.charCodeAt(0) < 256) {
                            for (r = 0; r < p; r++)
                                h <<= 1,
                                f == e - 1 ? (f = 0,
                                m.push(i(h)),
                                h = 0) : f++;
                            for (a = d.charCodeAt(0),
                            r = 0; r < 8; r++)
                                h = h << 1 | 1 & a,
                                f == e - 1 ? (f = 0,
                                m.push(i(h)),
                                h = 0) : f++,
                                a >>= 1
                        } else {
                            for (a = 1,
                            r = 0; r < p; r++)
                                h = h << 1 | a,
                                f == e - 1 ? (f = 0,
                                m.push(i(h)),
                                h = 0) : f++,
                                a = 0;
                            for (a = d.charCodeAt(0),
                            r = 0; r < 16; r++)
                                h = h << 1 | 1 & a,
                                f == e - 1 ? (f = 0,
                                m.push(i(h)),
                                h = 0) : f++,
                                a >>= 1
                        }
                        g--,
                        0 == g && (g = Math.pow(2, p),
                        p++),
                        delete n[d]
                    } else
                        for (a = s[d],
                        r = 0; r < p; r++)
                            h = h << 1 | 1 & a,
                            f == e - 1 ? (f = 0,
                            m.push(i(h)),
                            h = 0) : f++,
                            a >>= 1;
                    g--,
                    0 == g && (g = Math.pow(2, p),
                    p++)
                }
                for (a = 2,
                r = 0; r < p; r++)
                    h = h << 1 | 1 & a,
                    f == e - 1 ? (f = 0,
                    m.push(i(h)),
                    h = 0) : f++,
                    a >>= 1;
                for (; ; ) {
                    if (h <<= 1,
                    f == e - 1) {
                        m.push(i(h));
                        break
                    }
                    f++
                }
                return m.join("")
            },
            decompress: function(t) {
                return null == t ? "" : "" == t ? null : a._decompress(t.length, 32768, function(e) {
                    return t.charCodeAt(e)
                })
            },
            _decompress: function(t, i, r) {
                var a, o, s, n, l, c, d, g = [], u = 4, p = 4, m = 3, h = "", f = [], v = {
                    val: r(0),
                    position: i,
                    index: 1
                };
                for (a = 0; a < 3; a += 1)
                    g[a] = a;
                for (s = 0,
                l = Math.pow(2, 2),
                c = 1; c != l; )
                    n = v.val & v.position,
                    v.position >>= 1,
                    0 == v.position && (v.position = i,
                    v.val = r(v.index++)),
                    s |= (n > 0 ? 1 : 0) * c,
                    c <<= 1;
                switch (s) {
                case 0:
                    for (s = 0,
                    l = Math.pow(2, 8),
                    c = 1; c != l; )
                        n = v.val & v.position,
                        v.position >>= 1,
                        0 == v.position && (v.position = i,
                        v.val = r(v.index++)),
                        s |= (n > 0 ? 1 : 0) * c,
                        c <<= 1;
                    d = e(s);
                    break;
                case 1:
                    for (s = 0,
                    l = Math.pow(2, 16),
                    c = 1; c != l; )
                        n = v.val & v.position,
                        v.position >>= 1,
                        0 == v.position && (v.position = i,
                        v.val = r(v.index++)),
                        s |= (n > 0 ? 1 : 0) * c,
                        c <<= 1;
                    d = e(s);
                    break;
                case 2:
                    return ""
                }
                for (g[3] = d,
                o = d,
                f.push(d); ; ) {
                    if (v.index > t)
                        return "";
                    for (s = 0,
                    l = Math.pow(2, m),
                    c = 1; c != l; )
                        n = v.val & v.position,
                        v.position >>= 1,
                        0 == v.position && (v.position = i,
                        v.val = r(v.index++)),
                        s |= (n > 0 ? 1 : 0) * c,
                        c <<= 1;
                    switch (d = s) {
                    case 0:
                        for (s = 0,
                        l = Math.pow(2, 8),
                        c = 1; c != l; )
                            n = v.val & v.position,
                            v.position >>= 1,
                            0 == v.position && (v.position = i,
                            v.val = r(v.index++)),
                            s |= (n > 0 ? 1 : 0) * c,
                            c <<= 1;
                        g[p++] = e(s),
                        d = p - 1,
                        u--;
                        break;
                    case 1:
                        for (s = 0,
                        l = Math.pow(2, 16),
                        c = 1; c != l; )
                            n = v.val & v.position,
                            v.position >>= 1,
                            0 == v.position && (v.position = i,
                            v.val = r(v.index++)),
                            s |= (n > 0 ? 1 : 0) * c,
                            c <<= 1;
                        g[p++] = e(s),
                        d = p - 1,
                        u--;
                        break;
                    case 2:
                        return f.join("")
                    }
                    if (0 == u && (u = Math.pow(2, m),
                    m++),
                    g[d])
                        h = g[d];
                    else {
                        if (d !== p)
                            return null;
                        h = o + o.charAt(0)
                    }
                    f.push(h),
                    g[p++] = o + h.charAt(0),
                    u--,
                    o = h,
                    0 == u && (u = Math.pow(2, m),
                    m++)
                }
            }
        };
        return a
    }()
      , yt = {}
      , wt = "ÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛàáäâèéëêìíïîòóöôùúüûÑñÇç·®©"
      , _t = "AAAAEEEEIIIIOOOOUUUUaaaaeeeeiiiioooouuuunncc-rc"
      , Ct = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·®©"
      , St = "aaaaaeeeeeiiiiooooouuuunc-rc";
    const xt = ["ου", "ΟΥ", "Ού", "ού", "αυ", "ΑΥ", "Αύ", "αύ", "ευ", "ΕΥ", "Εύ", "εύ", "α", "Α", "ά", "Ά", "β", "Β", "γ", "Γ", "δ", "Δ", "ε", "Ε", "έ", "Έ", "ζ", "Ζ", "η", "Η", "ή", "Ή", "θ", "Θ", "ι", "Ι", "ί", "Ί", "ϊ", "ΐ", "Ϊ", "κ", "Κ", "λ", "Λ", "μ", "Μ", "ν", "Ν", "ξ", "Ξ", "ο", "Ο", "ό", "Ό", "π", "Π", "ρ", "Ρ", "σ", "Σ", "ς", "τ", "Τ", "υ", "Υ", "ύ", "Ύ", "ϋ", "ΰ", "Ϋ", "φ", "Φ", "χ", "Χ", "ψ", "Ψ", "ω", "Ω", "ώ", "Ώ"]
      , kt = ["ou", "ou", "ou", "ou", "au", "au", "au", "au", "eu", "eu", "eu", "eu", "a", "a", "a", "a", "b", "b", "g", "g", "d", "d", "e", "e", "e", "e", "z", "z", "h", "h", "h", "h", "th", "th", "i", "i", "i", "i", "i", "i", "i", "k", "k", "l", "l", "m", "m", "n", "n", "ks", "ks", "o", "o", "o", "o", "p", "p", "r", "r", "s", "s", "s", "t", "t", "y", "y", "y", "y", "y", "y", "y", "f", "f", "x", "x", "ps", "ps", "o", "o", "o", "o"];
    window.prevWindowWidth = window.innerWidth,
    it.prototype = {
        addVirtualItems: function(t, e, i) {
            e && e.length && (this.coll_data.items = e),
            i && i.nestedCategories && (this.coll_data.nestedCategories = i.nestedCategories,
            this.regenerateAllowedStructure(this.coll_data.nestedCategories)),
            t && t.addClass("custom-filter-grid-item");
            var r = this;
            if (r.target.settings.hooks && r.target.settings.hooks.onAddVirtualItems)
                try {
                    "function" == typeof r.target.settings.hooks.onAddVirtualItems && r.target.settings.hooks.onAddVirtualItems(r, e, i)
                } catch (t) {
                    console.error(t)
                }
            this.virtual_list && this.virtual_list.size() ? this.virtual_list = this.virtual_list.concat(t) : t && t.size() && this.existedItems && this.existedItems.size() && this.existedItems.item(0).getAttribute("id") != t.item(0).getAttribute("id") && !this.existedItems.item(0).hasClass("summary-item") ? this.virtual_list = this.existedItems.concat(t) : t && t.size() ? this.virtual_list = t : this.virtual_list = this.container.all(this.target.items),
            r.requestComplete = !0,
            r.virtual_active = !0,
            r._addItemsAttributes(!1, r.virtual_list),
            r._buildDropdowns(),
            r._checkInitState(),
            r.customFiltersWrapper && (!r.customFiltersWrapper.one(".archive-group-name-link.active") || r.customFiltersWrapper.one(".archive-group-name-link.active") && r.customFiltersWrapper.one(".archive-group-name-link.active").getAttribute("data-filter-val")),
            r._sortGrid(!0),
            r.container.addClass("cf-request-finished")
        },
        regenerateAllowedStructure: function(t) {
            if (t) {
                var e = this
                  , i = ""
                  , r = {}
                  , a = tagsSlugs = {}
                  , o = t.categoryTree || t.categories || []
                  , s = t.tree || {};
                if (t.categories)
                    o.forEach(function(t) {
                        var i = t.displayName
                          , o = t.id;
                        r[i] = {},
                        s[o] = {
                            displayName: i
                        },
                        a[i] = {
                            shortSlug: t.shortSlug
                        },
                        "ROOT" !== t.type && t.orderedItemIds && (e.categoriesSorting || (e.categoriesSorting = {}),
                        e.categoriesSorting[t.displayName] = t.orderedItemIds),
                        t.children && t.children.length && t.children.forEach(function(t) {
                            var e = t.displayName
                              , n = t.id;
                            r[i][e] = [],
                            s[n] = {
                                displayName: e,
                                parentCategoryId: o
                            },
                            a[e] = {
                                shortSlug: t.shortSlug
                            },
                            t.children && t.children.length && t.children.forEach(function(t) {
                                var o = t.displayName
                                  , l = t.id;
                                r[i][e].push(o),
                                s[l] = {
                                    displayName: o,
                                    parentCategoryId: n
                                },
                                a[o] = {
                                    shortSlug: t.shortSlug
                                }
                            })
                        })
                    });
                else {
                    if (!o.length)
                        for (var n in s)
                            s.hasOwnProperty(n) && (o.push(s[n]),
                            s[n].type && "ROOT" == s[n].type && (i = n));
                    o && o.length && (o.forEach(function(t) {
                        "ROOT" == t.type && (i = t.id),
                        "ROOT" !== t.type && t.orderedItemIds && (e.categoriesSorting || (e.categoriesSorting = {}),
                        e.categoriesSorting[t.displayName] = t.orderedItemIds)
                    }),
                    o.forEach(function(t) {
                        t.parentCategoryId == i && (r[t.displayName] = {},
                        a[t.displayName] = t)
                    }),
                    o.forEach(function(t) {
                        if (t.parentCategoryId !== i) {
                            var e = s[t.parentCategoryId] && s[t.parentCategoryId].displayName
                              , a = !(!s[t.parentCategoryId] || !s[t.parentCategoryId].parentCategoryId || s[t.parentCategoryId].parentCategoryId === i) && s[t.parentCategoryId].parentCategoryId;
                            e && t.displayName && r[e] && (r[e][t.displayName] = []),
                            a && s[a] && s[a].displayName && s[a] && r[s[a].displayName] && r[s[a].displayName][e].push(t.displayName)
                        }
                    }))
                }
                for (var l in e.getFilterAttrObj)
                    if (e.getFilterAttrObj.hasOwnProperty(l) && "categories" == e.getFilterAttrObj[l].attr) {
                        e.getFilterAttrObj[l].optionsStructure = r;
                        var c = C(r);
                        e.getFilterAttrObj[l].allowedOptions = c,
                        e.getFilterAttrObj[l].categoriesSlugs = a,
                        e.getFilterAttrObj[l].sort = "asAllowed";
                        var d = {};
                        if (c.length)
                            for (var g = 0, u = c.length; g < u; g++)
                                d[c[g]] = g;
                        e.getFilterAttrObj[l].allowedHash = d
                    }
                if (e.filtersOptionsCached = !1,
                t.categoriesHash = s,
                e.categoriesHash = s,
                e._buildDropdowns(),
                e._checkInitState(),
                e.target.settings && e.target.settings.filter && e.target.settings.filter.cacheOptions) {
                    var p = e.u_id + "_" + O(e.customIndexUrl || e.collectionUrl) + "_categoriesStructure"
                      , m = parseFloat(e.target.settings.filter.cacheOptions) || 10;
                    D(r, p, !0, m)
                }
            }
        },
        addItems: function(t) {
            var e = this;
            if (e.target.settings.timelog && console.time("addItems"),
            this.items = this.items && this.items.size() ? this.items.concat(t) : t && t.size() ? t : this.container.all(this.target.items),
            !this.itemsParent && this.items.size() && (this.itemsParent = this.items.item(0).get("parentNode"),
            this.itemsParent && this.itemsParent.addClass("custom-filter-grid")),
            Y.fire("custom-filter-items-added", this.container),
            this.container.fire && this.container.fire("custom-filter:items-added", {
                customFilter: e
            }),
            e.filterAnim = !1,
            e.waitingForNewItems,
            e.waitingForNewItems = !1,
            this.isotope) {
                var i = this.isotope.options.transitionDuration;
                if (this.isotope.once("layoutComplete", function(e) {
                    setTimeout(function() {
                        t.each(function(t) {
                            t.all("img").each(function(t) {
                                t.fire("refresh")
                            })
                        })
                    }, i)
                }),
                t && t.size()) {
                    e.isotope_item_width ? e.isotope_item_width : this.target.settings.isotope.columnWidth ? this.target.settings.isotope.columnWidth : this.config ? this.config.columnWidth : t.item(0).get("outerWidth");
                    t.each(function(t) {
                        t.setStyles({
                            width: "100%",
                            top: null,
                            left: null,
                            visibility: "visible",
                            float: "left"
                        })
                    }),
                    e.isotope.reloadItems(),
                    e.isotope.layout(),
                    e._sortGrid()
                }
            } else
                this.mixitup ? (this.mixitup.forceRefresh(),
                e._sortGrid()) : this.itemsParent._node.__masonry ? (this.itemsParent._node.__masonry.reloadItems(),
                this.itemsParent._node.__masonry.layout(),
                e._sortGrid()) : e._sortGrid(!0);
            this.target.settings.advancedMap && this.target.settings.advancedMap.activateMarkerInfoOnItemClick && this.advancedMap && Y.SQS.Gallery.Manager && !this.container.one(".custom-filter-grid").hasClass("outside-container") && Y.SQS.Gallery.Manager.unlightboxify(this.items),
            e.target.settings.timelog && e.target.settings.timelog && console.timeEnd("addItems")
        },
        loadImages: function(t) {
            if (!this.target.settings.handleImagesLoading)
                return !1;
            if (this.config && "autocolumns" == this.config.design && window.__initializeLazySummaries)
                return console.log("Do not affect on images loading, Lazy Summaries work on this"),
                !1;
            var e = this;
            t = t || this.items;
            var i = t && t.size && t.size();
            !this.requestComplete && t && t._nodes && !this.gallery && (i = 6);
            e.container.hasClass("isotope-filter-used");
            var r = function(t, i) {
                t.ancestor(".ProductList-item") && t.ancestor(".ProductList-item").addClass("image-is-loaded"),
                t.get("parentNode").hasClass("image-wrapper") && t.get("offsetHeight") < 20 && t.setStyle("position", "absolute"),
                i.setAttribute("data-show", !0),
                i.setAttribute("data-loaded", !0),
                t.getAttribute("srcset") && "0" == t.getAttribute("sizes") ? t.setAttribute("sizes", e._images_sizes) : e._images_sizes || (e._images_sizes = t.getAttribute("sizes"))
            };
            if (t && t.size) {
                var a = 0;
                t.each(function(t, o) {
                    if (!t.hasClass("element-hidden") && t._node.parentNode && t._node.isConnected) {
                        if (a > i)
                            return !1;
                        t.all("img").each(function(i) {
                            var a = i.get("parentNode");
                            if (a && a.hasClass("info-marker-image"))
                                return !1;
                            var o = "none";
                            a && (a.hasClass("content-fill") || i.ancestor(".Index-gallery-item-image") || i.ancestor(".index-gallery") || i.ancestor(".product-image") || i.ancestor(".blog-item") || i.ancestor(".ProductList-innerImageWrapper") || i.ancestor(".grid-image") || i._node.className && i._node.className.indexOf("cover") > -1 ? o = "fill" : (a.hasClass("content-fit") || i._node.className && i._node.className.indexOf("contain") > -1) && (o = "fit")),
                            i._node && "none" == i._node.style.display && i._node.isConnected && !i.hasClass("grid-image-hover") && (!i.hasClass("grid-item-image") || i.hasClass("grid-item-image") && !i.hasClass("grid-item-additional-image")) && (e.items,
                            i.ancestor(".item-filter-loaded") && (i._node.style.display = "block")),
                            i._node && "none" == i._node.style.display && i._node.isConnected && i.hasClass("grid-image-hover") && i.ancestor(".custom-filter-grid-item") && i.ancestor(".custom-filter-grid-item")._node.addEventListener("mouseover", function() {
                                i._node.style.display = "block"
                            }, {
                                once: !0
                            }),
                            i._node && i._node.style.display,
                            !i._node || 0 != i._node.style.width && "0px" != i._node.style.width || i._node.classList && (!i._node.classList || i._node.classList.contains("grid-item-additional-image") || i._node.classList.contains("grid-image-hover")) || (i._node.style.cssText = ""),
                            e.config && e.config.imageAspectRatio && "auto" !== (e.config.imageAspectRatio + "").toLowerCase() && "autocolumns" !== e.config.design && (!a || a._node.style.paddingBottom || a.hasClass("sqs-video-overlay") || a.hasClass("summary-thumbnail-container") || a.hasClass("sqs-gallery-image-container") || a.setStyles({
                                paddingBottom: 100 / parseFloat(e.config.imageAspectRatio) + "%",
                                height: 0,
                                overflow: "hidden"
                            }));
                            var s = i.ancestor(".sqs-video-wrapper");
                            if (s)
                                s.videoloader ? (s.videoloader.fire("refresh"),
                                s.videoloader._loaded && s.setStyles({
                                    opacity: 1
                                })) : (s.plug(Y.Squarespace.VideoLoader),
                                s.videoloader.fire("refresh"),
                                s.videoloader._loaded && s.setStyles({
                                    opacity: 1
                                }));
                            else if (i.hasClass("loaded") || (i._node.addEventListener("load", function() {
                                this.classList.add("loaded"),
                                i.fire("refresh"),
                                r(i, t)
                            }, !1),
                            i.width() && i.hasAttribute("src") && (i.addClass("loaded"),
                            r(i, t))),
                            i.loader)
                                i.width() ? i.fire("refresh") : i.loader.load();
                            else {
                                if (i.ancestor(".BlogList-item-image-link") && mt && mt.tweakJSON) {
                                    var n = "stacked" === mt.tweakJSON["tweak-blog-list-style"].toLowerCase()
                                      , l = "auto" === mt.tweakJSON["tweak-blog-list-item-image-aspect-ratio-stacked"].toLowerCase();
                                    if (n && l) {
                                        var c = i._node;
                                        c.style.position = null,
                                        c.style.top = null,
                                        c.style.right = null,
                                        c.style.bottom = null,
                                        c.style.left = null,
                                        c.style.width = null,
                                        c.style.height = null,
                                        o = null
                                    } else
                                        o = "fill"
                                }
                                i._no_loader || (i._no_loader = 1),
                                i._no_loader++;
                                var d = !0;
                                i.ancestor(".sqs-video-overlay") && (o = "fit"),
                                i.hasClass("ProductList-image--alt") && !Y.one(".tweak-product-list-item-hover-behavior-show-alternate-image") && (d = !1,
                                i.addClass("no-need-to-load")),
                                r(i, t);
                                try {
                                    i._node.loading && "lazy" == i._node.loading || (window.ImageLoader.loadLazy ? (window.ImageLoader.loadLazy(i._node, {
                                        mode: o,
                                        load: d,
                                        useAdvancedPositioning: !!i.ancestor(".grid-image") || !!i.ancestor(".image-wrapper")
                                    }),
                                    i._node.parentElement.classList.add("cf-img-parent", "img-lazy-loading-used")) : (window.ImageLoader.load(i._node, {
                                        mode: o,
                                        load: d,
                                        useAdvancedPositioning: !!i.ancestor(".grid-image") || !!i.ancestor(".image-wrapper")
                                    }),
                                    i._node.parentElement.classList.add("cf-img-parent", "img-regular-loading-used"))),
                                    i._no_loader
                                } catch (t) {}
                            }
                            if (i.hasClass("loaded") && i.getAttribute("src") && 0 == i._node.style.opacity && i._node.className && -1 == i._node.className.indexOf("--alt") && -1 == i._node.className.indexOf("image-hover") && (i.hasClass("grid-item-image") || (i._node.style.opacity = 1),
                            r(i, t)),
                            e.target.settings.performanceMode) {
                                var g = i.getAttribute("data-src")
                                  , u = i.getAttribute("src");
                                g && !u && (i._node.addEventListener("load", function() {
                                    this.classList.add("loaded"),
                                    r(i, t)
                                }, !1),
                                i.setStyles({
                                    position: "absolute",
                                    height: "100%",
                                    objectFit: "cover"
                                }).setAttribute("src", g))
                            }
                        }),
                        a++
                    }
                })
            }
        },
        _buildPagination: function(t) {
            var e = this
              , i = e.target.settings.pagination
              , r = t.size() / i.pageSize;
            if (this.paginationClicked,
            e.itemsCount && e.itemsCount.one(".items-count").setAttribute("data-pagination", ""),
            e.virtualGoButton && e.virtualGoButton.setAttribute("data-pagination", ""),
            i.enabled) {
                var a = i.showPrevNext && i.showPrevNext.enabled
                  , o = a && i.showPrevNext.hideItems
                  , s = e.container.get("parentNode");
                if (s.one(".pagination-block") && !s.one(".pagination-block").hasClass("cf-pagination-block") && (s.one(".pagination-block").remove(),
                Y.all('style[id*="paginationStylesPlugin"]').remove()),
                r > 1) {
                    if (this.container.removeClass("cf-no-pagination-items"),
                    this.container.addClass("cf-pagination-items-exist"),
                    s.one(".pagination-block"))
                        e.pagination && e.pagination.empty();
                    else {
                        var n = '.pagination-block .before-next:not(.active):not(.around),.pagination-block .last-around:not(.active){margin-right: 4px!important}.pagination-block .around-first.around,.pagination-block .pagination-item.before-prev:not(.active):not(.around){margin-left: 4px!important}.pagination-block .pagination-item.show-dot{margin:0 1px!important;pointer-events:none!important}.pagination-block .pagination-item.show-dot:not(.active) a{border:none!important;width:auto!important;background-color:transparent!important}.pagination-block.hidePageNumbers .page-number,.pagination-block[data-page-number="1"] .arrow.prev,.pagination-block[data-page-number="last"] .arrow.next{display:none}.pagination-block:not(.showArrows) .arrow{display:none}.pagination-block:not(.showArrows) .page-number-last{margin:0!important}.pagination-block-plugin.loadMore-used .pagination-item{display:none}.pagination-block-plugin{margin:3% 0;clear:both;box-sizing:border-box;display:inline-block;width:100%}.pagination-item a{border:none;display:block;white-space:nowrap;text-align:center;padding:0;margin:0;border-width:2px;border-style: solid;transition:all .1s linear;-webkit-transition:all .1s linear}.pagination-block-plugin.style-circle .pagination-item a{border-radius:50%}.pagination-block-plugin.style-pillow .pagination-item a{border-radius:4px}.pagination-block-plugin .pagination-item:last-child{margin:0!important}.pagination-block-plugin .pagination-item{display:inline-block;margin-right:16px;overflow:hidden;vertical-align:middle}'
                          , c = ".pagination-block.pagination-block-custom-filter-{{guid}} {margin:{{margin}};padding:{{padding}};background-color:{{backgroundColor}};text-align:{{align}}}"
                          , d = ".pagination-block.pagination-block-custom-filter-{{guid}} .pagination-item{cursor:pointer;padding-bottom:5px;margin-right:{{margin}}}.pagination-block.pagination-block-custom-filter-{{guid}} .pagination-item a{border-width:{{borderWidth}};border-color:{{color}};height:{{width}};width:{{width}};line-height:{{lineHeight}};background-color:{{backgroundColor}};color:{{color}}}body .pagination-block.pagination-block-custom-filter-{{guid}} .pagination-item.active a,body .pagination-block.pagination-block-custom-filter-{{guid}} .pagination-item:hover a{background-color:{{activeBackgroundColor}};color:{{activeColor}};border-color:{{activeBackgroundColor}}}";
                        i.guid = e.target.index,
                        this.pagination = Y.Node.create('<nav class="pagination-block cf-pagination-block pagination-block-custom-filter-' + i.guid + ' pagination-block-plugin clear"></nav>'),
                        i.items && (i.items.guid = i.guid,
                        i.items.style && this.pagination.addClass("style-" + i.items.style));
                        try {
                            i.items.lineHeight = i.items.lineHeight || parseFloat(i.items.width),
                            i.items.lineHeight ? i.items.lineHeight += -1 == (i.items.lineHeight + "").indexOf("px") ? "px" : "" : i.items.lineHeight = i.items.width
                        } catch (t) {
                            i.items.lineHeight = i.items.width
                        }
                        var g = tt(c, i) + tt(d, i.items);
                        l(g, "paginationStylesPlugin-" + i.guid, e.container._node.parentNode),
                        l(n, "paginationStylesPlugin", document.body);
                        var u = this.container.one(".sqs-gallery-container");
                        u && u.ancestor(".custom-filter-grid-item") && (u = null),
                        u && u.addClass("clear");
                        var m = i.container ? e.container.one(i.container) : e.table_block && e.table_block.get("parentNode") || u || e.container.one(".custom-filter-grid") || e.container;
                        if (!m)
                            return console.log("Can not append pagination block"),
                            t;
                        m._node && m._node.parentElement.createTBody && (m = m.get("parentElement")),
                        i.place && "top" === i.place.trim() ? m.insert(this.pagination, "before") : i.place && "inside" === i.place.trim() ? m.append(this.pagination) : m.insert(this.pagination, "after")
                    }
                    a && e.pagination && e.pagination.addClass("showArrows"),
                    o && e.pagination && e.pagination.addClass("hidePageNumbers");
                    var h = !1;
                    i.pagesRange && r / i.pagesRange >= 3 && (h = !0);
                    t.size();
                    for (var f = a && i.showPrevNext.prev ? i.showPrevNext.prev : "Prev", v = this.pagination_num, b = "", y = "", w = 1; w < r + 1; w++) {
                        var _ = ""
                          , C = ""
                          , S = ""
                          , x = ""
                          , k = 1 === w ? " page-number-first" : w > r ? " page-number-last" : "";
                        if ((v == w || !v && 1 === w) && (_ = " active"),
                        (w < v && w >= v - i.pagesAround || w > v && w <= v + i.pagesAround) && v >= i.pagesRange && (S = " around",
                        b && (S += " around-first"),
                        w == v + i.pagesAround && w > i.pagesRange && w < r - i.pagesRange && (S += " last-around")),
                        h) {
                            x = w === i.pagesRange ? " before-next" : w === parseInt(r + 2 - i.pagesRange) ? " before-prev" : "";
                            var F = w > i.pagesRange && w < r - i.pagesRange + 1;
                            !F || S || _ ? b = !1 : (C = " show-dot",
                            b = !0)
                        }
                        var O = C && !_ ? "." : w;
                        y += '<div class="pagination-item page-number pagination-item-' + w + _ + C + x + S + k + '"><a data-index="' + w + '">' + O + "</a></div>"
                    }
                    e.pagination && (y && (e.pagination._node.innerHTML = y),
                    e.pagination.prepend('<div class="pagination-item arrow prev"><a style="border-radius:0;width:auto;padding:0 5px" data-index="prev">' + p(f) + "</a></div>")),
                    e.pagination && !e.pagination.one(".show-dot") && e.pagination.all(".last-around").removeClass("last-around");
                    var A = a && i.showPrevNext.next ? i.showPrevNext.next : "Next";
                    if (e.pagination && e.pagination.append('<div class="pagination-item arrow next"><a style="border-radius:0;width:auto;padding:0 5px" data-index="next">' + p(A) + "</a></div>"),
                    i.loadMoreButton && i.loadMoreButton.enabled && (e.pagination && e.pagination.addClass("loadMore-used"),
                    !this.container.one(".pagination-loadMore-button"))) {
                        var P = '<div class="sqs-block-button sqs-block pagination-loadMore-button"><div class="sqs-block-button-container sqs-block-button-container--{{alignment}}" data-alignment="{{alignment}}"><button class="sqs-block-button-element--{{size}} sqs-block-button-element sqs-button-element--{{style}} pagination-loadMore">{{text}}</button></div></div>';
                        this.loadMoreButton = Y.Node.create(tt(P, i.loadMoreButton)),
                        this.pagination && this.pagination.insert(this.loadMoreButton, "after"),
                        e.pagination.hide()
                    }
                } else
                    this.container.addClass("cf-no-pagination-items"),
                    this.container.removeClass("cf-pagination-items-exist"),
                    e.pagination_num = 1,
                    e.pagination && e.pagination.remove(),
                    e.pagination = null;
                if (this.pagination_num && (this.pagination || this.loadMoreButton)) {
                    if (this.pagination) {
                        this.pagination.setAttribute("data-page-number", this.pagination_num),
                        this.pagination.all(".active").removeClass("active");
                        var I = this.pagination.one(".pagination-item-" + this.pagination_num);
                        I && I.addClass("active")
                    }
                    var L = t.size()
                      , q = (this.pagination_num - 1) * i.pageSize
                      , T = i.pageSize + q > t.size() ? t.size() : i.pageSize + q
                      , N = L - T;
                    t.size() > i.pageSize && (t.each(function(t, i) {
                        (i < q || i >= T) && e.hidden.push(t)
                    }),
                    i.loadMoreButton && i.loadMoreButton.enabled ? t._nodes = t._nodes.slice(0, T) : t._nodes = t._nodes.slice(q, T),
                    this.loadMoreButton && (q = 0),
                    e.itemsCount && e.itemsCount.one(".items-count").setAttribute("data-pagination", "(" + (q + 1) + " - " + T + ")"),
                    e.virtualGoButton && e.virtualGoButton.setAttribute("data-pagination", "(" + (q + 1) + " - " + T + ")"),
                    N < 1 && this.pagination && this.pagination.setAttribute("data-page-number", "last")),
                    this.loadMoreButton && (N < 1 ? this.loadMoreButton.hide(!0) : this.loadMoreButton.show(!0),
                    e.pagination && e.pagination.hide(),
                    this.loadMoreButton && this.loadMoreButton.one(".sqs-block-button-element").setAttribute("data-size", N))
                }
            }
            return this.paginationClicked = !1,
            t
        },
        _doSidebarWidth: function() {
            if ((this.container && this.container._node.className.indexOf("ProductList") > -1 || this.itemsParent && this.itemsParent._node.className.indexOf("ProductList") > -1) && (Y.one("body").addClass("tweak-product-list-filter-display-hide").removeClass("tweak-product-list-filter-display-left-side").removeClass("tweak-product-list-filter-display-right-side").removeClass("tweak-product-list-filter-display-top"),
            window.getComputedStyle && this.items.item(0))) {
                var t = window.getComputedStyle(this.items.item(0)._node).marginRight
                  , e = window.innerWidth > 700 && this.customFiltersWrapper && window.getComputedStyle(this.customFiltersWrapper._node).width ? parseFloat(window.getComputedStyle(this.customFiltersWrapper._node).width) - 20 : 280;
                if (t) {
                    var i = e - parseFloat(t) + .1;
                    l("@media only screen and (min-width: 701px){body .custom-filter-position-right .ProductList-grid.custom-filter-grid,body .custom-filter-position-left .ProductList-grid.custom-filter-grid{max-width: calc(100% - " + i + "px)}}", "grid-width-" + this.target.index, this.container._node)
                }
            }
        },
        _init: function() {
            var r = this;
            if (Y.one('link[rel="stylesheet"][href*="custom-filter.min.css"]') || Y.one('link[rel="stylesheet"][href*="custom-filter.css"]') || (console.log("Need to load Filter stylesheet"),
            et("https://assets.squarewebsites.org/custom-filter/custom-filter.min.css", null, function() {
                console.log("Filter stylesheet loaded"),
                r._sortGrid()
            })),
            t() && this.target.settings.loadFastClick)
                if (window.FastClick || document.querySelector("#fastclick-script") || window.loading_fastclick)
                    try {
                        window.loading_fastclick || window.FastClickFromFilter || (window.FastClickFromFilter = FastClick.attach(document.body),
                        console.log("Fastclick ACTIVATED"))
                    } catch (t) {
                        console.log(t)
                    }
                else
                    window.loading_fastclick = !0,
                    m("https://assets.squarewebsites.org/custom-filter/fastclick.min.js", "fastclick-script", null, function() {
                        console.log("Fastclick loaded");
                        try {
                            window.FastClickFromFilter = FastClick.attach(document.body),
                            console.log("Fastclick ACTIVATED")
                        } catch (t) {
                            console.log(t)
                        }
                    });
            if (Y.one("body") && Y.one("body").removeClass("no-custom-filter-activated"),
            Y.one("body").addClass("cf-filter-used-on-page").removeAttribute("data-cf-filter-not-active"),
            i() && (document.documentElement.dataset.cfPlatformIos = "true",
            e()),
            this.target.settings.simpleFilter && this.target.settings.simpleFilter.persistent && !this.target.settings.itemsParent) {
                var a = this.container.get("children");
                this.container.prepend('<div class="cf-persist-container"></div>'),
                this.container.one(".cf-persist-container").append(a),
                this.itemsParent = this.container.one(".cf-persist-container")
            }
            this.container.hasClass("summary-v2-block") && this.container.getAttribute("data-block-json") && (this.container.LazySummariesData = JSON.parse(this.container.getAttribute("data-block-json")),
            this.container.LazySummariesData && this.container.LazySummariesData.enableLazy);
            var s = this.container.getAttribute("id");
            if (s && "productList" == s && (this.container.get("parentNode").hasClass("container-content") || this.container.get("parentNode").hasClass("main-content") || "main-content" == this.container.get("parentNode").getAttribute("data-content-field") || "page" == this.container.get("parentNode").getAttribute("id")) && (this.container = this.container.get("parentNode")),
            this.container && this.container.ancestor("[data-controller]") && (this.dataControllerContainer = this.container.ancestor("[data-controller]"),
            this.dataController = this.dataControllerContainer.getAttribute("data-controller"),
            this.dataControllerContext = this.dataControllerContainer.getAttribute("data-context"),
            this.dataControllerContext))
                try {
                    this.dataControllerContext = JSON.parse(this.dataControllerContext)
                } catch (t) {
                    console.log(t)
                }
            if (this.container.get("parentNode").hasClass("product-list") && "ProductList" == this.container.get("parentNode").getAttribute("data-controller") && (this.container = this.container.get("parentNode"),
            this.target.settings.wrapFilterContainer = !1),
            this.config = !!this.container.getAttribute("data-block-json") && JSON.parse(this.container.getAttribute("data-block-json")),
            (this.container.hasClass("hfeed") && this.container.hasClass("article-list") || this.container.hasClass("list-grid") && this.container.get("parentNode").hasClass("products-flex-container") && !this.target.settings.wrapFilterContainer || this.container.getAttribute("data-controller") && this.container.getAttribute("data-controller").indexOf("Blog") > -1 && "top" == r.target.settings.position) && (this.container = this.container.get("parentNode")),
            1 != this.target.settings.wrapFilterContainer || this.container.hasAttribute("data-product-list-layout") || (this.container.wrap('<div class="cf-filter-wrapper"></div>'),
            this.container = this.container.get("parentNode")),
            window.location.search && window.location.search.length > 3 && this.container.addClass("cf-location-query-found"),
            this.container.get("parentNode")) {
                if (this.container.get("parentNode").addClass("custom-filter-parent-node"),
                this.target.settings.customClasses && (this.target.settings.customClasses + "").indexOf("follow-original-z-index") > -1 && this.container.get("parentNode").addClass("follow-original-z-index"),
                this.container.get("parentNode").hasClass("fe-block")) {
                    var n = this.container.ancestor(".fluid-engine");
                    n && n.addClass("fe-custom-filter-inside"),
                    this.target.settings.customClasses && (this.target.settings.customClasses + "").indexOf("cf-fluid-auto-height") > -1 && n && n.addClass("cf-fluid-auto-height")
                }
                (!0 === this.target.settings.sticky || this.target.settings.sticky && this.target.settings.sticky.enabled) && this.container.get("parentNode").addClass("cf-sticky-position-parent-node")
            }
            if (this.items = this.target.items && this.container.one(this.target.items) ? this.container.all(this.target.items) : new Y.NodeList,
            this.existedItems = this.target.items && this.container.one(this.target.items) ? this.container.all(this.target.items) : new Y.NodeList,
            (this.container.hasClass("BlogList") || this.container.hasClass("sqs-blog-list")) && (this.container = this.container.get("parentNode")),
            this.target.settings.HTMLifySelectors) {
                var c = this.container.all(this.target.settings.HTMLifySelectors + ":not([data-htmlified])");
                c && c.size() && c.each(function(t) {
                    t.set("innerHTML", t.get("textContent")),
                    t.setAttribute("data-htmlified", !0)
                })
            }
            if (this.scrollEl = this.target.settings.scrollElement ? Y.one(this.target.settings.scrollElement) : Y.one(document.scrollingElement) || Y.one(Y.UA && Y.UA.gecko || Y.UA && Y.UA.ie || navigator.userAgent.match(/Trident.*rv.11\./) ? "html" : "body"),
            this.first_sort_run = !1,
            this.target.settings.virtualFilter && this.target.settings.virtualFilter.enabled && (this.target.settings.simpleFilter.anim = !1,
            this.target.settings.simpleFilter.persistent = !0,
            this.target.settings.noScrollToResults = !0,
            this.virtualFilter = !0,
            this.target.settings.useHistory = !1),
            this.target.settings.hooks && this.target.settings.hooks.beforeInit && "function" == typeof this.target.settings.hooks.beforeInit && this.target.settings.hooks.beforeInit(this),
            this.container.get("parentNode") && this.container.get("parentNode").hasClass("custom-filter-container"))
                console.log("Hey, seems Filter initialized in Parent Node");
            else {
                Y.one("#categoryNav") && Y.one("#categoryNav").hide(),
                this.target.settings.useSQSProxy && this.target.settings.useSQSProxy.removeFields && this.target.settings.useSQSProxy.excerptFieldNeeded && (this.target.settings.useSQSProxy.removeFields = this.target.settings.useSQSProxy.removeFields.replace(/excerpt/g, "")),
                this.target.settings.productsBadges && (this.target.settings.productsBadges.map ? this.target.settings.productsBadges = this.target.settings.productsBadges.map(function(t) {
                    return t.trim()
                }) : "string" == typeof this.target.settings.productsBadges ? this.target.settings.productsBadges = this.target.settings.productsBadges.split(",").map(function(t) {
                    return t.trim()
                }) : this.target.settings.productsBadges = null);
                var p = this.target.settings.advancedMap;
                if (p && p.advancedMapContainer) {
                    var h = Y.one(p.advancedMapContainer);
                    h && (h.setAttribute("data-filter", "request=" + (this.target.settings.useSQSProxy && this.target.settings.useSQSProxy.enabled)),
                    this.advancedMap = h.one(".custom-map-block") || h.one("[data-context]"),
                    this.advancedMap && this.advancedMap._node && this.advancedMap._node._map_data && this.advancedMap._node._map_data.length && (this.coll_data || (this.coll_data = {}),
                    this.coll_data.items = this.advancedMap._node._map_data,
                    setTimeout(function() {
                        Y.Global.fire("advanced-maps:initialized", r.advancedMap),
                        console.log("Fired initialized Map Event")
                    }, 1e3)))
                }
                var y = ["custom-filter-container", "custom-filter-new-ver"];
                r.filterAnim = !1,
                this.target.settings.itemsGridOverflowVisible && y.push("cf-grid-overflow-visible"),
                this.target.container && this.target.container.indexOf('[data-controller*="Gallery"]') > -1 && (this.target.settings.requestAttrWithAjax = !1),
                this.target.settings.requestAttrWithAjax && this.container.addClass("cf-ajax-request"),
                this.target.settings.customClasses && this.target.settings.customClasses.split(" ").forEach(function(t) {
                    t = O(t.trim()),
                    y.push(t)
                }),
                this.target.settings.useLocalCache && (this.target.settings.useSessionCache = !0),
                this.sortObj = {
                    index: "[data-index] parseInt",
                    index_desc: "[data-index] parseInt",
                    categories_sort: function(t, e) {
                        var i = e && e.id || t.getAttribute("data-item-id") || t.getAttribute("data-set-id");
                        return r.categoriesSortArray && r.categoriesSortArray.length && r.categoriesSortArray.indexOf(i) > -1 && (i = r.categoriesSortArray.indexOf(i)),
                        i
                    }
                },
                this.config && this.config.sortSummaryItems && "no-sort" !== this.config.sortSummaryItems && (this.sortObj = {
                    index: "[data-index] parseInt",
                    index_desc: "[data-index] parseInt",
                    categories_sort: function(t, e) {
                        var i = e && e.id || t.getAttribute("data-item-id") || t.getAttribute("data-set-id");
                        return r.categoriesSortArray && r.categoriesSortArray.length && r.categoriesSortArray.indexOf(i) > -1 && (i = r.categoriesSortArray.indexOf(i)),
                        i
                    },
                    "lzs_last-word-asc": function(t, e) {
                        var i = t.querySelector("a[data-title]") || t.querySelector(".summary-title-link")
                          , r = i && i.dataset.title ? i.dataset.title : i && i.className && i.className.indexOf("summary-title-link") > -1 && i.textContent.trim() ? i && i.textContent : t && t._LZSData && t._LZSData.title ? t._LZSData.title : "";
                        r = r.toLowerCase().replace(/\r?\n|\r/g, ""),
                        r = r.trim();
                        var a = r.split(" ");
                        return a.length && (r = a[a.length - 1]),
                        r
                    },
                    "lzs_last-word-desc": function(t, e) {
                        var i = t.querySelector("a[data-title]") || t.querySelector(".summary-title-link")
                          , r = i && i.dataset.title ? i.dataset.title : i && i.className && i.className.indexOf("summary-title-link") > -1 && i.textContent.trim() ? i && i.textContent : t && t._LZSData && t._LZSData.title ? t._LZSData.title : "";
                        r = r.trim();
                        var a = r.toLowerCase().replace(/\r?\n|\r/g, "").split(" ");
                        return a.length && (i = a[a.length - 1]),
                        i
                    },
                    lzs_alph: function(t, e) {
                        var i = t.querySelector("a[data-title]") || t.querySelector(".summary-title-link")
                          , r = i && i.dataset.title ? i.dataset.title : i && i.className && i.className.indexOf("summary-title-link") > -1 && i.textContent.trim() ? i && i.textContent : t && t._LZSData && t._LZSData.title ? t._LZSData.title : "";
                        return r = r.trim(),
                        r.toLowerCase().replace(/\r?\n|\r/g, "").replace(/ /g, "")
                    },
                    "lzs_alph-desc": function(t, e) {
                        var i = t.querySelector("a[data-title]") || t.querySelector(".summary-title-link")
                          , r = i && i.dataset.title ? i.dataset.title : i && i.className && i.className.indexOf("summary-title-link") > -1 && i.textContent.trim() ? i && i.textContent : t && t._LZSData && t._LZSData.title ? t._LZSData.title : "";
                        return r = r.trim(),
                        r.toLowerCase().replace(/\r?\n|\r/g, "").replace(/ /g, "")
                    },
                    "lzs_price-asc": function(t, e) {
                        var i = t.querySelector(".sqs-money-native")
                          , r = i ? parseInt(i.innerText.replace(/\D/g, "")) : t.getAttribute("data-price") ? parseInt(t.getAttribute("data-price")) : 0;
                        return r
                    },
                    "lzs_price-desc": function(t, e) {
                        var i = t.querySelector(".sqs-money-native")
                          , r = i ? parseInt(i.innerText.replace(/\D/g, "")) : t.getAttribute("data-price") ? parseInt(t.getAttribute("data-price")) : 0;
                        return r
                    },
                    "lzs_date-asc": function(t, e) {
                        var i = t.querySelector(".summary-metadata-item--date")
                          , r = i && i.getAttribute("datetime") ? parseInt(i.getAttribute("datetime").replace(/\D/g, "")) : t._LZSData && t._LZSData.startDate ? t._LZSData.startDate : t._LZSData && t._LZSData.publishOn ? t._LZSData.publishOn : t._LZSData && t._LZSData.addedOn ? t._LZSData.addedOn : 0;
                        return r
                    },
                    "lzs_date-desc": function(t, e) {
                        var i = t.querySelector(".summary-metadata-item--date")
                          , r = i && i.getAttribute("datetime") ? parseInt(i.getAttribute("datetime").replace(/\D/g, "")) : t._LZSData && t._LZSData.startDate ? t._LZSData.startDate : t._LZSData && t._LZSData.publishOn ? t._LZSData.publishOn : t._LZSData && t._LZSData.addedOn ? t._LZSData.addedOn : 0;
                        return r
                    },
                    lzs_random: "[data-index] parseFloat",
                    "lzs_likes-asc": "[data-like-count] parseInt",
                    "lzs_likes-desc": "[data-like-count] parseInt"
                }),
                this.sort_param = "index",
                this.config && this.config.sortSummaryItems && (this.sort_param = "lzs_" + this.config.sortSummaryItems,
                this.sort_defined = "lzs_" + this.config.sortSummaryItems,
                "random" == this.config.sortSummaryItems && (this.target.settings.shuffle = !0,
                this.sort_param = "index")),
                this.items.size() && (this.items.each(function(t, e) {
                    !t.hasAttribute("data-start-index") && t.setAttribute("data-start-index", e),
                    r.target.settings.simpleFilter.layoutAnim
                }),
                this.items.addClass("custom-filter-grid-item"),
                this.itemsParent || (this.itemsParent = this.items.item(0).get("parentNode")),
                this.target.settings.shuffle && setTimeout(function() {
                    r._addItemsAttributes(!0)
                }, 0)),
                this.container.LazySummariesData && this.container.LazySummariesData.enableLazy && !this.container.LazySummariesData.loadAllOrPag && (this.target.settings.pagination.enabled = !0,
                this.target.settings.pagination.pageSize = this.container.LazySummariesData.pageSize || this.target.settings.pagination.pageSize,
                this.target.settings.pagination.loadMoreButton && !this.target.settings.pagination.loadMoreButton.ignoreLZSSetings && (this.target.settings.pagination.loadMoreButton.enabled = !0,
                this.target.settings.pagination.loadMoreButton.text = this.container.LazySummariesData.loadMoreText || this.target.settings.pagination.loadMoreButton.text));
                var x = !0;
                if (this.container.hasClass("summary-v2-block") && this.container.one(".summary-item-list") && (this.container.one(">.sqs-block-content") && this.container.one(">.sqs-block-content").addClass("custom-filter-grid"),
                this.itemsParent = this.container.one(".summary-item-list"),
                x = !1),
                this.container.hasClass("blog-list") && (this.container = this.container.get("parentNode"),
                this.itemsParent = this.container.one(".blog-list")),
                this.target.settings.itemsParent && (this.itemsParent = this.container.one(this.target.settings.itemsParent)),
                this.itemsParent || (this.itemsParent = this.container.one(".product-list-container") || this.container.one(".list-grid") || this.container.one(".collection-content-wrapper[data-controller]") || this.container.one(this.target.container) || this.container),
                this.itemsParent && x && this.itemsParent.addClass("custom-filter-grid"),
                this.target.settings.stripHTMLComments && r.itemsParent && r.itemsParent._node && setTimeout(function() {
                    g(r.itemsParent._node)
                }, 0),
                this.sqs_query_factor = this.itemsParent && (this.itemsParent.hasClass("ProductList-grid") || this.itemsParent.hasClass("ProductList-grid") || this.itemsParent.hasClass("BlogList") || this.itemsParent.hasClass("sqs-blog-list") || this.itemsParent.hasClass("blog-list")) && (window.location.href.indexOf("category=") > -1 || window.location.href.indexOf("/category/") > -1 || window.location.href.indexOf("tag=") > -1 || window.location.href.indexOf("/tag/") > -1),
                this.sqs_query_factor ? Y.one("body").addClass("cf-sqs-query-in-url") : Y.one("body").removeClass("cf-sqs-query-in-url"),
                this._initFilterPosition(),
                this.target.settings.optionsDescription && this.target.settings.optionsDescription.container && (this.optionsDescriptionContainer = Y.one(this.target.settings.optionsDescription.container),
                this.optionsDescriptionContainer && (y.push("cf-options-description-used"),
                this._initDescriptionContainer())),
                this.currentCats = [],
                this.currentTags = [],
                this.collectionUrl = this.target.settings.collectionUrl && (this.target.settings.collectionUrl + "").trim().indexOf("/") > -1 ? (this.target.settings.collectionUrl + "").trim() : null,
                this.getFilterAttrObj = {},
                this.filterParams = {},
                this.items_prices = [],
                this.pagination_num = 1,
                this.target.settings.performanceMode && y.push("performance-mode-used"),
                this.config && !this.target.settings.collectionUrl) {
                    this.collectionUrl = this.config.collectionUrl || this.config.mapCollection && this.config.mapCollection[0] && this.config.mapCollection[0].urlId && "/" + this.config.mapCollection[0].urlId,
                    this.config.collectionFilter && (this.config.collectionFilter.tag || this.config.collectionFilter.category) && (this.config.filter = this.config.collectionFilter);
                    var k = this.container.one(".summary-title-link") || this.container.one(".summary-thumbnail-container") && this.container.one(".summary-thumbnail-container")._node.pathname && this.container.one(".summary-thumbnail-container");
                    if (!this.collectionUrl)
                        if (k) {
                            var F = k._node.pathname.split("/");
                            F.indexOf("p") > -1 ? this.collectionUrl = F.slice(0, F.indexOf("p")).join("/") : F.length <= 6 ? this.collectionUrl = "/" + F[1] : F.length > 6 && (this.collectionUrl = "/" + F[1] + "/" + F[2])
                        } else
                            this.collectionUrl = location.pathname;
                    this.config.filter && (this.config.filter.tag || this.config.filter.category) && (this.collectionUrl += this.config.filter.category ? "?category=" + this.config.filter.category.trim().replace(/ /g, "+").replace(/%20/g, "+").replace(/&/g, "%26") : "?",
                    this.collectionUrl += this.config.filter.tag ? (this.collectionUrl.indexOf("?") > -1 && this.collectionUrl.indexOf("category=") > -1 ? "&" : "") + "tag=" + this.config.filter.tag.trim().replace(/ /g, "+").replace(/%20/g, "+").replace(/%20/g, "+").replace(/&/g, "%26") : "")
                }
                var P = this.container.one(".sqs-block-product .product-title") || this.container.one(".grid-item-link.product-lists-item") || this.container.one(".product-list-item-link");
                if (P && !this.target.settings.collectionUrl) {
                    F = P._node.pathname.split("/");
                    F.indexOf("p") > -1 ? this.collectionUrl = F.slice(0, F.indexOf("p")).join("/") : F.length <= 6 ? this.collectionUrl = "/" + F[1] : F.length > 6 && (this.collectionUrl = "/" + F[1] + "/" + F[2])
                }
                r.itemsParent.hasClass("product-list-container") && (r.target.settings.products = {
                    purchaseButtons: {
                        enabled: !1
                    },
                    variants: {
                        enabled: !0
                    }
                }),
                this.collectionUrl = this.collectionUrl ? this.collectionUrl : location.pathname;
                var I = this.target.settings.hidden ? "display:none" : ""
                  , L = this.target.settings.mobilePanel.closeButtonText || "";
                if (this.customFiltersWrapper = Y.Node.create('<div class="customFiltersWrapper clearfix clear" style="' + I + '"><div class="customFiltersContainer"><div style="display:none!important" class="sqs-block reset-first-sqs-block hidden" hidden="true"><span hidden="true"></span></div></div><button class="mobile-panel-close" style="opacity:0" data-text="' + L + '" data-has-text="' + !!L + '"></button><div style="display:none!important" class="sqs-block reset-last-sqs-block hidden" hidden="true"><span hidden="true"></span></div></div>'),
                this.customFilters = this.customFiltersWrapper.one(".customFiltersContainer"),
                (this.target.settings.sticky && this.target.settings.sticky.enabled || !0 === this.target.settings.sticky) && (y.push("cf-sticky-position"),
                this.target.settings.sticky.top && this.customFiltersWrapper.setStyle("top", this.target.settings.sticky.top)),
                this.searchRegex = "",
                this.filter_selectors = "",
                this.container.fire && this.container.fire("custom-filter:filter-before-init", {
                    customFilter: r
                }),
                Y.fire("custom-filter:filter-before-init", {
                    customFilter: r
                }),
                r.target.settings.hooks && r.target.settings.hooks.onInit)
                    try {
                        "function" == typeof r.target.settings.hooks.onInit && r.target.settings.hooks.onInit(r)
                    } catch (t) {
                        console.error(t)
                    }
                if (r.target.settings.hooks && r.target.settings.hooks.onResize && (r.resizeFunc = function() {
                    try {
                        "function" == typeof r.target.settings.hooks.onResize && r.target.settings.hooks.onResize(r)
                    } catch (t) {
                        console.error(t)
                    }
                }
                ,
                window.addEventListener("resize", r.resizeFunc, !0)),
                this.u_id = "custom-filter-uid-" + this.target.index,
                this.target.settings.showItemsCount) {
                    var q = parseInt(this.target.settings.itemsCount.positionOrder)
                      , D = this.target.settings.itemsCount.text ? ' data-items-text="' + this.target.settings.itemsCount.text + '"' : "";
                    this.itemsCount = Y.Node.create('<div class="items items-count-wrapper sqs-block" data-pos-order="' + q + '"><div class="sqs-block-content"><div class="items-count-inner"' + D + '><span class="items-count">' + this.items.size() + "</span></div></div></div>"),
                    this.customFilters.append(this.itemsCount)
                }
                this.target.settings.openDropdownsOnHover && y.push("open-dropdowns-on-hover");
                var M = this.target.settings.view || "dropdowns";
                y.push("custom-filter-view-" + M),
                this.target.settings.showCheckboxes && ("right" == this.target.settings.showCheckboxes ? y.push("cf-show-checkboxes-right") : y.push("cf-show-checkboxes"));
                var z = this.target.settings.colorSwatches;
                if (z && z.enabled) {
                    var j = z.tooltips
                      , G = z.size && z.size.width || "32px"
                      , Z = z.size && z.size.height || "32px"
                      , H = z.circles ? "50%" : "0";
                    if (r.container._node.style.setProperty("--color-swatches-width", G),
                    r.container._node.style.setProperty("--color-swatches-height", Z),
                    r.container._node.style.setProperty("--color-swatches-border-radius", H),
                    r.container._node.style.setProperty("--color-swatches-align", z.align || "center"),
                    j && j.enabled) {
                        var $ = j.background || "#000"
                          , K = j.color || "#fff"
                          , tt = j.padding || "5px"
                          , it = j.position || "top";
                        y.push("cf-color-swatches-position--" + it),
                        r.container._node.style.setProperty("--color-swatches-tooltips-font-size", j.fontSize || "14px"),
                        r.container._node.style.setProperty("--color-swatches-tooltips-font-family", j.fontFamily || "inherit"),
                        r.container._node.style.setProperty("--color-swatches-tooltips-back", $),
                        r.container._node.style.setProperty("--color-swatches-tooltips-color", K),
                        r.container._node.style.setProperty("--color-swatches-tooltips-border-radius", j.borderRadius || "0px"),
                        r.container._node.style.setProperty("--color-swatches-tooltips-padding", tt)
                    }
                }
                var rt = this.target.settings.filter;
                if (r.SQSProxy = {},
                r.SQSProxy.bodyFieldNeeded = r.target.settings && r.target.settings.useSQSProxy && r.target.settings.useSQSProxy.bodyFieldNeeded || !1,
                rt.enabled) {
                    var at = function(t) {
                        var e = !1;
                        return rt.items && rt.items.length && rt.items.forEach(function(i) {
                            !i.getAttr || i.getAttr != t || i.allowedOptions && (!i.allowedOptions || i.allowedOptions.length) || i.allowedPrefSuf || (e = !0)
                        }),
                        e
                    };
                    if (rt.outsideOptions && rt.outsideOptions.enabled) {
                        var ot = rt.outsideOptions.style ? O(rt.outsideOptions.style + "").trim() : "buttons"
                          , st = rt.outsideOptions.align || "left";
                        r.outsideOptionsContainer = Y.Node.create('<div class="sqs-block cf-outside-options-container cf-outside-options-style-' + ot + " cf-outside-options-align-" + st + '"><div class="sqs-block-content"><ul class="cf-outside-options-nav"></ul></div></div>'),
                        r.outsideOptionsNav = r.outsideOptionsContainer.one(".cf-outside-options-nav");
                        var nt = rt.outsideOptions.insertTo + "" && Y.one(rt.outsideOptions.insertTo + "") || r.customFilters;
                        nt.append(r.outsideOptionsContainer),
                        r.outsideOptionsContainer.delegate("click", function(t) {
                            t.halt();
                            var e = t.currentTarget.get("parentNode").one("a").getAttribute("href");
                            if (e) {
                                var i = r.customFiltersWrapper.one('a[href="' + e + '"]')
                                  , a = !1;
                                r.topSection && (a = r.topSection.one('.filterDropdown a[href="' + e + '"]')),
                                i && i.removeClass("active"),
                                a && a.removeClass("active"),
                                r._sortGrid()
                            }
                        }, ".reset-button, a")
                    }
                    if ((rt.category || rt.tag) && (rt.items || (rt.items = []),
                    rt.tag && !0 === rt.tag && !at("tags") && (rt.tag = {
                        name: "Tag",
                        hidden: !0,
                        main: "tagsDropdown",
                        getAttr: "tags"
                    }),
                    rt.category && !0 === rt.category && !at("categories") && (rt.category = {
                        name: "Category",
                        hidden: !0,
                        main: "categoryDropdown",
                        getAttr: "categories"
                    }),
                    rt.tag && rt.tag.name && (rt.tag.main && "object" == typeof rt.tag || (rt.tag = {}),
                    rt.tag.main = "tagsDropdown",
                    rt.tag.name || (rt.tag.name = "Tags"),
                    rt.tag.subName = "tag",
                    rt.items[0] && "tagsDropdown" === rt.items[0].main || rt.items.unshift(rt.tag)),
                    rt.category && rt.category.name && (rt.category.main && "object" == typeof rt.category || (rt.category = {}),
                    rt.category.main = "categoriesDropdown",
                    rt.category.subName = "category",
                    rt.category.name || (rt.category.name = "Categories"),
                    rt.items[0] && "categoriesDropdown" === rt.items[0].main || rt.items.unshift(rt.category))),
                    rt && rt.items && rt.items.length) {
                        var lt = rt.hidden ? " hidden" : "";
                        rt.items.forEach(function(t, e) {
                            if (t.type && "description" == t.type && (t.text || t.border)) {
                                var i = Y.Node.create('<div class="sqs-block cf-filter-description cf-filter-description-' + e + '"><div class="sqs-block-content"><div class="cf-filter-description-wrapper"><span class="cf-filter-description-text">' + t.text + "</span></div></div></div>");
                                r.customFilters.append(i)
                            }
                            if (t.name && (!t.hasOwnProperty("enabled") || !1 !== t.enabled)) {
                                var a = t.name.trim()
                                  , o = parseInt(t.positionOrder) || 4 + e
                                  , s = t.subName ? O(t.subName) : O(a);
                                r.filterParams[s] || (r.filterParams[s] = []);
                                var n = t.main || "name-" + O(a, !0)
                                  , l = t.defined && O(t.defined + "") || !1
                                  , c = t.getAttr ? t.getAttr : ""
                                  , d = !!t.ignoreFilter
                                  , g = !!t.noFilterOnClick
                                  , u = c && "string" == typeof c ? ' data-get-attr="' + c + '" ' : ""
                                  , p = !!t.ignoreNonExistOptions;
                                p = p ? 'data-ignore-non-exist-options="true"' : "";
                                var m = t.variantOption || !1;
                                if ("string" == typeof c && "tags" !== c && "categories" !== c && -1 == c.indexOf("variant|") && (r.SQSProxy.bodyFieldNeeded = !0),
                                c && (c + "").indexOf("variant|") > -1 && (m = c.split("|")[1],
                                c = J),
                                c && "quantity" == (c + "").trim()) {
                                    var h = t.quantityOptions && 2 == t.quantityOptions.split("|").length && t.quantityOptions.split("|") || ["In Stock", "Out of Stock"];
                                    c = function(t, e) {
                                        var i = X(e)
                                          , r = "";
                                        return r = "string" == typeof i ? "" : i && i > 0 ? h[0] : h[1],
                                        r
                                    }
                                }
                                var y = t.allOption && r.target.settings.filter.transliterateFunction ? O(t.allOption, !0) : t.allOption || "All"
                                  , w = t.options && t.options.toLowerCase ? t.options.split(",") : t.options || [];
                                w = w.map(function(t) {
                                    return t.trim()
                                });
                                var _ = t.allowedOptions || []
                                  , S = [];
                                if (_.length) {
                                    "string" == typeof _ && (_ = _.split(","));
                                    for (var x = 0; x < _.length; x++)
                                        _[x] = (_[x] + "").trim();
                                    S = _
                                }
                                var k = t.optionsStructure;
                                if (!k && r.target.settings.filter.cacheOptions && "categories" == c) {
                                    var F = r.u_id + "_" + O(r.customIndexUrl || r.collectionUrl) + "_categoriesStructure";
                                    k = N(F)
                                }
                                k && "object" == typeof k && !k.forEach && (_ = k),
                                "object" != typeof _ || _.forEach || (k = _,
                                _ = C(_),
                                t.sort = "asAllowed");
                                var A = t.visibleOptions || []
                                  , P = ""
                                  , I = "";
                                if (A.length) {
                                    "string" == typeof A && (A = A.split(","));
                                    for (var L = 0; L < A.length; L++)
                                        A[L] = (A[L] + "").trim();
                                    A.length && (P = ' data-visible-options="set"')
                                }
                                var q = t.notVisibleOptions || [];
                                if (q.length) {
                                    "string" == typeof q && (q = q.split(","));
                                    for (var T = 0; T < q.length; T++)
                                        q[T] = (q[T] + "").trim();
                                    q.length && (I = ' data-not-visible-options="set"')
                                }
                                var D = t.rootOptions || [];
                                if (D.length) {
                                    "string" == typeof D && (D = D.split(","));
                                    for (var M = 0; M < D.length; M++)
                                        D[M] = (D[M] + "").trim();
                                    for (var E = D.length - 1; E >= 0; E--)
                                        _ && _.length && -1 === _.indexOf(D[E]) && _.unshift(D[E]),
                                        -1 === w.indexOf(D[E]) && w.unshift(D[E])
                                }
                                var z = t.notAllowedOptions || !1;
                                if (z.length) {
                                    "string" == typeof z && (z = z.split(","));
                                    for (var B = 0; B < z.length; B++)
                                        z[B] = (z[B] + "").trim()
                                }
                                var W = t.allowedPrefSuf || ""
                                  , j = null
                                  , U = null;
                                if (S.length && t.sort && "asAllowed" === t.sort) {
                                    j = U = {};
                                    for (var R = 0, V = S.length; R < V; R++)
                                        j[S[R]] = R,
                                        U[S[R]] = R
                                }
                                var G = t.notAllowedPrefSuf || ""
                                  , Z = t.parentCategory && "string" == typeof t.parentCategory && t.parentCategory.trim() || !1
                                  , H = ' data-parent-category-used="' + Z + '"'
                                  , Q = t.hidden || lt ? " hidden" : ""
                                  , $ = t.hideDefaultLabelIfDirty ? " hide-def-label" : ""
                                  , K = t.hideValueLabel ? " hide-val-label" : ""
                                  , tt = t.hideValueLabelIfEmpty ? " hide-val-label-empty" : ""
                                  , et = !t.logic || "and" !== t.logic.trim() && "or" !== t.logic.trim() ? "and" : t.logic.trim()
                                  , it = !t.multipleLogic || "and" !== t.multipleLogic.trim() && "or" !== t.multipleLogic.trim() ? "or" : t.multipleLogic.trim()
                                  , rt = t.children || ""
                                  , at = !!t.checkChildren || !1
                                  , ot = t.defaultAttrs || ""
                                  , st = !t.hasOwnProperty("strict") || !!t.strict
                                  , nt = !!t.multiple
                                  , ct = t.multipleSubcategoriesAllowed ? ' data-multiple-sub-categories-allowed="true"' : ""
                                  , dt = t.hideTitle || t.type && "input" == t.type && !t.hasOwnProperty("hideTitle") ? " hidden" : ""
                                  , gt = t.hasOwnProperty("allLabel") && ' data-all-label="' + t.allLabel + '"' || ' data-all-label=": ' + y + '"'
                                  , ut = !(!t.optionsLabels || "object" != typeof t.optionsLabels) && t.optionsLabels
                                  , pt = t.initText ? 'data-init-text="' + t.initText + '"' : ""
                                  , mt = O(a) + "-target-" + r.target.index + "-" + (new Date).getTime()
                                  , ht = ""
                                  , ft = t.type || "dropdown"
                                  , vt = t.style && (t.style + "").trim() ? "cf-filter-item-style-" + O(t.style) : ""
                                  , bt = t.resetOthers ? 'data-reset-others="' + t.resetOthers + '"' : ""
                                  , yt = !!t.outsideFilterValues
                                  , wt = t.closedSubOptions ? " closed-sub-options" : ""
                                  , _t = t.openDropdown ? ' data-open-dropdown="' + t.openDropdown + '"' : ""
                                  , Ct = t.openDropdownOnInit ? ' data-open-dropdown-on-init="' + t.openDropdownOnInit + '"' : ""
                                  , St = yt ? " outside-values-visible" : ""
                                  , xt = t.rootOptionOpen ? 'data-root-option-open="' + t.rootOptionOpen + '"' : ""
                                  , kt = (t.placeholder,
                                !(!t.optionsReplace || "object" != typeof t.optionsReplace) && t.optionsReplace)
                                  , Ft = c && "categories" == c && t.useAsRegularNested ? ' data-use-as-regular-nested="true"' : "";
                                if ("dropdown" == ft && t.quickSearch && t.quickSearch.enabled && !0 === t.quickSearch.enabled) {
                                    var Ot = t.quickSearch.placeholder || "";
                                    ht = '<li class="quick-options-search"><input type="text" placeholder="' + Ot + '" /><span class="reset-button qos-reset-button icn-cancel"></span></li>'
                                }
                                var At = "";
                                "dropdown" == ft && r.target.settings.view && r.target.settings.view.indexOf("dropdown") > -1 && t.listHeight && (At = "max-height:" + t.listHeight);
                                var Pt = "";
                                if ("dropdown" == ft)
                                    Pt = '<div class="archive-block-wrapper archive-block-setting-layout-dropdown archive-block-setting-text-alignment-left archive-block-setting-multicolumns ' + wt + '"><input class="archive-dropdown-toggle-checkbox" id="dropdown-filter-' + mt + '" type="checkbox"><label class="archive-dropdown-toggle-label ' + dt + '" for="dropdown-filter-' + mt + '"><span class="archive-dropdown-toggle-title ' + dt + '"' + pt + '><span class="defaultLabel"><span>' + a + '</span></span><span class="filterValues" ' + gt + '></span><span class="reset-button icn-cancel"></span></span><span class="icn-down-open"></span></label><div class="outsideFilterValues"></div><ul class="archive-group-list" style="' + At + '">' + ht + "</ul></div>";
                                else if (ft.indexOf("buttons") > -1) {
                                    var It = "";
                                    ft.indexOf("-with-labels") > -1 && (It = '<label class="archive-dropdown-toggle-label ' + dt + '" for="dropdown-filter-' + mt + '"><span class="archive-dropdown-toggle-title ' + dt + '"' + pt + '><span class="defaultLabel"><span>' + a + '</span></span><span class="filterValues" ' + gt + '></span><span class="reset-button icn-cancel"></span></span><span class="icn-down-open"></span></label>'),
                                    Pt = '<div class="buttons-wrapper ' + wt + '">' + It + '<ul class="archive-group-list"></ul></div>'
                                } else if ("input" == ft) {
                                    t.min = t.min || 0,
                                    t.max = t.max || 100,
                                    t.step = t.step || 10,
                                    t.tooltips = t.showTooltips ? ' data-tooltips="true"' : "";
                                    var Lt = t.showInputs ? "" : " hide-inputs"
                                      , qt = t.inputsDisabled ? " inputs-disabled" : ""
                                      , Tt = t.showLabel ? "" : " hide-label"
                                      , Dt = t.tolerance
                                      , Mt = (t.tolerance_factor || "both").trim()
                                      , Et = t.parse && "number" == t.parse ? 'type="number"' : 'type="text"';
                                    t.min && " data-min=" + parseFloat(t.min),
                                    t.max && " data-max=" + parseFloat(t.max),
                                    t.step && " data-step=" + parseFloat(t.step);
                                    var zt = t.inputsDisabled ? 1 : 20;
                                    t.dimension = t.dimension || "";
                                    var Bt = t.dimension + "" ? ' data-dimension="' + t.dimension + '"' : ""
                                      , Wt = t.dimensionPosition || "before"
                                      , jt = "";
                                    t.filterFunction || (t.filterFunction = function(e, i, r, a, o) {
                                        var s = e.getAttribute("data-input-value-" + i);
                                        if ("and" == (o.getFilterAttrObj[i].logic + "").toLowerCase() && !a)
                                            return !1;
                                        var n, l, c = o.getFilterAttrObj[i] && o.getFilterAttrObj[i].tolerance || 0;
                                        t.parse && -1 == s.indexOf("||") && ("number" == t.parse ? (s = (s + "").length && parseFloat(s),
                                        r = parseFloat(r),
                                        n = "both" == Mt || "negative" == Mt ? r - c : r,
                                        l = "both" == Mt || "positive" == Mt ? r + c : r) : t.parse);
                                        var d = !1;
                                        if (s && "string" == typeof s && s.split("||").length >= 2 && (d = [],
                                        s.split("||").forEach(function(t) {
                                            t && -1 == d.indexOf(t) && d.push(t)
                                        }),
                                        d = d.sort(function(t, e) {
                                            return t - e
                                        })),
                                        d) {
                                            d.length;
                                            var g = !1;
                                            return d.forEach(function(t) {
                                                g || (g = t >= n && l >= t)
                                            }),
                                            g
                                        }
                                        return !!s && (s >= n && l >= s)
                                    }
                                    ),
                                    Pt = '<div class="input-text-wrapper"><label class="archive-dropdown-toggle-label input-label" for="input-filter-' + mt + '"><span class="archive-dropdown-toggle-title ' + dt + '"' + pt + '><span class="defaultLabel"><span>' + a + '</span></span></span><input style="width: 100%" ' + Et + ' placeholder="' + a + '" class="custom-search-input" id="input-filter-' + mt + '" type="text"><span class="reset-button icn-cancel"></span></label></div>'
                                } else if ("range-inputs" == ft) {
                                    r.rangesInputs || (r.rangesInputs = []);
                                    t.min = t.min || 0,
                                    t.max = t.max || 100,
                                    t.step = t.step || 10,
                                    t.tooltips = t.showTooltips ? ' data-tooltips="true"' : "";
                                    Lt = t.showInputs ? "" : " hide-inputs",
                                    qt = t.inputsDisabled ? " inputs-disabled" : "",
                                    Tt = t.showLabel ? "" : " hide-label";
                                    var Ut = t.inputType || "text"
                                      , Yt = t.pattern && t.pattern.length ? ' pattern="' + t.pattern.trim() + '"' : ""
                                      , Rt = t.clearText ? 'data-text="' + t.clearText.trim() + '"' : ""
                                      , Vt = t.fieldsSeparator ? '<span class="fields-separator">' + ("string" == typeof t.fieldsSeparator ? t.fieldsSeparator.trim() : "") + "</span>" : "";
                                    t.min && " data-min=" + parseFloat(t.min),
                                    t.max && " data-max=" + parseFloat(t.max),
                                    t.step && " data-step=" + parseFloat(t.step);
                                    zt = t.inputsDisabled ? 1 : 20;
                                    t.dimension = t.dimension || "";
                                    Bt = t.dimension + "" ? ' data-dimension="' + t.dimension + '"' : "",
                                    Wt = t.dimensionPosition || "before",
                                    jt = "";
                                    t.filterFunction || (t.filterFunction = function(t, e, i, r) {
                                        e = e || "data-range-value-" + s;
                                        var a = t.getAttribute(e)
                                          , o = !1;
                                        if (a && a.split(",").length >= 2 && (o = [],
                                        a.split(",").forEach(function(t) {
                                            t = t && parseFloat(t),
                                            t && -1 == o.indexOf(t) && o.push(t)
                                        }),
                                        o = o.sort(function(t, e) {
                                            return t - e
                                        })),
                                        o) {
                                            o.length;
                                            var n = !1;
                                            return o.forEach(function(t) {
                                                n || (n = t >= i && r >= t)
                                            }),
                                            n
                                        }
                                        return !a || (a = parseFloat(a),
                                        a >= i && r >= a)
                                    }
                                    );
                                    var Gt = t.minPlaceholder ? 'placeholder="' + t.minPlaceholder + '"' : ""
                                      , Zt = t.maxPlaceholder ? 'placeholder="' + t.maxPlaceholder + '"' : "";
                                    Pt = '<div class="range-inputs-wrapper' + Lt + Tt + qt + '">' + jt + '<div class="filter-block-label archive-dropdown-toggle-label">' + a + '</div><div class="range-inputs" ' + t.tooltips + Bt + '><div class="inputs-wrapper"><span ' + Bt + ' class="min-range"><input ' + Gt + ' type="' + Ut + '" data-type="' + Ut + '"   step="' + t.step + '" min="' + t.min + '" max="' + t.max + '" auto-width="' + zt + '" ' + Yt + ' type="text" class="range-input range-input-min" /></span>' + Vt + "<span " + Bt + ' class="max-range"><input type="' + Ut + '" data-type="' + Ut + '"  ' + Zt + ' step="' + t.step + '" min="' + t.min + '" max="' + t.max + '" auto-width="' + zt + '" ' + Yt + ' type="text" class="range-input range-input-max" /></span><span class="reset-button icn-cancel" ' + Rt + "></span></div></div></div>"
                                } else if ("range-slider" == ft) {
                                    r.rangesSliders || (r.rangesSliders = []);
                                    var Ht = "";
                                    t.min = t.min || 0,
                                    t.max = t.max || 100,
                                    t.step = t.step || 10,
                                    t.tooltips = t.showTooltips ? ' data-tooltips="true"' : "";
                                    Lt = t.showInputs ? "" : " hide-inputs",
                                    qt = t.inputsDisabled ? " inputs-disabled" : "",
                                    Tt = t.showLabel ? "" : " hide-label";
                                    var Qt = t.hideSlider ? " hide-slider" : ""
                                      , Jt = t.labelClickable ? " label-clickable" : ""
                                      , $t = !t.connect || "string" != typeof t.connect || "upper" != t.connect.trim() && "lower" != t.connect.trim() ? "" : ' data-slider-connect="' + t.connect.trim() + '" ';
                                    t.min && (Ht += " data-min=" + parseFloat(t.min)),
                                    t.max && (Ht += " data-max=" + parseFloat(t.max)),
                                    t.step && (Ht += " data-step=" + parseFloat(t.step));
                                    zt = t.inputsDisabled ? 1 : 20;
                                    t.dimension = t.dimension || "";
                                    Bt = t.dimension + "" ? ' data-dimension="' + t.dimension + '"' : "",
                                    Wt = t.dimensionPosition || "before",
                                    jt = "";
                                    Bt && t.tooltips && (jt = "<style>.custom-filter-uid-" + r.target.index + " ." + n + " .noUi-tooltip:" + Wt + '{content:"' + t.dimension + '"}</style>'),
                                    t.filterFunction || (t.filterFunction = function(t, e, i, r) {
                                        var a = t.getAttribute(e)
                                          , o = !1;
                                        if (a && a.split(",").length >= 2 && (o = [],
                                        a.split(",").forEach(function(t) {
                                            t = t && parseFloat(t),
                                            t && -1 == o.indexOf(t) && o.push(t)
                                        }),
                                        o = o.sort(function(t, e) {
                                            return t - e
                                        })),
                                        o) {
                                            o.length;
                                            var s = !1;
                                            return o.forEach(function(t) {
                                                s = !(!s && t) || t >= i && r >= t
                                            }),
                                            s
                                        }
                                        return !(a + "") || (a = parseFloat(a),
                                        !a || a >= i && r >= a)
                                    }
                                    ),
                                    Pt = '<div class="range-slider-wrapper' + Jt + Qt + Lt + Tt + qt + '"' + $t + ">" + jt + '<div class="filter-block-label archive-dropdown-toggle-label">' + a + '</div><div class="range-slider-and-inputs-wrapper"><div class="range-slider" ' + Ht + t.tooltips + Bt + '></div><div class="inputs-wrapper"><span ' + Bt + ' class="min-range"><input auto-width="' + zt + '" type="text"  class="range-input range-input-min" /></span><span ' + Bt + ' class="max-range"><input auto-width="' + zt + '" type="text" class="range-input range-input-max" /></span></div></div></div>'
                                }
                                var Xt = t.colorSwatches || ""
                                  , Kt = ""
                                  , te = "";
                                Xt && Xt.enabled && (Xt = ' data-color-swatches="true"',
                                Kt = t.colorSwatches.showColorNames ? " show-color-names" : "",
                                te = t.colorSwatches.tooltips && t.colorSwatches.tooltips.enabled ? " show-color-tooltips" : "");
                                var ee = t.icons || "";
                                ee && ee.enabled && (ee = ' data-icon-options="true"');
                                var ie = t.hideResetButton ? " hide-reset-button " : ""
                                  , re = t.ignoreCatTagQuery ? ' data-ignore-cat-tag-query="true"' : ""
                                  , ae = d ? ' data-ignore-filter="true"' : ""
                                  , oe = Y.Node.create("<div " + p + ' data-filter-style="' + vt + '" class="sqs-block archive-block sqs-block-archive filterDropdown ' + n + " filter-type-" + ft + " " + Q + $ + K + tt + ie + St + Kt + te + Ft + '" ' + xt + re + bt + _t + Ct + Xt + ee + ae + ' data-no-filter-on-click="' + g + '" data-quick-search="' + !!ht + '" data-pos-order="' + o + '" data-filter-type="' + ft + '" data-all-option="' + y + '" data-multiple-logic="' + it + '" data-logic="' + et + '" data-children="' + rt + '" data-check-children="' + at + '" data-defined="' + l + '"  data-multiple="' + nt + '" data-strict="' + st + '" ' + H + ct + ' data-filter="' + s + '"' + P + I + u + '><div class="sqs-block-content">' + Pt + "</div></div>");
                                if (Xt = t.colorSwatches,
                                Xt && Xt.enabled) {
                                    var se = Xt.tooltips
                                      , ne = Xt.size && Xt.size.width || "32px"
                                      , le = Xt.size && Xt.size.height || "32px"
                                      , ce = Xt.circles ? "50%" : "0";
                                    if (oe._node.style.setProperty("--color-swatches-width", ne),
                                    oe._node.style.setProperty("--color-swatches-height", le),
                                    oe._node.style.setProperty("--color-swatches-border-radius", ce),
                                    oe._node.style.setProperty("--color-swatches-align", Xt.align || "center"),
                                    se && se.enabled) {
                                        var de = se.background || "#000"
                                          , ge = se.color || "#fff"
                                          , ue = se.padding || "5px"
                                          , pe = se.position || "top";
                                        oe.addClass("cf-color-swatches-position--" + pe),
                                        oe._node.style.setProperty("--color-swatches-tooltips-font-size", se.fontSize || "14px"),
                                        oe._node.style.setProperty("--color-swatches-tooltips-font-family", se.fontFamily || "inherit"),
                                        oe._node.style.setProperty("--color-swatches-tooltips-back", de),
                                        oe._node.style.setProperty("--color-swatches-tooltips-color", ge),
                                        oe._node.style.setProperty("--color-swatches-tooltips-border-radius", se.borderRadius || "0px"),
                                        oe._node.style.setProperty("--color-swatches-tooltips-padding", ue)
                                    }
                                }
                                var me = t.icons;
                                if (me && me.enabled) {
                                    var he = me.size && me.size.width || "32px"
                                      , fe = me.size && me.size.height || "32px"
                                      , ve = me.circles ? "50%" : "0"
                                      , be = me.display || "inline-block";
                                    me.hideText && oe.addClass("cf-options-hide-text"),
                                    oe._node.style.setProperty("--icon-options-width", he),
                                    oe._node.style.setProperty("--icon-options-height", fe),
                                    oe._node.style.setProperty("--icon-options-border-radius", ve),
                                    oe._node.style.setProperty("--icon-options-display", be),
                                    oe._node.style.setProperty("--icon-options-margin", me.margin || "0 5px");
                                    var ye = me.position || "left";
                                    ye = "right" == ye ? "left" : "left" == ye ? "right" : ye,
                                    oe._node.style.setProperty("--icon-options-position", me.position || "left"),
                                    oe._node.style.setProperty("--icon-options-bg-position", ye)
                                }
                                var we = t.showAll
                                  , _e = !!(t.optionsDelimiter || "string" == typeof t.optionsDelimiter && t.optionsDelimiter.length) && t.optionsDelimiter;
                                if (we && -1 === w.indexOf(y) && -1 == ft.indexOf("slider") && -1 == ft.indexOf("input") && (t.allOptionLast ? w.push(y) : w.unshift(y)),
                                r.getFilterAttrObj[s])
                                    console.warn(s + " - method already exists in getFilterAttrObj");
                                else if (r.getFilterAttrObj[s] = {
                                    attr: c,
                                    ignoreCatTagQuery: !!t.ignoreCatTagQuery,
                                    followCategoriesLinks: !!t.followCategoriesLinks,
                                    name: t.name,
                                    slugified_name: s,
                                    showAll: we,
                                    colorSwatches: t.colorSwatches,
                                    iconOptions: me,
                                    optionsDelimiter: _e,
                                    variantOption: m,
                                    type: ft,
                                    logic: et,
                                    regExp: !(!t.regExp || !t.regExp.trim()) && t.regExp.trim(),
                                    updateMinMax: !t.hasOwnProperty("updateMinMax") || t.updateMinMax,
                                    tolerance: Dt,
                                    optionsStructure: k,
                                    lowercase: !!t.lowercase,
                                    uppercase: !!t.uppercase,
                                    capitalcase: !!t.capitalcase,
                                    capitalcaseF: !!t.capitalcaseF,
                                    multiple: nt,
                                    multipleLogic: it,
                                    allOption: y,
                                    optionsLabels: ut,
                                    allOptionLast: t.allOptionLast,
                                    firstOption: t.firstOption,
                                    notAllowedOptions: z,
                                    ignoreNotAllowedForChildrenCats: !!t.ignoreNotAllowedForChildrenCats,
                                    ignoreAllowedForChildrenCats: !!t.ignoreAllowedForChildrenCats,
                                    allowedOptions: _,
                                    allowedOptionsOriginal: S,
                                    parentCategory: Z,
                                    visibleOptions: A,
                                    notVisibleOptions: q,
                                    allowedPrefSuf: W,
                                    notAllowedPrefSuf: G,
                                    allowedHash: j,
                                    allowedHashOriginal: U,
                                    rootOptions: D,
                                    defaultAttrs: ot,
                                    currentOptions: w,
                                    container: oe,
                                    disableOptionsUpdate: !!t.disableOptionsUpdate,
                                    filterFunction: t.filterFunction,
                                    quickSearch: !!ht,
                                    outsideFilterValues: yt,
                                    format: t.format,
                                    noFilterOnClick: g,
                                    sort: t.sort || "asc",
                                    ignoreFilter: d,
                                    optionsReplace: kt,
                                    optimizeSubcategoriesLogic: !t.hasOwnProperty("optimizeSubcategoriesLogic") || t.optimizeSubcategoriesLogic,
                                    forceSort: t.forceSort
                                },
                                "input" == ft)
                                    ;
                                else if ("range-inputs" == ft) {
                                    var Ce = oe.one(".range-input-min")._node
                                      , Se = oe.one(".range-input-max")._node
                                      , xe = [Ce, Se]
                                      , ke = oe.getAttribute("data-filter")
                                      , Fe = !1;
                                    t.format && "string" == typeof t.format ? (t.format = t.format.trim(),
                                    "0,0" == t.format && (Fe = {
                                        to: function(t) {
                                            return t = Number((t + "").split(",").join("")),
                                            t.toLocaleString("en-US", {
                                                minimumFractionDigits: 0
                                            })
                                        },
                                        from: function(t) {
                                            return Number((t + "").split(",").join(""))
                                        }
                                    })) : t.format && "object" == typeof t.format && t.format.to && t.format.from && (Fe = t.format),
                                    xe.forEach(function(e, i) {
                                        e.addEventListener("change", function(t) {
                                            var e = t.target
                                              , i = Fe && Fe.from && e.temp_val ? Fe.from(e.temp_val) : e.temp_val && Number(e.temp_val) || e.value || 0
                                              , a = e.classList.contains("range-input-min")
                                              , o = Fe && Fe.from && Ce.value ? Fe.from(Ce.value) : Number(Ce.value) || ""
                                              , s = Fe && Fe.from && Se.value ? Fe.from(Se.value) : Number(Se.value) || ""
                                              , n = Number(e.step) || 1;
                                            console.log("Change Event Fire", "isMin", a, "minVal", o, "maxVal", s, "target.value", e.value, "value", i, i <= o, i >= s),
                                            !a && o && i && i <= o && n ? (console.log("Max should be higher than min"),
                                            i = o + n) : a && s && i && i >= s && n && (console.log("Min should be lower than max"),
                                            i = s - n),
                                            e.value = Fe && Fe.to ? Fe.to(i) : i,
                                            console.log("input change", e.value, e.temp_val, Fe, Fe.to(i), i, Se.value, Ce.value),
                                            Se.value && 0 != Se.value || Ce.value && 0 != Ce.value ? oe.addClass("dirty") : oe.removeClass("dirty"),
                                            r._sortGrid()
                                        }),
                                        t.regExp && e.addEventListener("input", function(e) {
                                            var i = e.target;
                                            console.log("INPUT", i.value);
                                            try {
                                                i.value = i.value.replace(new RegExp(t.regExp,"g"), "")
                                            } catch (e) {
                                                console.log(e)
                                            }
                                        }, !1),
                                        e.addEventListener("focus", function(t) {
                                            t.target.parentNode.classList.add("focused")
                                        }),
                                        e.addEventListener("blur", function(t) {
                                            t.target.parentNode.classList.remove("focused")
                                        }),
                                        "text-number" == e.dataset.type && e.addEventListener("keyup", function(t) {
                                            var i = t.target
                                              , r = Number(i.min)
                                              , a = Number(i.max)
                                              , o = Fe && Fe.from && i.value ? Fe.from(i.value) : Number(i.value) || ""
                                              , s = (i.classList.contains("range-input-min"),
                                            Fe && Fe.from && Ce.value ? Fe.from(Ce.value) : Number(Ce.value) || 0)
                                              , n = Fe && Fe.from && Se.value ? Fe.from(Se.value) : Number(Se.value) || 0
                                              , l = Number(i.step) || 1;
                                            console.log("input keyup", o, i.value, l, r, a, s, n, t.which);
                                            var c = o;
                                            switch (t.which) {
                                            case 13:
                                                i.temp_val = i.value;
                                                break;
                                            case 38:
                                                console.log(o, o + l, a, Nt + l <= a),
                                                c = o + l <= a ? o + l : a,
                                                i.temp_val = c,
                                                e.dispatchEvent(new Event("change",{
                                                    bubbles: !0
                                                }));
                                                break;
                                            case 40:
                                                c = o - l > r ? o - l : r,
                                                i.temp_val = c,
                                                e.dispatchEvent(new Event("change",{
                                                    bubbles: !0
                                                }));
                                                break;
                                            default:
                                                i.temp_val = i.value
                                            }
                                        })
                                    }),
                                    inputsRange = {},
                                    inputsRange.filterFunction = function(t) {
                                        var e = Fe && Fe.from && Ce.value ? Fe.from(Ce.value) : Ce.value && Number(Ce.value) || Ce.value || ""
                                          , i = Fe && Fe.from && Se.value ? Fe.from(Se.value) : Se.value && Number(Se.value) || Se.value || Se.max || "";
                                        if (e || i) {
                                            var a = "data-range-value-" + ke;
                                            "price" == c && (a = "data-prices");
                                            var o = r.getFilterAttrObj[ke].filterFunction(t, a, e, i);
                                            return o
                                        }
                                        return !0
                                    }
                                    ,
                                    inputsRange.filterValue = s,
                                    inputsRange.name = a,
                                    r.rangesInputs.push(inputsRange)
                                } else if ("range-slider" == ft) {
                                    var Oe = oe.one(".range-slider") && oe.one(".range-slider")._node;
                                    Ce = oe.one(".range-input-min")._node,
                                    Se = oe.one(".range-input-max")._node,
                                    xe = [Ce, Se],
                                    ke = oe.getAttribute("data-filter");
                                    if (window.noUiSlider && Oe) {
                                        var Ae = parseFloat(Oe.dataset.min || 0)
                                          , Pe = parseFloat(Oe.dataset.max || 50)
                                          , Ie = parseFloat(Oe.dataset.step || 10);
                                        Ae == Pe && (Pe = Ae + Ie);
                                        var Le = {
                                            to: function(e) {
                                                if ("price" == c && !t.format || t.format && "price" == t.format)
                                                    return f(e);
                                                if (t.format) {
                                                    if ("function" == typeof t.format)
                                                        return t.format(e);
                                                    if ("string" == typeof t.format) {
                                                        if (t.format.indexOf("nFormatter") > -1) {
                                                            var i = t.format.split("|")[1] || 2;
                                                            return b(e, i)
                                                        }
                                                        if (t.format.indexOf("fixed") > -1) {
                                                            i = t.format.split("|")[1] || 0;
                                                            return e.toFixed(i)
                                                        }
                                                    }
                                                    return e.toFixed()
                                                }
                                                return e.toFixed()
                                            },
                                            from: function(e) {
                                                return "string" == typeof t.format && t.format.indexOf("nFormatter") > -1 ? v(e) : Number((e + "").replace(/\,/g, ""))
                                            }
                                        };
                                        "object" == typeof t.format && t.format.to && t.format.from && "function" == typeof t.format.to && "function" == typeof t.format.from && (Le = t.format),
                                        noUiSlider.create(Oe, {
                                            animate: !0,
                                            animationDuration: 300,
                                            tooltips: !(!t.tooltips || !t.connect) || (t.tooltips ? [!0, !0] : [!1, !1]),
                                            start: t.connect && "lower" == t.connect ? Ae : t.connect && "upper" == t.connect ? Pe : [Ae, Pe],
                                            step: Ie,
                                            connect: t.connect || !0,
                                            range: {
                                                min: Ae,
                                                max: Pe
                                            },
                                            format: Le
                                        }),
                                        Oe.noUiSlider.on("update", function(t, e) {
                                            xe[e].value = t[e];
                                            var i = this.options.range
                                              , r = Y.one(Oe).ancestor(".filterDropdown")
                                              , a = Oe.noUiSlider.options.format.from(t[0])
                                              , o = Oe.noUiSlider.options.format.from(t[1]);
                                            a != i.min || o != i.max ? r && r.addClass("dirty") : r && r.removeClass("dirty"),
                                            xe[e].parentNode.setAttribute("data-value", t[e]),
                                            xe[e].setWidth && xe[e].setWidth()
                                        }),
                                        Oe.noUiSlider.on("set", function(t, e, i) {
                                            this.options.range.min == i[0] && this.options.range.max == i[1] || (r.filterAnim = !0),
                                            Y.fire("custom-filter:filter-filtering", {
                                                customFilter: r
                                            }),
                                            r.container.fire && r.container.fire("custom-filter:filter-filtering", {
                                                customFilter: r,
                                                param: oe.getAttribute("data-filter-val")
                                            }),
                                            r.advancedMap && (r.needBoundsChange = !0),
                                            r._sortGrid()
                                        }),
                                        xe.forEach(function(t, e) {
                                            t.addEventListener("change", function() {
                                                Oe.noUiSlider.setHandle(e, this.value, !0)
                                            }),
                                            t.addEventListener("keydown", function(t) {
                                                var i, r = Oe.noUiSlider.get(), a = Number(r[e].replace(/\,/g, "")), o = Oe.noUiSlider.steps(), s = o[e];
                                                switch (t.which) {
                                                case 13:
                                                    Oe.noUiSlider.setHandle(e, this.value, !0);
                                                    break;
                                                case 38:
                                                    i = s[1],
                                                    !1 === i && (i = 1),
                                                    null !== i && Oe.noUiSlider.setHandle(e, a + i, !0);
                                                    break;
                                                case 40:
                                                    i = s[0],
                                                    !1 === i && (i = 1),
                                                    null !== i && Oe.noUiSlider.setHandle(e, a - i, !0)
                                                }
                                            })
                                        }),
                                        Oe.filterFunction = function(t) {
                                            var e = Oe.noUiSlider.get();
                                            if ("object" != typeof e && e.length && (e = [e, Oe.noUiSlider.options.range.max]),
                                            "object" == typeof e) {
                                                var i = Le.from ? Le.from(e[0]) : parseFloat((e[0] + "").replace(/\,/g, ""))
                                                  , a = Le.from ? Le.from(e[1]) : parseFloat((e[1] + "").replace(/\,/g, ""))
                                                  , o = "data-range-value-" + ke;
                                                "price" == c && (o = "data-prices");
                                                var s = r.getFilterAttrObj[ke].filterFunction(t, o, i, a);
                                                return s
                                            }
                                            return !1
                                        }
                                        ,
                                        Oe.filterValue = s,
                                        Oe.name = a,
                                        r.rangesSliders.push(Oe)
                                    }
                                }
                                r.customFilters.append(oe)
                            }
                        })
                    }
                    if (r.categoryFilter = r.customFilters.one(".categoriesDropdown"),
                    r.tagFilter = r.customFilters.one(".tagsDropdown"),
                    r.target.settings.filter.cacheOptions) {
                        var ct = r.u_id + "_" + O(r.customIndexUrl || r.collectionUrl) + "_filter_options_" + location.pathname;
                        r.filterCachedOptions = N(ct)
                    }
                }
                this.dataController && "ProductList" === this.dataController && this.dataControllerContextt ? !this.coll_data && this.dataControllerContext && this.dataControllerContext.items && (this.coll_data = {
                    items: this.dataControllerContext.items,
                    nestedCategories: this.dataControllerContext.nestedCategoryContext
                },
                this.coll_data.nestedCategories && this.coll_data.nestedCategories.categories && this.coll_data.nestedCategories.categories.length && this.coll_data.nestedCategories.categories[0].id && (this.coll_data.nestedCategories.all && (this.coll_data.nestedCategories.all.allCategory = !0,
                this.coll_data.nestedCategories.categories.unshift(this.coll_data.nestedCategories.all)),
                r.target.settings.filter && r.target.settings.filter.followNewProductsCategories && r.regenerateAllowedStructure(r.coll_data.nestedCategories)),
                r._addItemsAttributes()) : r._addItemsAttributes(!0),
                this.target.settings.parentFilter && Y.one(this.target.settings.parentFilter) && (y.push("cf-child-filter"),
                this.parentFilter = Y.one(this.target.settings.parentFilter),
                this.parentFilter && this.parentFilter._node && (this.parentFilter._node.__childFilters = this.parentFilter._node.__childFilters || [],
                this.parentFilter._node.__childFilters.push(this),
                this.parentFilter.addClass("cf-parent-filter"))),
                r._buildDropdowns();
                var dt = this.target.settings.sort;
                if (dt && dt.enabled && dt.items && dt.items.length) {
                    var gt = "sort-target-" + r.target.index + "-" + (new Date).getTime()
                      , ut = dt.initText ? 'data-init-text="' + dt.initText + '"' : ""
                      , pt = dt.hidden ? " hidden" : ""
                      , mt = parseInt(dt.positionOrder)
                      , ht = dt.hideDefaultLabelIfDirty ? " hide-def-label" : ""
                      , ft = dt.defined || ""
                      , vt = dt.hasOwnProperty("allLabel") && ' data-all-label="' + dt.allLabel + '"' || ""
                      , yt = dt.hideValueLabel ? " hide-val-label" : ""
                      , wt = dt.hideResetButton ? " hide-reset-button " : "";
                    this.sortContainer = Y.Node.create('<div class="sqs-block archive-block sqs-block-archive sortDropdown ' + pt + ht + yt + wt + '" data-defined="' + ft + '" data-pos-order="' + mt + '"><div class="sqs-block-content"><div class="archive-block-wrapper archive-block-setting-layout-dropdown archive-block-setting-text-alignment-left archive-block-setting-multicolumns"><input class="archive-dropdown-toggle-checkbox" id="dropdown-sort-' + gt + '" type="checkbox"><label class="archive-dropdown-toggle-label" for="dropdown-sort-' + gt + '"><span class="archive-dropdown-toggle-title"' + ut + '><span class="defaultLabel"><span>' + dt.title + '</span></span><span class="sortValues" ' + vt + '></span><span class="reset-button icn-cancel"></span></span><span class="icn-down-open"></span></label><ul class="archive-group-list"></ul></div></div></div>'),
                    dt.items.forEach(function(t) {
                        var e = t.name ? t.name.trim() : "Set name here"
                          , i = t.order ? t.order.split("|") : t.order || ["asc"]
                          , a = t.hidden ? " hidden" : ""
                          , o = !t.hasOwnProperty("showOrder") || t.showOrder
                          , s = "price" === O(e) ? " parseFloat" : ""
                          , n = t.orderTexts ? t.orderTexts.split("|") : []
                          , l = n.length ? "hide-pseudo" : ""
                          , c = t.hideName ? "" : e;
                        t.sort && ".grid-title" == t.sort && (t.sort = "title"),
                        i && i.length && i.forEach(function(i, d) {
                            if (r.sortObj[O(e) + "_" + i])
                                console.warn(O(e) + "_" + i + " - method already exists in sortObj");
                            else {
                                r.sortObj[O(e) + "_" + i] = t.sort || "[data-" + O(e) + "]" + s;
                                var g = o ? "_" + i : "_" + i + " hide-order"
                                  , u = n[d] || "";
                                r.sortContainer.one("ul").append('<li class="archive-group ' + O(e) + g + a + '"><a aria-label="' + e + '" href="?sort=' + O(e) + "_" + i + '" data-sort="' + O(e) + "_" + i + '" class="archive-group-name-link ' + l + '" data-hide-name="' + !c + '">' + c + '<span class="' + O(e) + "-" + i + '">' + u + "</span></a>")
                            }
                        })
                    }),
                    this.customFilters.append(r.sortContainer)
                }
                var _t = this.target.settings.search;
                if (_t && _t.enabled) {
                    var Ct = "string" == typeof _t.text && _t.text.length ? _t.text : "Search"
                      , St = (mt = parseInt(_t.positionOrder),
                    _t.resetOthers ? 'data-reset-others="' + _t.resetOthers + '"' : "");
                    this.searchMinLength = _t.minLength;
                    var xt = _t.submitOnEnter ? 'data-submit-on-enter="true"' : "";
                    this.searchContainer = Y.Node.create('<div class="sqs-block custom-items-search" ' + St + '  data-pos-order="' + mt + '"><div class="sqs-block-content"><div data-preview="false" class="search-wrap sqs-search-ui-button-wrapper color-dark"><span class="search-icon icn-search"></span><input ' + xt + ' minlength="' + _t.minLength + '" class="search-input" placeholder="' + Ct + '" type="text"/><span class="reset-button icn-cancel"></span></div></div></div>');
                    var kt = !!_t.latinize;
                    if (this.searchResetsAll = !!_t.resetsAll,
                    this.customFilters.append(this.searchContainer),
                    this.searchContainer.one(".search-icon").on("click", function(t) {
                        t.halt(),
                        r.target.settings.closeOptionsOnSelect && r._closeOptionsOnSelect(r.customFiltersWrapper),
                        r.searchContainer.toggleClass("active"),
                        r.searchContainer.hasClass("active") && r.searchContainer.one(".search-input")._node.focus()
                    }),
                    _t.searchFunc && "function" == typeof _t.searchFunc)
                        this.searchFunction = _t.searchFunc,
                        _t.searchFunc.toString && _t.searchFunc.toString().indexOf("body") > -1 && (r.SQSProxy.bodyFieldNeeded = !0),
                        _t.searchFunc.toString && _t.searchFunc.toString().indexOf("excerpt") > -1 && (r.SQSProxy.excerptFieldNeeded = !0,
                        r.target.settings.useSQSProxy.removeFields && (r.target.settings.useSQSProxy.removeFields = r.target.settings.useSQSProxy.removeFields.replace(/excerpt/g, "")));
                    else if (_t.searchFunc && "string" == typeof _t.searchFunc) {
                        var Ft = !1;
                        _t.searchFunc.indexOf("exst_text") > -1 && (_t.searchFunc = _t.searchFunc.replace(/\|exst_text/g, "").replace(/exst_text\|/g, "").replace(/exst_text/g, ""),
                        Ft = !0),
                        this.searchAttr = _t.searchFunc.replace(/ /g, "").split("|").filter(function(t) {
                            return t
                        }),
                        this.searchAttr.indexOf("body") > -1 && (r.SQSProxy.bodyFieldNeeded = !0),
                        this.searchAttr.indexOf("excerpt") > -1 && (r.SQSProxy.excerptFieldNeeded = !0,
                        r.target.settings.useSQSProxy.removeFields && (r.target.settings.useSQSProxy.removeFields = r.target.settings.useSQSProxy.removeFields.replace(/excerpt/g, ""))),
                        _t.ignoreChars && "string" == typeof _t.ignoreChars && _t.ignoreChars.length && (r.searchIgnoreChars = _t.ignoreChars),
                        this.searchFunction = function(t) {
                            var e = "";
                            return t = t._node ? t._node : t,
                            e = Ft ? t.textContent && t.textContent.replace(/\r?\n|\r/g, " ").trim() : "",
                            t._item_data && r.searchAttr.length && r.searchAttr.forEach(function(i) {
                                var r = "";
                                if (i.indexOf(".") > -1 && _(i, t._item_data) ? r = _(i, t._item_data) : t._item_data[i] ? r = t._item_data[i] && (t._item_data[i] + "").length ? t._item_data[i] : "" : i && t.querySelector(i) && (r = t.querySelector(i).textContent.replace(/\r?\n|\r/g, " ").trim()),
                                r) {
                                    var a = r + "";
                                    if ("object" == typeof r && (a = JSON.stringify(r)),
                                    "body" == i || "excerpt" == i) {
                                        t._item_data.__body__;
                                        const e = w(a);
                                        var o = null;
                                        if ("body" == i && _t.excludeRelatedSummaries && t._item_data && t._item_data.collectionId) {
                                            o = t._item_data.collectionId;
                                            try {
                                                var s = e.querySelectorAll('.summary-v2-block[data-block-json*="' + o + '"]');
                                                if (s && s.length)
                                                    for (let t = 0; t < s.length; t++)
                                                        s[t].parentNode.removeChild(s[t])
                                            } catch (t) {
                                                console.error(t)
                                            }
                                        }
                                        a = e.innerText.replace(/\n+/g, "\n").trim() || ""
                                    }
                                    e += a
                                }
                            }),
                            e = e.trim(),
                            kt && e && (e = A(e)),
                            _t.ignoreChars && "string" == typeof _t.ignoreChars && _t.ignoreChars.length && (r.searchIgnoreChars = _t.ignoreChars,
                            _t.ignoreChars.split("").forEach(function(t) {
                                e = e.replaceAll(t, "")
                            })),
                            e.replace(/\n /g, "")
                        }
                    }
                    null !== _t.regExpWordsDelimiter && (r.regExpWordsDelimiter = _t.regExpWordsDelimiter),
                    this.target.settings.view && "modern" == this.target.settings.view && r.searchContainer.one(".sqs-block-content").prepend(r.searchContainer.one(".search-icon"))
                }
                if (p && p.advancedMapContainer && p.autocomplete.enabled) {
                    Ct = p.autocomplete.text.trim() || "Search Map",
                    mt = parseInt(p.autocomplete.positionOrder);
                    this.searchMinLength = p.autocomplete.minLength,
                    this.mapAutocompleteContainer = Y.Node.create('<div class="sqs-block custom-items-search map-autocomplete-search" data-pos-order="' + mt + '"><div class="sqs-block-content"></span><div data-preview="false" class="search-wrap sqs-search-ui-button-wrapper color-dark"><span class="search-icon icn-search"></span><input minlength="' + p.autocomplete.minLength + '" class="search-input" placeholder="' + Ct + '" type="text"/><span class="reset-button icn-cancel"></span></div></div></div>');
                    this.mapAutocompleteContainer.one(".search-wrap");
                    this.target.settings.view && "modern" == this.target.settings.view && r.mapAutocompleteContainer.one(".sqs-block-content").prepend(r.mapAutocompleteContainer.one(".search-icon"));
                    var Ot = function() {
                        var t = p.autocomplete.dimension.val || 1e4
                          , e = p.autocomplete.radius.val ? p.autocomplete.radius.val * t : 1e5;
                        r.advancedMap && r.advancedMap._node && r.advancedMap._node.radiusCircle && e !== r.advancedMap._node.radiusCircle.getRadius() && (r.mapPlaceFound = !0,
                        r.advancedMap._node.radiusCircle.setRadius(e),
                        r._followMapBounds())
                    }
                      , At = Y.Node.create('<div class="sqs-block map-autocomplete-dimension-radius" data-pos-order="' + mt + '"><div class="sqs-block-content"></div></div>')
                      , Pt = !1;
                    if (p.autocomplete.radius && p.autocomplete.radius.enabled) {
                        var It = p.autocomplete.radius.hidden ? " hidden" : ""
                          , Lt = p.autocomplete.radius.step || 1
                          , qt = p.autocomplete.radius.max || 100
                          , Tt = p.autocomplete.radius.min || 1
                          , Nt = p.autocomplete.radius.val || qt
                          , Dt = Y.Node.create('<div class="map-autocomplete-radius"><span class="radius-control quantity-input' + It + '"><input auto-width type="number" step="' + Lt + '" min="' + Tt + '" max="' + qt + '" value="' + Nt + '" /><div class="quantity-nav"><div class="quantity-button quantity-up" data-val="up">+</div><div class="quantity-button quantity-down" data-val="down">-</div></div></span></div>');
                        Dt.one("input").on("change", function(t) {
                            var e = t.currentTarget.get("value");
                            p.autocomplete.radius.val = parseFloat(e),
                            Ot(),
                            console.log("Radius Control change", e)
                        }),
                        Pt = !0,
                        At.one(".sqs-block-content").append(Dt)
                    }
                    if (p.autocomplete.dimension && p.autocomplete.dimension.enabled) {
                        var Mt = p.autocomplete.dimension.hidden ? " hidden" : ""
                          , Et = ""
                          , zt = p.autocomplete.dimension.values
                          , Bt = (Nt = p.autocomplete.dimension.val,
                        0);
                        if (zt)
                            for (var Wt in zt)
                                if (zt.hasOwnProperty(Wt)) {
                                    var jt = zt[Wt];
                                    Bt++;
                                    var Ut = Nt && Wt == Nt ? " selected" : "";
                                    Et += '<option value="' + jt + '"' + Ut + ">" + Wt + "</option>",
                                    Ut && (p.autocomplete.dimension.val = jt)
                                }
                        var Yt = Y.Node.create('<div class="map-autocomplete-dimension cf-selectbox"><span class="dimension-control' + Mt + '" data-count="' + Bt + '"><select>' + Et + '</select><span class="icn-down-open"></span></span></div>');
                        Yt.one("select").on("change", function(t) {
                            var e = t.currentTarget.get("value");
                            p.autocomplete.dimension.val = parseFloat(e),
                            Ot()
                        }),
                        Pt = !0,
                        At.one(".sqs-block-content").append(Yt)
                    }
                    this.customFilters.append(this.mapAutocompleteContainer),
                    Pt && this.customFilters.append(At),
                    this.mapAutocompleteContainer.one(".search-icon").on("click", function(t) {
                        t.halt(),
                        r.mapAutocompleteContainer.toggleClass("active"),
                        r.mapAutocompleteContainer.hasClass("active") && r.mapAutocompleteContainer.one(".search-input")._node.focus()
                    });
                    var Rt = d(function(t) {
                        r.mapAutocompleteContainer.addClass("searching"),
                        t.newVal = t.newVal ? t.newVal : !!t.target && t.target.value,
                        t.newVal && t.newVal.trim() || r.mapAutocompleteContainer.removeClass("searching"),
                        t.newVal ? r.mapAutocompleteContainer.addClass("dirty") : r.mapAutocompleteContainer.removeClass("dirty")
                    }, p.autocomplete.timeout, !1);
                    this.mapAutocompleteContainer.one(".search-input").on("valuechange", function(t) {
                        Rt(t)
                    }),
                    this.mapAutocompleteContainer.delegate("click", function(t) {
                        t.halt(),
                        r.filterAnim = !0,
                        r.mapAutocompleteContainer.one(".search-input").set("value", ""),
                        r.mapAutocompleteContainer.removeClass("dirty"),
                        r.advancedMap && r.advancedMap._node && r.advancedMap._node.radiusCircle && (r.advancedMap._node.radiusCircle.setMap(null),
                        r.advancedMap._node.radiusCircle = null),
                        r.firstMapBoundRun = !1,
                        r.needBoundsChange = !0,
                        r._sortGrid(!0)
                    }, ".reset-button")
                }
                this.target.settings.useSQSProxy && this.target.settings.useSQSProxy.enabled && (!this.target.settings.useSQSProxy.removeFields || this.target.settings.useSQSProxy.removeFields && -1 == this.target.settings.useSQSProxy.removeFields.indexOf("body")) && (r.SQSProxy.bodyFieldNeeded || (this.target.settings.useSQSProxy.removeFields += ",body"));
                var Vt = r.customFiltersWrapper.all(".sqs-block-archive,.sqs-block-archive .archive-group-list");
                Vt && Vt.each(function(t, e) {
                    t.setStyle("zIndex", 1100 - e)
                }),
                this._checkExternalLinks(),
                this.target.settings.useHistory && (y.push("cf-using-history"),
                r.blockPushState = !0,
                this.popstateListener = function(t) {
                    r.blockPushState = !0,
                    r._checkInitState(!0)
                }
                ,
                window.addEventListener("popstate", this.popstateListener));
                var Gt = function(t) {
                    if (t.halt(),
                    r.customFiltersWrapper.all(".archive-group-name-link.active").removeClass("active"),
                    r.topSection && r.topSection.all(".archive-group-name-link.active").removeClass("active"),
                    r.rangesSliders && r.rangesSliders.forEach(function(t) {
                        if (t.noUiSlider) {
                            var e = t.noUiSlider.options.range;
                            t.noUiSlider.set([e.min, e.max])
                        }
                    }),
                    r.searchContainer && r.searchContainer.one(".search-input") && (r.searchContainer.one(".search-input").set("value", ""),
                    r.searchContainer.removeClass("dirty"),
                    r.debounce_search({
                        newVal: "",
                        reset: !0
                    })),
                    r.target.settings.hooks && r.target.settings.hooks.clearAllClicked)
                        try {
                            "function" == typeof r.target.settings.hooks.clearAllClicked && r.target.settings.hooks.clearAllClicked(r)
                        } catch (t) {
                            console.error(t)
                        }
                    r.filterAnim = !0,
                    r._sortGrid()
                };
                this.customFiltersWrapper.delegate("click", Gt, ".clearAllBtn"),
                this.container.get("parentNode").delegate("click", function(t) {
                    t.halt(),
                    t.currentTarget = t.currentTarget._node ? t.currentTarget : Y.one(t.currentTarget);
                    var e = t.currentTarget.getAttribute("data-index");
                    if ("prev" == e ? e = r.pagination_num > 1 ? r.pagination_num - 1 : 1 : "next" == e && (e = r.pagination_num + 1),
                    e) {
                        var i = function() {
                            r.filterAnim = !0,
                            r.paginationClicked = !0,
                            r.pagination_num = parseInt(e),
                            r.pag_num_query = r.pagination_num,
                            r._sortGrid()
                        };
                        if ("bottom" == r.target.settings.pagination.place && r.target.settings.pagination.scrollToTop && r.target.settings.pagination.scrollToTop.duration) {
                            var a = r.container.getY() - 160
                              , o = window.pageYOffset || document.documentElement.scrollTop
                              , s = r.target.settings.pagination.scrollToTop.duration / 1e3;
                            Math.abs(o - a) > 300 ? r.scrollEl.anim({}, {
                                to: {
                                    scroll: [0, a]
                                },
                                duration: s,
                                easing: Y.Easing.easeBoth
                            }).run().on("end", function() {
                                i()
                            }) : i()
                        } else
                            i()
                    }
                }, ".pagination-item a"),
                this.container.get("parentNode").delegate("click", function(t) {
                    t.halt(),
                    t.currentTarget = t.currentTarget._node ? t.currentTarget : Y.one(t.currentTarget);
                    var e = !(!r.pagination || !r.pagination.one(".pagination-item.active a")) && r.pagination.one(".pagination-item.active a").getAttribute("data-index");
                    if (e) {
                        var i = function() {
                            r.filterAnim = !1,
                            r.paginationClicked = !0,
                            r.loadMoreButtonClicked = !0,
                            r.pagination_num = parseInt(e) + 1,
                            r.pag_num_query = r.pagination_num,
                            r._sortGrid()
                        };
                        r.pagination.one('.pagination-item a[data-index="' + (parseInt(e) + 1) + '"]') ? i() : console.log("No next page", e)
                    } else
                        console.log("Can not find pagination num")
                }, ".pagination-loadMore");
                var Zt = function(t) {
                    t.preventDefault(),
                    t.stopImmediatePropagation(),
                    t.currentTarget = t.currentTarget._node ? t.currentTarget : Y.one(t.currentTarget);
                    var e = t.currentTarget.get("parentNode")
                      , i = e && e.one(".archive-dropdown-toggle-checkbox");
                    if (e.addClass("clicked"),
                    r.target.settings.accordionDropdowns && (r.customFiltersWrapper.all(".archive-block-wrapper:not(.clicked) .archive-dropdown-toggle-checkbox").set("checked", !1),
                    r.topSection && r.topSection.all(".archive-block-wrapper:not(.clicked) .archive-dropdown-toggle-checkbox").set("checked", !1)),
                    i) {
                        var a = i.get("checked");
                        i.set("checked", !a),
                        i._node.dispatchEvent(new Event("change"))
                    }
                    if (t.currentTarget.get("parentNode").removeClass("clicked"),
                    e.hasClass("label-clickable") && e.toggleClass("active"),
                    r.target.settings.hooks && r.target.settings.hooks.labelClicked)
                        try {
                            "function" == typeof r.target.settings.hooks.labelClicked && r.target.settings.hooks.labelClicked(r, t.currentTarget)
                        } catch (t) {
                            console.error(t)
                        }
                };
                this.customFiltersWrapper.delegate("click", Zt, ".archive-dropdown-toggle-label");
                var Ht = function(t) {
                    t.currentTarget = t.currentTarget._node ? t.currentTarget : Y.one(t.currentTarget),
                    t.currentTarget.addClass("clicked"),
                    r.target.settings.closeOptionsOnSelect && r._closeOptionsOnSelect(r.customFiltersWrapper),
                    r.topSection && r.target.settings.closeOptionsOnSelect && r._closeOptionsOnSelect(r.topSection),
                    r.searchContainer && r.searchContainer.removeClass("active"),
                    t.currentTarget.removeClass("clicked")
                };
                if (this.customFiltersWrapper.delegate("click", Ht, ".archive-block-wrapper"),
                this.target.settings.closeOnMouseOut && r.customFiltersWrapper.delegate("hover", function(t) {
                    t.currentTarget = t.currentTarget._node ? t.currentTarget : Y.one(t.currentTarget),
                    t.currentTarget.addClass("hovered")
                }, function(t) {
                    t.currentTarget = t.currentTarget._node ? t.currentTarget : Y.one(t.currentTarget),
                    t.currentTarget.removeClass("hovered");
                    var e = t.currentTarget.one(".archive-dropdown-toggle-checkbox");
                    e && (e.set("checked", !1),
                    e._node.dispatchEvent(new Event("change")))
                }, ".archive-block"),
                this.container.config && this.container.config.ajaxData ? (this.coll_data = this.container.config.ajaxData,
                this.target.settings.requestAttrWithAjax = !1,
                r._start()) : this.coll_data && this.coll_data.collection && this.coll_data.collection.id && r._start(),
                this.container.LazySummariesData && this.container.LazySummariesData.enableLazy && window.__initializeLazySummaries && (this.target.settings.requestAttrWithAjax = !1),
                y.push(this.u_id),
                this.target.settings.mobilePanel && this.target.settings.mobilePanel.enabled) {
                    this.target.settings.mobilePanel.useAsDesktop || y.push("use-mobile-panel"),
                    this.target.settings.mobilePanel.align && y.push("cf-mobile-panel-align-" + this.target.settings.mobilePanel.align),
                    this.target.settings.mobilePanel.useNavStyle && y.push("cf-mobile-menu-nav");
                    var Qt = this.target.settings.mobilePanel.closeButtonPosition;
                    Qt || (Qt = "bottom"),
                    y.push("cf-mobile-panel-close-position-" + Qt),
                    !0 === this.target.settings.mobilePanel.keepDropdownsOpen ? y.push("mobile-panel-dropdowns-opened") : !1 === this.target.settings.mobilePanel.keepDropdownsOpen && y.push("mobile-panel-dropdowns-closed")
                }
                this.target.settings.keepDropdownsOpen && y.push("keep-dropdowns-open");
                var Jt = this.target.settings.keepDropdownsOpenOnInit;
                if (Jt && y.push("keep-dropdowns-open-on-init"),
                this.target.settings.pagination && this.target.settings.pagination.enabled && y.push("cf-pagination-enabled"),
                this.target.settings.pagination && this.target.settings.pagination.enabled && this.target.settings.pagination.loadMoreButton && this.target.settings.pagination.loadMoreButton.enabled && (y.push("cf-loadMoreButton-enabled"),
                this.pagination_num = 1),
                (this.itemsParent && this.itemsParent._node && this.itemsParent._node.className.indexOf("-masonry-") > -1 || this.itemsParent && this.itemsParent._node && this.itemsParent._node.className.indexOf("-strip-") > -1) && (this.target.settings.simpleFilter.anim = !1),
                !this.target.settings.simpleFilter.anim || this.target.settings.isotope && this.target.settings.isotope.enabled || this.target.settings.mixitup && this.target.settings.mixitup.enabled)
                    y.push("no-used-css-animation");
                else {
                    if (this.target.settings.simpleFilter.layoutAnim)
                        y.push("using-layout-animation"),
                        this.target.settings.simpleFilter.persistent = !0;
                    else {
                        y.push("used-css-animation"),
                        y.push("show-animation-" + this.target.settings.simpleFilter.show.effect),
                        y.push("hide-animation-" + this.target.settings.simpleFilter.hide.effect);
                        var $t = this.target.settings.simpleFilter.show.easing
                          , Xt = "." + r.u_id + ".used-css-animation  .custom-filter-grid-item{transition: opacity " + this.target.settings.simpleFilter.show.transitionDuration + "ms " + $t + ", transform " + this.target.settings.simpleFilter.show.transitionDuration + "ms " + $t + "}";
                        if (this.target.settings.simpleFilter.hide.transitionDuration) {
                            var Kt = this.target.settings.simpleFilter.hide.easing;
                            Xt += "." + r.u_id + ".used-css-animation .hiding .custom-filter-grid-item{transition: opacity " + this.target.settings.simpleFilter.hide.transitionDuration + "ms " + Kt + ", transform " + this.target.settings.simpleFilter.hide.transitionDuration + "ms " + Kt + "}"
                        }
                        l(Xt, "stylesheet-" + (r.container.getAttribute("id") || r.container._node && r.container._node._yuid), r.container._node)
                    }
                    this.target.settings.simpleFilter.persistent && y.push("persistent-animation")
                }
                var te = this.collectionUrl
                  , ee = (this.collectionUrl && u(this.collectionUrl.trim()),
                this.container.one(".product-filter-dropdown-select option") && this.container.one(".product-filter-dropdown-select option[selected]") && this.container.all(".product-filter-dropdown-select option[selected]") || this.container.one(".category-dropdown__select option") && this.container.one(".category-dropdown__select option[selected]") && this.container.all(".category-dropdown__select option[selected]") || this.container.ancestor("section.page-section") && this.container.ancestor("section.page-section").one(".nested-category-tree-wrapper a.category-link.active") && this.container.ancestor("section.page-section").all(".nested-category-tree-wrapper a.category-link.active"));
                if (ee && ee.size() && (ee = ee.item(ee.size() - 1)),
                ee && this.collectionUrl && (this.collectionUrl = this.collectionUrl && this.collectionUrl.length ? this.collectionUrl : this.items && this.items.item(0) && this.items.item(0).one("a").getAttribute("href").split("/p/")[0].split("/v/")[0] || this.collectionUrl,
                te = ee.get("pathname"),
                u(te) != u(this.collectionUrl))) {
                    this.products_category_page = ee.get("textContent");
                    var ie = ee.ancestor(".category-item");
                    ie && (this.parent_products_category_page = ie.one(".activeParent") && ie.one(".activeParent").get("innerText"))
                }
                if (this.products_category_page || this.list_category_page) {
                    var re = decodeURIComponent(this.products_category_page.replace(/\+/g, " ").replace(/\%/g, ""));
                    if (!r.getFilterAttrObj.category) {
                        var ae = r.customFiltersWrapper.all('.filterDropdown[data-get-attr="categories"] .archive-group-name-link[data-filter][data-filter-val="' + O(re) + '"]');
                        ae.size() || r.customFiltersWrapper && !r.customFiltersWrapper.one(".name-Additional-Category-Query") && (r.customFilters.prepend('<div class="sqs-block hidden archive-block sqs-block-archive filterDropdown name-Additional-Category-Query filter-type-dropdown hide-def-label" data-quick-search="false" data-pos-order="1" data-filter-type="dropdown" data-all-option="All" data-multiple-logic="or" data-logic="and" data-defined="false" data-multiple="false" data-strict="true" data-filter="category" data-get-attr="categories"><div class="sqs-block-content"><div class="archive-block-wrapper archive-block-setting-layout-dropdown archive-block-setting-text-alignment-left archive-block-setting-multicolumns"><input class="archive-dropdown-toggle-checkbox" id="dropdown-Additional-Category-Query" type="checkbox"><label class="archive-dropdown-toggle-label" for="dropdown-Additional-Category-Query"><span class="archive-dropdown-toggle-title"><span class="defaultLabel"><span>Category Query</span></span><span class="filterValues" data-all-label=": All"></span><span class="reset-button icn-cancel"></span></span><span class="icn-down-open"></span></label><div class="outsideFilterValues"></div><ul class="archive-group-list" style="z-index: 1100;"><li data-root-option="true" class="archive-group"><a href="' + O(re) + '" data-filter-val="' + O(re) + '" data-filter="category" class="archive-group-name-link">' + re + "</a></li></ul></div></div></div>"),
                        r.getFilterAttrObj.category = {
                            attr: "categories",
                            name: "Additional Category Query",
                            slugified_name: "category",
                            showAll: !1,
                            type: "dropdown",
                            logic: "and",
                            allowedOptionsOriginal: [],
                            currentOptions: []
                        },
                        console.log("category query option added"))
                    }
                }
                var oe = this.customFilters.all(".sqs-block");
                oe._nodes.sort(function(t, e) {
                    t = parseInt(t.getAttribute("data-pos-order")),
                    e = parseInt(e.getAttribute("data-pos-order"));
                    return t - e
                }),
                r._initFiltering(),
                r._checkInitState(this.target.settings.waitForAjax),
                r.first_sort_run || r.target.settings.requestAttrWithAjax && (!r.target.settings.requestAttrWithAjax || r.target.settings.waitForAjax) || r._sortGrid();
                var se = r.itemsParent && r.itemsParent.hasAttribute("data-controller") ? r.itemsParent : r.itemsParent && r.itemsParent.get("parentNode").hasAttribute("data-controller") ? r.itemsParent.get("parentNode") : r.itemsParent && r.itemsParent.hasClass("collection-content-wrapper") ? r.itemsParent : null;
                if (!r.target.settings.noFirstControllerClass && r.itemsParent && se && se._node && se._node.classList && se._node.classList[0]) {
                    if ("top" == r.target.settings.position) {
                        var ne = r.customFiltersWrapper;
                        r.target.settings.filtersFollowGridLayout && (ne = r.customFiltersWrapper.one(".customFiltersContainer"),
                        y.push("cf-follow-grid-layout")),
                        r.itemsParent && r.itemsParent.hasAttribute("data-controller") && r.itemsParent.getAttribute("data-controller").indexOf("UserItemsList") > -1 ? ne.addClass(se._node.classList[1]).setAttribute("data-layout-width", se.getAttribute("data-layout-width")) : (ne.addClass(se._node.classList[0]),
                        r.itemsParent.hasClass("collection-content-wrapper") && !r.target.settings.wrapFilterContainer && ne.addClass("collection-content-wrapper")),
                        ne.addClass("controller-first-class-added")
                    }
                    "left" != r.target.settings.position && "right" != r.target.settings.position || !r.target.settings.wrapFilterContainer || (r.container.addClass(se._node.classList[0]),
                    r.container.addClass("controller-first-class-added"))
                }
                if (this.customFilters.insert(oe, null),
                this.target.settings.hidden && r.customFiltersWrapper.setStyles({
                    display: "none",
                    visibility: "hidden"
                }),
                this.target.settings.updateFilterOptions && (this.target.settings.updateFilterOptions.showOptionsCounters && y.push("cf-show-options-counter"),
                this.target.settings.updateFilterOptions.enabled && (this.target.settings.updateFilterOptions.nonExistOptions && this.target.settings.updateFilterOptions.nonExistOptions.disable && y.push("cf-non-exist-options-disable"),
                this.target.settings.updateFilterOptions.nonExistOptions && this.target.settings.updateFilterOptions.nonExistOptions.disableHard && y.push("cf-non-exist-options-disable-hard"),
                this.target.settings.updateFilterOptions.nonExistOptions && this.target.settings.updateFilterOptions.nonExistOptions.hide && y.push("cf-non-exist-options-hide"))),
                this.virtualFilter && (this.customFilters.all(".archive-block").size() > 0 || this.customFiltersWrapper.one(".custom-items-search"))) {
                    var le = this.target.settings.virtualFilter.goButton.title || "Search"
                      , ce = this.target.settings.virtualFilter.goButton.place || "after"
                      , de = this.target.settings.virtualFilter.goButton.show ? "cf-virtual-go-btn-show" : ""
                      , ge = this.target.settings.virtualFilter.realFilterPageUrl || this.target.settings.collectionUrl
                      , ue = this.target.settings.virtualFilter.goButton.positionOrder || 10;
                    this.virtualGoButton = Y.Node.create('<div data-pos-order="' + ue + '" class="sqs-block virtualGoBtnContainer ' + de + '"><div class="sqs-block-content"><div class="go-btn-block-wrapper"><a id="virtualGoButton-' + this.u_id + '" href="' + ge + '" class="virtualGoBtn">' + le + "</a></div></div></div>");
                    var pe = r.customFilters.one(".custom-items-search") || this.customFilters.one(".sortDropdown") || this.customFilters.one(".filterDropdown");
                    if ("before" == ce)
                        pe && r.customFilters.insert(r.virtualGoButton, pe);
                    else if ("after" == ce)
                        pe = r.customFilters.one(".sqs-block-archive[data-pos-order]:not(.items)") ? r.customFilters.all(".sqs-block-archive[data-pos-order]:not(.items)") : r.customFilters.all(".custom-items-search").size() ? r.customFilters.all(".custom-items-search") : r.customFilters.all(".sqs-block-archive[data-pos-order]"),
                        pe.size() && pe.item(pe.size() - 1).insert(r.virtualGoButton, "after");
                    else {
                        var me = Y.one(ce);
                        me ? ce.prepend(r.virtualGoButton) : pe && r.customFilters.insert(r.virtualGoButton, pe)
                    }
                    this.virtualGoButton = this.virtualGoButton.one("a")
                }
                if (this.target.settings.clearAllButton && this.target.settings.clearAllButton.enabled && this.customFilters.all(".archive-block").size() > 0) {
                    y.push("custom-filter-clear-all-enabled");
                    var he = this.target.settings.clearAllButton.text || "Clear All"
                      , fe = this.target.settings.clearAllButton.place || "before"
                      , ve = this.target.settings.clearAllButton.show ? "cf-clr-btn-show" : ""
                      , be = this.target.settings.clearAllButton.positionOrder ? ' data-pos-order="' + this.target.settings.clearAllButton.positionOrder + '"' : "";
                    this.clearAllBtn = Y.Node.create('<div class="sqs-block clearAllBtnWrapper ' + ve + '" ' + be + '><div class="sqs-block-content"><a href="#clear_' + this.u_id + '" rel="nofollow" class="clearAllBtn">' + he + "</a></div></div>");
                    var ye = this.customFilters.one(".sqs-block[data-pos-order]") ? this.customFilters.one(".sqs-block[data-pos-order]:not(.items)") : this.customFilters.one(".filterDropdown") || this.customFilters.one(".sortDropdown") || r.customFilters.one(".custom-items-search");
                    if ("before" == fe)
                        ye && r.customFilters.insert(r.clearAllBtn, ye);
                    else if ("after" == fe)
                        ye = r.customFilters.one(".custom-items-search") ? r.customFilters.all(".custom-items-search") : r.customFilters.all(".sortDropdown").size() ? r.customFilters.all(".sortDropdown") : r.customFilters.all(".filterDropdown"),
                        ye.size() && ye.item(ye.size() - 1).insert(r.clearAllBtn, "after");
                    else {
                        var we = Y.one(fe);
                        we ? fe.prepend(r.clearAllBtn) : ye && r.customFilters.insert(r.clearAllBtn, ye)
                    }
                }
                if (this.target.settings.confirmButton && this.target.settings.confirmButton.enabled) {
                    y.push("custom-filter-confirm-button-enabled");
                    var _e = this.target.settings.confirmButton.text || "Results"
                      , Ce = this.target.settings.confirmButton.place || "before"
                      , Se = this.target.settings.confirmButton.show ? " cf-confirm-btn-show" : ""
                      , xe = this.target.settings.confirmButton.initialIgnore ? ' data-ignore="true"' : "";
                    this.confirmButton = Y.Node.create('<div class="sqs-block confirmButtonWrapper' + Se + '"><div class="sqs-block-content"><div class="archive-block-wrapper"><a href="#confirm_' + this.u_id + '" rel="nofollow" class="cf-confirmButton"' + xe + ">" + _e + "</a></div></div></div>");
                    var ke = this.customFilters.one(".sqs-block[data-pos-order]") ? this.customFilters.one(".sqs-block[data-pos-order]:not(.items)") : r.customFilters.one(".clearAllBtnWrapper") ? r.customFilters.one(".clearAllBtnWrapper") : this.customFilters.one(".custom-items-search") || this.customFilters.one(".filterDropdown") || this.customFilters.one(".sortDropdown");
                    if ("before" == Ce)
                        ke && r.customFilters.insert(r.confirmButton, ke);
                    else if ("after" == Ce)
                        ke = r.customFilters.one(".clearAllBtnWrapper") ? r.customFilters.all(".clearAllBtnWrapper") : r.customFilters.one(".custom-items-search") ? r.customFilters.all(".custom-items-search") : r.customFilters.all(".sortDropdown").size() ? r.customFilters.all(".sortDropdown") : r.customFilters.all(".filterDropdown"),
                        ke && ke.size() && ke.item(ke.size() - 1).insert(r.confirmButton, "after");
                    else {
                        var Fe = Y.one(Ce);
                        Fe ? Ce.prepend(r.confirmButton) : ke && r.customFilters.insert(r.confirmButton, ke)
                    }
                    this.confirmButton.on("click", function(t) {
                        t.halt(),
                        r.confirmButton.setAttribute("data-clicked", !0),
                        r.mobilePanelClose && r.mobilePanelClose(),
                        r._sortGrid()
                    })
                }
                if (this.itemsParent && this.target.settings.noResultMessage && (y.push("cf-custom-no-results-message"),
                this.itemsParent.hasClass("map-block") && ".outside-marker-item" == (this.target.items + "").trim() ? this.itemsParent.one(".sqs-block-content") && this.itemsParent.one(".sqs-block-content").insert('<div class="cf-no-results-wrapper">' + this.target.settings.noResultMessage + "</div>", "before") : this.itemsParent.insert('<div class="cf-no-results-wrapper">' + this.target.settings.noResultMessage + "</div>", "before"),
                this.noResultWrapper = this.container.one(".cf-no-results-wrapper")),
                y = y.toString().replace(/,/g, " "),
                this.container.addClass(y),
                this.target.settings.placeFiltersTo) {
                    r.container._node && (r.container._node.className = r.container._node.className.replace(/custom-filter-position-/g, "no-position-"));
                    var Oe = !1
                      , Ae = ""
                      , Pe = "append";
                    if ("string" == typeof this.target.settings.placeFiltersTo && (Ae = this.target.settings.placeFiltersTo.split("|"),
                    2 == Ae.length && (Pe = Ae[1] || Pe),
                    Ae = Ae[0]),
                    "object" == typeof this.target.settings.placeFiltersTo && this.target.settings.placeFiltersTo.desktop && this.target.settings.placeFiltersTo.mobile || (Oe = Y.one(Ae)),
                    Oe) {
                        r.placedContainer = Oe.addClass("cf-placed-filters").addClass(y).addClass(r.positionClasses)[Pe](this.customFiltersWrapper);
                        var Ie = r.placedContainer.ancestor("#header");
                        Ie && y.indexOf("use-mobile-panel") > -1 && Ie.addClass("header-filter-placed")
                    } else
                        console.log("Sorry, place container is not found."),
                        r.container.prepend(r.customFiltersWrapper)
                } else
                    r.container.hasClass("sqs-block-gallery") && r.container.one(".sqs-gallery-container") ? r.container.one(".sqs-gallery-container").prepend(r.customFiltersWrapper) : r.itemsParent && r.itemsParent.get("id") && "productList" == r.itemsParent.get("id") || r.itemsParent && r.itemsParent.hasClass("product-list-container") ? r.itemsParent.insert(r.customFiltersWrapper, "before") : r.container.prepend(r.customFiltersWrapper);
                if (this._doSidebarWidth(),
                this.target.settings.mobilePanel && this.target.settings.mobilePanel.enabled) {
                    if (this.target.settings.mobilePanel.title) {
                        var Le = document.createElement("div");
                        Le.className = "cf-mobile-panel-title",
                        Le.innerHTML = this.target.settings.mobilePanel.title,
                        this.customFilters && this.customFilters.prepend(Le)
                    }
                    var qe = this.target.settings.mobilePanel.useAsDesktop;
                    qe ? (this.container.addClass("cf-mobile-panel-visible"),
                    this.customFiltersWrapper && this.customFiltersWrapper.prepend('<button class="mobile-filter-trigger">' + this.target.settings.mobilePanel.triggerButtonName + "</button>"),
                    this.container.removeClass("preFlex").removeClass("flexIn").removeClass("preScale").removeClass("inScale")) : this.container.one(".product-list-header") ? this.container.one(".product-list-header").append('<button class="mobile-filter-trigger">' + this.target.settings.mobilePanel.triggerButtonName + "</button>") : this.container.prepend('<button class="mobile-filter-trigger">' + this.target.settings.mobilePanel.triggerButtonName + "</button>"),
                    this.container.one(".mobile-filter-trigger").on("click", function(t) {
                        t.preventDefault(),
                        r.container.removeClass("preFlex").removeClass("flexIn").removeClass("preScale").removeClass("inScale"),
                        r.parentFilter && r.parentFilter.CustomFilter && r.parentFilter.CustomFilter.container && r.parentFilter.CustomFilter.container.one(".mobile-filter-trigger") ? r.parentFilter.CustomFilter.container.one(".mobile-filter-trigger").simulate("click") : (!r.customFiltersWrapper.hasClass("cf-mp-transitions") && r.customFiltersWrapper.addClass("cf-mp-transitions"),
                        r.container.toggleClass("mobile-panel-open"),
                        r.container.hasClass("mobile-panel-open") ? (r.placedContainer && r.placedContainer.addClass("mobile-panel-open"),
                        qe || (Y.one("body").setStyles({
                            marginRight: window._scrollBarWidth,
                            overflow: "hidden"
                        }),
                        setTimeout(function() {
                            Y.one("body").addClass("filter-scroll-lock")
                        }, 20))) : (r.placedContainer && r.placedContainer.removeClass("mobile-panel-open"),
                        qe || (Y.one("body").setStyles({
                            marginRight: "auto",
                            overflow: "auto"
                        }),
                        window.setTimeout(function() {
                            Y.one("body").removeClass("filter-scroll-lock")
                        }, 320))))
                    });
                    var Te = function(t) {
                        t && t.preventDefault(),
                        r.container.removeClass("mobile-panel-open"),
                        r.placedContainer && r.placedContainer.removeClass("mobile-panel-open"),
                        qe || (Y.one("body").setStyles({
                            marginRight: "auto",
                            overflow: "auto"
                        }),
                        window.setTimeout(function() {
                            Y.one("body").removeClass("filter-scroll-lock")
                        }, 320))
                    };
                    if (r.mobilePanelClose = Te,
                    this.customFiltersWrapper.delegate("click", Te, ".mobile-panel-close"),
                    this.target.settings.mobilePanel.closeOnOutsideClick && Y.one("body").on("click", function(t) {
                        !Y.one("body").hasClass("filter-scroll-lock") || t.target.ancestor(".customFiltersWrapper") || t.target.hasClass("customFiltersWrapper") || Te(t)
                    }),
                    this.target.settings && this.target.settings.mobilePanel && this.target.settings.mobilePanel.enabled && this.target.settings.mobilePanel.forceOnWidth) {
                        !qe && -1 == (this.target.settings.mobilePanel.forceOnWidth + "").indexOf("px") && -1 == (this.target.settings.mobilePanel.forceOnWidth + "").indexOf("em") && parseFloat(this.target.settings.mobilePanel.forceOnWidth) && (this.target.settings.mobilePanel.forceOnWidth = this.target.settings.mobilePanel.forceOnWidth + "px");
                        var Ne = "";
                        this.target.settings.mobilePanel.useNavStyle && (Ne = '.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav {margin-top:-4%}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .customFiltersContainer{padding-top:54px !important;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block{font-size:17px;line-height:1.2;margin-bottom:4%;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block[data-color-swatches="true"] .archive-group-list{overflow-y:auto !important;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block[data-color-swatches="true"] .archive-group-list li .archive-group-name-link{font-size:inherit !important;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-dropdown-toggle-label{height:auto;top:0;left:0;position:relative;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper,.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .range-slider-wrapper,.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .search-wrap{line-height:inherit;font-size:inherit;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper{width:100%;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper.archive-block-setting-layout-dropdown .archive-dropdown-toggle-title{width:96%;text-overflow:none;padding-right:16px;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper.archive-block-setting-layout-dropdown .archive-dropdown-toggle-title .defaultLabel{width:50%;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper.archive-block-setting-layout-dropdown .archive-dropdown-toggle-title .filterValues{width:50%;text-align:right;float:right;font-size:82%;line-height:inherit;vertical-align:middle;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper.archive-block-setting-layout-dropdown .archive-dropdown-toggle-title .filterValues:before{display:none;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper.archive-block-setting-layout-dropdown .archive-dropdown-toggle-title .reset-button{right:32px;display:none;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper.archive-block-setting-layout-dropdown .archive-dropdown-toggle-title .reset-button:before{font-family:inherit !important;content:"Clear";width:auto;text-transform:uppercase;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper.archive-block-setting-layout-dropdown .icn-down-open{display:inline-block !important;margin:0 auto;position:relative;cursor:pointer;width:24px;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper.archive-block-setting-layout-dropdown .icn-down-open:before{content:""!important;font-size:inherit;display:inline-block;line-height:0;width:0.4em;height:0.4em;border-top:1px solid currentColor;border-right:1px solid currentColor;vertical-align:middle;margin-top:-0.2em;transform:rotate(45deg);transform-origin:50% 50%;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper .archive-group-list{transition:transform .3s ease;display:block !important;z-index:2100 !important;width:100%;height:100%;margin:0 !important;max-height:none !important;position:fixed;transform:translateX(120%);top:0;padding:20% 10% 10% 10% !important;right:auto;background-color:#fff;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper .archive-group-list li{padding:0 !important;width:100%;overflow:hidden;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper .archive-group-list li a{margin:0 0 5vh 0;padding:0 !important;line-height:1.2;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav .customFiltersWrapper:not(.cf-top-section-filters) .sqs-block .archive-block-wrapper .archive-group-list li a .color-swatch_tooltip{opacity:1;display:inline-block;width:70vw;margin-left:22px;pointer-events:auto;position:relative;background:none;color:currentColor;font-size:14px;top:50%;transform:translateY(-50%) !important;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav.mobile-panel-open .customFiltersWrapper .sqs-block .archive-dropdown-toggle-checkbox:checked ~.archive-dropdown-toggle-label{position:fixed;animation:slideToFixed 1s 0.3s ease-out forwards;top:0;left:0;right:0;width:100%;z-index:2111;padding:5% 30px;border:none !important;overflow:visible;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav.mobile-panel-open .customFiltersWrapper .sqs-block .archive-dropdown-toggle-checkbox:checked ~.archive-dropdown-toggle-label .icn-down-open{margin:0;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav.mobile-panel-open .customFiltersWrapper .sqs-block .archive-dropdown-toggle-checkbox:checked ~.archive-dropdown-toggle-label .icn-down-open:before{transform:rotate(-135deg);}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav.mobile-panel-open .customFiltersWrapper .sqs-block .archive-dropdown-toggle-checkbox:checked ~.archive-dropdown-toggle-label .archive-dropdown-toggle-title{text-align:center;width:100%;display:block;padding:0;margin:0;position:absolute;left:0;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav.mobile-panel-open .customFiltersWrapper .sqs-block .archive-dropdown-toggle-checkbox:checked ~.archive-dropdown-toggle-label .archive-dropdown-toggle-title .filterValues{display:none;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav.mobile-panel-open .customFiltersWrapper .sqs-block .archive-dropdown-toggle-checkbox:checked ~.archive-dropdown-toggle-label .archive-dropdown-toggle-title .reset-button{display:block;}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.cf-mobile-menu-nav.mobile-panel-open .customFiltersWrapper .sqs-block .archive-dropdown-toggle-checkbox:checked ~ul.archive-group-list{transform:translateX(0)}');
                        var De = "{.custom-filter-container.use-mobile-panel.custom-filter-uid-Z .cf-mobile-panel-title{display: block}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.mobile-panel-dropdowns-closed .sqs-block-archive .archive-block-setting-layout-dropdown .archive-dropdown-toggle-checkbox:not(:checked)~.archive-group-list{display:none!important}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.mobile-panel-dropdowns-closed .sqs-block-archive .archive-block-setting-layout-dropdown .archive-dropdown-toggle-checkbox:checked~.archive-dropdown-toggle-label .icn-down-open:before{content:'\\e802'!important}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.mobile-panel-dropdowns-opened .sqs-block-archive .archive-block-setting-layout-dropdown .archive-dropdown-toggle-label .icn-down-open:before{content:'\\e801'!important}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-dropdowns.mobile-panel-dropdowns-opened .sqs-block-archive .archive-block-setting-layout-dropdown .archive-group-list{display:block!important}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z .customFiltersWrapper:not(.cf-top-section-filters){position:fixed;bottom:0;top: auto!important;margin:0;background-color:var(--siteBackgroundColor, #fff);border:2px solid currentColor;max-width:80%;max-width:80vw;min-width:0;width:100%;height:80%;visibility:visible!important;min-height:76%!important;float:none!important;min-height:300px;overflow:hidden;z-index:2147483649;will-change:transform;transition-property:transform}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z .customFiltersWrapper:not(.cf-top-section-filters).cf-mp-transitions{transition-duration:.3s;transition-timing-function:ease-in-out;transition-delay:.3s}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z .customFiltersWrapper:not(.cf-top-section-filters) .customFiltersContainer{width:100%;height:100%;padding:10px 5% 48px 5%;position:relative;align-items:start;-webkit-overflow-scrolling:touch;overflow-y:auto;overflow-x:hidden}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.mobile-panel-open .customFiltersWrapper:not(.cf-top-section-filters){transform:translate3d(0,0,0)!important;transition-delay:0s!important}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.mobile-panel-open .mobile-panel-close:after,.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.mobile-panel-open .mobile-panel-close:before{transition-delay:.2s}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.mobile-panel-open .mobile-panel-close:before{transform:rotate(45deg);-webkit-transform:rotate(45deg)}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.mobile-panel-open .mobile-panel-close:after{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-modern .sqs-block .archive-dropdown-toggle-label .archive-dropdown-toggle-title.dirty .filterValues,.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.custom-filter-view-modern .sqs-block .archive-dropdown-toggle-label .archive-dropdown-toggle-title.dirty .sortValues{display:inline-block}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z .customFiltersWrapper:not(.cf-top-section-filters) .archive-block-wrapper ul.archive-group-list{position:relative;border:none;right:0;left:0;margin:0;max-width:100%}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z .customFiltersWrapper:not(.cf-top-section-filters){left:0;transform:translateX(-110%)}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.cf-mobile-panel-align-right .mobile-filter-trigger{display:block;width:auto;clear:both;float:right;align-self:end}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.cf-mobile-panel-align-right .customFiltersWrapper:not(.cf-top-section-filters){right:0;left:auto;transform:translateX(110%)}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.cf-mobile-panel-align-center .mobile-filter-trigger{display:block;width:auto;clear:both;margin:0 auto;float:none}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z.cf-mobile-panel-align-center .customFiltersWrapper:not(.cf-top-section-filters){left:0;margin:0 10vw;transform:translateY(110%)}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z .mobile-filter-trigger{display:inline-block}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z .mobile-panel-close{display:block}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z .custom-filter-grid{margin-top:30px;float:none;clear:both}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z .custom-filter-grid:not(#productList):not(.ProductList-grid):not(.uk-grid){max-width:100%!important;width:100%;margin:30px 0 0 0}.custom-filter-container.use-mobile-panel.custom-filter-uid-Z .custom-filter-grid:not(.collection-content-wrapper){padding:0}.custom-filter-container .customFiltersWrapper .sqs-block{clear:both;float:none;width:100%;margin:0;padding:10px 0;max-width:100%}.cf-mobile-panel-close-position-left .customFiltersWrapper:not(.cf-top-section-filters) .customFiltersContainer,.cf-mobile-panel-close-position-right .customFiltersWrapper:not(.cf-top-section-filters) .customFiltersContainer,.cf-mobile-panel-close-position-top  .customFiltersWrapper:not(.cf-top-section-filters) .customFiltersContainer{padding-top:20%!important}.custom-filter-container.custom-filter-view-dropdowns .customFiltersWrapper .sqs-block{max-width:100%!important}.cf-sort-left .sortDropdown,.cf-sort-right .sortDropdown{position:relative!important;padding:10px!important;top:auto!important;left:auto!important;right:auto!important}.custom-filter-container.custom-filter-view-modern .customFiltersWrapper .sqs-block{margin-bottom:8px;padding:0}.custom-filter-container.custom-filter-view-modern .customFiltersWrapper .sqs-block:last-child{margin:0}.custom-filter-container.custom-filter-view-modern .customFiltersWrapper .archive-block-wrapper{position:relative}.custom-filter-container.custom-filter-view-modern .customFiltersWrapper .archive-block-wrapper .archive-group-list{box-shadow:none;border:2px solid currentColor;z-index:10;max-width:110%;width:100%;max-height:300px;overflow-y:auto}.custom-filter-container.custom-filter-view-modern .customFiltersWrapper .sqs-block.custom-items-search{padding:1px 0;width:100%}.custom-filter-container.custom-filter-view-modern .customFiltersWrapper .sqs-block.custom-items-search .search-icon{display:none}.custom-filter-container.custom-filter-view-modern .customFiltersWrapper .sqs-block.custom-items-search .search-wrap{display:block;position:relative;max-width:100%;box-shadow:none;padding:0}.custom-filter-container.custom-filter-view-modern .customFiltersWrapper .sqs-block.custom-items-search .search-wrap .search-input{line-height:inherit;border:none}.custom-filter-container.custom-filter-view-modern .filterDropdown .archive-dropdown-toggle-label,.custom-filter-container.custom-filter-view-modern .sortDropdown .archive-dropdown-toggle-label{width:100%}.custom-filter-container.custom-filter-view-modern .filterDropdown .archive-dropdown-toggle-label .archive-dropdown-toggle-title,.custom-filter-container.custom-filter-view-modern .sortDropdown .archive-dropdown-toggle-label .archive-dropdown-toggle-title{width:93%}" + Ne + "}";
                        qe || l("@media only screen and (max-width:" + this.target.settings.mobilePanel.forceOnWidth + ")" + De.replace(/-uid-Z/g, "-uid-" + r.target.index).replace(/-CFC/g, "custom-filter-container").replace(/-CF/g, "custom-filter"), "cf-mobilePanel-" + r.target.index, r.container._node)
                    }
                    this.container.one(".mobile-filter-trigger") && this.itemsParent && this.itemsParent.hasAttribute("data-controller") && se._node.classList && this.container.one(".mobile-filter-trigger").wrap('<div class="mobile-filter-trigger-wrapper ' + se._node.classList[0] + '"></div>')
                }
                if (p && (p.activateMarkerInfoOnItemHover && this.container.delegate("hover", function(t) {
                    p.activateMarkerInfoOnItemHover && (t.currentTarget = t.currentTarget._node ? t.currentTarget : Y.one(t.currentTarget),
                    t.currentTarget._markerInst && (p.panAndZoomToMarker && !isNaN(p.panAndZoomToMarker) ? t.currentTarget._markerInst.smoothPanAndZoom && t.currentTarget._markerInst.smoothPanAndZoom(p.panAndZoomToMarker, !0) : t.currentTarget._markerInst.openInfo && t.currentTarget._markerInst.openInfo()))
                }, function(t) {
                    r.advancedMap && r.advancedMap._node && r.advancedMap._node._map && p.desactivateMarkerOnItemMouseOut && r.advancedMap._node._closeInfo && r.advancedMap._node._closeInfo()
                }, ".custom-filter-grid-item"),
                p.activateMarkerInfoOnItemClick && this.container.delegate("click", function(t) {
                    r.advancedMap && (t.currentTarget = t.currentTarget._node ? t.currentTarget : Y.one(t.currentTarget),
                    t.currentTarget._markerInst && (t.currentTarget.hasClass("marker-activated") || t.halt(),
                    p.panAndZoomToMarker && !isNaN(p.panAndZoomToMarker) ? t.currentTarget._markerInst.smoothPanAndZoom && t.currentTarget._markerInst.smoothPanAndZoom(p.panAndZoomToMarker, !0) : t.currentTarget._markerInst.openInfo && t.currentTarget._markerInst.openInfo()))
                }, ".custom-filter-grid-item")),
                this.customFiltersWrapper.all(".quantity-input").each(function(t) {
                    var e = t.one("input")
                      , i = (t.one(".quantity-up"),
                    t.one(".quantity-down"),
                    parseFloat(e.getAttribute("step")))
                      , r = parseFloat(e.getAttribute("min"))
                      , a = parseFloat(e.getAttribute("max"))
                      , o = function(t) {
                        var o = parseFloat(e.get("value"))
                          , s = 0
                          , n = "up" == t ? o >= a : o <= r;
                        s = "up" == t ? n ? o : o + i : n ? o : o - i,
                        e.set("value", s),
                        e.simulate("change")
                    };
                    e.on("valuechange", function(t) {
                        var i = parseFloat(e.get("value"));
                        i > a ? (i = a,
                        e.set("value", i)) : i < r && (i = r,
                        e.set("value", i))
                    }),
                    t.delegate("click", function(t) {
                        t.preventDefault();
                        var e = t.currentTarget.getAttribute("data-val");
                        o(e)
                    }, ".quantity-button")
                }),
                this.customFiltersWrapper.all("input[auto-width]").each(function(t) {
                    var e = Y.Node.create('<div class="auto-width-buffer" style="position:absolute;opacity:1;visibility:hidden;top:-999px;left:-999px;white-space:nowrap;font-size:inherit"></div>');
                    t.buffer = e,
                    t.get("parentNode").append(e);
                    var i = t.getAttribute("auto-width") ? parseFloat(t.getAttribute("auto-width")) : 22
                      , r = function(t) {
                        t.buffer && (t.buffer._node.innerHTML = t.get("value"),
                        t.setStyles({
                            width: t.buffer._node.clientWidth + i
                        }))
                    };
                    t.on("update", function(t) {
                        r(t.currentTarget)
                    }),
                    t.on("valuechange", function(t) {
                        r(t.currentTarget)
                    }),
                    t.on("change", function(t) {
                        r(t.currentTarget)
                    }),
                    r(t),
                    t._node.setWidth = function() {
                        r(t)
                    }
                }),
                this.target.settings.keepDropdownsOpen && this.container.delegate("click", function(t) {
                    t.halt();
                    var e = t.currentTarget.ancestor(".archive-block");
                    e && e.toggleClass("closed-archive")
                }, ".icn-down-open"),
                this.target.settings.topSection && this.target.settings.topSection.enabled) {
                    var Me = this.target.settings.topSection.align || "right"
                      , Ee = this.container.one(".mobile-filter-trigger")
                      , ze = (this.target.settings.topSection.display + "").trim() || "block"
                      , Be = this.target.settings.topSection.place || "after"
                      , We = '<div class="cf-top-section" style="width:100%;clear:both;display:' + ze + ";justify-content: " + Me + ';"><div class="customFiltersWrapper cf-top-section-filters"><div class="customFiltersContainer" style="justify-content: ' + Me + ';"></div></div></div>';
                    Ee ? Ee.insert(We, Be) : this.container.prepend(We),
                    this.target.settings.topSection.hasOwnProperty("closeOptionsOnSelect") || (this.target.settings.topSection.closeOptionsOnSelect = this.target.settings.closeOptionsOnSelect),
                    this.topSection = this.container.one(".cf-top-section"),
                    this.target.settings.topSection.items && (r.target.settings.topSection.itemsSelectors = [],
                    this.target.settings.topSection.items.split("|").forEach(function(t) {
                        t = t.trim();
                        var e = "";
                        if ("itemsCounter" == t) {
                            e = ".items-count-wrapper";
                            var i = r.customFiltersWrapper.one(e);
                            i && r.topSection.one(".customFiltersContainer").append(i)
                        } else if ("mapAutocomplete" == t) {
                            e = ".map-autocomplete-search";
                            var a = r.customFiltersWrapper.one(e)
                              , o = r.customFiltersWrapper.one(".map-autocomplete-dimension-radius");
                            a && (r.topSection.one(".customFiltersContainer").append(a),
                            o && r.topSection.one(".customFiltersContainer").append(o))
                        } else if ("Sort" == t) {
                            e = ".sortDropdown";
                            var s = r.customFiltersWrapper.one(e);
                            s && r.topSection.one(".customFiltersContainer").append(s)
                        } else if ("Search" == t) {
                            e = ".custom-items-search";
                            var n = r.customFiltersWrapper.one(e);
                            n && r.topSection.one(".customFiltersContainer").append(n)
                        } else if ("clearAllBtn" == t) {
                            e = ".clearAllBtnWrapper";
                            var l = r.customFiltersWrapper.one(e);
                            l && r.topSection.one(".customFiltersContainer").append(l)
                        } else if ("outsideOptions" == t)
                            r.outsideOptionsContainer && r.topSection.one(".customFiltersContainer").append(r.outsideOptionsContainer);
                        else {
                            e = ".name-" + O(t, !0);
                            var c = r.customFiltersWrapper.one(e);
                            c && r.topSection.one(".customFiltersContainer").append(c)
                        }
                        e && r.target.settings.topSection.itemsSelectors.push(e)
                    })),
                    r.topSection && (r.topSection.delegate("click", Zt, ".archive-dropdown-toggle-label"),
                    r.topSection.delegate("click", Ht, ".archive-block-wrapper"),
                    r.target.settings.closeOnMouseOut && r.topSection.delegate("hover", function(t) {
                        t.currentTarget = t.currentTarget._node ? t.currentTarget : Y.one(t.currentTarget),
                        t.currentTarget.addClass("hovered")
                    }, function(t) {
                        t.currentTarget = t.currentTarget._node ? t.currentTarget : Y.one(t.currentTarget),
                        t.currentTarget.removeClass("hovered");
                        var e = t.currentTarget.one(".archive-dropdown-toggle-checkbox");
                        e && (e.set("checked", !1),
                        e._node.dispatchEvent(new Event("change")))
                    }, ".archive-block"),
                    this.target.settings.topSection.insertBackWidth = this.target.settings.topSection.insertBackWidth || this.target.settings.mobilePanel.enabled && this.target.settings.mobilePanel.forceOnWidth,
                    this.target.settings.topSection.insertBackPoint && this.target.settings.topSection.insertBackWidth && (this.target.settings.topSection.insertBackPoint = this.target.settings.topSection.insertBackPoint.trim(),
                    this.moveTopSectionBlocks = function() {
                        var t = r.container.all(r.target.settings.topSection.itemsSelectors + "");
                        if (t && t.size()) {
                            var e = r.topSection.one(r.target.settings.topSection.itemsSelectors[0])
                              , i = "Search" == r.target.settings.topSection.insertBackPoint ? ".custom-items-search" : "Sort" == r.target.settings.topSection.insertBackPoint ? ".sortDropdown" : "clearAllBtn" == r.target.settings.topSection.insertBackPoint ? ".clearAllBtnWrapper" : ".name-" + O(r.target.settings.topSection.insertBackPoint, !0);
                            window.innerWidth <= parseInt(r.target.settings.topSection.insertBackWidth) ? e && r.container.one(i).insert(t, "after") : e || r.container.one(".cf-top-section-filters .customFiltersContainer").append(t)
                        }
                    }
                    ,
                    window.addEventListener("resize", this.moveTopSectionBlocks, !1)))
                }
                this.topSection && this.topSection.delegate("click", Gt, ".clearAllBtn"),
                this.sectionParent = this.customFiltersWrapper.ancestor(".page-section"),
                this.sectionParent && (this.sectionParent.addClass("cf-inside-section"),
                this.sectionsContainer = this.sectionParent.ancestor("#page"),
                this.sectionsContainer && this.sectionsContainer.addClass("cf-page-sections-container")),
                this.all_filter_classes = y + " " + this.positionClasses;
                var je = !1
                  , Ue = !1;
                this.target.settings.listCollection && this.target.settings.listCollection.enabled && this.target.settings.listCollection.container && (je = this.container._node && this.container._node.f_matches(this.target.settings.listCollection.container) && this.container || this.itemsParent && this.itemsParent._node && this.itemsParent._node.f_matches(this.target.settings.listCollection.container) || this.itemsParent && this.itemsParent.one(this.target.settings.listCollection.container),
                Ue = this.target.settings.listCollection.itemLinkSelector,
                this.listCollection = je);
                var Ye = this.items.item(0) && this.items.item(0).hasClass("post-type-store-item") || this.itemsParent && (this.itemsParent.hasClass("product-list-container") || this.itemsParent.hasClass("product-list-layout-container") || this.itemsParent.hasClass("ProductList-grid") || "productList" == this.itemsParent.getAttribute("id") || this.container.one(".product-list-container")) && (window.location.href.indexOf("category=") > -1 || window.location.href.indexOf("/category/") > -1 || window.location.href.indexOf("tag=") > -1 || window.location.href.indexOf("/tag/") > -1)
                  , Re = je || this.itemsParent && this.itemsParent.hasClass("eventlist") || this.container.hasClass("ProductList") && this.container.one(".ProductList-pagination-nextPageLink") || this.itemsParent && this.itemsParent.hasClass("productlist-container") && Y.one(".productpager-list") || this.itemsParent && (Ye || this.itemsParent.hasClass("BlogList-inner") || this.itemsParent.hasClass("BlogList") || this.itemsParent.hasClass("sqs-blog-list") || this.itemsParent.hasClass("blog-list") || this.container.hasClass("blog-list") || this.container.hasClass("article-list") || this.itemsParent.hasClass("article-list") || this.itemsParent.hasClass("collection-content-wrapper") && -1 == this.itemsParent._node.className.indexOf("portfolio-")) || r.items && r.items.size() && r.items.item(0).hasClass("blog-item") || r.itemsParent && r.itemsParent.hasClass("list-grid") || r.itemsParent && (r.itemsParent.hasClass("product-list-container") || r.itemsParent.hasClass("product-list-layout-container"));
                if (Ye && this.sectionParent && this.sectionParent.one(".nested-category-tree-wrapper"),
                Re && (Y.one(".BlogList-pagination") && Y.one(".BlogList-pagination").hide(),
                Y.one(".BlogList-load") && Y.one(".BlogList-load").hide(),
                Y.one(".blog-list-pagination") && Y.one(".blog-list-pagination").hide(),
                Y.one(".productpager-list") && Y.one(".productpager-list").hide(),
                Y.one(".ProductList-pagination") && Y.one(".ProductList-pagination").hide(),
                this.target.settings.listCollection.paginationSelector),
                !this.target.settings.getData || "function" != typeof this.target.settings.getData && "object" != typeof this.target.settings.getData)
                    if (this.target.settings.customIndexUrl)
                        this.requestComplete = !1,
                        T(this.target.settings.customIndexUrl, r.target.settings.useSessionCache).then(function(t) {
                            if (t && t.length) {
                                var e = t[0] && t[0].html;
                                e && (t.splice(0, 1),
                                t = {
                                    html: e,
                                    items: t
                                });
                                var i = t[0] && t[0].nestedCategories || t.items && t.items[0] && t.items[0].nestedCategories && t.items[0].nestedCategories.tree;
                                i && t.items && (t.items.splice(0, 1),
                                t.nestedCategories = {
                                    categories: i
                                })
                            }
                            if (t.collection || t.html ? r.coll_data = t : r.coll_data.items = t,
                            console.log(r.collectionUrl, Re, r.coll_data, t),
                            Re) {
                                r.collectionUrl.indexOf("/category/") > -1 && (r.collectionUrl = r.collectionUrl.split("/category/")[0]),
                                r.collectionUrl.indexOf("/tag/") > -1 && (r.collectionUrl = r.collectionUrl.split("/tag/")[0]);
                                var a = function(t) {
                                    if (r.existedItems = r.existedItems ? r.existedItems : r.target.items && r.container.one(r.target.items) ? r.container.all(r.target.items) : new Y.NodeList,
                                    t.html) {
                                        var e = t.html;
                                        r.target.settings.timelog && console.time("LZS Decompress"),
                                        0 == e.indexOf("LZString") && (e = bt.decompressFromEncodedURIComponent(e.replace("LZString", ""))),
                                        e.indexOf("&gt;") > -1 && r.target.settings.deEscapeHTML && (e = W(e)),
                                        r.target.settings.timelog && console.timeEnd("LZS Decompress");
                                        var i = Y.Node.create(e)
                                          , a = !1
                                          , o = []
                                          , s = [];
                                        if (r.existedItems.each(function(t) {
                                            var e = t.getAttribute("id") || t.getAttribute("data-item-id") || t.getAttribute("data-slide-id")
                                              , i = Ue && t._node.querySelector(Ue) || t._node.querySelector(".product-list-item-link") || t._node.querySelector(".eventlist-title-link") || t._node.querySelector(".BlogList-item-title") || t._node.querySelector(".ProductList-item-link") || t._node.querySelector('a[data-content-field="title"]') || t._node.querySelector(".blog-title a") || t._node.querySelector(".grid-title a");
                                            i && (i = i.getAttribute("href").replace("#rel=sponsored", "").replace("#rel=nofollow", ""),
                                            i && s.push(i)),
                                            e && e.length && -1 == e.indexOf("yui_3_17_2") && o.push(e)
                                        }),
                                        i && i.one(r.target.items)) {
                                            if (a = i.one(r.target.items) ? i.all(r.target.items).addClass("item-filter-loaded").addClass("is-loaded") : new Y.NodeList,
                                            a.size())
                                                if (o.length)
                                                    for (var n = a._nodes.length - 1; n >= 0; n--) {
                                                        var l = a._nodes[n]
                                                          , c = l.id || l.getAttribute("data-item-id") || l.getAttribute("data-slide-id");
                                                        c && c.length && -1 == c.indexOf("yui_3_17_2") && o.indexOf(c) > -1 && a._nodes.splice(n, 1)
                                                    }
                                                else if (s.length)
                                                    for (n = a._nodes.length - 1; n >= 0; n--) {
                                                        l = a._nodes[n];
                                                        var d = Ue && l.querySelector(Ue) || l.querySelector(".product-list-item-link") || l.querySelector(".eventlist-title-link") || l.querySelector(".BlogList-item-title") || l.querySelector(".ProductList-item-link") || l.querySelector('a[data-content-field="title"]') || l.querySelector(".blog-title a") || l.querySelector(".grid-title a");
                                                        if (d) {
                                                            d = d.getAttribute("href").replace("#rel=sponsored", "").replace("#rel=nofollow", "");
                                                            var g = 0 == d.indexOf("#lightbox_") && d.replace("#lightbox_", "#l-").replace(/\//g, "-");
                                                            (d && s.indexOf(d) > -1 || g !== d && s.indexOf(g) > -1) && a._nodes.splice(n, 1)
                                                        }
                                                    }
                                                else
                                                    console.log("No way to filter new items.");
                                            r.requestComplete = !0,
                                            r.addVirtualItems(a, r.coll_data.items),
                                            a.size() && r.addItems(a)
                                        }
                                    }
                                    r._start()
                                };
                                t.html ? a(t) : (console.log("No Data HTML Found"),
                                E(r.collectionUrl, r).then(function(t) {
                                    a(t)
                                }))
                            } else
                                r._start()
                        });
                    else if (this.target.settings.requestAttrWithAjax) {
                        this.requestComplete = !1;
                        var Ve = this.collectionUrl.trim().replace(/ /g, "").split("|")
                          , Ge = window.location.pathname;
                        Ve.forEach(function(t, e) {
                            t == Ge && (Ve.splice(e, 1),
                            Ve.unshift(t))
                        });
                        var Ze = Ve.length && Ve[1] && Ve[1].trim()
                          , He = r.target.settings.multipleCollectionsFormat && "json" == r.target.settings.multipleCollectionsFormat;
                        if (Ze && (Re = !0,
                        r.multipleCollectionsFetched = Ve),
                        Re) {
                            var Qe = function(t) {
                                if (r.target.settings.hooks && r.target.settings.hooks.htmlListFetched)
                                    try {
                                        "function" == typeof r.target.settings.hooks.htmlListFetched && r.target.settings.hooks.htmlListFetched(r, t)
                                    } catch (t) {
                                        console.error(t)
                                    }
                                if (r.target.settings.hooks && r.target.settings.hooks.htmlListJSONTransform && "function" == typeof r.target.settings.hooks.htmlListJSONTransform)
                                    try {
                                        t = r.target.settings.hooks.htmlListJSONTransform(r, t) || t
                                    } catch (t) {
                                        console.error(t)
                                    }
                                if (r.coll_data || (r.coll_data = {
                                    collection: {},
                                    items: []
                                }),
                                (!t.items || t.items && 0 == t.items.length) && (t.upcoming && t.upcoming.length || t.past && t.past.length) && (t.items = t.upcoming.concat(t.past)),
                                !He && t && t.items && t.items.length && (!r.coll_data || !r.coll_data.items || t.items.length >= r.coll_data.items.length || Ye)) {
                                    if (r.coll_data = t,
                                    r.existedItems = r.existedItems ? r.existedItems : r.target.items && r.container.one(r.target.items) ? r.container.all(r.target.items) : new Y.NodeList,
                                    t.html) {
                                        var e = t.html;
                                        r.target.settings.timelog && console.time("LZS Decompress"),
                                        0 == e.indexOf("LZString") && (e = e.replace("LZString", ""),
                                        e = bt.decompressFromEncodedURIComponent(e)),
                                        r.target.settings.timelog && console.timeEnd("LZS Decompress"),
                                        e.indexOf("&gt;") > -1 && r.target.settings.deEscapeHTML && (e = W(e));
                                        var i = Y.Node.create(e);
                                        i || (i = Y.Node.create("<div></div>"),
                                        i._node.innerHTML = e),
                                        i && !i.one(r.target.items) && (i = Y.Node.create("<div></div>").append(i));
                                        var a = !1
                                          , o = []
                                          , s = [];
                                        if (r.existedItems.each(function(t) {
                                            var e = t.getAttribute("id") && -1 == t.getAttribute("id").indexOf("yui_3_17") && t.getAttribute("id") || t.getAttribute("data-item-id") || t.getAttribute("data-slide-id") || t.getAttribute("data-set-id")
                                              , i = Ue && t.one(Ue) || t.one(".eventlist-title-link") || t.one(".BlogList-item-title") || t.one(".productlist-item-link") || t.one(".ProductList-item-link") || t.one('a[data-content-field="title"]') || t.one(".blog-title a") || t.one(".grid-title a") || t.one(".product-list-item-link");
                                            i && (i = i.getAttribute("href").replace("#rel=sponsored", "").replace("#rel=nofollow", ""),
                                            i && s.push(i)),
                                            e && -1 == e.indexOf("yui_3_17") && o.push(e),
                                            i = null
                                        }),
                                        i && i.one(r.target.items)) {
                                            if (a = i.one(r.target.items) ? i.all(r.target.items).addClass("item-filter-loaded").addClass("is-loaded") : new Y.NodeList,
                                            r.target.settings.hooks && r.target.settings.hooks.htmlListTransform && "function" == typeof r.target.settings.hooks.htmlListTransform)
                                                try {
                                                    r.target.settings.hooks.htmlListTransform(r, i, a, t)
                                                } catch (t) {
                                                    console.error(t)
                                                }
                                            if (a.size())
                                                if (o.length)
                                                    for (var n = a._nodes.length - 1; n >= 0; n--) {
                                                        var l = a._nodes[n]
                                                          , c = l.id && -1 == l.id.indexOf("yui_3_17") && l.id || l.getAttribute("data-item-id") || l.getAttribute("data-slide-id") || l.getAttribute("data-set-id");
                                                        c && -1 == c.indexOf("yui_3_17") && o.indexOf(c) > -1 && a._nodes.splice(n, 1)
                                                    }
                                                else if (s.length)
                                                    for (n = a._nodes.length - 1; n >= 0; n--) {
                                                        l = a._nodes[n];
                                                        var d = Ue && l.querySelector(Ue) || l.querySelector(".eventlist-title-link") || l.querySelector(".BlogList-item-title") || l.querySelector(".productlist-item-link") || l.querySelector(".ProductList-item-link") || l.querySelector('a[data-content-field="title"]') || l.querySelector(".blog-title a") || l.querySelector(".grid-title a") || l.querySelector(".product-list-item-link");
                                                        if (d) {
                                                            d = d.getAttribute("href").replace("#rel=sponsored", "").replace("#rel=nofollow", "");
                                                            var g = 0 == d.indexOf("#lightbox_") && d.replace("#lightbox_", "#l-").replace(/\//g, "-");
                                                            (d && s.indexOf(d) > -1 || g !== d && s.indexOf(g) > -1) && a._nodes.splice(n, 1)
                                                        }
                                                        d = null
                                                    }
                                                else
                                                    console.log("No Way to filter new items");
                                            r.requestComplete = !0,
                                            r.addVirtualItems(a, t.items),
                                            a.size() && r.addItems(a)
                                        }
                                    }
                                } else
                                    r.coll_data = t;
                                r._start()
                            }
                              , Je = r.target && r.target.settings.useSQSProxy
                              , $e = "page-context";
                            if (Ze) {
                                var Xe = []
                                  , Ke = function() {
                                    He ? Ve.forEach(function(t) {
                                        Xe.push(V(t, r))
                                    }) : Ve.forEach(function(t) {
                                        Xe.push(B(t, !1, r))
                                    }),
                                    Promise.all(Xe).then(function(t) {
                                        var e = {
                                            collection: {},
                                            html: "",
                                            items: [],
                                            past: [],
                                            upcoming: []
                                        };
                                        t.forEach(function(t) {
                                            if (r.target.settings.hooks && r.target.settings.hooks.htmlListJSONCollectionTransform && "function" == typeof r.target.settings.hooks.htmlListJSONCollectionTransform)
                                                try {
                                                    t = r.target.settings.hooks.htmlListJSONCollectionTransform(r, t) || t
                                                } catch (t) {
                                                    console.error(t)
                                                }
                                            t.html && (e.html += t.html),
                                            e.items = e.items.concat(t.items),
                                            e.upcoming.concat(t.upcoming),
                                            e.past.concat(t.past)
                                        }),
                                        Je && Je.enabled && U(Ve + "", Q({}, e), $e, r.target.settings.useSQSProxy, !1),
                                        Qe(e)
                                    })
                                };
                                if (Je && Je.enabled) {
                                    He && ($e = "json");
                                    var ti = Ve;
                                    (Ve + "").length > 250 && (ti = "/" + o((Ve + "").toLowerCase()));
                                    Wt = window.location.hostname.replace(/\./g, "-") + "_" + $e + "_" + (ti + "").replace(/\,/g, "-").replace(/\//g, "");
                                    var ei = N(Wt);
                                    R((Ve + "").toLowerCase(), $e, ei, Je).then(function(t) {
                                        var e = t.items && t.items.length;
                                        !e || !ei || !ei.saved || ei && ei.minutes && ei.minutes != Je.cacheTime || !Je.cacheTime ? Ke() : Qe(t)
                                    }).catch(function(t) {
                                        Ke()
                                    })
                                } else
                                    Ke()
                            } else
                                this.collectionUrl.indexOf("/category/") > -1 && (this.collectionUrl = this.collectionUrl.split("/category/")[0]),
                                this.collectionUrl.indexOf("/tag/") > -1 && (this.collectionUrl = this.collectionUrl.split("/tag/")[0]),
                                B(this.collectionUrl, this.target.settings.customIndexUrl, this).then(function(t) {
                                    t.html || console.log("No additional items found"),
                                    Qe(t)
                                })
                        } else {
                            var ii = this.collectionUrl;
                            this.config && this.config.enableLazy && window.__initializeLazySummaries ? this.container && this.container._node && this.container._node.LazySummariesData && this.container._node.LazySummariesData.existedItems && this.container._node.LazySummariesData.__current && this.addVirtualItems(this.container._node.LazySummariesData.__current, this.container._node.LazySummariesData.ajaxData, this.container._node.LazySummariesData.ajaxData) : p && p.advancedMapContainer && Y.one(p.advancedMapContainer) && window.___customInitMapBlocks ? this.requestComplete = !0 : V(ii, this).then(function(t) {
                                r.coll_data = t,
                                r._start()
                            })
                        }
                    } else
                        this.config && this.config.enableLazy && this.container && this.container._node && this.container._node.LazySummariesData && this.container._node.LazySummariesData.existedItems && this.container._node.LazySummariesData.__current && (this.coll_data = this.container._node.LazySummariesData.ajaxData,
                        this.addVirtualItems(this.container._node.LazySummariesData.__current, this.container._node.LazySummariesData.ajaxData, this.container._node.LazySummariesData.ajaxData)),
                        this.requestComplete = !0,
                        r.container.addClass("cf-request-finished");
                else {
                    var ri = this.target.settings.getData
                      , ai = function(t) {
                        try {
                            if (t) {
                                if ("object" == typeof t)
                                    r.coll_data = t,
                                    r.coll_data.concat && (r.coll_data = {
                                        items: r.coll_data
                                    }),
                                    r._start();
                                else if ("string" == typeof t) {
                                    var e = t
                                      , i = function(t) {
                                        if (t)
                                            try {
                                                0 == t.indexOf("LZString") ? r.coll_data = JSON.parse(bt.decompressFromEncodedURIComponent(t.slice(8))) : r.coll_data = JSON.parse(t),
                                                r.coll_data.concat && (r.coll_data = {
                                                    items: r.coll_data
                                                }),
                                                r._start()
                                            } catch (t) {
                                                console.warn("error : " + t),
                                                r._start()
                                            }
                                        else
                                            r._start()
                                    };
                                    if (e && e.indexOf('id="collectionsIndex"') > -1) {
                                        if (e.indexOf('<textarea id="collectionsIndex" class="hidden" style="display:none">') > -1)
                                            e = e.split('<textarea id="collectionsIndex" class="hidden" style="display:none">')[1].split("</textarea>")[0];
                                        else {
                                            var a = document.createElement("div");
                                            a.innerHTML = e;
                                            var o = a.querySelector("#collectionsIndex");
                                            e = o.value || o.querySelector(".sqs-block-content") && o.querySelector(".sqs-block-content").innerText || ""
                                        }
                                        i(e)
                                    } else
                                        i(e)
                                }
                                console.log("Runned getData")
                            } else
                                console.log("Empty data to from getData function")
                        } catch (t) {
                            console.log(t)
                        }
                    };
                    ri.then ? ri.then(function(t) {
                        ai(t)
                    }) : ai(ri())
                }
                var oi = this.customFiltersWrapper.one(".reset-last-sqs-block");
                if (oi && this.customFilters.append(oi),
                Jt && this._keepDropdownsOpenOnInit(Jt),
                this.items && this.items.size() && this.items.item(0)._node.style.width && S(),
                this.container.fire("custom-filter-init", this.container),
                this.container.fire && this.container.fire("custom-filter:filter-init", {
                    customFilter: r
                }),
                Y.fire("custom-filter:filter-init", {
                    customFilter: r
                }),
                this.moveTopSectionBlocks && this.moveTopSectionBlocks(),
                this.container.removeClass("preFlex").removeClass("flexIn").removeClass("preScale").removeClass("inScale"),
                r.target.settings.hooks && r.target.settings.hooks.afterInit)
                    try {
                        "function" == typeof r.target.settings.hooks.afterInit && r.target.settings.hooks.afterInit(r)
                    } catch (t) {
                        console.error(t)
                    }
            }
        },
        _closeOptionsOnSelect: function(t) {
            let e = this.target.settings.closeOptionsOnSelect
              , i = function() {
                t && t.all(".archive-block-wrapper:not(.clicked):not(.closed-sub-options) .archive-dropdown-toggle-checkbox").each(function(t) {
                    t.set("checked", !1),
                    t._node.dispatchEvent(new Event("change"))
                })
            };
            if (e.indexOf && e.indexOf("px") > -1) {
                let t = e.indexOf("<") > -1 ? "<" : e.indexOf(">") > -1 && ">";
                const r = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                try {
                    const a = parseInt(e.replace(/\D/g, ""));
                    a ? t && "<" == t ? r <= a && i() : r >= a && i() : console.log("No parsed width", a)
                } catch (t) {
                    console.log("No parsed width", t)
                }
            } else
                i()
        },
        _keepDropdownsOpenOnInit: function(t) {
            var e = this;
            let i = function() {
                e.customFiltersWrapper && e.customFiltersWrapper.all(".archive-block-wrapper:not(.clicked):not(.closed-sub-options) .archive-dropdown-toggle-checkbox").each(function(t) {
                    t.set("checked", !0),
                    t._node.dispatchEvent(new Event("change"))
                })
            };
            if (t.indexOf && t.indexOf("px") > -1) {
                let e = t.indexOf("<") > -1 ? "<" : t.indexOf(">") > -1 && ">";
                const r = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                try {
                    const a = parseInt(t.replace(/\D/g, ""));
                    a ? e && "<" == e ? r <= a && i() : r >= a && i() : console.log("No parsed width", a)
                } catch (t) {
                    console.log(t)
                }
            } else
                i()
        },
        _checkExternalLinks: function() {
            var t = this;
            if (this.target.settings.externalFilterLinks && this.target.settings.externalFilterLinks.enabled && this.target.settings.externalFilterLinks.items) {
                var e = this.target.settings.externalFilterLinks.container && Y.one(this.target.settings.externalFilterLinks.container) ? Y.one(this.target.settings.externalFilterLinks.container) : Y.one("body");
                e && e.addClass("external-cf-filter-links-container"),
                this.target.settings.externalFilterLinks.hideFilters ? this.container.addClass("cf-hide-filter-panel") : this.container.removeClass("cf-hide-filter-panel"),
                this.externalClicksListener && (this.externalClicksListener.detach(),
                this.externalClicksListener = null),
                this.externalFilterLinks = e.all(this.target.settings.externalFilterLinks.items),
                this.externalFilterLinks.size() && this.externalFilterLinks.each(function(e) {
                    var i = e.get("pathname")
                      , r = i.indexOf("/category/") > -1 && decodeURIComponent(i.split("/category/")[1].replace(/\+/g, " ")) || e.hasClass("category-link") && e.getAttribute("href") && e.getAttribute("href").replace(t.collectionUrl, "")
                      , a = i.indexOf("/tag/") > -1 && decodeURIComponent(i.split("/tag/")[1].replace(/\+/g, " "))
                      , o = e.get("search");
                    if (o && o.indexOf("=") > -1) {
                        o = o.substring(1);
                        var s = [];
                        try {
                            var n = JSON.parse('{"' + o.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function(t, e) {
                                return "" === t ? e : decodeURIComponent(e.replace(/\+/g, " "))
                            });
                            for (var l in n)
                                n[l] && s.push(decodeURIComponent(n[l]));
                            e.setAttribute("data-slug-filter", O(s + "")),
                            e.addClass("external-cf-filter-link")
                        } catch (t) {
                            console.log("failed to parse external link: " + o, t)
                        }
                    } else
                        (r || a) && (e.setAttribute("data-slug-filter", O(r || a)),
                        e.setAttribute("data-filter", r ? "category" : a ? "tag" : ""),
                        e.setAttribute("data-filter-val", O(r || a)),
                        e.addClass("external-cf-filter-link"))
                }),
                this.externalClicksListener || (this.externalClicksListener = e.delegate("click", function(e) {
                    e.currentTarget.hasClass("external-cf-filter-link") && (e.preventDefault(),
                    e.stopImmediatePropagation()),
                    t._extLinksClick(e.currentTarget)
                }, this.target.settings.externalFilterLinks.items))
            }
        },
        _updateFilterData: function(t) {},
        _buildVirtualItems: function() {
            var t = this
              , e = this.coll_data && this.coll_data.items;
            e && e.length && (this.container.append('<div class="vitual-filter-grid custom-filter-grid"></div>'),
            this.itemsParent = this.container.one(".vitual-filter-grid"),
            e.forEach(function(e, i) {
                var r = Y.Node.create('<div class="virtual-filter-item custom-filter-grid-item" data-id="' + (e.id || i) + '"></div>');
                r._node._virtualData = e,
                t.items.push(r)
            }))
        },
        _start: function() {
            var t = this;
            if (t.virtualFilter && t._buildVirtualItems(),
            t.target.settings.hooks && t.target.settings.hooks.onStart)
                try {
                    "function" == typeof t.target.settings.hooks.onStart && t.target.settings.hooks.onStart(t)
                } catch (t) {
                    console.error(t)
                }
            if (t.requestComplete = !0,
            t._addItemsAttributes(),
            t._buildDropdowns(),
            t._checkInitState(this.target.settings.waitForAjax),
            t.coll_data && t.coll_data.collection && t.coll_data.collection.typeName && t.coll_data.collection.typeName.indexOf("product") > -1 && t.target.settings.sort && t.target.settings.sort.enabled && null == t.target.settings.sort.soldGoAfter && (t.target.settings.sort.soldGoAfter = !0),
            this.parentFilter && this.parentFilter.CustomFilter && (this.parentFilter.CustomFilter._checkChildFilterForOptions(this),
            this.parentFilter.CustomFilter.debounce_after_all_child_sorts()),
            t._sortGrid(),
            t.container.addClass("cf-request-finished"),
            t.target.settings.hooks && t.target.settings.hooks.afterRequest)
                try {
                    "function" == typeof t.target.settings.hooks.afterRequest && t.target.settings.hooks.afterRequest(t)
                } catch (t) {
                    console.error(t)
                }
            this._doSidebarWidth()
        },
        _extLinksClick: function(t) {
            var e = this
              , i = t.getAttribute("data-filter-val") || t.get("search") || !1
              , r = t.getAttribute("data-filter")
              , a = i && 0 === i.indexOf("?") && i.indexOf("=") > -1
              , o = [];
            if (i)
                if (a) {
                    if (i = i.substring(1),
                    i && i.indexOf("=") > -1)
                        try {
                            var s = JSON.parse('{"' + i.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function(t, e) {
                                return "" === t ? e : decodeURIComponent(e.replace(/\+/g, " "))
                            });
                            for (var n in s)
                                s[n] && o.push(decodeURIComponent(s[n]) + "|" + n)
                        } catch (t) {
                            console.log(t)
                        }
                } else
                    i && r && o.push(i + "|" + r);
            if (e.target.settings.hooks && e.target.settings.hooks.onExternalLinkClicked)
                try {
                    "function" == typeof e.target.settings.hooks.onExternalLinkClicked && e.target.settings.hooks.onExternalLinkClicked(e, t)
                } catch (t) {
                    console.error(t)
                }
            o.length && o.forEach(function(t) {
                t = t.split("|");
                var i = t[1] && !e.target.settings.externalFilterLinks.ignoreFilterName ? '[data-filter="' + t[1] + '"]' : "[data-filter]"
                  , r = !!t[0] && '[data-filter-val="' + O(t[0]) + '"]';
                if (r) {
                    var a = e.customFiltersWrapper.all(".archive-group-name-link" + i + r);
                    if (a.size()) {
                        e.pagination_num = 1,
                        a.each(function(t) {
                            var i = t.ancestor("div[data-filter-type]")
                              , r = i.getAttribute("data-filter");
                            i && r && e.filtersClickFunctions[r] ? e.filtersClickFunctions[r]({
                                currentTarget: t
                            }) : t._node.click()
                        });
                        var o = document.querySelector(".burger--active");
                        o && setTimeout(function() {
                            o.click()
                        }, 300)
                    } else
                        console.log("Not found " + i + "---" + r)
                }
            })
        },
        _initDescriptionContainer: function() {
            if (this.optionsDescriptionContainer) {
                this.optionsDescriptionContainer.addClass("cf-descr-activated");
                this.optionsDescriptionContainer.all("h3").each(function(t) {
                    var e = O(t._node.innerText)
                      , i = F(t._node, "h3")
                      , r = Y.Node.create('<div class="cf-option-descr ' + e + '"></div>');
                    r && i.length && (r.prepend(i),
                    t.insert(r, "after"))
                }),
                this.optionsDescriptionContainer.addClass("cf-descr-initialized").removeClass("hidden")
            }
        },
        _showOptionsDescriptions: function() {
            for (var t in this.optionsDescriptionContainer.all(".cf-option-descr").removeClass("active"),
            this.currentFilterValues)
                if (this.currentFilterValues.hasOwnProperty(t) && 0 !== t.indexOf("__") && this.currentFilterValues[t].sel) {
                    var e = this.optionsDescriptionContainer.one(this.currentFilterValues[t].sel);
                    e && e.addClass("active")
                }
        },
        _initFilterPosition: function() {
            var t = this.target.settings.position || "top"
              , e = this.target.settings.align || "center";
            this.positionClasses = "custom-filter-position-" + t + " custom-filter-align-" + e,
            this.container.addClass("custom-filter-position-" + t).addClass("custom-filter-align-" + e).addClass("clear clearfix")
        },
        _buildFilterSelectors: function() {
            var t = this;
            t.needRunFilterFunctions = !1,
            t.filter_selectors = "";
            var e = []
              , i = {};
            for (var r in t.filterParams)
                if (t.filterParams.hasOwnProperty(r) && t.filterParams[r] && t.filterParams[r].length) {
                    var a = ""
                      , o = (t.filterParams[r].length,
                    t.getFilterAttrObj[r].ignoreFilter)
                      , s = t.getFilterAttrObj[r].optimizeSubcategoriesLogic;
                    o || (t.filterParams[r].forEach(function(e, i) {
                        var r = !!e.parentCategory && e.nestedSel
                          , o = e.multipleLogic;
                        if (e.optionLevel = e.parentCategory ? e.optionLevel - 1 : e.optionLevel,
                        e.optionLevel && e.optionLevel > 1 && e.nestedSel && s ? e.multipleLogic = "and" : e.multipleLogic = o,
                        a = e.multipleLogic && "or" === e.multipleLogic ? (a && e.optionLevel < 2 ? a + e.nestedSel + "," : a + e.nestedSel) + e.selectors : a + e.selectors,
                        e.filterFunction && "function" == typeof e.filterFunction && (a = "*-*",
                        t.needRunFilterFunctions = !0),
                        r) {
                            var n = new RegExp(r,"gi");
                            a = a.replace(n, "")
                        }
                    }),
                    i[r] = {
                        selectors: a,
                        logic: t.filterParams[r][0].logic
                    })
                }
            if (this.container._node && this.container._node.__childFilters && this.container._node.__childFilters.length)
                for (var n = this.container._node.__childFilters, l = n.length - 1; l >= 0; l--)
                    t._checkChildFilterForOptions(n[l]);
            for (var r in i)
                if (i.hasOwnProperty(r) && i[r] && i[r].logic) {
                    var c = i[r];
                    a = c.selectors;
                    var d = !(!t.filter_selectors || !t.filter_selectors.length) && t.filter_selectors.split(",")
                      , g = [];
                    d ? "and" === c.logic ? (d.forEach(function(t) {
                        t && a.split(",").forEach(function(e) {
                            e && "*-*" !== e ? g.push(t + e) : "*-*" == e && g.push(t)
                        })
                    }),
                    t.filter_selectors = g.join()) : t.filter_selectors += "," + a : t.filter_selectors = a
                }
            return t.filter_selectors = t.filter_selectors.replace(/,+/g, ","),
            Y.fire && Y.fire("custom-filter:currentFilters", {
                customFilter: t,
                currentFilters: e
            }),
            t.filter_selectors && t.filter_selectors.length && "," === t.filter_selectors[t.filter_selectors.length - 1] && (t.filter_selectors = t.filter_selectors.substring(0, t.filter_selectors.length - 1)),
            t.filter_selectors
        },
        _sortNodes: function(t) {
            var e = this
              , i = !1
              , r = !1
              , a = !1
              , o = !1
              , s = !1
              , n = !1
              , l = !1
              , c = !1
              , d = e.sortObj[e.sort_param] || e.sortObj.index
              , g = !1;
            if (!d)
                return t;
            "function" != typeof d ? (i = d.indexOf("parseInt") > -1,
            n = "featured" == d,
            r = d.indexOf("parseFloat") > -1,
            a = d.indexOf("parseDate") > -1,
            s = d.indexOf("getAttr") > -1,
            o = d.indexOf("]") > -1,
            c = d.indexOf("|") > -1,
            l = "random" == d) : g = !0,
            i && (d = d.split("parseInt")[0]),
            r && (d = d.split("parseFloat")[0]),
            a && (d = d.split("parseDate")[0]),
            s && (d = d.split("getAttr")[0]),
            c && (c = d.split("|")[1],
            d = d.split("|")[0]);
            var u = e.sort_param.indexOf("desc") > -1
              , p = [];
            e.sort_param.indexOf("price_") > -1 && !i && !r && (r = !0);
            t._nodes.slice(0);
            var m = attrSelector = !1;
            g || (m = d.trim(),
            attrSelector = (s || o) && d.replace(/\w\[(.*?)\]/g, "$1").trim(),
            d = d.replace(/ /g, "").replace(/\[/g, "").replace(/\]/g, "").trim());
            var h = 0;
            if (t._nodes.sort(function(t, f) {
                var v = "";
                if (h++,
                e.sort_param in e.sortObj)
                    if (g)
                        t = e.sortObj[e.sort_param](t, t._item_data, e.sort_param),
                        f = e.sortObj[e.sort_param](f, f._item_data, e.sort_param),
                        v = isNaN(t) || isNaN(f) ? t < f ? -1 : t > f ? 1 : -1 : t - f;
                    else if (d)
                        if (l)
                            v = x(-1e4, 1e4);
                        else {
                            "data-publish-on" === d && t.dataset.startDate && f.dataset.startDate && (d = "data-start-date",
                            attrSelector = m = "[data-start-date]");
                            var b = t._item_data && d.indexOf(".") > 0 ? _(d, t._item_data) : t._item_data && t._item_data[d]
                              , y = f._item_data && d.indexOf(".") > 0 ? _(d, f._item_data) : f._item_data && f._item_data[d];
                            if (n) {
                                var w = t._item_data && t._item_data.starred || t.classList && t.classList.contains("featured") ? 2 : 0
                                  , C = f._item_data && f._item_data.starred || f.classList && f.classList.contains("featured") ? 2 : 0;
                                v = w - C
                            } else if (b && y || (o || s) && f.querySelector(m) && t.querySelector(m) || !o && t.querySelector(d) && f.querySelector(d) || o && t.getAttribute(d) && f.getAttribute(d) || f.querySelector(m) && t.querySelector(m))
                                if (b && y ? (t = (b + "").trim(),
                                f = (y + "").trim()) : o && f.getAttribute(d) && t.getAttribute(d) ? (t = t.getAttribute(d).toLowerCase().replace(/ /g, ""),
                                f = f.getAttribute(d).toLowerCase().replace(/ /g, "")) : o && f.querySelector(m) && t.querySelector(m) ? (t = t.querySelector(m).getAttribute(attrSelector) && t.querySelector(m).getAttribute(attrSelector).toLowerCase().replace(/\r?\n|\r/g, "").replace(/ /g, ""),
                                f = f.querySelector(m).getAttribute(attrSelector) && f.querySelector(m).getAttribute(attrSelector).toLowerCase().replace(/\r?\n|\r/g, "").replace(/ /g, "")) : f.querySelector(d) && t.querySelector(d) ? (t = t.querySelector(d).textContent.toLowerCase().replace(/\r?\n|\r/g, "").replace(/ /g, ""),
                                f = f.querySelector(d).textContent.toLowerCase().replace(/\r?\n|\r/g, "").replace(/ /g, "")) : f.querySelector(m) && t.querySelector(m) && (t = t.querySelector(m).textContent.toLowerCase().replace(/\r?\n|\r/g, "").replace(/ /g, ""),
                                f = f.querySelector(m).textContent.toLowerCase().replace(/\r?\n|\r/g, "").replace(/ /g, "")),
                                i)
                                    t = (t + "").indexOf(".") > -1 && 2 == (t + "").split(".").length && 1 == (t + "").split(".")[1].length ? 10 * parseInt((t + "").replace(/\D/g, "")) : parseInt((t + "").replace(/\D/g, "")) || 0,
                                    f = (f + "").indexOf(".") > -1 && 2 == (f + "").split(".").length && 1 == (f + "").split(".")[1].length ? 10 * parseInt((f + "").replace(/\D/g, "")) : parseInt((f + "").replace(/\D/g, "")) || 0,
                                    v = t - f;
                                else if (r)
                                    t = parseFloat((t + "").replace(/[^\d.-]/g, "")),
                                    f = parseFloat((f + "").replace(/[^\d.-]/g, "")),
                                    v = t - f;
                                else if (a)
                                    t = new Date(t).getTime(),
                                    f = new Date(f).getTime(),
                                    isNaN(t) && (t = 1),
                                    isNaN(f) && (f = 1),
                                    v = t - f;
                                else {
                                    if (c && "last" == c) {
                                        t = t.trim(),
                                        f = f.trim();
                                        var S = t.split(" ")
                                          , F = f.split(" ");
                                        S.length && (t = S[S.length - 1]),
                                        F.length && (f = F[F.length - 1])
                                    }
                                    v = k(t, f)
                                }
                        }
                return 0 === v && t && (t._node || t.nodeName) && (v = u ? parseInt(f.getAttribute("data-index")) - parseInt(t.getAttribute("data-index")) : parseInt(t.getAttribute("data-index")) - parseInt(f.getAttribute("data-index"))),
                0 === v && p.push(v),
                v
            }),
            p.length,
            t._nodes.length,
            u && t._nodes.reverse(),
            e.target.settings.sort && e.target.settings.sort.soldGoAfter) {
                h = t.size();
                t._nodes.forEach(function(t, e) {
                    var i = t.querySelector(".sold-out") || t.classList.contains("sold-out");
                    t.dataset.tempSort = i ? h + e : e
                }),
                t._nodes.sort(function(t, e) {
                    return parseInt(t.dataset.tempSort) - parseInt(e.dataset.tempSort)
                })
            }
            return e.target.settings.sort && e.target.settings.sort.customFunction && "function" == typeof e.target.settings.sort.customFunction && (t = e.target.settings.sort.customFunction(t, e, u) || t),
            t
        },
        _updateFilterOptions: function(t) {
            var e = this;
            if (this.target.settings.updateFilterOptions && (this.target.settings.updateFilterOptions.enabled || this.target.settings.updateFilterOptions.showOptionsCounters) && this.filtersDropdowns && this.filtersDropdowns.size()) {
                var i = this.target.settings.updateFilterOptions.nonExistOptions && this.target.settings.updateFilterOptions.nonExistOptions.hideDropdowns;
                this.filtersDropdowns.each(function(t) {
                    var r = t.all(".archive-group-name-link")
                      , a = t.getAttribute("data-ignore-non-exist-options");
                    r.each(function(t) {
                        var i = t.getAttribute("data-filter") + "-" + t.getAttribute("data-filter-val");
                        if (e.filterSelectors[i]) {
                            var r = e.filterSelectors[i];
                            if (r) {
                                var o = r.length;
                                if (o ? t.removeClass("not-in-filter-view") : t.addClass("not-in-filter-view"),
                                t.getAttribute("data-items-count") && !o && a)
                                    return;
                                if (!t.hasAttribute("data-items-count") || t.getAttribute("data-items-count") != o) {
                                    var s = e.target.settings.updateFilterOptions.optionsCounterWrap
                                      , n = s ? s.slice(0, -1) + o + s.slice(-1) : o;
                                    t.setAttribute("data-items-count", n),
                                    t.setAttribute("data-count", o)
                                }
                            }
                        }
                    }),
                    i && !a && this.filter_selectors && (r.size() == t.all(".not-in-filter-view").size() ? t.addClass("hidden") : t.removeClass("hidden"))
                })
            }
        },
        _checkChildOptionsToHide: function(t, e, i, r, a) {
            if (!i.hasClass("filter-hidden")) {
                var o = this
                  , s = i.getAttribute("data-filter").trim();
                i.all(".archive-group-name-link[data-filter]").each(function(i) {
                    var a = i.getAttribute("data-filter-val").trim()
                      , n = o.itemsParent.one(e + "." + s + "-" + a);
                    n ? (i.get("parentNode").show().removeClass("hidden-by-parent"),
                    r && i.get("parentNode").addClass("showed-by-parent"),
                    t.checkedChildren[s].push(a)) : (r ? !i.get("parentNode").hasClass("showed-by-parent") && i.get("parentNode").hide().addClass("hidden-by-parent") : i.get("parentNode").hide().addClass("hidden-by-parent"),
                    t.checkedChildren[s] && t.checkedChildren[s].indexOf(a) > -1 && t.checkedChildren[s].splice(t.checkedChildren[s].indexOf(a), 1))
                })
            }
        },
        _addMarkersInstancesToItems: function() {
            var t = this
              , e = this.target.settings.advancedMap;
            if (e && e.advancedMapContainer && (this.advancedMap = Y.one(e.advancedMapContainer + " .custom-map-block"),
            this.advancedMap && this.advancedMap._node && this.advancedMap._node._markersObj && (this.container.addClass("cf-map-found"),
            e.activateItemOnMarkerClick && (t.advancedMap._node._activatingFilterItems = !0),
            this.items.each(function(e) {
                var i = !(!e._node._item_data || !e._node._item_data.id) && e._node._item_data.id;
                i && t.advancedMap._node._markersObj && t.advancedMap._node._markersObj["marker-" + i] && (t.advancedMap._node._markersObj["marker-" + i].outsideItem && !t.advancedMap._node._markersObj["marker-" + i].outsideItemFromFilter && (t.advancedMap._node._markersObj["marker-" + i].origOutsideItem = t.advancedMap._node._markersObj["marker-" + i].outsideItem),
                t.advancedMap._node._markersObj["marker-" + i].outsideItem = e,
                t.advancedMap._node._markersObj["marker-" + i].outsideItemFromFilter = !0,
                e._markerInst = t.advancedMap._node._markersObj["marker-" + i],
                e._node._markerInst = t.advancedMap._node._markersObj["marker-" + i])
            }),
            e.activateMarkerInfoOnItemClick && Y.SQS.Gallery.Manager && !this.container.one(".custom-filter-grid").hasClass("outside-container"))))
                try {
                    Y.SQS.Gallery.Manager.unlightboxify(this.items)
                } catch (t) {
                    console.log(t)
                }
        },
        _filterAdvancedMapMarkers: function() {
            var t = this
              , e = null
              , i = 30
              , r = this.target.settings.advancedMap;
            window.google && window.google.maps && (r.updateMapBound || r.followMapBounds && t.needBoundsChange) && (e = new google.maps.LatLngBounds);
            var a = !1
              , o = []
              , s = function(t) {
                t.hasClass("element-showed") && t._markerInst ? (t._markerInst.getVisible() || t._markerInst.setVisible(!0),
                e && (e.extend(t._markerInst.getPosition()),
                a = !0),
                o.push(t._markerInst)) : (t.hasClass("element-hidden") || t._node.style.display.indexOf("none") > -1 || 0 == t.width() || 0 == t.height()) && t._markerInst && t._markerInst.getVisible() && t._markerInst.setVisible(!1)
            };
            if (this.advancedMap && this.advancedMap._node && this.advancedMap._node._markersObj) {
                for (var n in t.advancedMap._node._markersObj)
                    if (t.advancedMap._node._markersObj.hasOwnProperty(n)) {
                        var l = t.advancedMap._node._markersObj[n]
                          , c = l.outsideItem;
                        c ? s(c) : t.filter_selectors ? l.setVisible(!1) : l.setVisible(!0)
                    }
            } else
                this.items.each(function(t, e) {
                    t._markerInst && s(t)
                });
            this.advancedMap && this.advancedMap._node && this.advancedMap._node._markerCluster && (this.advancedMap._node._markerCluster.clearMarkers(),
            this.advancedMap._node._markerCluster.addMarkers(o)),
            e && a && this.advancedMap && this.advancedMap._node && (this.advancedMap._node.__map || this.advancedMap._node.radiusCircle) && (this.advancedMap._node.radiusCircle && (e = this.advancedMap._node.radiusCircle.getBounds(),
            i = 2),
            this.advancedMap._node._mapBound = e,
            t.needBoundsChange = !0,
            t.advancedMap._node.__map.fitBounds(e, i),
            t.advancedMap._node.__map.panToBounds(e))
        },
        _sortGrid: function(t) {
            var e = this;
            if (e.target.settings.timelog && console.time("Sort Grid PROCESS"),
            e.target.settings.timelog && console.time("Sort Grid:beforeFilter"),
            e.currentFilterValues = {},
            e.container.addClass("cf-sorting-grid-running"),
            e.target.settings.hooks && e.target.settings.hooks.beforeFilter)
                try {
                    "function" == typeof e.target.settings.hooks.beforeFilter && e.target.settings.hooks.beforeFilter(e)
                } catch (t) {
                    console.error(t)
                }
            if ((e.itemsParent && e.itemsParent.hasClass("sqs-gallery") || e.itemsParent && e.itemsParent.getData("gallery")) && (e.gallery = e.itemsParent.getData("gallery"),
            e.autocolumns_there && e.gallery && !e.container.hasClass("performance-mode-used") && e.gallery.refresh()),
            this.advancedMap && this.items.size() && !this.items.item(this.items.size() - 1)._markerInst && this._addItemsAttributes(),
            this.prev_selectors || (this.prev_selectors = {}),
            e.target.settings.timelog && console.time("Sort Grid:runFilter dropdowns"),
            this.filtersDropdowns && this.filtersDropdowns.size()) {
                var i = e.outsideOptionsNav && new Y.NodeList;
                this.filtersDropdowns.each(function(t) {
                    var r = !!t.getAttribute("data-strict") && "true" === t.getAttribute("data-strict")
                      , a = !!t.getAttribute("data-multiple") && "true" === t.getAttribute("data-multiple")
                      , o = t.getAttribute("data-multiple-logic") || "or"
                      , s = t.getAttribute("data-logic") || "or"
                      , n = t.getAttribute("data-filter").trim()
                      , l = "true" == t.getAttribute("data-ignore-filter");
                    e.filterParams[n] = [];
                    var c = t.one(".archive-dropdown-toggle-title") || t.one(".filter-block-label")
                      , d = t.one(".archive-dropdown-toggle-title .filterValues")
                      , g = t.one(".outsideFilterValues")
                      , u = (!!t.getAttribute("data-children") && t.getAttribute("data-children").split(","),
                    !!t.getAttribute("data-check-children") && t.getAttribute("data-check-children"),
                    "false" !== t.getAttribute("data-defined") && t.getAttribute("data-defined"));
                    (!e.searchResetsAll || e.searchResetsAll && !e.searchContainer.hasClass("dirty")) && (u && !t.one(".active") && t.one('[data-filter-val="' + u + '"]') ? t.one('.archive-group-name-link[data-filter-val="' + u + '"]') && t.one('.archive-group-name-link[data-filter-val="' + u + '"]').addClass("active") : u && "true" == u && !t.one(".active") && t.one('[data-filter-val="all"]') ? t.one('.archive-group-name-link[data-filter-val="all"]') && t.one('.archive-group-name-link[data-filter-val="all"]').addClass("active") : u && "true" == u && !t.one(".active") && t.one(".archive-group-name-link") && t.one(".archive-group-name-link").addClass("active"));
                    t.all(".archive-group-name-link[data-filter]");
                    if (t.hasClass("filter-type-range-slider") || t.hasClass("filter-type-range-inputs"))
                        t.hasClass("filter-type-range-slider") || t.hasClass("filter-type-range-inputs");
                    else if (t.one(".archive-group-name-link.active") || t.one(".custom-search-input.active")) {
                        var p = "";
                        if (!t.hasClass("filter-hidden")) {
                            var m = t.all(".archive-group:not(.hidden-by-parent) .archive-group-name-link.active, .custom-search-input.active");
                            m.each(function(t, c) {
                                if (i) {
                                    var d = t.get("parentNode").cloneNode(!0);
                                    d && (d.one(".nested-options") && d.one(".nested-options").remove(),
                                    d.append('<span class="reset-button icn-cancel"></span>'),
                                    i.push(d))
                                }
                                var g = t.getAttribute("data-filter-val").trim()
                                  , u = (t.get("textContent") || t.get("innerText")).replace(/\r?\n|\r/g, "").trim() || t.hasClass("custom-search-input") && g;
                                if (!e.currentFilterValues["__" + n + "-values"] || e.currentFilterValues["__" + n + "-values"] && -1 == e.currentFilterValues["__" + n + "-values"].indexOf(u)) {
                                    p += '<span class="filter-value">' + (t.one(".color-swatch_name") ? t.one(".color-swatch_name").get("innerHTML") : t.get("innerHTML")) + "</span>",
                                    m.size() > 1 && c < m.size() - 1 && (p += '<span class="divider">, </span>');
                                    var h = t.getAttribute("data-parent-cat")
                                      , f = t.getAttribute("data-option-level") || 1;
                                    f = parseInt(f);
                                    var v = {};
                                    v.ignoreFilter = e.getFilterAttrObj && e.getFilterAttrObj[n].ignoreFilter || !1,
                                    v.value = g,
                                    v.attr = e.getFilterAttrObj ? e.getFilterAttrObj[n].attr : "",
                                    v.filterFunction = !!e.getFilterAttrObj && e.getFilterAttrObj[n].filterFunction,
                                    v.textValue = u,
                                    v.param = n,
                                    v.multiple = a,
                                    v.multipleLogic = o,
                                    v.logic = s,
                                    v.nested = h,
                                    v.nestedSel = h ? "." + n + "-" + O(h) : "",
                                    v.optionLevel = f,
                                    v.parentCategory = e.getFilterAttrObj[n].parentCategory,
                                    v.ignoreFilter = l;
                                    var b = r ? "." + n + "-" + g : '[class*="' + n + "-" + g + '"]';
                                    v.sel = b,
                                    v.selectors = b,
                                    e.filterParams[n].push(v),
                                    e.currentFilterValues[n] = v,
                                    e.currentFilterValues["__" + n + "-values"] || (e.currentFilterValues["__" + n + "-values"] = []),
                                    e.currentFilterValues["__" + n + "-values"].push(u)
                                }
                            }),
                            p && p.length && '<span class="divider">, </span>' == p.slice(-31) && (p = p.slice(0, -31)),
                            d && d.set("innerHTML", p),
                            g && g.set("innerHTML", p),
                            c && c.addClass("dirty"),
                            t.addClass("dirty")
                        }
                    } else
                        d && d.set("innerHTML", ""),
                        g && g.set("innerHTML", ""),
                        c && c.removeClass("dirty"),
                        t.removeClass("dirty")
                }),
                i && (e.outsideOptionsNav.empty(),
                e.outsideOptionsNav.append(i))
            }
            if (e.target.settings.timelog && e.target.settings.timelog && console.timeEnd("Sort Grid:runFilter dropdowns"),
            e.target.settings.timelog && console.time("Sort Grid:runSorters"),
            this.sortContainer) {
                var r = this.sortContainer.one(".archive-dropdown-toggle-title")
                  , a = this.sortContainer.one(".archive-dropdown-toggle-title .sortValues")
                  , o = this.sortContainer.getAttribute("data-defined");
                !this.sortContainer.one(".active") && o && this.sortContainer.one('[data-sort="' + o + '"]') && this.sortContainer.one('[data-sort="' + o + '"]').addClass("active");
                var n = this.sortContainer.one(".active");
                n ? (a && a.set("innerHTML", e.sortContainer.one(".active").get("innerHTML")),
                r && r.addClass("dirty") && this.sortContainer.addClass("dirty"),
                e.sort_param = n.getAttribute("data-sort") || "",
                ft && console.log(n.getAttribute("data-sort"))) : (a && a.set("innerHTML", ""),
                r && r.removeClass("dirty") && this.sortContainer.removeClass("dirty"),
                e.sort_param = e.sort_defined || "index")
            }
            if (e.target.settings.timelog && e.target.settings.timelog && console.timeEnd("Sort Grid:runSorters"),
            e.target.settings.hooks && e.target.settings.hooks.beforeSort)
                try {
                    "function" == typeof e.target.settings.hooks.beforeSort && e.target.settings.hooks.beforeSort(e)
                } catch (t) {
                    console.error(t)
                }
            if (e.target.settings.timelog && e.target.settings.timelog && console.timeEnd("Sort Grid:beforeFilter"),
            this.target.settings.waitForAjax && !this.requestComplete)
                return console.log("Filter is waiting for requestComplete"),
                e.isotope && e.isotope.layout(),
                void (e.target.settings.timelog && e.target.settings.timelog && console.timeEnd("Sort Grid PROCESS"));
            if (e.first_sort_run = !0,
            this.customFiltersWrapper.one(".filterDropdown.dirty") || this.topSection && this.topSection.one(".filterDropdown.dirty") ? (this.customFiltersWrapper.addClass("dropdowns-dirty"),
            this.container.addClass("filter-dropdowns-dirty"),
            this.placedContainer && this.placedContainer.addClass("filter-dropdowns-dirty")) : (this.customFiltersWrapper.removeClass("dropdowns-dirty"),
            this.container.removeClass("filter-dropdowns-dirty"),
            this.placedContainer && this.placedContainer.removeClass("filter-dropdowns-dirty")),
            this.customFiltersWrapper.one(".sortDropdown.dirty") || this.topSection && this.topSection.one(".sortDropdown.dirty") ? (this.customFiltersWrapper.addClass("dropdowns-dirty"),
            this.container.addClass("filter-sort-dirty"),
            this.placedContainer && this.placedContainer.addClass("filter-sort-dirty")) : (!this.container.hasClass("filter-dropdowns-dirty") && this.customFiltersWrapper.removeClass("dropdowns-dirty"),
            this.container.removeClass("filter-sort-dirty"),
            this.placedContainer && this.placedContainer.removeClass("filter-sort-dirty")),
            this.searchRegex ? (this.customFiltersWrapper.addClass("search-dirty"),
            this.container.addClass("filter-search-dirty"),
            this.placedContainer && this.placedContainer.addClass("filter-search-dirty")) : (this.customFiltersWrapper.removeClass("search-dirty"),
            this.container.removeClass("filter-search-dirty"),
            this.placedContainer && this.placedContainer.removeClass("filter-search-dirty")),
            this.parentFilter || this._buildFilterSelectors(),
            this.container.setAttribute("data-filter-selectors", this.filter_selectors).setAttribute("data-filter-sorters", this.sort_param),
            e.filter_selectors || e.searchRegex || !e.target.settings.noResultOnStart || e.mapPlaceFound ? (this.container.removeClass("no-result-items-on-start"),
            ".no-result-items-on-start" == e.filter_selectors && (e.filter_selectors = "")) : (e.filter_selectors = ".no-result-items-on-start",
            this.container.setAttribute("data-filter-selectors", ".no-result-items-on-start").addClass("no-result-items-on-start")),
            this.placedContainer && this.placedContainer.setAttribute("data-filter-selectors", this.filter_selectors).setAttribute("data-filter-sorters", this.sort_param),
            this.itemsParent,
            this.target.settings.mobilePanel && this.target.settings.mobilePanel.enabled && this.target.settings.mobilePanel.closeOnSelect && (!this.target.settings.mobilePanel.closeOnSearch && this.searchContainer && this.searchContainer.hasClass("searching") || (this.filterLastClicked && !this.filterLastClicked.get("parentNode").getAttribute("data-nested-count") || !this.filterLastClicked) && (this.container.removeClass("mobile-panel-open"),
            e.placedContainer && e.placedContainer.removeClass("mobile-panel-open"),
            Y.one("body").setStyles({
                marginRight: "auto",
                overflow: "auto"
            }),
            window.setTimeout(function() {
                Y.one("body").removeClass("filter-scroll-lock")
            }, 320))),
            this.searchContainer && this.searchContainer.removeClass("searching"),
            e.virtual_list && e.virtual_list.size() && (e.items && e.items.size() !== e.virtual_list.size() ? e.virtual_active = !0 : e.virtual_active = !1),
            e.target.settings.timelog && console.time("Sort Grid:Items Run"),
            e.filterSelectors)
                for (var l in e.filterSelectors)
                    e.filterSelectors[l] = [];
            if (!e.sqs_query_factor || !e.sqs_query_not_found || e.filter_selectors || e.sort_param && "index" != e.sort_param || e.searchRegex) {
                if (e.filter_selectors && (e.sqs_query_not_found = !1),
                e.target.settings.hooks && e.target.settings.hooks.beforeUpdate)
                    try {
                        "function" == typeof e.target.settings.hooks.beforeUpdate && e.target.settings.hooks.beforeUpdate(e)
                    } catch (t) {
                        console.error(t)
                    }
                if (e.items && e.items.size()) {
                    e.target.settings.timelog && console.time("Sort Grid:Items Run EACH");
                    var c = e.items.item(0) && e.items.item(0).hasClass("summary-item");
                    e.filtered = new Y.NodeList,
                    e.hidden = new Y.NodeList;
                    var d = e.target.settings.search.customSearchFunc
                      , g = !!e.filter_selectors && e.filter_selectors.trim().replace(/\*-\*/g, "").replace(/ /g, ",");
                    if (e.items.each(function(t) {
                        if (c && t.addClass("positioned"),
                        !e.target.settings.simpleFilter.respectSSAnimations) {
                            var i = t.all(".preClip,.preFade,.preScale,.preSlide,.preFlex");
                            i.size() && i.each(function(t) {
                                t._node.className = t._node.className.replace(/preClip|preFade|preScale|preSlide|preFlex/g, "")
                            })
                        }
                        var r = e.target.settings.colorSwatches;
                        if (r && r.enabled && !t.noColors) {
                            var a = r.tooltips && r.tooltips.enabled
                              , o = !!r.showColorNames;
                            if (!t.colorsAdded) {
                                var s = t._node._item_data
                                  , n = []
                                  , l = !1
                                  , u = r.getAttr
                                  , p = r.allowedPrefSuf
                                  , m = r.allowedOptions || []
                                  , h = !1;
                                if (u && (u + "").indexOf("variant|") > -1 && (h = u.split("|")[1]),
                                r.getAttr && "string" == typeof r.getAttr)
                                    if (n = [],
                                    r.getAttr.indexOf("--split-delim=") > -1 && (l = r.getAttr.split("--split-delim=")[1],
                                    u = r.getAttr.split("--split-delim=")[0]),
                                    h)
                                        n = s && s.variantOptions && s.variantOptions[h];
                                    else {
                                        u = u.split("|");
                                        var f = u[0]
                                          , v = f.indexOf(".") > 0 ? _(f, s) : s[f];
                                        "string" == typeof v && l && (v = v.split(l)),
                                        v ? "object" != typeof v && (v = [v]) : v = [];
                                        for (var b = v.length, y = 0; y < b; y++) {
                                            v[y] = (v[y] + "").trim();
                                            var w = !0;
                                            if (p && p.length && v[y])
                                                if ((v[y] + "").indexOf(p) > -1) {
                                                    var C = new RegExp(p,"gi");
                                                    v[y] = v[y].replace(C, "").trim(),
                                                    w = !0
                                                } else
                                                    w = !1;
                                            v[y] && w && (m && m.length && m.indexOf(v[y]) > -1 || !m.length) && n.push(v[y])
                                        }
                                    }
                                else
                                    r.getAttr && "function" == typeof r.getAttr && (n = r.getAttr(t, s) || n);
                                if (n && n.length) {
                                    var S = s.fullUrl;
                                    t.append('<ul class="color-swatches-footer"></ul>');
                                    var x = t.one(".color-swatches-footer");
                                    o && x.addClass("show-color-names"),
                                    a && x.addClass("show-color-tooltips"),
                                    n.forEach(function(t) {
                                        var i = a ? '<span class="color-swatch_tooltip" data-color="' + t + '"></span>' : ""
                                          , o = "";
                                        if (r.backgrounds[t]) {
                                            var s = r.backgrounds[t] + "".trim();
                                            s.indexOf("http") > -1 && (s = "url(" + s + ")"),
                                            o = 'style="background:' + s + '"'
                                        } else
                                            o = 'style="background-color:' + t + '"';
                                        x.append('<li class="color-swatch-item"><a href="' + S + "#color=" + encodeURIComponent(t) + '" class="color-swatch color-' + e.slugify(t) + '" aria-label="' + t + '"><span class="color-swatch_thumb" ' + o + '></span><span class="color-swatch_name">' + t + "</span>" + i + "</a></li>")
                                    }),
                                    t.colorsAdded = !0
                                }
                            }
                        }
                        e.filterSelectors && e.target.settings.updateFilterOptions && !e.target.settings.updateFilterOptions.enabled && e.target.settings.updateFilterOptions.showOptionsCounters && (t._node.classList && t._node.classList.forEach ? t._node.classList.forEach(function(t) {
                            e.filterSelectors[t] && e.filterSelectors[t].push(1)
                        }) : t._node.className.split(" ").forEach(function(t) {
                            e.filterSelectors[t] && e.filterSelectors[t].push(1)
                        }));
                        var k = e.searchRegex && !d ? e.searchFunction(t).match(e.searchRegex) : !e.searchRegex || !d || "function" != typeof d || d(!1, t);
                        k && e.target.settings.search.highlightSearch && e._highlightSearch(t);
                        var F = !g || t._node.f_matches(g);
                        if (e.needRunFilterFunctions && F)
                            for (var O in e.currentFilterValues)
                                e.currentFilterValues.hasOwnProperty(O) && e.currentFilterValues[O].filterFunction && (F = e.currentFilterValues[O].filterFunction(t, O, e.getFilterAttrObj[O] && "input" == e.getFilterAttrObj[O].type ? e.currentFilterValues[O].value : e.currentFilterValues["__" + O + "-values"], F, e));
                        e.target.settings.advancedMap && e.advancedMap && e.target.settings.advancedMap.followMapBounds && k && F && e.firstMapBoundRun && (F = "true" == t.getAttribute("data-in-bounds"));
                        var A = [];
                        e.rangesSliders && F && e.rangesSliders.forEach(function(e) {
                            A.push(e.filterFunction(t))
                        }),
                        A.indexOf(!1) > -1 && (F = !1);
                        var P = [];
                        e.rangesInputs && F && e.rangesInputs.forEach(function(e) {
                            P.push(e.filterFunction(t))
                        }),
                        P.indexOf(!1) > -1 && (F = !1),
                        k && F ? (t.hasClass("element-hidden") && t.removeClass("element-hidden"),
                        t.addClass("element-showed").removeClass("marker-activated"),
                        (t.hasClass("blog-item") || t.hasClass("post-type-store-item") || t.hasClass("product-list-item")) && !t.hasClass("is-loaded") && t.addClass("is-loaded"),
                        e.filtered.push(t),
                        e.filterSelectors && e.target.settings.updateFilterOptions && e.target.settings.updateFilterOptions.enabled && (t._node.classList && t._node.classList.forEach ? t._node.classList.forEach(function(t) {
                            e.filterSelectors[t] && e.filterSelectors[t].push(1)
                        }) : t._node.className.split(" ").forEach(function(t) {
                            e.filterSelectors[t] && e.filterSelectors[t].push(1)
                        }))) : (t.hasClass("element-hidden") || t.addClass("element-hidden"),
                        t.removeClass("element-showed").removeClass("marker-activated"),
                        e.hidden.push(t))
                    }),
                    e.target.settings.timelog && e.target.settings.timelog && console.timeEnd("Sort Grid:Items Run EACH"),
                    e.target.settings.timelog && console.time("Sort Grid:Sort Nodes"),
                    e.target.settings.filter.followCategoriesSorting && e.categoriesSorting && "object" == typeof e.categoriesSorting && e.filter_selectors && e.currentFilterValues && (!e.sortContainer || e.sortContainer && !e.sortContainer.hasClass("dirty"))) {
                        var u = [];
                        for (var l in e.currentFilterValues)
                            l && e.currentFilterValues.hasOwnProperty(l) && -1 == l.indexOf("__") && e.currentFilterValues[l] && e.currentFilterValues[l].attr && "categories" == e.currentFilterValues[l].attr && e.currentFilterValues["__" + l + "-values"] && (u = u.concat(e.currentFilterValues["__" + l + "-values"]));
                        e.categoriesSortArray = [],
                        u.length && (e.sort_param = "categories_sort",
                        u.forEach(function(t) {
                            e.categoriesSorting[t] && (e.categoriesSortArray = e.categoriesSortArray.concat(e.categoriesSorting[t]))
                        }),
                        e.categoriesSortArray.length && (e.categoriesSortArray = s(e.categoriesSortArray)))
                    } else {
                        o = e.sortContainer && e.sortContainer.getAttribute("data-defined") || "index";
                        "categories_sort" == e.sort_param && (e.sort_param = o || e.sort_defined || "index")
                    }
                    if (e.sort_param && (e.filtered = e._sortNodes(e.filtered)),
                    e.target.settings.timelog && e.target.settings.timelog && console.timeEnd("Sort Grid:Sort Nodes"),
                    e.filtered.size() && this.prev_selectors.filter_selectors == e.filter_selectors && this.prev_selectors.searchRegex == e.searchRegex || e.pagination && (e.pagination.remove(),
                    e.pagination = null,
                    e.pagination_num = 1,
                    e.pag_num_query = e.pagination_num),
                    e._updateFilterOptions(e.filtered),
                    e.target.settings.filter && e.target.settings.filter.enabled && e.target.settings.filter.waitAllDropdownsSelected) {
                        var p = this.filtersDropdowns && this.filtersDropdowns.size()
                          , m = this.filtersDropdowns && this.filtersDropdowns.filter(function(t, e) {
                            return t.classList.contains("dirty")
                        }).size();
                        m < p ? (e.itemsParent && e.itemsParent.addClass("cf-wait-all-dropdowns-selected"),
                        e.prevDirtyFiltersNumber) : e.itemsParent && e.itemsParent.removeClass("cf-wait-all-dropdowns-selected"),
                        e.prevDirtyFiltersNumber = m
                    }
                    if (e.target.settings.timelog && console.time("Sort Grid:Build Pagination"),
                    !e.isotope && !e.mixitup) {
                        if (e.container._node.__childFilters && e.container._node.__childFilters.length || (e.itemsCount && e.itemsCount.one(".items-count").set("textContent", e.filtered.size()),
                        e.virtualGoButton && e.virtualGoButton.setAttribute("data-items", e.filtered.size())),
                        e.target.settings.hooks && e.target.settings.hooks.onItemsCount)
                            try {
                                "function" == typeof e.target.settings.hooks.onItemsCount && e.target.settings.hooks.onItemsCount(e, e.filtered.size())
                            } catch (t) {
                                console.error(t)
                            }
                        e.filtered = e._buildPagination(e.filtered)
                    }
                    e.target.settings.timelog && e.target.settings.timelog && console.timeEnd("Sort Grid:Build Pagination")
                } else
                    e.pagination && (e.pagination.remove(),
                    e.pagination = null,
                    e.pagination_num = 1);
                if (this.prev_selectors = {
                    filter_selectors: e.filter_selectors,
                    searchRegex: e.searchRegex
                },
                e.confirmButton && (e.requestComplete && e.target.settings.initState && (e.target.settings.initState.filter || e.target.settings.initState.sort) && !e.confirmButton._initStarted && (e.confirmButton.setAttribute("data-clicked", !0),
                e.confirmButton._initStarted = !0),
                !e.confirmButton.getAttribute("data-ignore") && e.requestComplete && !e.confirmButton.getAttribute("data-clicked") && (e.filter_selectors || "index" !== e.sort_param && e.target.settings.sort.enabled && (!e.target.settings.sort.hidden || !e.target.settings.sort.defined))))
                    return !1;
                if (this.virtualGoButton && this._pushGoButtonState(),
                this.requestComplete && (this.blockPushState = !1),
                this.target.settings.useHistory && !this.blockPushState && this.requestComplete && this._pushHistoryState(!0),
                e.target.settings.timelog && e.target.settings.timelog && console.timeEnd("Sort Grid:Items Run"),
                e.filtered && e.filtered.size() ? (this.customFiltersWrapper.addClass("has-results").removeClass("no-results"),
                this.container.addClass("filter-has-results").removeClass("filter-has-no-results"),
                this.placedContainer && this.placedContainer.addClass("filter-has-results").removeClass("filter-has-no-results")) : (this.customFiltersWrapper.removeClass("has-results").addClass("no-results"),
                this.container.removeClass("filter-has-results").addClass("filter-has-no-results"),
                this.placedContainer && this.placedContainer.removeClass("filter-has-results").addClass("filter-has-no-results")),
                this.target.settings.noResultMessage && this.noResultWrapper,
                this.container.fire && this.container.fire("custom-filter:sort-grid", {
                    customFilter: e
                }),
                Y.fire("custom-filter:sort-grid", {
                    customFilter: e
                }),
                this.parentFilter && this.parentFilter.CustomFilter && this.parentFilter.CustomFilter.debounce_after_all_child_sorts && this.parentFilter.CustomFilter.debounce_after_all_child_sorts(),
                this._sortChildFilters(),
                this.optionsDescriptionContainer && this._showOptionsDescriptions(),
                this.externalFilterLinks && this.externalFilterLinks.size() && (this.externalFilterLinks.removeClass("filter-activated"),
                e.customFiltersWrapper.all(".archive-group-name-link.active").each(function(t) {
                    var i = t.getAttribute("data-filter-val");
                    e.externalFilterLinks.each(function(t) {
                        if (i && 0 == t.getAttribute("data-slug-filter").indexOf(i) && (t.addClass("filter-activated"),
                        e.target.settings.hooks && e.target.settings.hooks.onExternalLinkActivate))
                            try {
                                "function" == typeof e.target.settings.hooks.onExternalLinkActivate && e.target.settings.hooks.onExternalLinkActivate(e, t)
                            } catch (t) {
                                console.error(t)
                            }
                    })
                })),
                e.target.settings.hooks && e.target.settings.hooks.onFilter)
                    try {
                        "function" == typeof e.target.settings.hooks.onFilter && e.target.settings.hooks.onFilter(e)
                    } catch (t) {
                        console.error(t)
                    }
                if (this.container.one(".active-marker-info") && this.container.one(".active-marker-info").removeClass("active-marker-info"),
                e.filter_selectors,
                e.target.settings.timelog && console.time("Sort Grid: RUN FILTERING"),
                e.isotope)
                    e.container.removeClass("cf-sorting-grid-running"),
                    e.filterAnim ? e.isotope.options.transitionDuration = e.isotope.options.origTransitionDuration : e.isotope.options.transitionDuration = 0,
                    e.isotope.arrange({
                        sortBy: e.sort_param
                    });
                else if (e.mixitup) {
                    e.container.removeClass("cf-sorting-grid-running");
                    var h = e.filter_selectors || "all";
                    e.mixitup.multimix({
                        filter: h,
                        sort: e.sort_param.replace("_", ":")
                    })
                } else
                    e._simpleFilter(t);
                e.mapPlaceFound = !1,
                e.target.settings.timelog && e.target.settings.timelog && console.timeEnd("Sort Grid: RUN FILTERING"),
                e.target.settings.timelog && e.target.settings.timelog && console.timeEnd("Sort Grid PROCESS"),
                e.confirmButton && e.confirmButton.removeAttribute("data-clicked")
            }
        },
        _highlightSearch: function(t) {
            var e = this;
            t = t._node || t,
            t.innerHTML = t.innerText.replace(new RegExp(e.searchValue + "(?!([^<]+)?<)","gi"), "<mark>$&</mark>")
        },
        _scrollToTop: function() {
            var t = this;
            try {
                if (!t._needScrollToResults) {
                    if (!t.filter_selectors && !t.searchRegex || t.target.settings.noScrollToResults || t.loadMoreButtonClicked)
                        return;
                    if (!t.filterLastClicked)
                        return
                }
                var e = t.advancedMap && t.advancedMap.getY() - 320 || t.itemsParent && t.itemsParent.getY() - 250 || t.container.getY() - 300
                  , i = window.pageYOffset || document.documentElement.scrollTop
                  , r = .4;
                (Math.abs(i - e) > 100 || t._needScrollToResults) && t.scrollEl.anim({}, {
                    to: {
                        scroll: [0, e]
                    },
                    duration: r,
                    easing: Y.Easing.easeBoth
                }).run().on("end", function() {
                    t._needScrollToResults = !1
                })
            } catch (t) {
                console.log(t)
            }
        },
        _pushGoButtonState: function() {
            var t = this
              , e = "";
            for (var i in t.currentFilterValues)
                if (t.currentFilterValues.hasOwnProperty(i) && i.indexOf("-values") > -1 && t.currentFilterValues[i] && t.currentFilterValues[i].length) {
                    var r = i.split("-values")[0].replace("__", "") + "=" + encodeURIComponent(t.currentFilterValues[i]);
                    e = e ? e + "&" + r : "?" + r
                }
            t.rangesSliders && t.rangesSliders.length && t.rangesSliders[0].noUiSlider && t.rangesSliders.forEach(function(t) {
                var i = t.filterValue;
                if (i) {
                    var r = t.noUiSlider.get()
                      , a = t.noUiSlider.options.range.min
                      , o = t.noUiSlider.options.range.max;
                    (t.noUiSlider.options.format.from(r[0]) > a || t.noUiSlider.options.format.from(r[1]) < o) && (e = e ? e + "&" + i + "=" + r : "?" + i + "=" + r)
                }
            }),
            this.sort_param && "index" !== this.sort_param && "categories_sort" !== this.sort_param && -1 == this.sort_param.indexOf("lzs_") && (e = e ? e + "&sort=" + this.sort_param : "?sort=" + this.sort_param);
            var a = t.virtualGoButton._node;
            a.search = e
        },
        _pushHistoryState: function(t) {
            var e = this
              , i = decodeURIComponent(window.location.search)
              , r = ""
              , a = ""
              , o = ""
              , s = window.location.pathname;
            for (var n in e.currentFilterValues)
                if (e.currentFilterValues.hasOwnProperty(n) && n.indexOf("-values") > -1 && e.currentFilterValues[n] && e.currentFilterValues[n].length) {
                    var l = n.split("-values")[0].replace("__", "")
                      , c = encodeURIComponent(e.currentFilterValues[n] + "")
                      , d = l + "=" + c;
                    "category" == l && (a = "category/" + c),
                    "tag" == l && (o = "tag/" + c),
                    (a && s.indexOf(a) > -1 || o && s.indexOf(o) > -1) && (d = ""),
                    d && (r = r ? r + "&" + d : "?" + d)
                }
            e.rangesSliders && e.rangesSliders.length && e.rangesSliders[0].noUiSlider && e.rangesSliders.forEach(function(t) {
                var e = t.filterValue;
                if (e) {
                    var i = t.noUiSlider.get()
                      , a = t.noUiSlider.options.range.min
                      , o = t.noUiSlider.options.range.max;
                    (t.noUiSlider.options.format.from(i[0]) > a || t.noUiSlider.options.format.from(i[1]) < o) && (r = r ? r + "&" + e + "=" + i : "?" + e + "=" + i)
                }
            });
            var g = e.pagination_num && e.pagination_num > 1 ? e.pagination_num : !!(e.pag_num_query && e.pag_num_query > 1) && e.pag_num_query;
            if (g && e.requestComplete && (r = r ? r + "&page_n=" + g : "?page_n=" + g),
            this.sort_param && "index" !== this.sort_param && "categories_sort" !== this.sort_param && -1 == this.sort_param.indexOf("lzs_") && (r = r ? r + "&sort=" + this.sort_param : "?sort=" + this.sort_param),
            window.history && i !== r) {
                if (!e.first_sort_run && window.location.search && !r || !e.first_sort_run && !r && window.location.search && (window.location.search.indexOf("category=") > -1 || window.location.search.indexOf("tag=") > -1))
                    return;
                var u = e.itemsParent && e.itemsParent._node.getBoundingClientRect() || {
                    x: 0,
                    y: 0
                };
                window.history.pushState({
                    url: window.location.pathname,
                    search: r,
                    docTitle: document.title,
                    position: {
                        x: u.x,
                        y: u.y
                    }
                }, document.title, window.location.pathname + r)
            }
            g && g > 1 && (this._prevPageNumber = g)
        },
        reInitSiteBundle: function(t) {
            var e = this
              , i = document.querySelector('script[src*="site-bundle"]');
            if (i) {
                t && t.removeAttribute("data-controllers-bound");
                var r = t.getAttribute("data-section-id") || t.ancestor("section") && t.ancestor("section").getAttribute("data-section-id");
                this.sectionLightbox || (this.sectionLightbox = r && Y.one('[data-lightbox-section-id="' + r + '"]')),
                this.sectionLightbox && this.items.each(function(t) {
                    var i = t.one('a[class*="lightbox-link"]');
                    i && !i.hasAttribute("data-custom-click") && i.on("click", function(t) {
                        var i = t.currentTarget.getAttribute("href").split("itemId=")[1];
                        if (e.sectionLightbox) {
                            e.sectionLightbox.one(".gallery-lightbox") && e.sectionLightbox.one(".gallery-lightbox").setAttribute("data-open", !0);
                            var r = e.sectionLightbox.one('.gallery-lightbox-item[data-slide-url="' + i + '"]');
                            r && (e.sectionLightbox.all(".gallery-lightbox-item").removeAttribute("data-active"),
                            r.setAttribute("data-active", !0).setAttribute("data-in", !0),
                            r.one(".gallery-lightbox-item-img").setAttribute("data-loaded", !0),
                            r.one("img")._node.style.display = null)
                        }
                    })
                });
                var a = document.createElement("script")
                  , o = i.parentNode;
                a.src = i.getAttribute("src"),
                o.removeChild(i),
                a.onload = function() {
                    e.itemsParent.setStyle("visibility", "visible")
                }
                ,
                setTimeout(function() {
                    o.appendChild(a)
                }, 16)
            }
        },
        reInitSSLayoutForNewItems: function() {
            var t = this;
            t && t.items && t.items.size() && (t.items.each(function(t) {
                if (t.hasClass("item-filter-loaded") && !t.hasClass("item-layout-inited"))
                    try {
                        window.Squarespace.initializeVideo(window.Y, t),
                        window.Squarespace.initializeImageBlockDynamicElements(window.Y, t),
                        window.Squarespace.initializeNativeVideo(window.Y, {
                            isVisitorWebsite: !0,
                            parentElement: t
                        }),
                        window.Squarespace.initializeLayoutBlocks(Y, t),
                        t.addClass("item-layout-inited")
                    } catch (t) {
                        console.log("Can not init layout")
                    }
            }),
            console.log("Re-init layout"))
        },
        _simpleFilter: function(t) {
            var e = this;
            e.target.settings.timelog && console.time("SimpleFilter: PROCESS");
            this.container.hasClass("custom-filter-init-state");
            var i = !1
              , r = 0
              , a = 0
              , o = !e.target.settings.doNotReInitMasonry && (e.itemsParent.ancestor('[data-controller*="Masonry"]') || (e.itemsParent.getAttribute("data-controller") + "").indexOf("Masonry") > -1 && e.itemsParent || e.itemsParent.ancestor('[data-controller*="Strip"]') || e.itemsParent.ancestor('[data-controller*="Reel"]') || e.itemsParent.hasClass("portfolio-grid-overlays") && e.itemsParent || e.itemsParent.ancestor(".portfolio-grid-overlays"));
            e.refreshed = e.refreshed || 0;
            var s = e.coll_data && e.coll_data.items && e.coll_data.items[0] && e.coll_data.items[0].structuredContent && e.coll_data.items[0].structuredContent.productType
              , n = function(t) {
                if (!e.filter_selectors && !e.searchRegex && e.target.settings.noResultOnStart,
                e.itemsParent && e.itemsParent._node.__masonry && (e.itemsParent._node.__masonry.reloadItems(),
                e.itemsParent._node.__masonry.layout()),
                e.gallery)
                    try {
                        var i = e.gallery["gallery-design"];
                        if (i) {
                            var r = e.itemsParent.get("children");
                            if (i && i.dimensions && (i.dimensions = []),
                            i && i.imageRegions && (i.imageRegions = []),
                            r && e.gallery.set("slides", r),
                            i._getProperty("SLIDE_CLASS") && r.addClass(i._getProperty("SLIDE_CLASS")),
                            !e.container.hasClass("isotope-filter-used") && !e.container.hasClass("performance-mode-used") && i) {
                                var a = new Y.NodeList
                                  , n = new Y.NodeList;
                                r.each(function(t) {
                                    var e = t.one(".sqs-video-wrapper") ? "video" : "image";
                                    if (e)
                                        switch (e) {
                                        case "image":
                                            t.one("img") && a.push(t.one("img"));
                                            break;
                                        case "video":
                                            n.push(t)
                                        }
                                }),
                                e.gallery._images = a,
                                e.gallery._imagesByMedia = {
                                    image: a
                                },
                                e.gallery._slidesByMedia = {
                                    image: a,
                                    video: n
                                },
                                e.gallery.plugLoaders && e.gallery.plugLoaders(),
                                i._evaluateBricks && i._evaluateBricks(),
                                i._processImages && i._processImages(),
                                i.goToGroup && i.goToGroup(0),
                                i.get("lightbox") && Y.SQS.Gallery && Y.SQS.Gallery.Manager && Y.SQS.Gallery.Manager.lightboxify && (Y.SQS.Gallery.Manager.unlightboxify(r),
                                Y.SQS.Gallery.Manager.lightboxify(!0, r)),
                                e.gallery.refresh({
                                    type: "resize"
                                })
                            }
                            e.container.hasClass("lazy-summary-enabled") || e.loadImages(r)
                        } else
                            e.loadImages(t)
                    } catch (t) {
                        console.log(t)
                    }
                else
                    e.loadImages(t);
                e.advancedMap && (e._addMarkersInstancesToItems(),
                e._filterAdvancedMapMarkers()),
                Y.fire("custom-filter:gallery-refresh", e),
                e.container.hasClass("cf-filter-wrapper") && e.container.one(".summary-v2-block") ? e.container.one(".summary-v2-block").fire && e.container.one(".summary-v2-block").fire("custom-filter:gallery-refresh", {
                    customFilter: e
                }) : e.container.fire && e.container.fire("custom-filter:gallery-refresh", {
                    customFilter: e
                }),
                e.waitingForNewItems = !1;
                var l = e.itemsParent.hasClass("product-list-container") || e.itemsParent.hasClass("product-list-layout-container")
                  , c = e.target.settings.products && e.target.settings.products.purchaseButtons;
                if (c && c.enabled && e.items && e.items.size() && s && (e.items.each(function(t) {
                    if (l && !t.one(".cf-add-to-cart-button") && t.one(".sqs-add-to-cart-button")) {
                        t.one(".product-list-item-add-to-cart .sqs-add-to-cart-button-wrapper");
                        var e = t.one(".product-list-item-add-to-cart .product-variants");
                        e && e.setAttribute("data-variants", JSON.stringify(t._node._item_data.structuredContent.variants));
                        var i = t.one(".sqs-add-to-cart-button");
                        i && (i.addClass("cf-add-to-cart-button"),
                        i.setAttribute("data-item-id", t._node._item_data.id || ""),
                        i.setAttribute("data-product-type", t._node._item_data.structuredContent && t._node._item_data.structuredContent.productType || 1),
                        i.setAttribute("data-collection-id", t._node._item_data.collectionId || ""))
                    } else
                        !t.one(".sqs-add-to-cart-button") && t._node._item_data && t._node._item_data.id && t.append('<div class="cf-add-to-cart-wrapper sqs-add-to-cart-button-wrapper"><div class="cf-add-to-cart-button sqs-add-to-cart-button sqs-suppress-edit-mode sqs-editable-button sqs-block-button-element--small sqs-button-element--primary" role="button" tabindex="0" data-product-type="' + (t._node._item_data.structuredContent && t._node._item_data.structuredContent.productType || 1) + '" data-original-label="Add To Cart" data-item-id="' + (t._node._item_data.id || "") + '" data-collection-id="' + (t._node._item_data.collectionId || "") + '"><div class="sqs-add-to-cart-button-inner">Add To Cart</div></div></div>')
                }),
                e.container.one(".sqs-add-to-cart-button") && c))
                    try {
                        e.container.all(".sqs-add-to-cart-button").each(function(t) {
                            t.unsubscribeAll()
                        }),
                        window.Y && window.Y.Squarespace && Y.Squarespace.Commerce && Y.Squarespace.Commerce.initializeCommerce && !l ? (console.log("Init Commerce"),
                        window.Y.Squarespace.Commerce && window.Y.Squarespace.Commerce.destroyCommerce(),
                        window.Y.Squarespace.Commerce.initializeCommerce()) : window.Y && window.Y.Squarespace && Y.Squarespace.CartUtils && Y.Squarespace.CartUtils.initializeAddToCartButtons && (console.log("Init Cart Utils"),
                        Y.Squarespace.CartUtils.initializeAddToCartButtons())
                    } catch (t) {
                        console.log("Error trying init cart buttons:", t)
                    }
                if (e.target.settings.reInitSSLayoutForNewItems && e.reInitSSLayoutForNewItems(),
                e.target.settings.wrapSourceUrlsThumbs && e.items.each(function(t) {
                    const e = t.one(".passthrough-link");
                    if (!t.hasClass("cf-source-link-processed") && e) {
                        const i = t.one("a.image-wrapper");
                        i && (i.setAttribute("href", e.getAttribute("href")),
                        i.setAttribute("target", e.getAttribute("target")),
                        t.addClass("cf-source-link-processed"))
                    }
                }),
                e.target.settings.hooks && e.target.settings.hooks.afterFilter)
                    try {
                        "function" == typeof e.target.settings.hooks.afterFilter && e.target.settings.hooks.afterFilter(e)
                    } catch (t) {
                        console.error(t)
                    }
                if (document.dispatchEvent(new CustomEvent("custom-filter:afterFilter",{
                    detail: e
                })),
                y(e),
                e.itemsParent && e.itemsParent.one(".sqs-add-to-cart-button") && !c && !e.itemsParent.hasClass("product-list-container"))
                    try {
                        e.container.all(".sqs-add-to-cart-button").each(function(t) {
                            t.unsubscribeAll()
                        }),
                        window.Y && window.Y.Squarespace && Y.Squarespace.Commerce && Y.Squarespace.Commerce.initializeCommerce ? (console.log("Init Commerce"),
                        window.Y.Squarespace.Commerce && (window.Y.Squarespace.Commerce.destroyCommerce(),
                        window.Y.Squarespace.Commerce.initializeCommerce())) : window.Y && window.Y.Squarespace && Y.Squarespace.CartUtils && Y.Squarespace.CartUtils.initializeAddToCartButtons && (console.log("Init Cart Utils"),
                        Y.Squarespace.CartUtils.initializeAddToCartButtons())
                    } catch (t) {
                        console.log("Error trying init Squarespace Commerce:", t)
                    }
                e.itemsParent && (e.itemsParent.ancestor(".tab-content") || e.itemsParent.hasClass(".ProductList-grid") || e.itemsParent._node && e.itemsParent._node.className && (e.itemsParent._node.className.indexOf("-list--ready") > -1 || e.itemsParent._node.className.indexOf("blog-") > -1 || e.itemsParent._node.className.indexOf("thumb-list") > -1)) && (o || S()),
                e.filter_selectors && -1 == e.filter_selectors.indexOf("-all") && (e.refreshed = 1),
                o && e.refreshed > 0 && (console.log("Need Reinit Site Bundle", e.refreshed),
                setTimeout(function() {
                    e.reInitSiteBundle(o)
                }, 60)),
                e.refreshed++
            }
              , l = function() {
                if (i = e.filtered,
                i) {
                    if (e.filter_ids = "",
                    o && e.refreshed > 0 && (o.hasClass("gallery-reel") || e.itemsParent.setStyle("height", "50vh").setStyle("visibility", "hidden"),
                    e.itemsParent.all(".custom-filter-grid-item").setStyle(""),
                    i.each(function(t) {}),
                    e.itemsParent.all('.custom-filter-grid-item [data-animation-role="image"]').setStyle("")),
                    i)
                        if (e.target.settings.simpleFilter.persistent || e.hidden && e.hidden.size() && e.hidden.remove(),
                        e.itemsParent)
                            e.target.settings.simpleFilter.persistent ? e.itemsParent.insert(i, e.itemsParent.one(".element-hidden")) : e.itemsParent.one(".customFiltersWrapper") || e.itemsParent.one(".mobile-filter-trigger") || e.itemsParent.one(".cf-pagination-block") ? e.itemsParent.insert(i, null) : e.itemsParent.insert(i, "replace");
                        else if (e.container.hasClass("collection-type-blog")) {
                            var t = e.container.one(".blog-list") || e.container.one(".sqs-blog-list") || e.container.one(".BlogList");
                            t && (e.target.settings.simpleFilter.persistent ? t.insert(i, t.one(".element-hidden")) : t.insert(i, null))
                        } else
                            e.container.hasClass("ProductList") ? e.container.one(".ProductList-grid") && (e.target.settings.simpleFilter.persistent ? e.container.one(".ProductList-grid").insert(i, e.container.one(".ProductList-grid").one(".element-hidden")) : e.container.one(".ProductList-grid").insert(i, null)) : e.container.insert(i, null);
                    n(i),
                    e.waitingForNewItems ? console.log("waiting...") : (e.target.settings.simpleFilter.anim && !e.target.settings.simpleFilter.layoutAnim && i.each(function(t, i) {
                        var r = e.target.settings.simpleFilter.show.stagger * i;
                        t.setStyles({
                            transitionDelay: r > 2200 ? "2200ms" : r + "ms"
                        })
                    }),
                    e.target.settings.simpleFilter.layoutAnim ? (e.container.removeClass("cf-sorting-grid-running"),
                    setTimeout(function() {}, 100)) : e.filterAnim && e.target.settings.simpleFilter.anim ? (ft && console.log("anim"),
                    setTimeout(function() {
                        e.itemsParent.removeClass("refreshing"),
                        e.itemsParent.removeClass("hiding"),
                        e.itemsParent.addClass("pre-showing"),
                        setTimeout(function() {
                            e.itemsParent.addClass("showing"),
                            a ? setTimeout(function() {
                                e.itemsParent.removeClass("showing"),
                                e.itemsParent.removeClass("pre-showing"),
                                e.container.removeClass("cf-sorting-grid-running"),
                                e.itemsParent && (e.itemsParent.hasClass(".ProductList-grid") || e.itemsParent._node && e.itemsParent._node.className && (e.itemsParent._node.className.indexOf("-list--ready") > -1 || e.itemsParent._node.className.indexOf("blog-") > -1 || e.itemsParent._node.className.indexOf("thumb-list") > -1)) && setTimeout(function() {
                                    S()
                                }, 100)
                            }, a) : (e.itemsParent.removeClass("showing"),
                            e.itemsParent.removeClass("pre-showing"),
                            e.container.removeClass("cf-sorting-grid-running"))
                        }, 17)
                    }, 17)) : (ft && console.log("no-anim"),
                    e.itemsParent.removeClass("refreshing"),
                    e.itemsParent.removeClass("hiding"),
                    e.itemsParent.removeClass("showing"),
                    e.itemsParent.removeClass("pre-showing"),
                    e.container.removeClass("cf-sorting-grid-running")))
                }
            };
            if (e.items && e.items.size()) {
                i = e.filtered,
                i && 0 === i.size() ? e.container.addClass("custom-filter-no-result") : e.container.removeClass("custom-filter-no-result");
                var c = "";
                if (i && i.size() && (i.each(function(t) {
                    c += t.get("_yuid")
                }),
                e.sorted_ids && c === e.sorted_ids && i._nodes[0].parentElement && !t && !e.itemsParent.one(".element-hidden") && !e.mapPlaceFound))
                    return e.container.removeClass("cf-sorting-grid-running"),
                    e.items.item(0)._node.style.width && S(),
                    !0;
                e.sorted_ids = c;
                var d = e.hidden.size() ? e.hidden.size() * e.target.settings.simpleFilter.hide.stagger : 20
                  , g = e.filtered ? e.filtered.size() * e.target.settings.simpleFilter.show.stagger : 20;
                e.filterAnim && e.target.settings.simpleFilter.anim && (r = e.target.settings.simpleFilter.hide.transitionDuration ? e.target.settings.simpleFilter.hide.transitionDuration + d : 0,
                r = Math.min(1e3, Math.max(20, r)),
                a = e.target.settings.simpleFilter.show.transitionDuration ? e.target.settings.simpleFilter.show.transitionDuration + g : 0,
                a = Math.min(500, Math.max(20, a))),
                ft && console.log(r, a),
                e.target.settings.simpleFilter.hide.stagger > e.target.settings.simpleFilter.hide.transitionDuration && (e.target.settings.simpleFilter.hide.stagger = e.target.settings.simpleFilter.hide.transitionDuration / 10),
                e.target.settings.simpleFilter.anim && e.itemsParent.all(".custom-filter-grid-item").each(function(t, i) {
                    var r = e.target.settings.simpleFilter.hide.stagger * i;
                    t.setStyles({
                        transitionDelay: r > 2e3 ? "0ms" : r + "ms"
                    })
                }),
                e.itemsParent.removeClass("showing"),
                this.advancedMap && this.advancedMap._node && this.advancedMap._node._closeInfo,
                e.filterAnim ? (e.target.settings.simpleFilter.anim && e.itemsParent.addClass("hiding"),
                r && e.target.settings.simpleFilter.anim ? setTimeout(function() {
                    l()
                }, r) : l()) : l()
            } else
                this.advancedMap && this.advancedMap._node && this.advancedMap._node._closeInfo && this.advancedMap._node._closeInfo();
            !e.parentFilter && e.first_sort_run && e._scrollToTop(),
            e.loadMoreButtonClicked = !1,
            e.target.settings.timelog && console.timeEnd("SimpleFilter: PROCESS")
        },
        _checkInitState: function(t) {
            var e = this;
            this.queryParams = null;
            var i = [];
            if (t && (e.customFiltersWrapper.all(".archive-group-name-link").removeClass("active"),
            e.target.settings.initState = {}),
            e.requestComplete && e.target.settings.useHistory && (e.blockPushState = !1),
            this.target.settings.urlQuery && window.location.search && window.location.search.indexOf("=") > -1) {
                var r = window.location.search.substring(1);
                try {
                    e.target.settings.stripQuery && (!0 === e.target.settings.stripQuery && (r = decodeURIComponent(r).replace(/<\/?[^>]+(>|$)/g, "")),
                    "function" == typeof e.target.settings.stripQuery && (r = e.target.settings.stripQuery(r) || r));
                    var o = a(r);
                    for (var s in this.queryParams = o,
                    o)
                        if (o[s]) {
                            if (e.getFilterAttrObj && e.getFilterAttrObj[s]) {
                                e.target.settings.initState.filter || (e.target.settings.initState.filter = []);
                                var n = s + "|" + decodeURIComponent(o[s]);
                                -1 === e.target.settings.initState.filter.indexOf(n) && e.target.settings.initState.filter.push(n)
                            } else if (e.sortObj && (e.sortObj[s] || e.sortObj[s + "_desc"] || e.sortObj[o[s]])) {
                                e.target.settings.initState.sort || (e.target.settings.initState.sort = []);
                                var l = e.sortObj[o[s]] ? o[s].replace("_", "|") : s + "|" + decodeURIComponent(o[s]);
                                -1 === e.target.settings.initState.sort.indexOf(l) && e.target.settings.initState.sort.push(l)
                            }
                            -1 == s.indexOf("utm_") && i.push(decodeURIComponent(o[s]))
                        }
                    o && o.search && o.search.length && (e.target.settings.initState.search = o.search)
                } catch (t) {
                    console.log(t)
                }
            }
            if (window.location.pathname.indexOf("/category/") > -1) {
                var c = decodeURIComponent(window.location.pathname.split("/category/")[1].replace(/\+/g, " "));
                e.target.settings.initState.filter || (e.target.settings.initState.filter = []),
                -1 === e.target.settings.initState.filter.indexOf("category|" + c) && e.target.settings.initState.filter.push("category|" + c),
                c && i.push(c)
            }
            if (window.location.pathname.indexOf("/tag/") > -1) {
                var d = decodeURIComponent(window.location.pathname.split("/tag/")[1].replace(/\+/g, " "));
                e.target.settings.initState.filter || (e.target.settings.initState.filter = []),
                -1 === e.target.settings.initState.filter.indexOf("tag|" + d) && e.target.settings.initState.filter.push("tag|" + d),
                d && i.push(d)
            }
            if (this.products_category_page || this.list_category_page) {
                c = decodeURIComponent(this.products_category_page.replace(/\+/g, " ").replace(/\%/g, ""));
                e.target.settings.initState.filter && !e.target.settings.ignoreInitStateIfSearchUrl || (e.target.settings.initState.filter = []);
                var g = c
                  , u = c;
                c.indexOf(": ") > -1 && (c = c.split(": ")[1]);
                var p = e.customFiltersWrapper.all('.filterDropdown:not(.name-Additional-Category-Query) .archive-group-name-link[data-filter][data-filter-val="' + O(c) + '"]');
                p && !p.size() && u !== c && (p = e.customFiltersWrapper.all('.filterDropdown:not(.name-Additional-Category-Query) .archive-group-name-link[data-filter][data-filter-val="' + O(u) + '"]'));
                var m = e.customFiltersWrapper.one(".name-Additional-Category-Query")
                  , h = e.customFiltersWrapper.all('.filterDropdown:not(.name-Additional-Category-Query) .archive-group-name-link[href="' + location.pathname + '"]');
                if (h && h.size())
                    p.size() && p.removeClass("active"),
                    h.addClass("active");
                else if (p.size())
                    p.each(function(t) {
                        var i = t.ancestor(".archive-group-list")
                          , r = i && i.one(".archive-group-name-link[data-all-filter-attr]")
                          , a = t.ancestor("[data-ignore-cat-tag-query]")
                          , o = t.ancestor('[data-get-attr="categories"]');
                        if (!a) {
                            if (r && r.removeClass("active"),
                            o)
                                if (e.parent_products_category_page) {
                                    var s = t.ancestor('[data-root-cat="' + O(e.parent_products_category_page) + '"]') || t.ancestor("[data-parent-category-used]") && "false" !== t.ancestor("[data-parent-category-used]").getAttribute("data-parent-category-used");
                                    s ? (t.addClass("active"),
                                    t.ancestors("li").each(function(t) {
                                        var i = t.one('>a:not([data-option-level="3"])');
                                        i && i.get("innerText") == e.parent_products_category_page && i.addClass("active")
                                    })) : e.customFiltersWrapper.one('[data-root-cat="' + O(e.parent_products_category_page) + '"]') ? t.removeClass("active") : t.addClass("active")
                                } else
                                    t.addClass("active");
                            t.ancestor(".name-Additional-Category-Query")
                        }
                    }),
                    e.sqs_query_not_found = !1;
                else if (e.sqs_query_not_found = !0,
                e.requestComplete && m) {
                    -1 === e.target.settings.initState.filter.indexOf("category|" + c) && e.target.settings.initState.filter.push("category|" + c);
                    var f = m.one('.archive-group-name-link[data-filter-val="' + O(g) + '"]');
                    f && (m.removeClass("hidden"),
                    f.addClass("active"))
                }
            }
            if (e.target.settings.compatCatTagInQuery && i.length && i.forEach(function(t) {
                var i = t.split(",");
                if (i.length > 200)
                    i.forEach(function(t) {
                        if (t) {
                            t.indexOf(": ") > -1 && (t = t.split(": ")[1]);
                            var i = e.customFiltersWrapper.all('.filterDropdown:not(.name-Additional-Category-Query) .archive-group-name-link[data-filter][data-filter-val="' + O(t) + '"]');
                            i.size() && (i.each(function(t) {
                                var e = t.ancestor(".archive-group-list")
                                  , i = e && e.one(".archive-group-name-link[data-all-filter-attr]")
                                  , r = t.ancestor("[data-ignore-cat-tag-query]");
                                r || (i && i.removeClass("active"),
                                t.addClass("active"))
                            }),
                            e.sqs_query_not_found = !1)
                        }
                    });
                else {
                    t.indexOf(": ") > -1 && (t = t.split(": ")[1]);
                    var r = e.customFiltersWrapper.all('.filterDropdown:not(.name-Additional-Category-Query) .archive-group-name-link[data-filter][data-filter-val="' + O(t) + '"]');
                    r.size() ? (r.each(function(t) {
                        var e = t.ancestor(".archive-group-list")
                          , i = e && e.one(".archive-group-name-link[data-all-filter-attr]")
                          , r = t.ancestor("[data-ignore-cat-tag-query]");
                        r || (i && i.removeClass("active"),
                        t.addClass("active"))
                    }),
                    e.sqs_query_not_found = !1) : e.sqs_query_not_found = !0
                }
            }),
            this.target.settings.pagination && this.target.settings.pagination.enabled && this.target.settings.pagination.pageSize && (e.queryParams && e.queryParams.page_n || (e.queryParams && !e.queryParams.page_n || !e.queryParams) && e._prevPageNumber && e._prevPageNumber > 1) && (e.pag_num_query = e.queryParams && e.queryParams.page_n && parseInt(e.queryParams.page_n) || 1,
            e.pagination)) {
                var v = e.pagination.one(".pagination-item-" + e.pag_num_query + " a");
                v && (v.addClass("active"),
                e._needScrollToResults = !0,
                e.pagination_num = e.queryParams && e.queryParams.page_n && parseInt(e.queryParams.page_n) || 1)
            }
            (this.target.settings.initState && (this.target.settings.initState.filter || this.target.settings.initState.sort || this.target.settings.initState.search) || t) && (this.target.settings.initState.filter && this.target.settings.initState.filter.length && this.target.settings.initState.filter.forEach(function(t) {
                t = t.toLowerCase().split("|");
                var i = !!t[1] && t[1].split(",")
                  , r = !!t[0] && O(t[0]);
                e.rangesSliders && e.rangesSliders.length && e.rangesSliders.forEach(function(t) {
                    t.filterValue == r && t.noUiSlider.set(i)
                }),
                i && r && (e.customFiltersWrapper.all('.archive-group-name-link[data-filter="' + r + '"][data-all-filter-attr]').removeClass("active"),
                e.topSection && e.topSection.all('.archive-group-name-link[data-filter="' + r + '"][data-all-filter-attr]').removeClass("active"),
                i.forEach(function(t) {
                    e.customFiltersWrapper.all('.archive-group-name-link[data-filter="' + r + '"][data-filter-val="' + O(t) + '"]').addClass("active"),
                    e.topSection && e.topSection.all('.archive-group-name-link[data-filter="' + r + '"][data-filter-val="' + O(t) + '"]').addClass("active")
                }))
            }),
            this.target.settings.initState.search && this.target.settings.initState.search.length && e.target.settings.search && e.target.settings.search.enabled && this.searchContainer && (this.searchContainer.one("input").set("value", this.target.settings.initState.search),
            this.fast_search ? this.fast_search({
                newVal: this.target.settings.initState.search
            }) : this.debounce_search && this.debounce_search({
                newVal: this.target.settings.initState.search
            })),
            this.target.settings.initState.sort && this.target.settings.initState.sort.length && this.target.settings.sort && this.target.settings.sort.enabled && (e.customFiltersWrapper.all(".archive-group-name-link[data-sort]").removeClass("active"),
            e.topSection && e.topSection.all(".archive-group-name-link[data-sort]").removeClass("active"),
            this.target.settings.initState.sort.forEach(function(t) {
                if (t) {
                    t = t.toLowerCase().split("|");
                    var i = !!t[0] && t[0].split(",")
                      , r = t[1] ? O(t[1]) : "asc";
                    i && r && i.forEach(function(t) {
                        t = O(t),
                        e.sort_param = t + "_" + r,
                        e.customFiltersWrapper.all('.archive-group-name-link[data-sort="' + t + "_" + r + '"]').addClass("active"),
                        e.topSection && e.topSection.all('.archive-group-name-link[data-sort="' + t + "_" + r + '"]').addClass("active")
                    })
                }
            })),
            t && this._sortGrid(!0),
            this.container.addClass("custom-filter-init-state"))
        },
        _initFiltering: function() {
            var t = this
              , e = "click";
            this.filtersDropdowns = this.customFilters.all(".filterDropdown");
            var i = d(function() {
                t.customFilters.all('.filterDropdown input[type="checkbox"],.sortDropdown input[type="checkbox"]').each(function(t) {
                    var e = t.ancestor(".filterDropdown") || t.ancestor(".sortDropdown");
                    e && e.setAttribute("data-dropdown-opened", t.get("checked"))
                }),
                t.customFiltersWrapper.one('.sqs-block[data-dropdown-opened="true"]') ? t.container.addClass("filter-has-dropdowns-opened") : t.container.removeClass("filter-has-dropdowns-opened")
            }, 16, !1);
            this.customFilters.all('.filterDropdown input[type="checkbox"],.sortDropdown input[type="checkbox"]').on("change", function(t) {
                i()
            }),
            this.exclude_name = !!this.target.settings.excludeFilter && O(this.target.settings.excludeFilter.trim());
            d(function() {
                t._sortGrid()
            }, 1e3, !1);
            if (t.filtersClickFunctions = {},
            this.filtersDropdowns.size() && this.filtersDropdowns.each(function(i) {
                var r = i.getAttribute("data-filter-type");
                if ("dropdown" == r || "buttons" == r) {
                    i.one("label");
                    i.defaultLabel = i.one(".archive-dropdown-toggle-title") && (i.one(".archive-dropdown-toggle-title").get("textContent") || i.one(".archive-dropdown-toggle-title").get("innerText")).replace(/\r?\n|\r/g, "").trim() || "";
                    var a = i.all(".archive-group-name-link");
                    i.resetOthers = i.getAttribute("data-reset-others"),
                    i.rootOptionOpen = i.getAttribute("data-root-option-open") || !1,
                    a.removeAttribute("data-ajax-loader");
                    var o = !!i.getAttribute("data-multiple") && "true" === i.getAttribute("data-multiple")
                      , s = !!i.getAttribute("data-multiple-sub-categories-allowed") && i.getAttribute("data-multiple-sub-categories-allowed")
                      , n = "false" !== i.getAttribute("data-parent-category-used");
                    if ("onInit" == i.getAttribute("data-open-dropdown")) {
                        var l = i.one(".archive-dropdown-toggle-checkbox");
                        l && (l.set("checked", !0),
                        l._node.dispatchEvent(new Event("change")))
                    }
                    var c = function(e) {
                        a = i.all(".archive-group-name-link"),
                        e.currentTarget = e.currentTarget._node ? e.currentTarget : Y.one(e.currentTarget);
                        var r = O(i.getAttribute("data-all-option"))
                          , l = e.currentTarget.getAttribute("data-filter")
                          , c = e.currentTarget.hasAttribute("data-parent-cat") && !n
                          , d = e.currentTarget.get("parentNode")
                          , g = d.getAttribute("data-nested-count")
                          , u = d.getAttribute("data-root-option")
                          , p = "true" == i.getAttribute("data-no-filter-on-click");
                        i.getAttribute("data-ignore-filter");
                        p || (e.halt && e.halt(),
                        e.preventDefault && e.preventDefault()),
                        e.currentTarget.addClass("clicked");
                        var m = i.one(".nested-options a.active:not(.clicked)");
                        if (i.resetOthers && (!i.rootOptionOpen || i.rootOptionOpen && !g))
                            if ("all" == i.resetOthers)
                                t.customFiltersWrapper.all('.archive-group-name-link:not([data-filter="' + l + '"])').removeClass("active"),
                                t.topSection && t.topSection.all('.archive-group-name-link:not([data-filter="' + l + '"])').removeClass("active");
                            else {
                                var h = (i.resetOthers + "").split("|");
                                h.length && h.forEach(function(e) {
                                    t.customFiltersWrapper.all(".filterDropdown.name-" + O(e, !0) + " .archive-group-name-link").removeClass("active"),
                                    t.topSection && t.topSection.all(".filterDropdown.name-" + O(e, !0) + " .archive-group-name-link").removeClass("active")
                                })
                            }
                        if (e.currentTarget.get("text").trim() === r || !o && !c)
                            a.filter(":not(.clicked)").removeClass("active"),
                            e.currentTarget.toggleClass("active");
                        else {
                            var f = e.currentTarget.ancestor(".nested-options");
                            f && (o || f.all("a:not(.clicked)").removeClass("active"),
                            s || a.filter(":not(.clicked)").each(function(t) {
                                t.removeClass("active"),
                                t.ancestors("li[data-nested-count]").each(function(t) {
                                    t.removeClass("active"),
                                    t.one("a").removeClass("active")
                                })
                            })),
                            e.currentTarget.toggleClass("active"),
                            i.one('[data-filter-val="' + r + '"]') && (e.currentTarget.getAttribute("data-filter-val") !== r ? i.one('[data-filter-val="' + r + '"]').removeClass("active") : (a.removeClass("active"),
                            e.currentTarget.addClass("active")),
                            a.filter(".active").size() < 1 && i.one('[data-filter-val="' + r + '"]').addClass("active")),
                            c && (e.currentTarget.hasClass("active") ? e.currentTarget.ancestors("li[data-nested-count]").each(function(t) {
                                t.addClass("active"),
                                t.one("a").addClass("active")
                            }) : e.currentTarget.ancestors("li[data-nested-count]").each(function(t) {
                                t.removeClass("active"),
                                t.one("a").removeClass("active")
                            }))
                        }
                        e.currentTarget.removeClass("clicked"),
                        g && u && i.rootOptionOpen && !m ? console.log("Just open/close") : (t.target.settings.closeOptionsOnSelect && t._closeOptionsOnSelect(t.customFiltersWrapper),
                        t.topSection && t.target.settings.topSection.closeOptionsOnSelect && t._closeOptionsOnSelect(t.topSection),
                        t.filterAnim = !0,
                        t.filterLastClicked = e.currentTarget.hasClass("active") && e.currentTarget,
                        Y.fire("custom-filter:filter-filtering", {
                            customFilter: t
                        }),
                        t.container.fire && t.container.fire("custom-filter:filter-filtering", {
                            customFilter: t,
                            param: e.currentTarget.getAttribute("data-filter-val")
                        }),
                        t.advancedMap && (t.needBoundsChange = !0),
                        p ? console.log("no filter on click...") : t._sortGrid())
                    };
                    t.filtersClickFunctions[i.getAttribute("data-filter")] = c,
                    i.delegate(e, function(e) {
                        e.halt(),
                        i.all(".archive-group-name-link.active").removeClass("active"),
                        t.filterAnim = !0,
                        t.advancedMap && (t.needBoundsChange = !0),
                        t._sortGrid()
                    }, ".reset-button"),
                    i.delegate(e, c, ".archive-group-name-link[data-filter-val]"),
                    i.delegate("external-click", c, ".archive-group-name-link[data-filter-val]")
                }
            }),
            this.searchContainer) {
                var r = function(e) {
                    t.searchContainer.addClass("searching"),
                    e.newVal = e.newVal ? e.newVal : e.target && e.target.value ? e.target.value : !(!e.target || !e.target._node) && e.target._node.value,
                    t.target.settings.search.avoidSmartyPunctuation && (e.newVal = e.newVal && (e.newVal + "").replace(/[“”]/g, '"').replace(/[‘’]/g, "'")),
                    e.newVal = e.newVal && e.newVal.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
                    t.searchValue = e.newVal;
                    var i = e.newVal
                      , r = !!t.target.settings.search.latinize;
                    if (t.searchIgnoreChars && i && i.length && t.searchIgnoreChars.split("").forEach(function(t) {
                        i = i.replaceAll(t, "")
                    }),
                    r && i && (i = A(i)),
                    t.hasOwnProperty("regExpWordsDelimiter") && e.newVal && e.newVal.indexOf(t.regExpWordsDelimiter) > -1 && (i = i.trim().replace(new RegExp(t.regExpWordsDelimiter,"gi"), "|").replace(/\|+/g, "|")),
                    t.searchRegex = new RegExp(i,"gi"),
                    e.newVal && e.newVal.trim() || t.searchContainer.removeClass("searching"),
                    e.newVal ? (t.searchContainer.getAttribute("data-reset-others") && (t.customFiltersWrapper.all(".filterDropdown .archive-group-name-link").removeClass("active"),
                    t.topSection && t.topSection.all(".filterDropdown .archive-group-name-link").removeClass("active")),
                    t.searchContainer.addClass("dirty"),
                    t.searchResetsAll && (t.customFiltersWrapper.all(".archive-group-name-link.active").removeClass("active"),
                    t.rangesSliders && t.rangesSliders.forEach(function(t) {
                        if (t.noUiSlider) {
                            var e = t.noUiSlider.options.range;
                            t.noUiSlider.set([e.min, e.max])
                        }
                    }))) : t.searchContainer.removeClass("dirty"),
                    !t.target.settings.search.disableSearch) {
                        if ((!e.newVal || e.newVal.length < t.searchMinLength) && (t.searchRegex = ""),
                        t.advancedMap && (t.needBoundsChange = !0),
                        t.target.settings.search.customSearchFunc)
                            (!e.newVal || e.newVal.length >= t.searchMinLength) && t.target.settings.search.customSearchFunc(e);
                        else if (t.target.settings.mobilePanel.enabled,
                        Y.fire("custom-filter:filter-sorting", {
                            customFilter: t
                        }),
                        t.container.fire && t.container.fire("custom-filter:filter-sorting", {
                            customFilter: t,
                            param: "searching.."
                        }),
                        t.isotope)
                            t.isotope.options.transitionDuration = t.isotope.options.origTransitionDuration,
                            t.isotope.arrange({
                                sortBy: t.sort_param
                            });
                        else if (t.mixitup) {
                            var a = []
                              , o = t.target.settings.search.customSearchFunc;
                            t.items.each(function(e) {
                                e = e._node || e;
                                var i = t.searchRegex && !o ? t.searchFunction(e).match(t.searchRegex) : !t.searchRegex || !o || "function" != typeof o || o(!1, e);
                                i && a.push(e)
                            }),
                            t.mixitup.filter(a)
                        } else
                            t.filterAnim = !0,
                            t._sortGrid();
                        t.target.settings.mobilePanel.closeOnSearch && 13 == e.keyCode && (t.container.removeClass("mobile-panel-open"),
                        t.placedContainer && t.placedContainer.removeClass("mobile-panel-open"),
                        Y.one("body").setStyles({
                            marginRight: "auto",
                            overflow: "auto"
                        }),
                        window.setTimeout(function() {
                            Y.one("body").removeClass("filter-scroll-lock")
                        }, 320))
                    }
                }
                  , a = d(function(t) {
                    r(t)
                }, t.target.settings.search.timeout, !1);
                this.searchContainer.one(".search-input").on("valuechange", function(e) {
                    e.currentTarget.getAttribute("data-submit-on-enter") ? t.searchContainer.addClass("searching") : a(e)
                }),
                this.searchContainer.one(".search-input").on("keyup", function(t) {
                    13 == t.keyCode && a(t)
                }),
                this.searchContainer.delegate("click", function(e) {
                    e.halt(),
                    t.filterAnim = !0,
                    t.searchContainer.one(".search-input").set("value", ""),
                    t.searchContainer.removeClass("dirty"),
                    a({
                        newVal: "",
                        reset: !0
                    })
                }, ".reset-button"),
                this.debounce_search = a,
                this.fast_search = r
            }
            if (this.sortContainer) {
                this.sortContainer.defaultLabel = this.sortContainer.one(".archive-dropdown-toggle-title").get("innerHTML");
                this.sortContainer.one("label");
                this.sortContainer.delegate(e, function(e) {
                    e.halt(),
                    t.sortContainer.all(".archive-group-name-link.active").removeClass("active"),
                    t.filterAnim = !0,
                    t._sortGrid()
                }, ".reset-button"),
                this.sortContainer.delegate(e, function(e) {
                    e.halt(),
                    e.currentTarget = e.currentTarget._node ? e.currentTarget : Y.one(e.currentTarget),
                    e.currentTarget.addClass("clicked"),
                    t.sortContainer.all(":not(.clicked)").removeClass("active"),
                    e.currentTarget.toggleClass("active"),
                    e.currentTarget.removeClass("clicked"),
                    t.target.settings.closeOptionsOnSelect && t._closeOptionsOnSelect(t.customFiltersWrapper),
                    t.container.fire && t.container.fire("custom-filter:filter-sorting", {
                        customFilter: t,
                        param: e.currentTarget.getAttribute("data-filter-val")
                    }),
                    t.filterAnim = !0,
                    Y.fire("custom-filter:filter-sorting", {
                        customFilter: t
                    }),
                    t._sortGrid()
                }, ".archive-group-name-link[data-sort]")
            }
            ft && console.log("filter init");
            var o = this.config && this.config.design ? "autocolumns" == this.config.design : t.itemsParent && t.itemsParent.hasClass("sqs-gallery") && t.itemsParent.hasClass("sqs-gallery-design-autocolumns");
            if (this.autocolumns_there = o,
            (!this.target.settings.isotope.enabled || !1 in window) && (!this.target.settings.mixitup.enabled || !1 in window) && this.container.addClass("using-simple-filter"),
            this.customFiltersWrapper.all(".filter-type-range-inputs").each(function(i) {
                i.delegate(e, function(e) {
                    e.halt(),
                    console.log("Clear button clicked");
                    var r = i.all("input");
                    r && r.size() && (r.each(function(t) {
                        t._node.value = "",
                        t.removeClass("active"),
                        t.get("parentNode").removeClass("active")
                    }),
                    t._sortGrid())
                }, ".reset-button")
            }),
            this.customFiltersWrapper.one(".filter-type-input")) {
                var s = d(function(e) {
                    var i = e.target.ancestor(".filter-type-input")
                      , r = e.hasOwnProperty("newVal") && e.newVal || e.target.get("value");
                    e.target.setAttribute("data-filter-val", r),
                    r ? (e.target.addClass("active"),
                    e.target.get("parentNode").addClass("dirty"),
                    i.addClass("dirty")) : (e.target.get("parentNode").removeClass("dirty"),
                    i.addClass("dirty"),
                    e.target.removeClass("active")),
                    t._sortGrid()
                }, 300, !1);
                this.customFiltersWrapper.all(".filter-type-input input").each(function(t) {
                    t.on("valuechange", s),
                    t.get("parentNode").delegate(e, function(t) {
                        t.halt();
                        var e = t.target.get("parentNode").one("input");
                        e && (e.set("value", ""),
                        s({
                            target: e,
                            newVal: "",
                            reset: !0
                        }))
                    }, ".reset-button")
                })
            }
            if (this.customFiltersWrapper.one(".quick-options-search")) {
                var n = d(function(t) {
                    t.target.__ul_list = t.target.__ul_list || t.target.ancestor(".archive-group-list");
                    var e = t.hasOwnProperty("newVal") && t.newVal || t.target.get("value");
                    e ? t.target.get("parentNode").addClass("dirty") : t.target.get("parentNode").removeClass("dirty");
                    var i = new RegExp(e,"gi");
                    t.target.__ul_list && t.target.__ul_list.all(".archive-group-name-link").each(function(t) {
                        var e = t._node.textContent.trim();
                        e.match(i) ? t.get("parentNode").show() : t.get("parentNode").hide()
                    })
                }, 300, !1);
                this.customFiltersWrapper.all(".quick-options-search input").each(function(t) {
                    t.on("valuechange", n),
                    t.get("parentNode").delegate(e, function(t) {
                        t.halt();
                        var e = t.target.get("parentNode").one("input");
                        e && (e.set("value", ""),
                        n({
                            target: e,
                            newVal: "",
                            reset: !0
                        }))
                    }, ".qos-reset-button")
                })
            }
            if ("mixitup"in window && this.target.settings.mixitup.enabled)
                ft && console.log("mixitup"),
                this.container.addClass("mixitup-filter-used"),
                t.mixitup = mixitup(t.itemsParent.getDOMNode(), {
                    controls: {
                        enable: !1
                    },
                    selectors: {
                        target: t.target.items
                    },
                    animation: {
                        duration: t.target.settings.mixitup.transitionDuration
                    },
                    callbacks: {
                        onMixEnd: function(e) {
                            if (t.itemsCount && t.itemsCount.one(".items-count").set("textContent", e.totalShow),
                            0 === e.totalShow ? t.container.addClass("custom-filter-no-result") : t.container.removeClass("custom-filter-no-result"),
                            t.advancedMap && t._filterAdvancedMapMarkers(),
                            Y.fire("custom-filter:gallery-refresh"),
                            t.container.fire && t.container.fire("custom-filter:gallery-refresh", {
                                customFilter: t
                            }),
                            t.filterAnim = !1,
                            t.waitingForNewItems = !1,
                            t.target.settings.hooks && t.target.settings.hooks.afterFilter)
                                try {
                                    "function" == typeof t.target.settings.hooks.afterFilter && t.target.settings.hooks.afterFilter(t)
                                } catch (t) {
                                    console.error(t)
                                }
                            document.dispatchEvent(new CustomEvent("custom-filter:afterFilter",{
                                detail: t
                            })),
                            y(t)
                        }
                    }
                });
            else if ("Isotope"in window && this.target.settings.isotope.enabled) {
                ft && console.log("isotope"),
                this.container.addClass("isotope-filter-used");
                var l = t.container.one('[data-controller*="Gallery"]')
                  , c = !1;
                l && (this.container.addClass("used-7_1-gallery"),
                c = l.getAttribute("data-props"),
                c = c && JSON.parse(c));
                var g = this.target.settings.isotope.columnWidth ? this.target.settings.isotope.columnWidth : this.config && this.config.columnWidth ? this.config.columnWidth : t.target.settings.isotope.numColumns ? 100 / t.target.settings.isotope.numColumns + "%" : c && c.numColumns ? 100 / c.numColumns + "%" : this.items.item(0).get("offsetWidth")
                  , u = this.target.settings.isotope.gutter ? this.target.settings.isotope.gutter : this.config && this.config.hasOwnProperty("gutter") ? this.config.gutter : c && c.hasOwnProperty("gutter") ? c.gutter : 0
                  , p = t.target.settings.isotope && t.target.settings.isotope.transitionDuration ? parseFloat(t.target.settings.isotope.transitionDuration) : 500
                  , m = function() {
                    var e = t.itemsParent.hasClass("sqs-gallery") || l || t.target.settings.isotope.useMaxWidth;
                    e && t.itemsParent.addClass("clear").setStyle("height", "auto"),
                    u = parseFloat(u),
                    g = (g + "").indexOf("%") > -1 ? g : parseFloat(g) / t.itemsParent.width() * 100 + "%";
                    var i = t.target.settings.isotope.numColumns ? t.target.settings.isotope.numColumns : c && c.numColumns ? c.numColumns : (g + "").indexOf("%") > -1 ? (100 / parseFloat(g)).toFixed() : (t.itemsParent.width() / parseFloat(g)).toFixed()
                      , r = -1 == (u + "").indexOf("%") ? parseFloat(u) / t.itemsParent.width() * 100 + "%" : u + "px";
                    t.itemsParent.append('<div style="width:' + r + '" class="gutter-sizer"></div>'),
                    (g + "").indexOf("%") > -1 && r.indexOf("%") > -1 && (g = parseFloat(g) - parseFloat(r) * (i - 1) + "%"),
                    t.isotope_item_width = g,
                    t.isotope_column_gutter = r;
                    var a = {};
                    for (var s in t.sortObj)
                        t.sortObj.hasOwnProperty(s) && s.indexOf("_desc") > -1 && (a[s] = !1);
                    e && (console.log(g),
                    t._setItemsMaxWidthStyle(g)),
                    t.items.each(function(i) {
                        e && i.setStyles({
                            width: "100%",
                            height: null,
                            marginRight: 0,
                            marginLeft: 0,
                            marginBottom: u,
                            left: null,
                            top: null,
                            visibility: "visible"
                        }),
                        t.config && t.config.imageAspectRatio && "autocolumns" !== t.config.design && (i.one(".img-wrapper") || "auto" === (t.config.imageAspectRatio + "").toLowerCase() ? i.one(".img-wrapper") && i.one(".img-wrapper") && !o && "auto" !== (t.config.imageAspectRatio + "").toLowerCase() && i.one(".img-wrapper").setStyles({
                            paddingBottom: 100 / parseFloat(t.config.imageAspectRatio) + "%",
                            height: 0,
                            overflow: "hidden"
                        }) : i.one(".summary-thumbnail-container") && !o && i.one(".summary-thumbnail-container").setStyles({
                            paddingBottom: 100 / parseFloat(t.config.imageAspectRatio) + "%",
                            height: 0,
                            overflow: "hidden"
                        }),
                        i.all("img").each(function(t) {
                            !t.loader && t.plug(Y.Squarespace.Loader2, {
                                mode: t.get("parentNode").hasClass("content-fit") ? "fit" : "fill",
                                load: !0
                            }),
                            t.loader && t.fire("refresh")
                        }))
                    }),
                    g = (g + "").indexOf("%") > -1 ? ".custom-filter-grid-item" : parseFloat(g),
                    t.isotope = new Isotope(t.itemsParent.getDOMNode(),{
                        itemSelector: t.target.items,
                        transitionDuration: 0,
                        origTransitionDuration: p,
                        initLayout: !0,
                        layoutMode: t.target.settings.isotope && t.target.settings.isotope.layoutMode ? t.target.settings.isotope.layoutMode : o ? "masonry" : "fitRows",
                        percentPosition: !0,
                        stamp: t.target.settings.isotope && t.target.settings.isotope.stamp ? t.target.settings.isotope.stamp : ".stamp",
                        columnWidth: ".custom-filter-grid-item",
                        gutter: ".gutter-sizer",
                        fitWidth: !0,
                        fitRows: {
                            columnWidth: ".custom-filter-grid-item",
                            gutter: ".gutter-sizer",
                            fitWidth: !0
                        },
                        masonry: {
                            columnWidth: ".custom-filter-grid-item",
                            gutter: ".gutter-sizer",
                            fitWidth: !0
                        },
                        packery: {
                            columnWidth: ".custom-filter-grid-item",
                            gutter: ".gutter-sizer",
                            fitWidth: !0
                        },
                        filter: function(e, i) {
                            var r = e || i
                              , a = !t.searchRegex || t.searchFunction(r).match(t.searchRegex)
                              , o = !t.filter_selectors || r.f_matches(t.filter_selectors.trim().replace(/ /g, ","));
                            return a && o
                        },
                        sortAscending: Q(a, {
                            popular: !1
                        }),
                        getSortData: t.sortObj
                    });
                    var n = d(function(e) {
                        if (t.itemsCount && t.itemsCount.one(".items-count").set("textContent", e.length),
                        t.virtualGoButton && t.virtualGoButton.setAttribute("data-items", e.length),
                        0 === e.length ? t.container.addClass("custom-filter-no-result") : (t.container.removeClass("custom-filter-no-result"),
                        t.itemsParent.all("img").each(function(t) {
                            t._node && t._node.clientWidth && t.fire("refresh")
                        })),
                        t.filterAnim = !1,
                        t.waitingForNewItems = !1,
                        t.advancedMap && t._filterAdvancedMapMarkers(),
                        Y.fire("custom-filter:gallery-refresh"),
                        t.parentFilter || t._scrollToTop(),
                        t.loadMoreButtonClicked = !1,
                        t.container.fire && t.container.fire("custom-filter:gallery-refresh", {
                            customFilter: t
                        }),
                        t.target.settings.hooks && t.target.settings.hooks.afterFilter)
                            try {
                                "function" == typeof t.target.settings.hooks.afterFilter && t.target.settings.hooks.afterFilter(t)
                            } catch (t) {
                                console.error(t)
                            }
                        document.dispatchEvent(new CustomEvent("custom-filter:afterFilter",{
                            detail: t
                        })),
                        y(t)
                    }, 100, !0);
                    t.isotope.on("arrangeComplete", n),
                    t.isotope.once("layoutComplete", function(e) {
                        ft && console.log("first layout"),
                        e && e.length && e.forEach(function(t) {
                            t.element && (t.element.style.overflow = "hidden")
                        }),
                        t.itemsParent.all("img").each(function(t) {
                            t._node && t._node.clientWidth && (t.loader ? t.fire("refresh") : ImageLoader.load(t._node, {
                                load: !0,
                                useAdvancedPositioning: !0
                            }),
                            t.setStyle("opacity", "1"))
                        })
                    }),
                    ft && console.log("isotope init"),
                    t.filterAnim = !0,
                    t._sortGrid(),
                    Y.fire("custom-filter:isotope-inited", {
                        customFilter: t
                    }),
                    t.container.fire && t.container.fire("custom-filter:isotope-inited", {
                        customFilter: t
                    })
                };
                if (t.itemsParent.hasClass("sqs-gallery")) {
                    var h = t.itemsParent.getData("gallery");
                    h ? (t.itemsParent.clearData("gallery"),
                    Y.Squarespace.GalleryManager && (Y.Squarespace.GalleryManager._galleries && Y.Squarespace.GalleryManager._galleries.length && Y.Squarespace.GalleryManager._galleries.forEach(function(e, i) {
                        h._yuid === e._yuid && (e.after("destroy", function() {
                            ft && console.log("DESTROY"),
                            o && t.itemsParent.addClass("sqs-gallery-design-autocolumns"),
                            t.itemsParent.setStyles({
                                margin: null,
                                marginBottom: null,
                                marginTop: null
                            })
                        }),
                        t.target.settings.isotope.columnWidth || (g = t.items.item(0).width()),
                        e.destroy(),
                        Y.Squarespace.GalleryManager._galleries.splice(i, 1))
                    }),
                    h = null)) : (t.container.all(".sqs-gallery-container").removeClass("sqs-gallery-container"),
                    console.log("prevent gallery start"))
                }
                m()
            } else
                ft && console.log("No Isotope or Mixitup filter library, apply regular filtering");
            if (t.itemsParent)
                if (t.gallery && !t.container.hasClass("performance-mode-used") && t.gallery.refresh(),
                window.imagesLoadeds)
                    imagesLoaded(t.itemsParent.getDOMNode(), function(e) {
                        console.log("all images are loaded"),
                        t._sortGrid(),
                        t.autocolumns_there && t.gallery && !t.container.hasClass("performance-mode-used") && t.gallery.refresh()
                    });
                else {
                    var f = t.itemsParent.all("img")
                      , v = 0
                      , b = f.size()
                      , w = !1;
                    b && f.on("load", function(e) {
                        v++,
                        v >= b && !w && (console.log("all images are loaded"),
                        w = !0,
                        t.isotope && t.isotope.layout(),
                        t._sortGrid(),
                        t.autocolumns_there && t.gallery && !t.container.hasClass("performance-mode-used") && t.gallery.refresh())
                    })
                }
            window.Y && Y.once("domready", function() {
                t.autocolumns_there && t.gallery && !t.container.hasClass("performance-mode-used") && t.gallery.refresh()
            }),
            this.target.settings.openDropdownsOnHover && this.customFiltersWrapper.all(".filterDropdown,.sortDropdown").on("hover", function(t) {
                var e = t.currentTarget.one(".archive-dropdown-toggle-checkbox");
                e && (e.set("checked", !0),
                e._node.dispatchEvent(new Event("change")))
            }, function(t) {
                var e = t.currentTarget.one(".archive-dropdown-toggle-checkbox");
                e && (e.set("checked", !1),
                e._node.dispatchEvent(new Event("change")))
            })
        },
        _followMapBounds: function(t, e, i) {
            t = t || this.advancedMap._node;
            e = e || t.__map && t.__map.getBounds();
            var r = !1;
            t.radiusCircle && (e = t.radiusCircle.getBounds(),
            r = t.radiusCircle.getRadius(),
            console.log(r));
            var a = t._markers;
            if (a && a.length)
                for (var o = a.length - 1; o >= 0; o--) {
                    var s = a[o]
                      , n = s.outsideItem && s.outsideItem._node;
                    if (n)
                        if (i)
                            n.dataset.inBounds = !0;
                        else {
                            var l = s.getPosition();
                            if (r) {
                                var c = t.radiusCircle.getCenter();
                                try {
                                    google.maps.geometry.spherical.computeDistanceBetween(l, c) <= r ? (n.dataset.inBounds = !0,
                                    n.dataset.dist = google.maps.geometry.spherical.computeDistanceBetween(l, c)) : n.dataset.inBounds = !1,
                                    n.dataset.dist = google.maps.geometry.spherical.computeDistanceBetween(l, c)
                                } catch (t) {
                                    P(l.lat(), l.lng(), c.lat(), c.lng()) <= r / 1e3 ? n.dataset.inBounds = !0 : n.dataset.inBounds = !1
                                }
                            } else
                                e.contains(l) ? n.dataset.inBounds = !0 : n.dataset.inBounds = !1
                        }
                }
            this._sortGrid(),
            this.firstMapBoundRun = !0
        },
        _buildMapRadiusCircle: function(t) {
            var e = this
              , i = e.target.settings.advancedMap;
            if (e.advancedMap) {
                var r = e.advancedMap;
                if (r._node.radiusCircle && (r._node.radiusCircle.setMap(null),
                r._node.radiusCircle = null),
                !r._node.radiusCircle && t.lat) {
                    var a = i.autocomplete.dimension.val || 1e4
                      , o = i.autocomplete.radius.val ? i.autocomplete.radius.val * a : 1e4
                      , s = i.autocomplete.circle;
                    s.map = r._node.__map,
                    s.center = t,
                    s.radius = o,
                    r._node.radiusCircle = new google.maps.Circle(s),
                    setTimeout(function() {
                        e.advancedMap._node.__map.panToBounds(r._node.radiusCircle.getBounds()),
                        e.needBoundsChange = !0,
                        e._followMapBounds(e.advancedMap._node, e.advancedMap._node.radiusCircle.getBounds())
                    }, 50)
                }
            }
        },
        _initMapAutoComplete: function() {
            var t = this
              , e = t.target.settings.advancedMap;
            if (e.autocomplete && e.autocomplete.enabled && t.mapAutocompleteContainer) {
                var i = t.mapAutocompleteContainer.one(".search-input")._node
                  , r = (e.autocomplete.options,
                function(e) {
                    position = e,
                    t.container.addClass("position-found"),
                    t.placedContainer && t.placedContainer.addClass("position-found"),
                    t.mapPlaceFound = !0,
                    t && t.items.size() && (t.items.each(function(t) {
                        var e = t._node._item_data
                          , i = "";
                        e && e.location && e.location.markerLat && (i = P(position.lat, position.lng, parseFloat(e.location.markerLat), parseFloat(e.location.markerLng)),
                        t._node._item_data.distance = i),
                        t.setAttribute("data-distance", i)
                    }),
                    t.sortContainer && t.sortContainer.one(".distance_asc a") && t.sortContainer.one(".distance_asc a").addClass("active")),
                    position && t._buildMapRadiusCircle(position)
                }
                )
                  , a = function() {
                    var e = t.mapAutocomplete.getPlace()
                      , i = {};
                    e && e.geometry.location && (i = {
                        lat: e.geometry.location.lat(),
                        lng: e.geometry.location.lng()
                    }),
                    r(i)
                }
                  , o = function() {
                    !t.mapAutocomplete && i && (t.mapAutocomplete = new window.google.maps.places.Autocomplete(i),
                    t.mapAutocomplete.addListener("place_changed", a),
                    console.log("Autocomplete there!"))
                };
                try {
                    if (window.google && window.google.maps && window.google.maps.places && window.google.maps.places.Autocomplete)
                        o();
                    else {
                        if (window.google && window.google.maps)
                            if (window.google.maps.importLibrary)
                                window.google.maps.importLibrary("places").then(function(t) {
                                    console.log("Google Places Loaded"),
                                    o()
                                });
                            else {
                                var s = window.google.maps.version.slice(2).replace(/\./g, "/") + "/places.js";
                                m("https://maps.googleapis.com/maps-api-v3/api/js/" + s, "google-maps-places", null, function() {
                                    console.log("Google Places Loaded"),
                                    setTimeout(function() {
                                        window.google && window.google.maps && window.google.maps.places && window.google.maps.places.Autocomplete && o()
                                    }, 100)
                                })
                            }
                        console.log("No Places API on page")
                    }
                } catch (t) {
                    google && google.maps && google.maps.autocomplete || console.warn("We can't start autocomplete now")
                }
            } else
                console.log("Can't start Autocomplete")
        },
        _setItemsMaxWidthStyle: function(t) {
            var e = this;
            e.isotope_itemsWidthInRange = !1;
            t = t || this.isotope_item_width || "25%";
            var i = this.isotope_column_gutter && this.isotope_column_gutter.indexOf("%") > -1 ? parseFloat(this.isotope_column_gutter) : 0;
            window.innerWidth <= 1024 && (t = 33.3 - i + "%"),
            window.innerWidth <= 640 && (t = 50 - i + "%"),
            window.innerWidth <= 400 && (t = "100%");
            var r = "." + this.u_id + " .custom-filter-grid-item{max-width:" + t + ";margin-left:0!important;margin-right:0!important;width:100%!important;}";
            this.itemsWidthStyleNode && this.itemsWidthStyleNode.remove(),
            this.itemsWidthStyleNode = Y.Node.create('<style id="' + this.u_id + '-ItemsWidthStyle">' + r + "</style>"),
            this.container.append(this.itemsWidthStyleNode)
        },
        _addItemsAttributes: function(t, e) {
            var i = this
              , r = !0;
            if (this.coll_data && this.coll_data.collection && this.coll_data.collection.typeName,
            this.data_items_hash || (this.data_items_hash = {}),
            this.target.settings.HTMLifySelectors) {
                var a = this.container.all(this.target.settings.HTMLifySelectors + ":not([data-htmlified])");
                a && a.size() && a.each(function(t) {
                    t.set("innerHTML", t.get("textContent")),
                    t.setAttribute("data-htmlified", !0)
                })
            }
            var o = i.items.size()
              , s = function(t, e, r, a) {
                if (!t._node && t.nodeName && (t = Y.one(t)),
                i.target.settings.shuffle)
                    !t.hasAttribute("data-randomized") && t.setAttribute("data-index", x(i.shuffleMin || 1, o)),
                    t.setAttribute("data-randomized", !0);
                else {
                    !t.getAttribute("data-randomized") && t.setAttribute("data-index", r);
                    var s = t.hasAttribute("data-start-index") && t.getAttribute("data-start-index");
                    s.indexOf && t.setAttribute("data-index", s)
                }
                if (a && e && (t.attrsAdded = !0),
                e.categoryIds && i.coll_data && i.coll_data.nestedCategories && (i.coll_data.nestedCategories.tree || i.coll_data.nestedCategories.categoriesHash) && (e.categories = c(i.coll_data, e)),
                e.categories || (e.categories = []),
                e.tags || (e.tags = []),
                e.categories && e.categories.indexOf && e.categories.indexOf("all"),
                e.tags && e.tags.indexOf("all"),
                i.target.settings.hooks && i.target.settings.hooks.beforeSetItemAttributes)
                    try {
                        "function" == typeof i.target.settings.hooks.beforeSetItemAttributes && i.target.settings.hooks.beforeSetItemAttributes(t, e, i)
                    } catch (t) {
                        console.error(t)
                    }
                e && (t._node._item_data = e);
                var n = e.categories.length
                  , l = e.tags.length
                  , d = ""
                  , g = "";
                if (vt)
                    n && e.categories.forEach(function(e) {
                        if (i.target.settings.filter && i.target.settings.filter.category && -1 === i.currentCats.indexOf(e) && i.currentCats.push(e),
                        i.target.settings.filter && i.target.settings.filter.setCategoriesClasses) {
                            var r = "category-" + O(e);
                            -1 === t._node.className.indexOf(" " + r + " ") && -1 === d.indexOf(r) && (d += " " + r)
                        }
                    }),
                    l && e.tags.forEach(function(e) {
                        if (i.target.settings.filter && i.target.settings.filter.tag && -1 === i.currentTags.indexOf(e) && i.currentTags.push(e),
                        i.target.settings.filter && i.target.settings.filter.setTagsClasses) {
                            var r = "tag-" + O(e);
                            -1 === t._node.className.indexOf(" " + r + " ") && -1 === g.indexOf(r) && (g += " " + r)
                        }
                    });
                else {
                    if (n)
                        for (var u = 0; u < n; u++) {
                            var p = e.categories[u];
                            if (i.target.settings.filter && i.target.settings.filter.category && -1 === i.currentCats.indexOf(p) && i.currentCats.push(p),
                            i.target.settings.filter && i.target.settings.filter.setCategoriesClasses) {
                                var m = "category-" + O(p);
                                -1 === t._node.className.indexOf(" " + m + " ") && -1 === d.indexOf(m) && (d += " " + m)
                            }
                        }
                    if (l)
                        for (var f = 0; f < l; f++) {
                            var v = e.tags[f];
                            if (i.target.settings.filter && i.target.settings.filter.tag && -1 === i.currentTags.indexOf(v) && i.currentTags.push(v),
                            i.target.settings.filter && i.target.settings.filter.setTagsClasses) {
                                var b = "tag-" + O(v);
                                -1 === t._node.className.indexOf(" " + b + " ") && -1 === g.indexOf(b) && (g += " " + b)
                            }
                        }
                }
                var y = d + " " + g;
                y.length && (t._node.className += y),
                e.hasOwnProperty("likeCount") && t.setAttribute("data-like-count", e.likeCount),
                e.publishOn && t.setAttribute("data-publish-on", e.publishOn),
                e.startDate && t.setAttribute("data-start-date", e.startDate),
                e.endDate && t.setAttribute("data-end-date", e.endDate),
                e.id && t.setAttribute("data-set-id", e.id);
                var w = e.variants ? e.variants : !!e.structuredContent && e.structuredContent.variants;
                if ((!w || !w.length && e.structuredContent) && (e.price || (e.price = e.structuredContent && e.structuredContent.priceCents || t.one(".product-price>span") && h(t.one(".product-price")._node) || t.one(".product-price") && t.one(".product-price").get("innerText").trim() || 0)),
                e.price) {
                    var C = parseInt((e.price + "").replace(/[^\d]/g, "")) / 100;
                    (C + "").indexOf("2390") > -1 && console.log(e, e.price, C),
                    isNaN(C) || (t.setAttribute("data-price", C),
                    -1 === i.items_prices.indexOf(C) && (i.items_prices.push(C),
                    i.items_prices.sort(function(t, e) {
                        return t - e
                    })))
                }
                if (w && w.length) {
                    e.variantOptions = $(e);
                    var S = e.variantOptions.prices;
                    for (var k in S.forEach(function(t) {
                        -1 === i.items_prices.indexOf(t) && i.items_prices.push(t)
                    }),
                    t.setAttribute("data-price", S[0]),
                    t.setAttribute("data-prices", S),
                    e.variantOptions)
                        if (e.variantOptions.hasOwnProperty(k) && "prices" !== k && "qtyInStock" !== k) {
                            var F = (e.variantOptions[k] + "").split(",").length > e.variantOptions[k].length ? "|-|" : ",";
                            t.setAttribute("data-variant-option-" + O(k), e.variantOptions[k].join(F) || "")
                        }
                }
                if ((e.productType || e.recordTypeLabel && "store_item" == e.recordTypeLabel) && t.setAttribute("data-in-stock", X(e)),
                i.items_prices.sort(function(t, e) {
                    return t - e
                }),
                i.target.settings.hooks && i.target.settings.hooks.onSetItemAttributes)
                    try {
                        "function" == typeof i.target.settings.hooks.onSetItemAttributes && i.target.settings.hooks.onSetItemAttributes(t, e, i)
                    } catch (t) {
                        console.error(t)
                    }
                if (i.getFilterAttrObj)
                    for (var A in i.getFilterAttrObj)
                        if (i.getFilterAttrObj.hasOwnProperty(A) && i.getFilterAttrObj[A]) {
                            var P = !1
                              , I = i.getFilterAttrObj[A].attr
                              , T = !1
                              , N = !1;
                            "string" == typeof I && I.indexOf("--removeHTML") > -1 && (N = !0,
                            I = I.replace("--removeHTML", "")),
                            "string" == typeof I && I.indexOf("--split-delim=") > -1 && (T = I.split("--split-delim=")[1],
                            I = I.split("--split-delim=")[0]);
                            var D = i.getFilterAttrObj[A]
                              , M = D.type;
                            if ("function" == typeof I) {
                                var E = i.getFilterAttrObj[A].variantOption;
                                P = E ? I(e, E) : I(t, e)
                            } else {
                                I = I.split("|");
                                var z = I[0]
                                  , B = I[1] || !1
                                  , W = I[2] || !1
                                  , U = z.indexOf(".") > 0 ? _(z, e) : e[z];
                                if (U) {
                                    if (P = U,
                                    B)
                                        try {
                                            var R = Y.Node.create(P)
                                              , V = R.one(B);
                                            R && V ? (P = (V.get("textContent") || V.get("innerText")).replace(/\r?\n|\r/g, "").trim() || null,
                                            W && (P = V.getAttribute(W).replace(/\r?\n|\r/g, "").trim() || null),
                                            console.log("attr from html", P)) : P = null
                                        } catch (t) {
                                            ft && console.log(t)
                                        }
                                } else {
                                    try {
                                        z.indexOf('span[style*="underline"]') > -1 && !t.one(z) && (z = z.replace('span[style*="underline"]', "p>u"),
                                        t.one(z) && t.one(z).setAttribute("hidden", !0)),
                                        P = !!t.one(z) && (0 == z.indexOf("[") && (t.one(z).getAttribute(z.replace(/[\[\]']+/g, "").trim()) + "").trim() || (t.one(z).get("textContent") || t.one(z).get("innerText")).replace(/\r?\n|\r/g, " ").trim()),
                                        N && P && (P = j(P)),
                                        P && t.one(z)._node.children.length > 1 && (P = P.split(","))
                                    } catch (t) {
                                        ft && console.log(t)
                                    }
                                    !1 === P && e.categories
                                }
                            }
                            "string" == typeof P && T && (P = P.split(T)),
                            P ? "object" != typeof P && (P = [P]) : P = [];
                            var G = ""
                              , Z = []
                              , H = i.getFilterAttrObj[A].allOption
                              , Q = i.getFilterAttrObj[A].allowedPrefSuf
                              , J = i.getFilterAttrObj[A].notAllowedPrefSuf
                              , K = !0
                              , tt = i.getFilterAttrObj[A].optionsReplace;
                            if (P && P.length && P.map && (P = P.map(function(t) {
                                return t && t.trim ? t.trim() : t
                            })),
                            P && -1 === P.indexOf(H) && "range-slider" !== M && -1 == M.indexOf("input") && P.push(H),
                            tt)
                                for (const t in tt)
                                    if (Object.hasOwnProperty.call(tt, t)) {
                                        const e = tt[t];
                                        P.indexOf && P.indexOf(t);
                                        for (let i = 0; i < P.length; i++) {
                                            const r = P[i];
                                            t == r && (P[i] = e)
                                        }
                                    }
                            P = P.slice(),
                            i.getFilterAttrObj[A].defaultAttrs && (0 === P.length || 1 === P.length && P[0] === H) && i.getFilterAttrObj[A].defaultAttrs.split("|").forEach(function(t) {
                                t = O(t),
                                -1 === P.indexOf(t) && P.push(t)
                            });
                            var et = P.length;
                            if (et) {
                                if ("range-slider" == M || "range-inputs" == M) {
                                    var it = []
                                      , rt = "ranges";
                                    D[rt] || (D[rt] = []);
                                    var at = !0;
                                    P.forEach(function(t) {
                                        if (Q && Q.length && t && t !== H && ((t + "").indexOf(Q) > -1 ? (t = t.replaceAll(Q, "").trim(),
                                        at = !0) : at = !1),
                                        t && at) {
                                            var e = parseFloat((t + "").replace(/[^\d.]/g, "").replace(/,/g, ""));
                                            isNaN(e) || (-1 === it.indexOf(e) && it.push(e),
                                            -1 === D[rt].indexOf(e) && (D[rt].push(e),
                                            D[rt].sort(function(t, e) {
                                                return t - e
                                            })))
                                        }
                                    }),
                                    it + "" && t.setAttribute("data-range-value-" + O(D.name), it + "")
                                }
                                for (k = 0; k < et; k++)
                                    if (P[k] = (P[k] + "").trim(),
                                    K = !0,
                                    i.getFilterAttrObj[A].lowercase && (P[k] = P[k].toLowerCase()),
                                    i.getFilterAttrObj[A].capitalcase && (P[k] = q(P[k])),
                                    i.getFilterAttrObj[A].capitalcaseF && (P[k] = L(P[k])),
                                    i.getFilterAttrObj[A].uppercase && (P[k] = P[k].toUpperCase()),
                                    Q && Q.length && P[k] && P[k] !== H && ((P[k] + "").indexOf(Q) > -1 ? (P[k] = P[k].replaceAll(Q, "").trim(),
                                    K = !0) : K = !1),
                                    J && J.length && P[k] && P[k] !== H && ((P[k] + "").indexOf(J) > -1 ? (P[k] = P[k].replaceAll(J, "").trim(),
                                    K = !1) : K = !0),
                                    P[k] && K) {
                                        if ((P[k] == H || i.getFilterAttrObj[A].allowedOptionsOriginal.length && i.getFilterAttrObj[A].allowedOptionsOriginal.indexOf(P[k]) > -1 || !i.getFilterAttrObj[A].allowedOptionsOriginal.length) && (!D.notAllowedOptions || D.notAllowedOptions && D.notAllowedOptions.length && -1 === D.notAllowedOptions.indexOf(P[k]))) {
                                            var ot = O(P[k]);
                                            G += " " + A + "-" + ot,
                                            Z.push(P[k])
                                        }
                                        (-1 === i.getFilterAttrObj[A].currentOptions.indexOf(P[k]) && i.getFilterAttrObj[A].allowedOptionsOriginal.length && i.getFilterAttrObj[A].allowedOptionsOriginal.indexOf(P[k]) > -1 || -1 === i.getFilterAttrObj[A].currentOptions.indexOf(P[k]) && !i.getFilterAttrObj[A].allowedOptionsOriginal.length) && (P[k] === H || i.getFilterAttrObj[A].disableOptionsUpdate || (!D.notAllowedOptions || D.notAllowedOptions && D.notAllowedOptions.length && -1 === D.notAllowedOptions.indexOf(P[k])) && i.getFilterAttrObj[A].currentOptions.push(P[k]))
                                    }
                            } else if ("range-slider" == M) {
                                var st = 0;
                                t.setAttribute("data-range-value-" + O(D.name), st);
                                rt = "ranges";
                                D[rt] || (D[rt] = [])
                            }
                            if ("input" == M && Z && Z.length && (Z.sort(),
                            -1 !== Z.indexOf("All") && Z.splice(Z.indexOf("All"), 1),
                            t.setAttribute("data-input-value-" + O(D.name), Z.join("||"))),
                            "range-slider" !== M && "input" !== M) {
                                var nt = t._node.className;
                                if (D.classNameFunction && "function" == typeof D.classNameFunction)
                                    ;
                                else if (G) {
                                    G = G.trim().split(" ");
                                    var lt = "";
                                    G.forEach(function(t) {
                                        -1 === nt.indexOf(" " + t + " ") && (lt += " " + t)
                                    }),
                                    lt.length && (t._node.className += lt)
                                }
                            }
                        }
                var ct = [];
                for (var dt in i.sortObj)
                    if (i.sortObj.hasOwnProperty(dt)) {
                        var gt = dt.replace("_desc", "").replace("_asc", "");
                        -1 === ct.indexOf(gt) && (ct.push(gt),
                        "function" == typeof i.sortObj[dt] && (t.setAttribute("data-" + gt, i.sortObj[dt](t._node, e, gt)),
                        t._node.itemData = e))
                    }
                i.isotope && i.isotope.updateSortData()
            }
              , n = !1
              , l = !1;
            if (e && e.size() && (n = !0,
            l = i.items,
            i.items && (i.items.size(),
            e.size()),
            i.items = new Y.NodeList(e._nodes)),
            o = i.items.size(),
            t) {
                function d(t, e) {
                    var i = []
                      , r = e && t.all(e);
                    return r && r.size() && r.each(function(t) {
                        var e = t.get("textContent").trim();
                        -1 == i.indexOf(e) && i.push(e)
                    }),
                    i
                }
                i.items.each(function(t, e) {
                    var r = []
                      , a = [];
                    t.hasClass("summary-item") && t.one(".summary-metadata-item--cats a") ? r = d(t, ".summary-metadata-item--cats a") : t.one(".Blog-meta-item--categories a") ? r = d(t, ".Blog-meta-item--categories a") : t.one(".entry-category a") ? r = d(t, ".entry-category a") : t.one(".blog-categories-list a") && (r = d(t, ".blog-categories-list a")),
                    t.hasClass("summary-item") && t.one(".summary-metadata-item--tags a") ? a = d(t, ".summary-metadata-item--tags a") : t.one(".Blog-meta-item--tags a") ? a = d(t, ".Blog-meta-item--tags a") : t.one(".entry-tags a") ? a = d(t, ".entry-tags a") : t.one(".blog-tags-list a") && (r = d(t, ".blog-tags-list a")),
                    i.target.settings.filter.useItemsClassesForData && t.hasClass("hentry") && t._node && (t._node.className.indexOf("category-") > -1 || t._node.className.indexOf("tag-") > -1) && t._node.className.split(" ").forEach(function(t) {
                        if (t = t.trim(),
                        t.indexOf("category-") > -1) {
                            var e = L(t.replace("category-", "")).replace(/-/g, " ");
                            -1 === r.indexOf(e) && r.push(e)
                        } else if (t.indexOf("tag-") > -1) {
                            var i = L(t.replace("tag-", "")).replace(/-/g, " ");
                            -1 === a.indexOf(i) && a.push(i)
                        }
                    });
                    var o = {
                        categories: r,
                        tags: a,
                        title: t.one(".list-item-content__title") ? t.one(".list-item-content__title").get("textContent") : t.one(".product-list-item-title") ? t.one(".product-list-item-title").get("textContent") : "",
                        price: t.one(".sqs-money-native") ? parseFloat(t.one(".sqs-money-native").get("textContent").replace(/\D/g, "")) : t.one(".product-list-item-price .sale-price") ? parseFloat(t.one(".product-list-item-price .sale-price").get("textContent").replace(/\D/g, "")) : t.one(".product-list-item-price") ? parseFloat(t.one(".product-list-item-price").get("textContent").replace(/\D/g, "")) : 0,
                        publishOn: t.one("time") ? new Date(t.one("time").get("innerText")).getTime() : "",
                        likeCount: t.one(".like-count") ? t.one(".like-count").get("innerText") : 0
                    };
                    s(t, o, e)
                })
            } else {
                var g = this.coll_data.collection && this.coll_data.collection.collections ? this.coll_data.collection.collections : this.coll_data.items;
                let t = g && g.length
                  , a = this.items && this.items.size();
                if (t && a)
                    if (this.requestComplete,
                    this.items && this.items.size() && (this.items.item(this.items.size() - 1) || this.items.item(0))._node._virtualData)
                        i.items.each(function(t, e) {
                            t._node._virtualData && s(t, t._node._virtualData, e, "direct Virtual logic")
                        });
                    else if (this.items && this.items.size() && (this.items.item(this.items.size() - 1) || this.items.item(0))._node._LZSData)
                        i.items.each(function(t, e) {
                            t._node._LZSData && s(t, t._node._LZSData, e, "direct LZS logic")
                        });
                    else if (this.items.item(0).hasAttribute("data-item-id") || this.items.item(0).hasAttribute("data-product-id"))
                        g.forEach(function(t, e) {
                            var r = t.id;
                            r && !i.data_items_hash.hasOwnProperty(r) && (i.data_items_hash[r] = t)
                        }),
                        i.items.each(function(t, e) {
                            var r = t && (t.getAttribute("data-item-id") || t.getAttribute("data-product-id"));
                            r && i.data_items_hash.hasOwnProperty(r) && s(t, i.data_items_hash[r], e, "Data Item/Product Id")
                        });
                    else if (this.items.item(0).hasAttribute("data-collection-id"))
                        g.forEach(function(t, e) {
                            var r = t.id;
                            r && !i.data_items_hash.hasOwnProperty(r) && (i.data_items_hash[r] = t)
                        }),
                        i.items.each(function(t, e) {
                            var r = t && t.getAttribute("data-collection-id");
                            r && i.data_items_hash.hasOwnProperty(r) && s(t, i.data_items_hash[r], e, "Data Collection Id")
                        });
                    else if (this.items.item(0).one('[data-product*="id"]'))
                        try {
                            g.forEach(function(t, e) {
                                var r = t.id;
                                r && !i.data_items_hash.hasOwnProperty(r) && (i.data_items_hash[r] = t)
                            }),
                            i.items.each(function(t, e) {
                                var r = JSON.parse(t.one('[data-product*="id"]').getAttribute("data-product"))
                                  , a = r && r.id;
                                a && i.data_items_hash.hasOwnProperty(a) && s(t, i.data_items_hash[a], e, "Product block new Data Item Id")
                            })
                        } catch (t) {}
                    else if (this.items.item(0).one(".sqs-add-to-cart-button") && this.items.item(0).one(".sqs-add-to-cart-button").hasAttribute("data-item-id"))
                        g.forEach(function(t, e) {
                            var r = t.id;
                            r && !i.data_items_hash.hasOwnProperty(r) && (i.data_items_hash[r] = t)
                        }),
                        i.items.each(function(t, e) {
                            var r = t && t.one(".sqs-add-to-cart-button") && t.one(".sqs-add-to-cart-button").getAttribute("data-item-id");
                            r && i.data_items_hash.hasOwnProperty(r) && s(t, i.data_items_hash[r], e, "Product block Data Item Id")
                        });
                    else if (this.items.item(0).one(".product-quantity-input") && this.items.item(0).one(".product-quantity-input").hasAttribute("data-item-id"))
                        g.forEach(function(t, e) {
                            var r = t.id;
                            r && !i.data_items_hash.hasOwnProperty(r) && (i.data_items_hash[r] = t)
                        }),
                        i.items.each(function(t, e) {
                            var r = t && t.one(".product-quantity-input") && t.one(".product-quantity-input").getAttribute("data-item-id");
                            r && i.data_items_hash.hasOwnProperty(r) && s(t, i.data_items_hash[r], e, "Product block Data Item Id")
                        });
                    else if (this.items.item(0).hasClass("index-section") && this.items.item(0).getAttribute("id") && 0 == this.items.item(0).getAttribute("id").indexOf("index-section"))
                        g.forEach(function(t, e) {
                            i.items.some ? i.items.some(function(i) {
                                if (i && i.getAttribute("id") == "index-section-" + t.urlId)
                                    return s(i, t.items && t.items[0] || t, e, "Index Section Id"),
                                    !0
                            }) : i.items.each(function(i) {
                                i && i.getAttribute("id") == "index-section-" + t.urlId && s(i, t.items && t.items[0] || t, e, "Index Section Id")
                            })
                        });
                    else if (this.items.item(0).hasClass("index-section") && this.items.item(0).getAttribute("id"))
                        g.forEach(function(t, e) {
                            i.items.some ? i.items.some(function(i) {
                                if (i && i.getAttribute("id") == t.urlId)
                                    return s(i, t.items && t.items[0] || t, e, "Index Section Id"),
                                    !0
                            }) : i.items.each(function(i) {
                                i && i.getAttribute("id") == t.urlId && s(i, t.items && t.items[0] || t, e, "Index Section Id")
                            })
                        });
                    else if (this.items.item(0).getAttribute("data-slide-id"))
                        g.forEach(function(t, e) {
                            var r = t.id;
                            r && !i.data_items_hash.hasOwnProperty(r) && (i.data_items_hash[r] = t)
                        }),
                        i.items.each(function(t, e) {
                            var r = t && t.getAttribute("data-slide-id");
                            r && i.data_items_hash.hasOwnProperty(r) && s(t, i.data_items_hash[r], e, "Slide Gallery Item Id")
                        });
                    else if (this.items.item(0).hasClass("slide") && this.items.item(0).getAttribute("data-slide-url"))
                        g.forEach(function(t, e) {
                            i.items.some ? i.items.some(function(i) {
                                if (i && i.getAttribute("data-slide-url") == t.urlId)
                                    return s(i, t, e, "Slide Gallery Item URL"),
                                    !0
                            }) : i.items.each(function(i) {
                                i && i.getAttribute("data-slide-url") == t.urlId && s(i, t, e, "Slide Gallery Item URL")
                            })
                        });
                    else if (this.items.item(0).hasClass("project") && this.items.item(0).getAttribute("href"))
                        g.forEach(function(t, e) {
                            (t.items && t.items[0] || t.typeName && ("page" == t.typeName || "gallery" == t.typeName)) && (i.items.some ? i.items.some(function(i) {
                                if (i && i.getAttribute("href") == "/" + t.urlId + "/")
                                    return s(i, t.items && t.items[0] || t, e, "Index Gallery Item href"),
                                    !0
                            }) : i.items.each(function(i) {
                                i && i.getAttribute("href") == "/" + t.urlId + "/" && s(i, t.items && t.items[0] || t, e, "Index Gallery Item href")
                            }))
                        });
                    else if (this.items.item(0).hasClass("Index-gallery-item") && this.items.item(0).one(".Index-gallery-item-image")) {
                        var u = e && !i.isotope || i.target.settings.pagination && i.target.settings.pagination.enabled ? i.items.toFrag() : i.container.one(i.target.items) ? i.container : i.isotope ? i.container : i.items.toFrag();
                        g.forEach(function(t, e) {
                            t.items && t.items.length && t.items.forEach(function(t) {
                                var r = t.id
                                  , a = t.systemDataId
                                  , o = t.mainImage ? t.mainImage.assetUrl : t.systemDataId && t.assetUrl
                                  , n = (t.title && t.title.trim(),
                                u.one('[data-image-id="' + r + '"]') ? u.all('[data-image-id="' + r + '"]') : a && u.all('[data-src*="' + a + '"]').size() ? u.all('[data-src*="' + a + '"]') : u.all('[data-src*="' + o + '"]'));
                                n = n && 1 == n.size() && n.item(0).ancestor(i.target.items) || !1,
                                n && !n.attrsAdded && s(n, t, e, "Index asset logic")
                            })
                        })
                    } else if (this.items.item(0).hasClass("grid-item") && this.items.item(0).getAttribute("href"))
                        g.forEach(function(t, e) {
                            i.items.some ? i.items.some(function(i) {
                                if (i && i.getAttribute("href") == t.fullUrl)
                                    return s(i, t, e, "Portfolio Item href"),
                                    !0
                            }) : i.items.each(function(i) {
                                i && i.getAttribute("href") == t.fullUrl && s(i, t, e, "Portfolio Item href")
                            })
                        });
                    else if (this.itemsParent.hasClass("portfolio-hover-items-list") || this.itemsParent.hasClass("portfolio-hover-items"))
                        g.forEach(function(t, e) {
                            i.items.some ? i.items.some(function(i) {
                                if (i && i.one(".portfolio-hover-item") && i.one(".portfolio-hover-item").getAttribute("href") == t.fullUrl || i.hasClass("portfolio-hover-item") && i.getAttribute("href") && i.getAttribute("href") == t.fullUrl)
                                    return s(i, t, e, "Portfolio Item href"),
                                    !0
                            }) : i.items.each(function(i) {
                                (i && i.one(".portfolio-hover-item") && i.one(".portfolio-hover-item").getAttribute("href") == t.fullUrl || i.hasClass("portfolio-hover-item") && i.getAttribute("href") && i.getAttribute("href") == t.fullUrl) && s(i, t, e, "Portfolio Item href")
                            })
                        });
                    else if (this.items.item(0).one(".product-list-item-link"))
                        for (let e = 0; e < t; e++) {
                            const t = g[e];
                            let r = t.fullUrl;
                            i.items.some ? i.items.some(function(i) {
                                var a = i._node.querySelector(".product-list-item-link");
                                if (a && a.getAttribute("href") == r)
                                    return s(i, t, e, "New Product Item href"),
                                    !0
                            }) : i.items.each(function(i) {
                                var r = i.one(".product-list-item-link");
                                r && r.getAttribute("href") == t.fullUrl && s(i, t, e, "New Product Item href")
                            }),
                            r = null
                        }
                    else if (this.items.item(0).hasClass("slide") || this.items.item(0).hasClass("summary-item") || this.items.item(0).hasAttribute("data-id") || !this.items.item(0).hasAttribute("data-item-id") && !this.items.item(0).hasClass("archive-item-link")) {
                        var p = i.items.item(0).one(".lessons-image") ? "videos" : i.items.item(0).one(".eventlist-title-link") ? "events" : !!i.items.item(0).one(".blog-title a") && "blog_v_7_1"
                          , m = (u = e && !i.isotope || i.target.settings.pagination && i.target.settings.pagination.enabled ? i.items.toFrag() : i.container.one(i.target.items) ? i.container : i.isotope ? i.container : i.items.toFrag(),
                        i.items.size())
                          , f = i.items.item(0).hasClass("table-row");
                        g.forEach(function(t, e) {
                            if (m <= 0 || !t)
                                return !1;
                            var r = t.fullUrl
                              , a = f && u.one(".table-row-" + e)
                              , o = t.clickthroughUrl || t.sourceUrl;
                            o && (o = o.replace('"target="_blank', "")),
                            r && (r = r.replace('"target="_blank', ""));
                            var n = t.id
                              , l = t.systemDataId
                              , c = t.mainImage ? t.mainImage.assetUrl : t.systemDataId && t.assetUrl
                              , d = t.title && t.title.trim()
                              , g = u.one('.custom-filter-grid-item[data-id="' + n + '"]');
                            t.oembed;
                            if (f && a)
                                !a.attrsAdded && s(a, t, e, "table-row logic"),
                                m--;
                            else if (g)
                                !g.attrsAdded && s(g, t, e, "id logic"),
                                m--;
                            else if (p) {
                                if ("videos" == p) {
                                    var h = u.one('.lessons-image[href="' + r + '"]') || "";
                                    h = h && h.ancestor(i.target.items),
                                    h && (!h.attrsAdded && s(h, t, e, "video href logic"),
                                    m--)
                                } else if ("events" == p) {
                                    h = o && u.one('.eventlist-title-link[href="' + o + '"]') ? u.one('.eventlist-title-link[href="' + o + '"]') : r ? u.one('.eventlist-title-link[href="' + r + '"]') || u.one('a.image-wrapper[href="' + r + '"]') : "";
                                    h = h && h.ancestor(i.target.items),
                                    h && (!h.attrsAdded && s(h, t, e, "event href logic"),
                                    m--)
                                } else if ("blog_v_7_1" == p) {
                                    h = !1;
                                    if (o)
                                        try {
                                            var v = u._node.querySelectorAll('.blog-title a[href="' + o + '"]');
                                            v.length && v.length < 2 && (h = v[0])
                                        } catch (t) {
                                            console.log(t)
                                        }
                                    else if (r) {
                                        var b = u._node.querySelectorAll('.blog-more-link[href="' + r + '"]');
                                        if (b.length && b.length < 2)
                                            h = b[0];
                                        else {
                                            var y = u._node.querySelectorAll('a.image-wrapper[href="' + r + '"]');
                                            y.length && y.length < 2 && (h = y[0])
                                        }
                                    }
                                    if (h = h && h.closest(i.target.items),
                                    h)
                                        !h.attrsAdded && s(h, t, e, "href logic blog 7.1"),
                                        m--;
                                    else {
                                        var w = d && u.one(".blog-title a") && u.all(".blog-title a").filter(function(t) {
                                            return t.textContent.trim() == d
                                        });
                                        w = w.size() && w.item(0).ancestor(i.target.items),
                                        w && !w.attrsAdded && s(w, t, e, "title logic blog 7.1"),
                                        m--
                                    }
                                }
                            } else {
                                var _ = u.one('[data-image-id="' + n + '"]') ? u.all('[data-image-id="' + n + '"]') : l && u.all('[data-src*="' + l + '"]').size() ? u.all('[data-src*="' + l + '"]') : u.all('[data-src*="' + c + '"]');
                                if (_ = _ && 1 == _.size() && _.item(0).ancestor(i.target.items) || !1,
                                _)
                                    !_.attrsAdded && s(_, t, e, "asset logic"),
                                    m--;
                                else {
                                    var C = d && r && u.one('.productDetails .product-title[href="' + r + '"]') && u.one('.productDetails .product-title[href="' + r + '"]').get("textContent").replace(/\r?\n|\r/g, "").trim() === d ? u.one('.productDetails .product-title[href="' + r + '"]').ancestor(i.target.items) : d && r && u.one('.summary-title-link[href="' + r + '"]') && u.one('.summary-title-link[href="' + r + '"]').get("textContent").replace(/\r?\n|\r/g, "").trim() === d ? u.one('.summary-title-link[href="' + r + '"]').ancestor(i.target.items) : d && r && (u.one('.image-slide-anchor[href="' + r + '"]') || u.one('.image-slide-anchor[href="' + t.clickthroughUrl + '"]')) ? (u.one('.image-slide-anchor[href="' + r + '"]') || u.one('.image-slide-anchor[href="' + t.clickthroughUrl + '"]')).ancestor(i.target.items) : !!(o && t.passthrough && u.one('.summary-title-link[href="' + o + '"]')) && u.one('.summary-title-link[href="' + o + '"]').ancestor(i.target.items);
                                    if (C)
                                        !C.attrsAdded && s(C, t, e, "title&href logic"),
                                        m--;
                                    else {
                                        w = !(!d || !u.one('[data-title="' + d + '"]')) && u.one('[data-title="' + d + '"]').ancestor(i.target.items);
                                        if (w)
                                            !w.attrsAdded && s(w, t, e, "title logic"),
                                            m--;
                                        else {
                                            var S = (8 == t.recordType || "video" == t.recordTypeLabel) && t.oembed && t.oembed.html;
                                            if (S)
                                                u.all(".sqs-video-wrapper").each(function(r) {
                                                    var a = r && r.getAttribute("data-html");
                                                    if (a == S) {
                                                        var o = r.ancestor(i.target.items);
                                                        o && (o && !o.attrsAdded && s(o, t, e, "video iframe logic"),
                                                        m--)
                                                    }
                                                });
                                            else {
                                                h = r && u.one('.summary-title-link[href="' + r + '"]');
                                                h && (!h.attrsAdded && s(h.ancestor(".summary-item"), t, e, "url logic"),
                                                m--)
                                            }
                                        }
                                    }
                                }
                            }
                        })
                    } else
                        this.items.item(0).hasClass("archive-item-link") ? g.forEach(function(t, e) {
                            var r = t.fullUrl
                              , a = i.container.one('.archive-item-link[href="' + r + '"]');
                            a && s(a, t, e)
                        }) : g.forEach(function(t, e) {
                            var r = i.container.one('.hentry[data-item-id="' + t.id + '"]') || i.container.one(i.target.items + '[href="' + t.fullUrl + '"]');
                            r && s(r, t, e)
                        });
                r && (i.requestComplete = !0)
            }
            if (i.shuffleMin = o || 1,
            this._addMarkersInstancesToItems(),
            this._addProductsBadges(),
            n && l && (i.items = l),
            i.target.settings.hooks && i.target.settings.hooks.attributesAdded)
                try {
                    "function" == typeof i.target.settings.hooks.attributesAdded && i.target.settings.hooks.attributesAdded(i)
                } catch (t) {
                    console.error(t)
                }
            this.container.fire && this.container.fire("custom-filter:attributes-added", {
                customFilter: i
            }),
            Y.fire("custom-filter:attributes-added", {
                customFilter: i
            })
        },
        _addProductsBadges: function() {
            var t = this;
            if (t.target.settings.productsBadges && t.target.settings.productsBadges.length) {
                var e = t.target.settings.productsBadges;
                e && e.length && t.items.each(function(t) {
                    var i = t.one(".sqs-product-mark-wrapper")
                      , r = t.one(".ProductList-innerImageWrapper") || t.one(".grid-meta-status") || t.one(".img-wrapper") || t.one(".grid-image-wrapper") || t.hasClass("summary-item") && t.one(".summary-content");
                    if (!i && r) {
                        var a = r._node.className.indexOf("ProductList") > -1 ? "ProductList-statusWrapper" : r._node.className.indexOf("grid-meta-status") > -1 ? "grid-product-status" : "summary-product-status";
                        i = Y.Node.create('<div class="' + a + ' sqs-product-mark-wrapper cf-product-badge"></div>'),
                        r.append(i)
                    }
                    i && e.forEach(function(e) {
                        if (e = e.split("|"),
                        2 == e.length && e[0]) {
                            var r = O(e[0]);
                            t.hasClass("tag-" + r) && !i.one(".badge-" + r) && i.append('<div class="product-mark badge-' + r + '">' + (e[1] || e[0]) + "</div>")
                        }
                    })
                })
            }
        },
        _checkChildFilterForOptions: function(t) {
            var e = this;
            if (t = t.customFilter || t,
            this.getFilterAttrObj && t.getFilterAttrObj)
                for (var i in this.getFilterAttrObj)
                    this.getFilterAttrObj.hasOwnProperty(i) && t.getFilterAttrObj[i] && (t.getFilterAttrObj[i].optionsStructure && e.getFilterAttrObj[i].optionsStructure && (e.getFilterAttrObj[i].optionsStructure = Object.assign(e.getFilterAttrObj[i].optionsStructure, t.getFilterAttrObj[i].optionsStructure)),
                    t.getFilterAttrObj[i].currentOptions.forEach(function(t) {
                        -1 == e.getFilterAttrObj[i].currentOptions.indexOf(t) && e.getFilterAttrObj[i].currentOptions.push(t)
                    }));
            e._buildDropdowns({
                childOptions: !0
            })
        },
        _sortChildFilters: function() {
            var t = this;
            if (this.container._node && this.container._node.__childFilters && this.container._node.__childFilters.length)
                for (var e = this.container._node.__childFilters, i = e.length - 1; i >= 0; i--)
                    e[i].filter_selectors = t.filter_selectors,
                    e[i].sort_param = t.sort_param,
                    e[i].searchRegex = t.searchRegex,
                    e[i].filterAnim = t.filterAnim,
                    e[i]._sortGrid()
        },
        _countItemsInChildFilters: function() {
            if (this.container._node && this.container._node.__childFilters && this.container._node.__childFilters.length) {
                for (var t = this, e = this.filtered && this.filtered.size() || 0, i = this.container._node.__childFilters, r = i.length - 1; r >= 0; r--)
                    e += i[r].filtered && i[r].filtered.size() || 0;
                t.itemsCount && t.itemsCount.one(".items-count").set("textContent", e),
                t.virtualGoButton && t.virtualGoButton.setAttribute("data-items", e)
            }
        },
        _registerChildFilters: function() {
            var t = this;
            if (this.container._node && this.container._node.__childFilters && this.container._node.__childFilters.length) {
                this.debounce_after_all_child_sorts || (this.debounce_after_all_child_sorts = d(function(e) {
                    t._countItemsInChildFilters()
                }, 100, !1));
                for (var e = this.container._node.__childFilters, i = e.length - 1; i >= 0; i--)
                    t._checkChildFilterForOptions(e[i])
            }
        },
        _buildDropdowns: function(t) {
            this.coll_data || (this.coll_data = {
                collection: {}
            });
            var e, i, r = this;
            (this.currentTags.length || this.currentCats.length) && this.coll_data.collection && ((!this.coll_data.collection.categories || this.coll_data.collection.categories.length < this.currentCats.length - 1) && (this.coll_data.collection.categories = this.currentCats),
            (!this.coll_data.collection.tags || this.coll_data.collection.tags.length < this.currentTags.length - 1) && (this.coll_data.collection.tags = this.currentTags));
            var a = r.filterCachedOptions;
            if (r.getFilterAttrObj && Object.keys(r.getFilterAttrObj).length)
                for (var o in r.getFilterAttrObj)
                    if (r.getFilterAttrObj.hasOwnProperty(o) && r.getFilterAttrObj[o].container) {
                        var s = r.getFilterAttrObj[o]
                          , l = s.container
                          , c = s.currentOptions
                          , d = s.type
                          , g = s.visibleOptions
                          , u = s.notVisibleOptions;
                        if ("dropdown" == d || "buttons" == d) {
                            if (a && a[o] && -1 == a[o].indexOf("li class=") && !r.requestComplete && (c = a[o],
                            "asAllowed" === s.sort && null == s.allowedHash)) {
                                s.allowedHash = {};
                                for (var p = 0, m = c.length; p < m; p++)
                                    s.allowedHash[c[p]] = p
                            }
                            if (c)
                                if ("desc" === s.sort)
                                    c.sort(k) && c.reverse();
                                else if ("asAllowed" === s.sort && s.allowedHash)
                                    c.sort(function(t, e) {
                                        return s.allowedHash[t] - s.allowedHash[e]
                                    });
                                else if (s.sort && "string" == typeof s.sort && s.sort.indexOf("asDate") > -1) {
                                    var h = s.sort.split("|")[1] || "asc";
                                    c.sort(function(t, e) {
                                        try {
                                            return new Date(t).getTime() - new Date(e).getTime()
                                        } catch (t) {
                                            console.log(t)
                                        }
                                    }),
                                    "desc" == h && (c = c.reverse())
                                } else
                                    "asOptions" === s.sort || "no-sort" === s.sort || (s.sort && "function" == typeof s.sort ? c.sort(s.sort) : c.sort(k));
                            if (s.firstOption) {
                                var f = s.firstOption
                                  , v = c.indexOf(f);
                                v > 0 ? (c.splice(v, 1),
                                c.unshift(f)) : -1 === v && c.unshift(f)
                            }
                            if (s.showAll) {
                                var b = s.allOption
                                  , y = c.indexOf(b)
                                  , w = s.allOptionLast;
                                y > 0 ? (c.splice(y, 1),
                                w ? c.push(b) : c.unshift(b)) : -1 === y && (w ? c.push(b) : c.unshift(b))
                            }
                            var _ = l.one("ul:not(.nested-options)");
                            e = _.all(".archive-group-name-link.active"),
                            i = [],
                            e && e.size() && e.each(function(t) {
                                i.push(t.getAttribute("data-filter-val"))
                            });
                            var C = s.optionsDelimiter || "string" == typeof s.optionsDelimiter && s.optionsDelimiter.length ? ' data-delimiter="' + s.optionsDelimiter + '" ' : "";
                            if (r.filterSelectors || (r.filterSelectors = {}),
                            a && a[o] && !r.requestComplete && l.show(),
                            c && c.length > 0) {
                                !a || a && a[o],
                                s.quickSearch ? _.all(".archive-group").remove() : _.empty();
                                var S = new Y.NodeList
                                  , x = {}
                                  , F = function(t) {
                                    var e = !1;
                                    return S.each(function(i) {
                                        var r = i.all("a");
                                        r.each(function(i) {
                                            i.getAttribute("data-filter-val") == t && (e = !0)
                                        })
                                    }),
                                    e
                                }
                                  , A = function(t, e, a, n, l) {
                                    var c = t.trim() || ""
                                      , d = !1
                                      , p = encodeURIComponent(c)
                                      , m = O(c)
                                      , h = ""
                                      , f = s.optionsStructure && (s.optionsStructure[c] || !Object.size(s.optionsStructure));
                                    c === s.allOption && (h = ' data-all-filter-attr=""'),
                                    s.optionsLabels && s.optionsLabels[c] && (d = s.optionsLabels[c]);
                                    var v = i.indexOf(m) > -1 ? " active" : ""
                                      , b = ""
                                      , y = ""
                                      , w = "";
                                    (h || f || !s.optionsStructure || s.optionsStructure && !Object.size(s.optionsStructure)) && (y = "." + o + "-" + m,
                                    b = 'data-root-option="' + y + '" data-root-cat="' + m + '"'),
                                    u && u.length && u.indexOf(c) > -1 && (w = " n-visible-option"),
                                    g && g.length && (w = g.indexOf(c) > -1 ? " visible-option" : " n-visible-option");
                                    var _ = b || a > 1 && n && (n.length || "object" == typeof n) ? '<ul class="nested-options nested-options-level-' + (a + 1) + '"></ul>' : ""
                                      , S = (r.multipleCollectionsFetched ? window.location.pathname : r.collectionUrl) + "?" + o + "=" + p;
                                    "categories" == l.attr && l.categoriesSlugs && l.categoriesSlugs[t] && l.followCategoriesLinks && (S = r.collectionUrl + "/" + l.categoriesSlugs[t].shortSlug);
                                    t = Y.Node.create("<li " + b + ' class="archive-group' + w + '"' + C + '  data-ind="' + e + '"><a aria-label="' + (d || c) + '" href="' + S + '" data-filter-val="' + m + '" data-filter="' + o + '"' + h + ' class="archive-group-name-link ' + v + '" data-option-level="' + a + '">' + (d || c) + "</a>" + _ + "</li>");
                                    if (l.colorSwatches && l.colorSwatches.enabled) {
                                        l.colorSwatches.backgrounds = l.colorSwatches.backgrounds || r.target.settings.colorSwatches && r.target.settings.colorSwatches.backgrounds || {};
                                        var x = m
                                          , k = t.one(".archive-group-name-link")
                                          , F = l.colorSwatches.backgrounds[c] && l.colorSwatches.backgrounds[c] + "".trim() || x;
                                        F && F.indexOf("http") > -1 && (F = "url(" + F + ")");
                                        var A = 'style="background:' + F + '"'
                                          , P = "";
                                        l.colorSwatches.tooltips && l.colorSwatches.tooltips.enabled && (P = '<span class="color-swatch_tooltip" data-color="' + c + '"></span>'),
                                        k.set("innerHTML", '<span class="color-swatch_thumb" ' + A + '></span><span class="color-swatch_name">' + c + "</span>" + P)
                                    }
                                    if (l.iconOptions && l.iconOptions.enabled) {
                                        l.iconOptions.backgrounds = l.iconOptions.backgrounds || {};
                                        k = t.one(".archive-group-name-link"),
                                        F = l.iconOptions.backgrounds[c] && l.iconOptions.backgrounds[c] + "".trim();
                                        F && F.indexOf("http") > -1 && (F = "url(" + F + ")");
                                        l.iconOptions.position;
                                        F && (k.prepend('<span class="cf-icon-option"></span>'),
                                        k.one(".cf-icon-option").setStyle("background-image", F))
                                    }
                                    return {
                                        opt_name: c,
                                        rootOption: b,
                                        slugified_option: m,
                                        root_structure: f,
                                        nested: t.one(".nested-options"),
                                        opt: t
                                    }
                                };
                                c.forEach(function(t, e) {
                                    var i = A(t, e, 1, null, s);
                                    if (i.rootOption) {
                                        if (x[i.opt_name] = {
                                            el: i.opt,
                                            slug: i.slugified_option,
                                            nested: i.opt.one(".nested-options"),
                                            children: []
                                        },
                                        i.root_structure) {
                                            for (var a in i.root_structure) {
                                                if (!i.root_structure.hasOwnProperty(a))
                                                    return;
                                                var l = i.root_structure[a]
                                                  , c = A(a, e, 2, l, s)
                                                  , d = x[i.opt_name].nested.one('[data-filter-val="' + c.slugified_option + '"]')
                                                  , g = !1;
                                                if (s.parentCategory && s.parentCategory == i.opt_name && (g = !0,
                                                c.opt && S.push(c.opt)),
                                                !d) {
                                                    var u = c.opt;
                                                    if (!g) {
                                                        var p = u.one("a").getAttribute("href").split("=");
                                                        p = p[0] + "=" + encodeURIComponent(i.opt_name) + "," + p[1],
                                                        u.one("a").setAttribute("href", p)
                                                    }
                                                    if (u.one("a").setAttribute("data-parent-cat", i.opt_name),
                                                    s.allowedOptionsOriginal && s.allowedOptionsOriginal.length && s.allowedOptionsOriginal.indexOf(a) > -1 || !s.allowedOptionsOriginal || s.allowedOptionsOriginal && 0 == s.allowedOptionsOriginal.length || s.ignoreAllowedForChildrenCats) {
                                                        i.nested && i.nested.append(u),
                                                        x[i.opt_name].children.push(c.opt);
                                                        var m = function(t, r, a, o, n) {
                                                            var l = A(t, r + e, a, n, s)
                                                              , c = i.nested && i.nested.one('[data-filter-val="' + l.slugified_option + '"]')
                                                              , d = !1;
                                                            if (s.parentCategory && s.parentCategory == o.opt_name && (l.opt && S.push(l.opt),
                                                            d = !0),
                                                            !c || s.ignoreAllowedForChildrenCats) {
                                                                var u = l.opt;
                                                                if (!d) {
                                                                    var p = u.one("a").getAttribute("href").split("=")
                                                                      , m = encodeURIComponent(i.opt_name) + ",";
                                                                    g && (m = ""),
                                                                    p = p[0] + "=" + m + encodeURIComponent(o.opt_name) + "," + p[1],
                                                                    u.one("a").setAttribute("href", p)
                                                                }
                                                                u.one("a").setAttribute("data-parent-cat", o.opt_name),
                                                                o.nested && o.nested.append(u),
                                                                x[i.opt_name].children.push(l.opt)
                                                            }
                                                            return l
                                                        };
                                                        if (l && l.length && Array.isArray(l))
                                                            c.opt.setAttribute("data-nested-count", l.length),
                                                            l.forEach(function(t, e) {
                                                                m(t, e, 3, c)
                                                            });
                                                        else if ("object" == typeof l && null !== l && !Array.isArray(l)) {
                                                            var h = Object.entries(l);
                                                            c.opt.setAttribute("data-nested-count", h.length),
                                                            h.length && h.forEach(function(t, e) {
                                                                if (t[0] && "string" == typeof t[0]) {
                                                                    var i = m(t[0], e, 3, c, t[1]);
                                                                    t[1].length && (i.opt.setAttribute("data-nested-count", t[1].length),
                                                                    t[1].forEach(function(t, e) {
                                                                        m(t, e, 4, i)
                                                                    }))
                                                                }
                                                            })
                                                        }
                                                    }
                                                }
                                            }
                                            x[i.opt_name].el && x[i.opt_name].children.length && x[i.opt_name].el.setAttribute("data-nested-count", x[i.opt_name].children.length)
                                        }
                                    } else if (s.allowedOptionsOriginal && s.allowedOptionsOriginal.length && !n(s.allowedOptionsOriginal, s.allowedOptions, !0) || s.allowedPrefSuf) {
                                        d = F(i.slugified_option);
                                        d || S.push(i.opt)
                                    }
                                    i.rootOption && !s.parentCategory && S.push(i.opt),
                                    r.filterSelectors.hasOwnProperty(o + "-" + i.slugified_option) || (r.filterSelectors[o + "-" + i.slugified_option] = [])
                                }),
                                s.forceSort && (S._nodes.sort(function(t, e) {
                                    return t = t.querySelector("a:first-child").textContent,
                                    e = e.querySelector("a:first-child").textContent,
                                    k(t, e)
                                }),
                                "desc" == s.forceSort ? S._nodes.reverse() : "asAllowed" == s.forceSort && s.allowedHashOriginal && S._nodes.sort(function(t, e) {
                                    return t = t.textContent,
                                    e = e.textContent,
                                    s.allowedHashOriginal[t] - s.allowedHashOriginal[e]
                                })),
                                _ && S.size() && _.append(S),
                                l.show(),
                                l.removeClass("first")
                            } else
                                null !== r.requestComplete && void 0 !== r.requestComplete && !0 !== r.requestComplete || _.one("li") || l.hide(),
                                r.customFiltersWrapper.one(".sqs-block:not([hidden]):not(.items-count-wrapper)") && r.customFiltersWrapper.one(".sqs-block:not([hidden]):not(.items-count-wrapper)").addClass("first");
                            _.setAttribute("data-items-count", _.all(".archive-group").size()),
                            l.setAttribute("data-options-count", _.all(".archive-group").size())
                        } else if ("range-slider" == d) {
                            var P = l.one(".range-slider");
                            if (P && (P = P._node,
                            P.noUiSlider && s.updateMinMax))
                                if ("price" == s.attr && r.items_prices && r.items_prices.length) {
                                    var I = r.items_prices.length - 1
                                      , L = r.items_prices[I]
                                      , q = r.items_prices[0]
                                      , T = parseFloat(P.dataset.step || 10);
                                    q == L && (L = q + T),
                                    P.noUiSlider.updateOptions({
                                        range: {
                                            min: q,
                                            max: L
                                        }
                                    }),
                                    P.noUiSlider.options.connect && "upper" == P.noUiSlider.options.connect ? P.noUiSlider.set(L) : P.noUiSlider.set([q, L]),
                                    P.dataset.max = L,
                                    P.dataset.min = q
                                } else if (s.ranges && s.ranges.length) {
                                    I = s.ranges.length - 1,
                                    L = s.ranges[I],
                                    q = s.ranges[0];
                                    L && q == L && (q = 0),
                                    L && (P.noUiSlider.updateOptions({
                                        range: {
                                            min: q,
                                            max: L
                                        }
                                    }),
                                    P.noUiSlider.set([q, L])),
                                    P.dataset.max = L,
                                    P.dataset.min = q
                                }
                        }
                    }
            if (this.target.settings.updateFilterOptions && this._updateFilterOptions(),
            r.target.settings.hooks && r.target.settings.hooks.onDropdownsBuilt)
                try {
                    "function" == typeof r.target.settings.hooks.onDropdownsBuilt && r.target.settings.hooks.onDropdownsBuilt(r)
                } catch (t) {
                    console.error(t)
                }
            if (this.container.fire && this.container.fire("custom-filter:cats-tags-filters-built", {
                customFilter: r
            }),
            Y.fire("custom-filter:cats-tags-filters-built", {
                customFilter: r
            }),
            r.target.settings && r.target.settings.filter && r.target.settings.filter.cacheOptions && r.requestComplete && r.filtersDropdowns && r.filtersDropdowns.size() && !r.filtersOptionsCached) {
                var N = r.u_id + "_" + O(r.customIndexUrl || r.collectionUrl) + "_filter_options_" + location.pathname
                  , M = {};
                r.filtersDropdowns.each(function(t) {
                    var e = t.getAttribute("data-filter")
                      , i = t.one("ul.archive-group-list");
                    try {
                        if (e && i) {
                            var r = [];
                            i.all("a").each(function(t) {
                                r.push(t.get("textContent"))
                            }),
                            M[e] = r
                        }
                    } catch (t) {
                        console.log(t)
                    }
                });
                var E = parseFloat(r.target.settings.filter.cacheOptions) || 10;
                D(M, N, !0, E),
                r.filtersOptionsCached = !0
            }
        },
        _destroy: function() {
            this.target.settings.noDestroy || (this.items && this.items.each && this.items.each(function(t) {
                t.attrsAdded = !1
            }),
            this.isotope && this.isotope.destroy(),
            this.container.removeClass("custom-filter-container").removeClass("isotope-filter-used").removeClass(this.all_filter_classes),
            this.customFiltersWrapper && this.customFiltersWrapper.remove(),
            this.container.one(".custom-filter-grid") && this.container.one(".custom-filter-grid").removeClass("custom-filter-grid"),
            this.container.one(".mobile-filter-trigger") && this.container.one(".mobile-filter-trigger").remove(),
            this.container.one(".item-filter-loaded") && this.container.all(".item-filter-loaded").remove(),
            this.externalClicksListener && (this.externalClicksListener.detach(),
            this.externalClicksListener = null),
            window.removeEventListener("popstate", this.popstateListener))
        }
    },
    window.CustomSQSFilter ? console.log("Seems Universal Filter was already started.") : lt(),
    window.Squarespace && (!window.Squarespace.initializeSummaryV2Block || document.querySelector('script[src*="lazy-summaries"]') || window.lazy_summaries_script_loaded || (window.Squarespace.initializeSummaryV2Block = function(t) {
        t.all(".sqs-block-summary-v2").each(function(e) {
            var i = e.getAttribute("data-block-json") ? JSON.parse(e.getAttribute("data-block-json")) : {
                ignoreInit: !1
            };
            !i.ignoreInit && t.Squarespace.GalleryManager.initializeBlock(e)
        })
    }
    ));
    try {
        window.self !== window.top && (window.top.document.querySelector("html.squarespace-damask") || window.top.document.querySelector("squarespace-config") || window.top.document.querySelector(".App-siteFrame")) && m("https://assets.squarewebsites.org/custom-filter/custom-filter-admin.js?ver=" + (new Date).getTime(), "custom-filter-admin", window.document.getElementsByTagName("head")[0])
    } catch (t) {
        console.log(t)
    }
}();
