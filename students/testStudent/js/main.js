// Это частично мой код, делал еще когда проходили курс по верстке
$(document).ready(function () {

    $("#browse-menu").on("click", function () {
        $("#browse-dropmenu").slideToggle();
    });
    $("#browse-dropmenu").on("mouseleave", function () {
        $(this).slideUp();
    });

    $(".feedback__slick_slider").slick({
        dots: true,
        centerMode: true,
        centerPadding: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $(function () {
        var Accordion = function (el, multiple) {
            this.el = el || {};
            // more then one submenu open?
            this.multiple = multiple || false;

            var dropdownlink = this.el.find('.dropdownlink');
            dropdownlink.on('click',
                    {el: this.el, multiple: this.multiple},
                    this.dropdown);
        };

        Accordion.prototype.dropdown = function (e) {
            var $el = e.data.el,
                    $this = $(this),
                    //this is the ul.submenuItems
                    $next = $this.next();

            $next.slideToggle();
            $this.parent().toggleClass('open');

            if (!e.data.multiple) {
                //show only one menu at the same time
                $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
            }
        };

        var accordion = new Accordion($('.accordeon-menu'), false);
    });
    
    $(function () {
        var AccordionForm = function (el, multiple) {
            this.el = el || {};
            // more then one submenu open?
            this.multiple = multiple || false;

            var dropdownlink = this.el.find('.dropdown__form');
            dropdownlink.on('click',
                    {el: this.el, multiple: this.multiple},
                    this.dropdown);
        };

        AccordionForm.prototype.dropdown = function (e) {
            var $el = e.data.el,
                    $this = $(this),
                    //this is the ul.submenuItems
                    $next = $this.next();

            $next.slideToggle();
            $this.parent().toggleClass('open');

            if (!e.data.multiple) {
                //show only one menu at the same time
                $el.find('.dropdown__item').not($next).slideUp().parent().removeClass('open');
            }
        };

        var accordion = new AccordionForm($('.accordeon__form'), false);
    });

    $("#price_range").slider({
        min: 1,
        max: 1000,
        values: [150, 850],
        range: true,
        stop: function (event, ui) {
            var minPrice = $("#price_range").slider("values", 0);
            var maxPrice = $("#price_range").slider("values", 1);
            $("input#minPrice").val(minPrice);
            $("input#maxPrice").val(maxPrice);
            $("#minResult").empty().append('$' + minPrice);
            $("#maxResult").empty().append('$' + maxPrice);
        },
        slide: function (event, ui) {
            var minPrice = $("#price_range").slider("values", 0);
            var maxPrice = $("#price_range").slider("values", 1);
            $("input#minPrice").val(minPrice);
            $("input#maxPrice").val(maxPrice);
            $("#minResult").empty().append('$' + minPrice);
            $("#maxResult").empty().append('$' + maxPrice);
        }
    });

    $.widget("custom.colorselectmenu", $.ui.selectmenu, {
        _renderButtonItem: function( item ) {
            var buttonItem = $( "<span>", {
                "class": "ui-selectmenu-text"
            });
            this._setText( buttonItem, item.label );
            $(buttonItem).append('<span class="ui-new-icon" style="background: rgb(204, 0, 0);"></span>');
 
            return buttonItem;
        },
        _renderItem: function (ul, item) {
            var li = $("<li>"),
                    wrapper = $("<div>", {text: item.label});

            if (item.disabled) {
                li.addClass("ui-state-disabled");
            }
            
            $("<span>", {
                "class": "ui-icon " + item.element.attr("data-class")
            })
                    .appendTo(wrapper);

            return li.append(wrapper).appendTo(ul);
        }
    });


    $("#filter_sort_by").selectmenu();
    $("#filter_show").selectmenu();
    $("#formSize").selectmenu();
    $("#formColor").colorselectmenu({
        change: function (event, data) {
            var sle = $(document).find('#formColor-button').find('.ui-new-icon');
            sle.css("background", '#' + data.item.value);
        }
    });
    $("#countryAdress").selectmenu();

});