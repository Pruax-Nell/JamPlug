function search_news(e, s, a) {
    jQuery.ajax({
        type: "post",
        url: ajax_variable.ajax_url,
        data: {
            action: "action__news_search",
            search: e,
            category: s,
            paged: a
        },
        dataType: "JSON",
        cache: !1,
        beforeSend: function(e) {
            $(".loading-spinner").fadeIn()
        },
        success: function(e) {
            var s;
            $(".loading-spinner").fadeOut(),
            "success" == e.response ? ($(".news-posts-section .grid-wrap").html(e.message),
            $(".news-posts-section .pagination").html(e.pagination),
            $(".news-posts-section .pagination").html(e.pagination),
            jQuery(".news-posts-section").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
            jQuery('.news-posts-section .ajax-numeric-pagination .pagination[data-page="' + a + '"]').addClass("active"),
            s = $(".news-posts-section").find(".ajax-numeric-pagination").data("pages"),
            1 == a ? $(".news-posts-section .prev").addClass("disabled") : $(".news-posts-section .prev").removeClass("disabled"),
            a == s ? $(".news-posts-section .next").addClass("disabled") : $(".news-posts-section .next").removeClass("disabled"),
            e.paged <= 1 ? $(".news-posts-section .ajax-numeric-pagination").addClass("hide") : $(".news-posts-section .ajax-numeric-pagination").removeClass("hide")) : ($(".news-posts-section .grid-wrap").html('<div class="error_display text-center">' + e.message + "</div>").fadeIn("slow"),
            setTimeout(function() {
                $(".error_display").fadeOut("slow")
            }, 3e3))
        }
    })
}
function search_blog(e, s, a) {
    jQuery.ajax({
        type: "post",
        url: ajax_variable.ajax_url,
        data: {
            action: "action__blog_search",
            search: e,
            category: s,
            paged: a
        },
        dataType: "JSON",
        cache: !1,
        beforeSend: function(e) {
            $(".loading-spinner").fadeIn()
        },
        success: function(e) {
            var s;
            $(".loading-spinner").fadeOut(),
            "success" == e.response ? ($(".blog-posts-section .grid-wrap").html(e.message),
            $(".blog-posts-section .pagination").html(e.pagination),
            $(".blog-posts-section .pagination").html(e.pagination),
            jQuery(".blog-posts-section").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
            jQuery('.blog-posts-section .ajax-numeric-pagination .pagination[data-page="' + a + '"]').addClass("active"),
            s = $(".blog-posts-section").find(".ajax-numeric-pagination").data("pages"),
            1 == a ? $(".blog-posts-section .prev").addClass("disabled") : $(".blog-posts-section .prev").removeClass("disabled"),
            a == s ? $(".blog-posts-section .next").addClass("disabled") : $(".blog-posts-section .next").removeClass("disabled"),
            e.paged <= 1 ? $(".blog-posts-section .ajax-numeric-pagination").addClass("hide") : $(".blog-posts-section .ajax-numeric-pagination").removeClass("hide")) : ($(".blog-posts-section .grid-wrap").html('<div class="error_display text-center">' + e.message + "</div>").fadeIn("slow"),
            setTimeout(function() {
                $(".error_display").fadeOut("slow")
            }, 3e3))
        }
    })
}
function event_list(e, a) {
    jQuery.ajax({
        type: "post",
        url: ajax_variable.ajax_url,
        data: {
            action: "action__event_list",
            category: e,
            paged: a
        },
        dataType: "JSON",
        cache: !1,
        beforeSend: function(e) {
            $(".loading-spinner").fadeIn()
        },
        success: function(e) {
            var s;
            $(".loading-spinner").fadeOut(),
            "success" == e.response ? ($(".upcoming-posts .events-list-wrapper").html(e.message),
            $(".upcoming-posts .pagination").html(e.pagination),
            jQuery(".upcoming-posts").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
            jQuery('.upcoming-posts .ajax-numeric-pagination .pagination[data-page="' + a + '"]').addClass("active"),
            s = $(".upcoming-posts").find(".ajax-numeric-pagination").data("pages"),
            $("html, body").animate({
                scrollTop: $(".events-list.upcoming-posts").offset().top - $("header").innerHeight()
            }, 500),
            1 == a ? $(".upcoming-posts .prev").addClass("disabled") : $(".upcoming-posts .prev").removeClass("disabled"),
            a == s ? $(".upcoming-posts .next").addClass("disabled") : $(".upcoming-posts .next").removeClass("disabled"),
            e.paged <= 1 ? $(".upcoming-posts .ajax-numeric-pagination").addClass("hide") : $(".upcoming-posts .ajax-numeric-pagination").removeClass("hide")) : ($(".upcoming-posts .events-list-wrapper").html('<div class="error_display text-center">' + e.message + "</div>").fadeIn("slow"),
            setTimeout(function() {
                $(".error_display").fadeOut("slow")
            }, 3e3))
        }
    })
}
function event_list_history(e, a) {
    jQuery.ajax({
        type: "post",
        url: ajax_variable.ajax_url,
        data: {
            action: "action__event_list_2",
            category: e,
            paged: a
        },
        dataType: "JSON",
        cache: !1,
        beforeSend: function(e) {
            $(".loading-spinner").fadeIn()
        },
        success: function(e) {
            var s;
            $(".loading-spinner").fadeOut(),
            "success" == e.response ? ($(".historical-posts .events-list-wrapper").html(e.message),
            $(".historical-posts .pagination").html(e.pagination),
            jQuery(".historical-posts").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
            jQuery('.historical-posts .ajax-numeric-pagination .pagination[data-page="' + a + '"]').addClass("active"),
            s = $(".historical-posts").find(".ajax-numeric-pagination").data("pages"),
            $("html, body").animate({
                scrollTop: $(".events-list.historical-posts").offset().top - $("header").innerHeight()
            }, 500),
            1 == a ? $(".historical-posts .prev").addClass("disabled") : $(".historical-posts .prev").removeClass("disabled"),
            a == s ? $(".historical-posts .next").addClass("disabled") : $(".historical-posts .next").removeClass("disabled"),
            e.paged <= 1 ? $(".historical-posts .ajax-numeric-pagination").addClass("hide") : $(".historical-posts .ajax-numeric-pagination").removeClass("hide")) : ($(".historical-posts .events-list-wrapper").html('<div class="error_display text-center">' + e.message + "</div>").fadeIn("slow"),
            setTimeout(function() {
                $(".historical-posts .error_display").fadeOut("slow")
            }, 3e3))
        }
    })
}
function career_news(e, s, a) {
    jQuery.ajax({
        type: "post",
        url: ajax_variable.ajax_url,
        data: {
            action: "action__career_news",
            search: e,
            category: s,
            paged: a
        },
        dataType: "JSON",
        cache: !1,
        beforeSend: function(e) {
            $(".loading-spinner").fadeIn()
        },
        success: function(e) {
            var s;
            $(".loading-spinner").fadeOut(),
            "success" == e.response ? ($(".career-posts-section .post-wrap").html(e.message),
            $(".career-posts-section .pagination").html(e.pagination),
            jQuery(".career-posts-section").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
            jQuery('.career-posts-section .ajax-numeric-pagination .pagination[data-page="' + a + '"]').addClass("active"),
            s = $(".career-posts-section").find(".ajax-numeric-pagination").data("pages"),
            1 == a ? $(".career-posts-section .prev").addClass("disabled") : $(".career-posts-section .prev").removeClass("disabled"),
            a == s ? $(".career-posts-section .next").addClass("disabled") : $(".career-posts-section .next").removeClass("disabled"),
            e.paged <= 1 ? $(".career-posts-section .ajax-numeric-pagination").addClass("hide") : $(".career-posts-section .ajax-numeric-pagination").removeClass("hide")) : ($(".career-posts-section .post-wrap").html('<div class="error_display text-center">' + e.message + "</div>").fadeIn("slow"),
            setTimeout(function() {
                $(".error_display").fadeOut("slow")
            }, 3e3))
        }
    })
}
function skateboard_lessons(a) {
    var e = $("#upcoming_event_id").html();
    jQuery.ajax({
        type: "post",
        url: ajax_variable.ajax_url,
        data: {
            action: "action__skateboard_lessons",
            paged: a,
            upcoming_id: e
        },
        dataType: "JSON",
        cache: !1,
        beforeSend: function(e) {
            $(".loading-spinner").fadeIn()
        },
        success: function(e) {
            var s;
            $(".loading-spinner").fadeOut(),
            "success" == e.response ? ($(".skateboard-lessons-section .lessons-part .post-wrap").html(e.message),
            $(".skateboard-lessons-section .pagination").html(e.pagination),
            jQuery(".skateboard-lessons-section").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
            jQuery('.skateboard-lessons-section .ajax-numeric-pagination .pagination[data-page="' + a + '"]').addClass("active"),
            s = $(".skateboard-lessons-section").find(".ajax-numeric-pagination").data("pages"),
            1 == a ? $(".skateboard-lessons-section .prev").addClass("disabled") : $(".skateboard-lessons-section .prev").removeClass("disabled"),
            a == s ? $(".skateboard-lessons-section .next").addClass("disabled") : $(".skateboard-lessons-section .next").removeClass("disabled"),
            e.paged <= 1 ? $(".skateboard-lessons-section .ajax-numeric-pagination").addClass("hide") : $(".skateboard-lessons-section .ajax-numeric-pagination").removeClass("hide")) : ($(".skateboard-lessons-section .events-list-wrapper").html('<div class="error_display text-center">' + e.message + "</div>").fadeIn("slow"),
            setTimeout(function() {
                $(".skateboard-lessons-section .error_display").fadeOut("slow")
            }, 3e3))
        }
    })
}
function school_search(e) {
    jQuery.ajax({
        type: "post",
        url: ajax_variable.ajax_url,
        data: {
            action: "action__school_search",
            search: e
        },
        dataType: "JSON",
        cache: !1,
        beforeSend: function(e) {
            $(".skateboard-lessons-section .search-result").html('<div class="dot-pulse"></div>'),
            $(".skateboard-lessons-section .search-result").show(),
            $(".skateboard-lessons-section .search-part .dot-pulse").fadeIn()
        },
        success: function(e) {
            $(".skateboard-lessons-section .search-part .dot-pulse").fadeOut(),
            $(".skateboard-lessons-section .search-result").show(),
            "success" == e.response ? $(".skateboard-lessons-section .search-result").html(e.message) : ($(".skateboard-lessons-section .search-result").html('<div class="error_display text-center">' + e.message + "</div>").fadeIn("slow"),
            setTimeout(function() {
                $(".error_display").fadeOut("slow")
            }, 3e3))
        }
    })
}
function event_search(e) {
    jQuery.ajax({
        type: "post",
        url: ajax_variable.ajax_url,
        data: {
            action: "action__event_search",
            search: e
        },
        dataType: "JSON",
        cache: !1,
        beforeSend: function(e) {
            $(".loading-spinner").fadeIn()
        },
        success: function(e) {
            $(".loading-spinner").fadeOut(),
            $(".search-for-skateboarding-events .search-result").show(),
            "success" == e.response ? $(".search-for-skateboarding-events .search-result").html(e.message) : ($(".search-for-skateboarding-events .search-result").html('<div class="error_display text-center">' + e.message + "</div>").fadeIn("slow"),
            setTimeout(function() {
                $(".error_display").fadeOut("slow")
            }, 3e3))
        }
    })
}
function skateshop_directory(a) {
    jQuery.ajax({
        type: "post",
        url: ajax_variable.ajax_url,
        data: {
            action: "action__skateshop_directory",
            paged: a
        },
        dataType: "JSON",
        cache: !1,
        beforeSend: function(e) {
            $(".loading-spinner").fadeIn()
        },
        success: function(e) {
            var s;
            $(".loading-spinner").fadeOut(),
            "success" == e.response ? ($(".skateshop-directory .post-wrap").html(e.message),
            $(".skateshop-directory .pagination").html(e.pagination),
            jQuery(".skateshop-directory").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
            jQuery('.skateshop-directory .ajax-numeric-pagination .pagination[data-page="' + a + '"]').addClass("active"),
            s = $(".skateshop-directory").find(".ajax-numeric-pagination").data("pages"),
            1 == a ? $(".skateshop-directory .prev").addClass("disabled") : $(".skateshop-directory .prev").removeClass("disabled"),
            a == s ? $(".skateshop-directory .next").addClass("disabled") : $(".skateshop-directory .next").removeClass("disabled"),
            e.paged <= 1 ? $(".skateshop-directory .ajax-numeric-pagination").addClass("hide") : $(".skateshop-directory .ajax-numeric-pagination").removeClass("hide")) : ($(".skateshop-directory .events-list-wrapper").html('<div class="error_display text-center">' + e.message + "</div>").fadeIn("slow"),
            setTimeout(function() {
                $(".error_display").fadeOut("slow")
            }, 3e3))
        }
    })
}
function ranking_results(a) {
    jQuery.ajax({
        type: "post",
        url: ajax_variable.ajax_url,
        data: {
            action: "action__ranking_results",
            paged: a
        },
        dataType: "JSON",
        cache: !1,
        beforeSend: function(e) {
            $(".loading-spinner").fadeIn()
        },
        success: function(e) {
            var s;
            $(".loading-spinner").fadeOut(),
            "success" == e.response ? ($(".ranking-results .ranking-list-wrapper").html(e.message),
            $(".ranking-results .pagination").html(e.pagination),
            jQuery(".ranking-results").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
            jQuery('.ranking-results .ajax-numeric-pagination .pagination[data-page="' + a + '"]').addClass("active"),
            s = $(".ranking-results").find(".ajax-numeric-pagination").data("pages"),
            1 == a ? $(".ranking-results .prev").addClass("disabled") : $(".ranking-results .prev").removeClass("disabled"),
            a == s ? $(".ranking-results .next").addClass("disabled") : $(".ranking-results .next").removeClass("disabled"),
            e.paged <= 1 ? $(".ranking-results .ajax-numeric-pagination").addClass("hide") : $(".ranking-results .ajax-numeric-pagination").removeClass("hide")) : ($(".ranking-results .ranking-list-wrapper").html('<div class="error_display text-center">' + e.message + "</div>").fadeIn("slow"),
            setTimeout(function() {
                $(".error_display").fadeOut("slow")
            }, 3e3))
        }
    })
}
$(document).ready(function() {
    $(document).on("click", ".news-posts-section .search-submit", function(e) {
        e.preventDefault();
        search_news(jQuery(this).parent().find("input.search-field").val(), jQuery(".news-banner-section .filter-wrapper .cat-filter option:selected").attr("data-id"), 1)
    }),
    $(document).on("change", ".news-banner-section .filter-wrapper .cat-filter", function(e) {
        e.preventDefault();
        search_news(jQuery(".news-posts-section .top-wrap .search-field").val(), jQuery(this).find("option:selected").attr("data-id"), 1)
    }),
    $(document).on("click", ".news-posts-section .ajax-numeric-pagination .pagination", function(e) {
        e.preventDefault();
        var s, e = jQuery(".news-posts-section .top-wrap .search-field").val(), a = (jQuery(this).parents(".news-posts-section").find(".ajax-numeric-pagination .pagination").removeClass("active"),
        jQuery(this).addClass("active"),
        s = 0 < jQuery(".news-banner-section .filter-wrapper .cat-filter option:selected").length ? jQuery(".news-banner-section .filter-wrapper .cat-filter option:selected").attr("data-id") : "",
        jQuery(this).data("page"));
        1 == a ? $(".news-posts-section .prev").addClass("disabled") : $(".news-posts-section .prev").removeClass("disabled"),
        a == $(".news-posts-section").find(".ajax-numeric-pagination").data("page") ? $(".news-posts-section .next").addClass("disabled") : $(".news-posts-section .next").removeClass("disabled"),
        search_news(e, s, a)
    }),
    $(document).on("click", ".news-posts-section .ajax-numeric-pagination .page-numbers", function(e) {
        var s = jQuery(".news-posts-section .top-wrap .search-field").val()
          , a = (e.preventDefault(),
        e = 0 < jQuery(".news-banner-section .filter-wrapper .cat-filter option:selected").length ? jQuery(".news-banner-section .filter-wrapper .cat-filter option:selected").attr("data-id") : "",
        parseInt(jQuery(".news-posts-section .ajax-numeric-pagination .pagination.active").attr("data-page")))
          , a = (pageNumber = $(this).hasClass("prev") ? a - 1 : a + 1,
        $(".news-posts-section").find(".ajax-numeric-pagination").data("pages"));
        1 == pageNumber ? $(".news-posts-section .prev").addClass("disabled") : $(".news-posts-section .prev").removeClass("disabled"),
        pageNumber == a ? $(".news-posts-section .next").addClass("disabled") : $(".news-posts-section .next").removeClass("disabled"),
        jQuery(this).parents(".news-posts-section").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
        jQuery('.news-posts-section .ajax-numeric-pagination .pagination[data-page="' + pageNumber + '"]').addClass("active"),
        search_news(s, e, pageNumber)
    });
    var t = 1
      , a = ($(document).on("click", ".blog-posts-section .search-submit", function(e) {
        e.preventDefault();
        search_blog(jQuery(this).parent().find("input.search-field").val(), jQuery(".blog-posts-section .cat-filter option:selected").attr("data-id"), 1)
    }),
    $(document).on("change", ".blog-posts-section .cat-filter", function(e) {
        e.preventDefault();
        search_blog(jQuery(".blog-posts-section .top-wrap .search-field").val(), jQuery(this).find("option:selected").attr("data-id"), 1)
    }),
    $(document).on("click", ".blog-posts-section .ajax-numeric-pagination .pagination", function(e) {
        e.preventDefault();
        var s, e = jQuery(".blog-posts-section .top-wrap .search-field").val(), a = (jQuery(this).parents(".blog-posts-section").find(".ajax-numeric-pagination .pagination").removeClass("active"),
        jQuery(this).addClass("active"),
        s = 0 < jQuery(".blog-posts-section .cat-filter option:selected").length ? jQuery(".blog-posts-section .cat-filter option:selected").attr("data-id") : "",
        jQuery(this).data("page"));
        1 == a ? $(".blog-posts-section .prev").addClass("disabled") : $(".blog-posts-section .prev").removeClass("disabled"),
        a == $(".blog-posts-section").find(".ajax-numeric-pagination").data("page") ? $(".blog-posts-section .next").addClass("disabled") : $(".blog-posts-section .next").removeClass("disabled"),
        search_blog(e, s, a)
    }),
    $(document).on("click", ".blog-posts-section .ajax-numeric-pagination .page-numbers", function(e) {
        var s = jQuery(".blog-posts-section .top-wrap .search-field").val()
          , a = (e.preventDefault(),
        e = 0 < jQuery(".blog-posts-section .cat-filter option:selected").length ? jQuery(".blog-posts-section .cat-filter option:selected").attr("data-id") : "",
        parseInt(jQuery(".blog-posts-section .ajax-numeric-pagination .pagination.active").attr("data-page")))
          , a = (t = $(this).hasClass("prev") ? a - 1 : a + 1,
        $(".blog-posts-section").find(".ajax-numeric-pagination").data("pages"));
        1 == t ? $(".blog-posts-section .prev").addClass("disabled") : $(".blog-posts-section .prev").removeClass("disabled"),
        t == a ? $(".blog-posts-section .next").addClass("disabled") : $(".blog-posts-section .next").removeClass("disabled"),
        jQuery(this).parents(".blog-posts-section").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
        jQuery('.blog-posts-section .ajax-numeric-pagination .pagination[data-page="' + t + '"]').addClass("active"),
        search_blog(s, e, t)
    }),
    1)
      , i = ($(document).on("click", ".upcoming-posts .cat-filter .button", function(e) {
        e.preventDefault(),
        e = jQuery(this).hasClass("active") ? (jQuery(this).removeClass("active"),
        "") : (jQuery(this).parents(".upcoming-posts").find(".cat-filter .button").removeClass("active"),
        jQuery(this).addClass("active"),
        jQuery(this).attr("data-id"));
        jQuery(".upcoming-posts .ajax-numeric-pagination .pagination").removeClass("active"),
        jQuery('.upcoming-posts .ajax-numeric-pagination .pagination[data-page="1').addClass("active"),
        event_list(e, 1)
    }),
    $(document).on("click", ".upcoming-posts .ajax-numeric-pagination .pagination", function(e) {
        e.preventDefault(),
        jQuery(this).parents(".upcoming-posts").find(".ajax-numeric-pagination .pagination").removeClass("active"),
        jQuery(this).addClass("active"),
        e = jQuery(".upcoming-posts .cat-filter .button").hasClass("active") ? jQuery(".upcoming-posts .cat-filter .button.active").attr("data-id") : "";
        var s = jQuery(this).data("page");
        1 == s ? $(".upcoming-posts .prev").addClass("disabled") : $(".upcoming-posts .prev").removeClass("disabled"),
        s == $(".upcoming-posts").find(".ajax-numeric-pagination").data("pages") ? $(".upcoming-posts .next").addClass("disabled") : $(".upcoming-posts .next").removeClass("disabled"),
        event_list(e, s)
    }),
    $(document).on("click", ".upcoming-posts .ajax-numeric-pagination .page-numbers", function(e) {
        e.preventDefault(),
        e = jQuery(".upcoming-posts .cat-filter .button").hasClass("active") ? jQuery(".upcoming-posts .cat-filter .button.active").attr("data-id") : "";
        var s = parseInt(jQuery(".upcoming-posts .ajax-numeric-pagination .pagination.active").attr("data-page"))
          , s = (a = $(this).hasClass("prev") ? s - 1 : s + 1,
        $(".upcoming-posts").find(".ajax-numeric-pagination").data("pages"));
        1 == a ? $(".upcoming-posts .prev").addClass("disabled") : $(".upcoming-posts .prev").removeClass("disabled"),
        a == s ? $(".upcoming-posts .next").addClass("disabled") : $(".upcoming-posts .next").removeClass("disabled"),
        jQuery(this).parents(".upcoming-posts").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
        jQuery('.upcoming-posts .ajax-numeric-pagination .pagination[data-page="' + a + '"]').addClass("active"),
        event_list(e, a)
    }),
    1)
      , s = ($(document).on("click", ".historical-posts .cat-filter .button", function(e) {
        e.preventDefault(),
        e = jQuery(this).hasClass("active") ? (jQuery(this).removeClass("active"),
        "") : (jQuery(this).parents(".historical-posts").find(".cat-filter .button").removeClass("active"),
        jQuery(this).addClass("active"),
        jQuery(this).attr("data-id"));
        jQuery(".historical-posts .ajax-numeric-pagination .pagination").removeClass("active"),
        jQuery('.historical-posts .ajax-numeric-pagination .pagination[data-page="1').addClass("active"),
        event_list_history(e, 1)
    }),
    $(document).on("click", ".historical-posts .ajax-numeric-pagination .pagination", function(e) {
        e.preventDefault(),
        jQuery(this).parents(".historical-posts").find(".ajax-numeric-pagination .pagination").removeClass("active"),
        jQuery(this).addClass("active"),
        e = jQuery(".historical-posts .cat-filter .button").hasClass("active") ? jQuery(".historical-posts .cat-filter .button.active").attr("data-id") : "";
        var s = jQuery(this).data("page")
          , a = $(".historical-posts").find(".ajax-numeric-pagination").data("pages");
        1 == s ? $(".historical-posts .prev").addClass("disabled") : $(".historical-posts .prev").removeClass("disabled"),
        s == a ? $(".historical-posts .next").addClass("disabled") : $(".historical-posts .next").removeClass("disabled"),
        console.log("pagination click = " + s),
        event_list_history(e, s)
    }),
    $(document).on("click", ".historical-posts .ajax-numeric-pagination .page-numbers", function(e) {
        e.preventDefault(),
        e = jQuery(".historical-posts .cat-filter .button").hasClass("active") ? jQuery(".historical-posts .cat-filter .button.active").attr("data-id") : "";
        var s = parseInt(jQuery(".historical-posts .ajax-numeric-pagination .pagination.active").attr("data-page"))
          , s = (i = $(this).hasClass("prev") ? s - 1 : s + 1,
        $(".historical-posts").find(".ajax-numeric-pagination").data("pages"));
        1 == i ? $(".historical-posts .prev").addClass("disabled") : $(".historical-posts .prev").removeClass("disabled"),
        i == s ? $(".historical-posts .next").addClass("disabled") : $(".historical-posts .next").removeClass("disabled"),
        jQuery(this).parents(".historical-posts").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
        jQuery('.historical-posts .ajax-numeric-pagination .pagination[data-page="' + i + '"]').addClass("active"),
        event_list_history(e, i)
    }),
    $(document).on("click", ".skateboard-lessons-section .ajax-numeric-pagination .pagination", function(e) {
        e.preventDefault(),
        jQuery(this).parents(".skateboard-lessons-section").find(".ajax-numeric-pagination .pagination").removeClass("active"),
        jQuery(this).addClass("active");
        e = jQuery(this).data("page");
        1 == e ? $(".skateboard-lessons-section .prev").addClass("disabled") : $(".skateboard-lessons-section .prev").removeClass("disabled"),
        e == $(".skateboard-lessons-section").find(".ajax-numeric-pagination").data("pages") ? $(".skateboard-lessons-section .next").addClass("disabled") : $(".skateboard-lessons-section .next").removeClass("disabled"),
        skateboard_lessons(e)
    }),
    $(document).on("click", ".skateboard-lessons-section .ajax-numeric-pagination .page-numbers", function(e) {
        e.preventDefault();
        e = parseInt(jQuery(".skateboard-lessons-section .ajax-numeric-pagination .pagination.active").attr("data-page")),
        pageNumber4 = $(this).hasClass("prev") ? e - 1 : e + 1,
        e = $(".skateboard-lessons-section").find(".ajax-numeric-pagination").data("pages");
        1 == pageNumber4 ? $(".skateboard-lessons-section .prev").addClass("disabled") : $(".skateboard-lessons-section .prev").removeClass("disabled"),
        pageNumber4 == e ? $(".skateboard-lessons-section .next").addClass("disabled") : $(".skateboard-lessons-section .next").removeClass("disabled"),
        jQuery(this).parents(".skateboard-lessons-section").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
        jQuery('.skateboard-lessons-section .ajax-numeric-pagination .pagination[data-page="' + pageNumber4 + '"]').addClass("active"),
        skateboard_lessons(pageNumber4)
    }),
    $(".skateboard-lessons-section .search-part .form-wrap form"))
      , n = ($(document).on("click", ".skateboard-lessons-section .search-submit", function(e) {
        e.preventDefault(),
        school_search(jQuery(this).parent().find("input.search-field").val())
    }),
    $(".skateboard-lessons-section .search-part .form-wrap form .search-field").on("keyup", function() {
        var e = $(this).val().trim();
        3 <= e.length && school_search(e = jQuery(this).val()),
        0 == e.length && school_search(e = "")
    }),
    $(document).mouseup(function(e) {
        s.is(e.target) || 0 !== s.has(e.target).length || $(".skateboard-lessons-section .search-result").hide()
    }),
    1)
      , s = ($(document).on("click", ".career-posts-section .search-submit", function(e) {
        e.preventDefault();
        career_news(jQuery(this).parents(".career-posts-section").find("input.search-field").val(), 0 < jQuery(".career-posts-section .filter-part .cat-filter option:selected").length ? jQuery(".career-posts-section .filter-part .cat-filter option:selected").attr("data-id") : "", n = 1)
    }),
    $(document).on("change", ".career-posts-section .filter-part .dropdown select", function(e) {
        e.preventDefault(),
        career_news(jQuery(".career-posts-section .top-wrap .search-field").val(), jQuery(this).find("option:selected").attr("data-id"), n = 1)
    }),
    $(document).on("click", ".career-posts-section .ajax-numeric-pagination .pagination", function(e) {
        e.preventDefault();
        var s, e = jQuery(".career-posts-section").find("input.search-field").val(), a = (jQuery(this).parents(".career-posts-section").find(".ajax-numeric-pagination .pagination").removeClass("active"),
        jQuery(this).addClass("active"),
        s = 0 < jQuery(".career-posts-section .filter-part .cat-filter option:selected").length ? jQuery(".career-posts-section .filter-part .cat-filter option:selected").attr("data-id") : "",
        jQuery(this).data("page")), t = $(".career-posts-section").find(".ajax-numeric-pagination").data("pages");
        1 == a ? $(".career-posts-section .prev").addClass("disabled") : $(".career-posts-section .prev").removeClass("disabled"),
        a == t ? $(".career-posts-section .next").addClass("disabled") : $(".career-posts-section .next").removeClass("disabled"),
        career_news(e, s, a)
    }),
    $(document).on("click", ".career-posts-section .ajax-numeric-pagination .page-numbers", function(e) {
        var s = jQuery(".career-posts-section").find("input.search-field").val()
          , a = (e.preventDefault(),
        e = 0 < jQuery(".career-posts-section .filter-part .cat-filter option:selected").length ? jQuery(".career-posts-section .filter-part .cat-filter option:selected").attr("data-id") : "",
        parseInt(jQuery(".career-posts-section .ajax-numeric-pagination .pagination.active").attr("data-page")))
          , a = (n = $(this).hasClass("prev") ? a - 1 : a + 1,
        $(".career-posts-section").find(".ajax-numeric-pagination").data("pages"));
        1 == n ? $(".career-posts-section .prev").addClass("disabled") : $(".career-posts-section .prev").removeClass("disabled"),
        n == a ? $(".career-posts-section .next").addClass("disabled") : $(".career-posts-section .next").removeClass("disabled"),
        jQuery(this).parents(".career-posts-section").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
        jQuery('.career-posts-section .ajax-numeric-pagination .pagination[data-page="' + n + '"]').addClass("active"),
        career_news(s, e, n)
    }),
    $(".search-for-skateboarding-events .search-part .form-wrap form"))
      , o = ($(document).on("click", ".search-for-skateboarding-events .search-submit", function(e) {
        e.preventDefault(),
        event_search(jQuery(this).parent().find("input.search-field").val())
    }),
    $(document).mouseup(function(e) {
        s.is(e.target) || 0 !== s.has(e.target).length || $(".search-for-skateboarding-events .search-result").hide()
    }),
    $(".skateshop-directory").length && $(document).on("click", ".skateshop-directory .map-ajax", function(e) {
        var s = $("header").outerHeight();
        $("html, body").animate({
            scrollTop: $(".skateshop-directory .iframe-inner").offset().top - s
        }, 100)
    }),
    1)
      , r = ($(document).on("click", ".skateshop-directory .ajax-numeric-pagination .pagination", function(e) {
        e.preventDefault(),
        jQuery(this).parents(".skateshop-directory").find(".ajax-numeric-pagination .pagination").removeClass("active"),
        jQuery(this).addClass("active");
        e = jQuery(this).data("page");
        1 == e ? $(".skateshop-directory .prev").addClass("disabled") : $(".skateshop-directory .prev").removeClass("disabled"),
        e == $(".skateshop-directory").find(".ajax-numeric-pagination").data("pages") ? $(".skateshop-directory .next").addClass("disabled") : $(".skateshop-directory .next").removeClass("disabled"),
        skateshop_directory(e)
    }),
    $(document).on("click", ".skateshop-directory .ajax-numeric-pagination .page-numbers", function(e) {
        e.preventDefault();
        e = parseInt(jQuery(".skateshop-directory .ajax-numeric-pagination .pagination.active").attr("data-page")),
        o = $(this).hasClass("prev") ? e - 1 : e + 1,
        e = $(".skateshop-directory").find(".ajax-numeric-pagination").data("pages");
        1 == o ? $(".skateshop-directory .prev").addClass("disabled") : $(".skateshop-directory .prev").removeClass("disabled"),
        o == e ? $(".skateshop-directory .next").addClass("disabled") : $(".skateshop-directory .next").removeClass("disabled"),
        jQuery(this).parents(".skateshop-directory").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
        jQuery('.skateshop-directory .ajax-numeric-pagination .pagination[data-page="' + o + '"]').addClass("active"),
        skateshop_directory(o)
    }),
    1);
    $(document).on("click", ".ranking-results .ajax-numeric-pagination .pagination", function(e) {
        e.preventDefault(),
        jQuery(this).parents(".ranking-results").find(".ajax-numeric-pagination .pagination").removeClass("active"),
        jQuery(this).addClass("active");
        e = jQuery(this).data("page");
        1 == e ? $(".ranking-results .prev").addClass("disabled") : $(".ranking-results .prev").removeClass("disabled"),
        e == $(".ranking-results").find(".ajax-numeric-pagination").data("pages") ? $(".ranking-results .next").addClass("disabled") : $(".ranking-results .next").removeClass("disabled"),
        ranking_results(e)
    }),
    $(document).on("click", ".ranking-results .ajax-numeric-pagination .page-numbers", function(e) {
        e.preventDefault();
        e = parseInt(jQuery(".ranking-results .ajax-numeric-pagination .pagination.active").attr("data-page")),
        r = $(this).hasClass("prev") ? e - 1 : e + 1,
        e = $(".ranking-results").find(".ajax-numeric-pagination").data("pages");
        1 == r ? $(".ranking-results .prev").addClass("disabled") : $(".ranking-results .prev").removeClass("disabled"),
        r == e ? $(".ranking-results .next").addClass("disabled") : $(".ranking-results .next").removeClass("disabled"),
        jQuery(this).parents(".ranking-results").find(".ajax-numeric-pagination .pagination ").removeClass("active"),
        jQuery('.ranking-results .ajax-numeric-pagination .pagination[data-page="' + r + '"]').addClass("active"),
        ranking_results(r)
    })
}),
function(n) {
    n.fn.visible = function(e) {
        var s = n(this)
          , a = n(window)
          , t = a.scrollTop()
          , a = t + a.height()
          , i = s.offset().top
          , s = i + s.height();
        return (!0 === e ? i : s) <= a && t <= (!0 === e ? s : i)
    }
}(jQuery);
var win = $(window)
  , allMods = $(".module");

function white_pattern_adjust() {
    var e, s = $(".has-white-bg");
    s.length && (e = $(".has-white-bg").first().offset().top,
    s = s.toArray().reduce(function(e, s) {
        return e + $(s).outerHeight(!0)
    }, 0),
    $(".pattern-white").height(s).offset({
        top: e
    }))
}

function matchDivHeightsInSection(e) {
    const s = e.querySelectorAll(".match-height-child");
    let a = 0;
    s.forEach(e => {
        e.style.minHeight = "auto"
    }
    ),
    s.forEach(e => {
        e = e.clientHeight;
        e > a && (a = e)
    }
    ),
    s.forEach(e => {
        e.style.minHeight = a + "px"
    }
    ),
    console.log("maxHeight =" + a + "px")
}

function matchDivHeightsOnLoadAndResize() {
    const e = document.querySelectorAll(".match-height-parent");
    e.forEach(e => {
        matchDivHeightsInSection(e)
    }
    ),
    console.log("Match Height Run")
}
function scroll_animation() {
    $(".has-animation").length && $(".has-animation").each(function() {
        var e = $(window).scrollTop()
          , s = $(window).height();
        $(this).offset().top <= e + s && $(this).addClass("animate")
    })
}
allMods.each(function(e, s) {
    (s = $(s)).visible(!0) && s.addClass("already-visible")
}),
win.scroll(function(e) {
    allMods.each(function(e, s) {
        (s = $(s)).visible(!0) && s.addClass("come-in")
    })
}),
$(".category-filter-dropdown").on("change", function() {
    $("#filter-blog").submit()
}),
$("#search-blog").on("keyup search", function() {
    var e = $(this).val().toLowerCase();
    $("#response-blog .post").filter(function() {
        $(this).toggle(-1 < $(this).find("h3").text().toLowerCase().indexOf(e)),
        0 == $("#response-blog").children(":visible").length ? $(".no-results").addClass("visible") : $(".no-results").removeClass("visible")
    })
}),
$("#filter-blog").submit(function() {
    var e = $("#filter-blog")
      , s = ($.ajax({
        url: e.attr("action"),
        data: e.serialize(),
        type: e.attr("method"),
        success: function(e) {
            $("#response-blog").html(e)
        }
    }),
    $("#search-blog").val().toLowerCase());
    return $("#response-blog .post").filter(function() {
        $("#response-blog .post").toggle(-1 < $("#response-blog .post").find("h3").text().toLowerCase().indexOf(s))
    }),
    !1
}),
$(document).ready(function() {
    $('a[href*="#"]').not('[href="#top"]').not('[href="#0"]').click(function(e) {
        var s;
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname && (s = (s = $(this.hash)).length ? s : $("[name=" + this.hash.slice(1) + "]")).length && (e.preventDefault(),
        $("html, body").animate({
            scrollTop: s.offset().top + -175
        }, 1e3, function() {
            var e = $(s);
            if (e.focus(),
            e.is(":focus"))
                return !1;
            e.attr("tabindex", "-1"),
            e.focus()
        }))
    }),
    $(document).on("click", ".right-menu-wrapper .menu-toggle", function(e) {
        $(this).parent().parent().hasClass("active") ? ($(this).parent().parent().removeClass("active"),
        $(this).removeClass("active")) : ($(this).parent().parent().addClass("active"),
        $(this).addClass("active"))
    }),
    $(".faqs-section").each(function() {
        $(this).find(".faqs-block:first").addClass("active"),
        $(this).find(".faqs-block:first").find(".faq-content").slideDown()
    }),
    $(".faqs-section").length && $(".faq-title").click(function() {
        $(this).parent(".faqs-block").hasClass("active") ? ($(this).parent(".faqs-block").stop().removeClass("active"),
        $(this).next(".faq-content").stop().slideUp()) : ($(this).parents(".faqs-section").find(".faqs-block").stop().removeClass("active"),
        $(this).parents(".faqs-section").find(".faq-content").stop().slideUp(),
        $(this).parent(".faqs-block").stop().addClass("active"),
        $(this).next(".faq-content").stop().slideDown())
    }),
    $('.variable-items-wrapper[aria-label="Color"]').length && ($('.variable-items-wrapper[aria-label="Color"]').after('<span class="selected-color"></span>'),
    $(".selected-color").text($('.variable-items-wrapper[aria-label="Color"] li.selected').data("wvstooltip")),
    $('.variable-items-wrapper[aria-label="Color"] li').click(function() {
        var e = $(this).data("wvstooltip");
        $(".selected-color").text(e)
    })),
    $(".product-accordion").length && $(".accordion-title").click(function() {
        $(this).hasClass("active") ? ($(this).stop().removeClass("active"),
        $(this).next(".accordion-desc").stop().slideUp()) : ($(this).stop().addClass("active"),
        $(this).next(".accordion-desc").stop().slideDown())
    }),
    $(document).on("click", ".woocommerce-message", function(e) {
        const s = $(".woocommerce-message");
        var a = s.find(".woocommerce-message .button");
        $(e.target).is(a) || s.hide()
    });
    var e = $("header");
    50 < $(window).scrollTop() ? e.addClass("blurred") : e.removeClass("blurred"),
    $(".faqs-section").length && $(".faqs-section .button").on("click", function() {
        var a = $(".input-search").val().trim().toLowerCase();
        "" === a ? $(".faqs-section .faqs-block").show() : $(".faqs-section .faqs-block").each(function() {
            var e = $(this).find(".faq-title").text().trim().toLowerCase()
              , s = $(this).find(".faq-content").text().trim().toLowerCase();
            e.includes(a) || s.includes(a) ? $(this).show() : $(this).hide()
        })
    }),
    $(".event-inner").length && (1024 < $(window).width() ? $(".event-inner").hover(function() {
        var e = $(this).data("ind");
        $(".posts-inner-wrapper .img-wrap").stop(!0, !0).fadeOut(),
        $(".posts-inner-wrapper").find(".img-wrap").stop(!0, !0).eq(e).fadeIn()
    }, function() {
        $(".posts-inner-wrapper .img-wrap").stop(!0, !0).fadeOut(),
        $(".posts-inner-wrapper").find(".img-wrap").eq(0).stop(!0, !0).fadeIn()
    }) : $(".home-hero-banner-section .event-posts-wrapper").on("afterChange", function(e, s, a) {
        $(".event-inner").each(function() {
            var e;
            $(this).hasClass("slick-current") && (e = $(this).data("ind"),
            console.log(e),
            $(".posts-inner-wrapper .img-wrap").fadeOut(),
            $(".posts-inner-wrapper").find(".img-wrap").eq(e).fadeIn())
        })
    }))
}),
$(window).on("load", function() {
    AOS.init(),
    scroll_animation(),
    $(".membership-list .membership-wrap").length && (e = $(window).width(),
    $(".membership-list .membership-wrap").css("--width", e + "px")),
    $(".quantity .qty").length && ($(document).on("click", ".qty-up", function() {
        var e = $(this).closest(".quantity").find(".qty")
          , s = parseInt(e.val());
        !isNaN(1e3) && 1e3 <= s || (e.val(s + 1),
        $("[name='update_cart']").removeAttr("disabled"),
        $("[name='update_cart']").trigger("click"))
    }),
    $(document).on("click", ".qty-down", function() {
        var e = $(this).closest(".quantity").find(".qty")
          , s = parseInt(e.val())
          , a = parseInt(e.attr("min"));
        !isNaN(a) && s <= a || (e.val(s - 1),
        $("[name='update_cart']").removeAttr("disabled"),
        $("[name='update_cart']").trigger("click"))
    }));
    var e = $("header");
    50 < $(window).scrollTop() ? e.addClass("blurred") : e.removeClass("blurred")
}),
$(window).scroll(function() {
    var e = $("header");
    50 < $(window).scrollTop() ? e.addClass("blurred") : e.removeClass("blurred"),
    scroll_animation()
}),
$(window).resize(function() {
    setTimeout(function() {
        white_pattern_adjust(),
        matchDivHeightsOnLoadAndResize()
    }, 100)
}),
AOS.init({
    duration: 650,
    easing: "ease",
    anchorPlacement: "top",
    delay: 0,
    offset: 0,
    once: !0
}),
document.addEventListener("DOMContentLoaded", function() {
    var a = document.querySelector("header");
    document.querySelectorAll(".scroll-team").forEach(function(s) {
        s.addEventListener("click", function() {
            var e = s.getAttribute("data-id")
              , e = document.querySelector('[data-section="' + e + '"]');
            e && (e = e.offsetTop - a.clientHeight,
            window.scrollTo({
                top: e,
                behavior: "smooth"
            }))
        })
    })
}),
window.addEventListener("load", matchDivHeightsOnLoadAndResize),
window.addEventListener("resize", matchDivHeightsOnLoadAndResize),
$(document).ready(function() {
    var t, i;
    $("body.home").length && (i = !(t = ".scroll-snap"),
    $(window).on("wheel mousewheel", function(e) {
        var s, a;
        i || 0 < $(e.target).closest(t).length && (e = e.originalEvent.deltaY || e.originalEvent.wheelDelta,
        50 <= Math.abs(e) && (0 < e ? (a = $(window).scrollTop(),
        (e = $(t).filter(function() {
            return $(this).offset() && $(this).offset().top > a + 1
        }).first()).length ? (i = !0,
        $("html, body").animate({
            scrollTop: e.offset().top
        }, "slow", function() {
            i = !1
        })) : (e = $(t).last().next()).length && (i = !0,
        $("html, body").animate({
            scrollTop: e.offset().top
        }, "slow", function() {
            i = !1
        }))) : (s = $(window).scrollTop(),
        e = $(t).filter(function() {
            return $(this).offset() && $(this).offset().top < s - 1
        }).last(),
        console.log("Current scroll position:", s),
        e.length ? (i = !0,
        $("html, body").animate({
            scrollTop: e.offset().top
        }, "slow", function() {
            i = !1
        })) : (e = $(t).first().prev()).length && (i = !0,
        $("html, body").animate({
            scrollTop: e.offset().top
        }, "slow", function() {
            i = !1
        })))))
    }))
}),
$(document).ready(function() {
    var a, t, i, n, e;
    $(".upcoming-events-slider-section .event-slider-wrapper").length && $(".upcoming-events-slider-section .event-slider-wrapper").each(function() {
        $(this).slick({
            slidesToShow: 4.2,
            infinite: !1,
            variableWidth: !1,
            rows: !1,
            dots: !0,
            arrows: !0,
            customPaging: function(e, s) {
                return '<span class="dot"></span>'
            },
            prevArrow: $(this).parent().find(".left-arrow"),
            nextArrow: $(this).parent().find(".right-arrow"),
            appendDots: $(this).parent().find(".slider-dots"),
            responsive: [{
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    dots: !0
                }
            }, {
                breakpoint: 574,
                settings: {
                    slidesToShow: 1,
                    dots: !0
                }
            }]
        })
    }),
    $(".product-slider-wrapper").length && $(".product-slider-wrapper").each(function() {
        $(this).slick({
            slidesToShow: 3,
            infinite: !1,
            centerMode: !1,
            variableWidth: !1,
            dots: !0,
            arrows: !0,
            customPaging: function(e, s) {
                return '<span class="dot"></span>'
            },
            prevArrow: $(this).parent().find(".left-arrow"),
            nextArrow: $(this).parent().find(".right-arrow"),
            appendDots: $(this).parent().find(".slider-dots"),
            responsive: [{
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    arrows: !0,
                    dots: !0
                }
            }, {
                breakpoint: 576,
                settings: "unslick"
            }]
        })
    }),
    $(".home-hero-banner-section .event-posts-wrapper").length && $(".home-hero-banner-section .event-posts-wrapper").each(function() {
        $(this).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: !0,
            arrows: !1,
            rows: !1,
            dots: !0,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 1600,
                settings: "unslick"
            }]
        })
    }),
    $(".find-skate-school-section .posts-wrapper").length && $(".find-skate-school-section .posts-wrapper").each(function() {
        $(this).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: !0,
            arrows: !1,
            dots: !0,
            rows: !1,
            responsive: [{
                breakpoint: 768,
                settings: "unslick"
            }]
        })
    }),
    $(".news-and-updates-section .grouped-posts").length && $(".news-and-updates-section .grouped-posts").each(function() {
        $(this).slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: !0,
            dots: !0,
            infinite: !0,
            rows: 0,
            responsive: [{
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 641,
                settings: {
                    slidesToShow: 1
                }
            }]
        })
    }),
    4 < $(".team-and-careers-section .team-posts-wrapper .team-posts-inner-wrapper").length && $(".team-and-careers-section .team-posts-wrapper").each(function() {
        $(this).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            mobileFirst: !0,
            rows: !1,
            arrows: !1,
            dots: !0,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }]
        })
    }),
    $(".careers-wrapper .careers-posts-wrapper").length && $(".careers-wrapper .careers-posts-wrapper").each(function() {
        $(this).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: !0,
            rows: !1,
            arrows: !1,
            dots: !0,
            responsive: [{
                breakpoint: 641,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            }]
        })
    }),
    $(".olympic-news .news-wrapper").length && $(".olympic-news .news-wrapper").each(function() {
        $(this).slick({
            variableWidth: !0,
            mobileFirst: !0,
            rows: !1,
            arrows: !0,
            dots: !0,
            infinite: !1,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }]
        })
    }),
    $(".carousel-slider-with-content-section .carousel-wrapper").length && ((i = document.createElement("div")).classList.add("slider__counter"),
    n = function(e, s) {
        a = e.slickCurrentSlide() + 1,
        t = e.slideCount,
        $(i).text(a + " of " + t)
    }
    ,
    $(".carousel-slider-with-content-section  .carousel-wrapper").on("init", function(e, s) {
        $(".carousel-slider-with-content-section .slider-controls").append(i),
        n(s)
    }),
    $(".carousel-slider-with-content-section  .carousel-wrapper").on("afterChange", function(e, s, a) {
        n(s)
    }),
    $(".carousel-slider-with-content-section  .image-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: !0,
        rows: !1,
        arrows: !1,
        dots: !1,
        cssEase: "ease-in-out",
        fade: !0,
        loop: !1,
        asNavFor: ".carousel-slider-with-content-section  .contnet-slider"
    }),
    $(".carousel-slider-with-content-section  .contnet-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: !0,
        rows: !1,
        arrows: !0,
        dots: !1,
        cssEase: "ease-in-out",
        fade: !0,
        loop: !1,
        asNavFor: ".carousel-slider-with-content-section  .image-slider",
        appendArrows: $(".slider-controls"),
        prevArrow: '<div class="prev-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_0_272" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" /></mask><g mask="url(#mask0_0_272)"><path d="M14 18L8 12L14 6L15.4 7.4L10.8 12L15.4 16.6L14 18Z"/></g></svg></div>',
        nextArrow: '<div class="next-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_0_276" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24"/></mask><g mask="url(#mask0_0_276)"><path d="M9.4 18L8 16.6L12.6 12L8 7.4L9.4 6L15.4 12L9.4 18Z"/></g></svg></div>',
        adaptiveHeight: !0
    })),
    $(".carousel-slider-section .gallery-wrapper").each(function() {
        $(this).slick({
            slidesToShow: $(this).data("slide"),
            arrows: !0,
            dots: !0,
            rows: !1,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }]
        })
    }),
    $(".membership-list .membership-wrap").length && (e = $(window).width(),
    $(".membership-list .membership-wrap").css("--width", e + "px"),
    $(".membership-wrap").each(function() {
        $(this).slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            rows: !1,
            dots: !0,
            infinite: !1,
            arrows: !1,
            responsive: [{
                breakpoint: 1023,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 767,
                settings: "unslick"
            }]
        })
    })),
    $(".woocommerce-product-gallery__wrapper").length && $(".woocommerce-product-gallery__wrapper").each(function() {
        $(this).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            rows: !1,
            dots: !0,
            infinite: !1,
            arrows: !0,
            adaptiveHeight: !0
        })
    })
}),
$(window).on("resize", function() {
    var e;
    $(".home-hero-banner-section .event-posts-wrapper").length && $(".home-hero-banner-section .event-posts-wrapper").each(function() {
        $(this).slick("resize")
    }),
    $(".find-skate-school-section .posts-wrapper").length && $(".find-skate-school-section .posts-wrapper").each(function() {
        $(this).slick("resize")
    }),
    $(".product-slider-wrapper").length && $(".product-slider-wrapper").each(function() {
        $(this).slick("resize")
    }),
    $(".find-skate-school-section .posts-wrapper").length && $(".find-skate-school-section .posts-wrapper").each(function() {
        $(this).slick("resize")
    }),
    $(".news-and-updates-section .grouped-posts").length && $(".news-and-updates-section .grouped-posts").each(function() {
        $(this).slick("resize")
    }),
    $(".membership-list .membership-wrap").length && (e = $(window).width(),
    $(".membership-list .membership-wrap").css("--width", e + "px"),
    $(".membership-list .membership-wrap").each(function() {
        $(this).slick("resize")
    }))
})
