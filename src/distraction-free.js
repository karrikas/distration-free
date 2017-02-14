

(function ( $ ) {

$.fn.distractionFree = function( options ) {

    var settings = $.extend({
        openText: "Distraction free mode",
        closeText: "X",
        fontSize: '1.2em'
    }, options );

    var $container, $close, $open, $layer, $body, $info, $scrollPosition;

    var _init = function($this) {
        $($this).prepend('<a class="df-open-buttom" href="">'+settings.openText+'</a>');
        $open = $($this).find("a.df-open-buttom");

        $open.css({
            "float": "right", 
            "color": "#ccc",
            "font-size": settings.fontSize
        });

        if(!$("body").hasClass("fd-loaded")) {
            $('head').append('<style type="text/css">.df-hide{display: none}</style>');
            $("body").addClass("fd-loaded");
        }

        $open.on("click", function(){
            _start($this);

            return false;
        });
    }

    var _start = function($this) {
        $info = $($this).clone(true);
        $scrollPosition = $("body").scrollTop();

        $("body>*").addClass("df-hide");
        $("body").prepend('<div class="df-container"><a class="df-close-buttom" href="">'+settings.closeText+'</a></div>');

        $container = $("body > div").first();
        $layer = $info.appendTo($container);
        $layer.find(".df-open-buttom").remove();
        $close = $container.children("a");

        $container.css({
            "position": "absolute",
            "top": "0",
            "bottom": "0",
            "left": "0",
            "width": "100%",
            "background-color": "#fff",
            "z-index": "999",
            "padding": "5%"
        });

        $layer.css({
            "max-width": "900px",
            "width": "80%",
            "margin": "0 auto 5% auto"
        });

        $close.css({
            "font-family": "arial",
            "font-size": settings.fontSize,
            "color": "#ccc",
            "position": "fixed",
            "right": "5%"

        });

        $close.on("click", function(){
            $container.remove();
            $("body>*").removeClass("df-hide");
            $(document).scrollTop($scrollPosition);  

            return false;
        });
    }

    return this.each(function() {
        _init(this);
    }); 
};

}( jQuery ));