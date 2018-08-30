// initialize when screen width changes
var isToggled = false;
var width = $(window).width();
var height = $(window).height();
var needScrollRefresh = 0;
var sidePanelMobileWidth = '100%';
var sidePanelMinHeight = 550;
var sidePanelEaseType = 'ease-in-out';
var transitionTime = 300;

function jqUpdateSize() { /* 브라우저 크기가 변할 때 아래와 같은 조작을 한다 */
    // Get the dimensions of the viewport
    var widthUnchanged = true; /* 특정 환경에서는 width가 변할때만 조작을 한다 */
    if (width !== $(window).width()) {
        widthUnchanged = false;
        width = $(window).width();
    }
    height = $(window).height();
    if (width > 768) { // when it becomes tablet or more
        $('[data-scroll]').attr('data-options', '');
        needScrollRefresh = 0;
        // if (isToggled) { // 사이드 패널이 토글된 상태에서 화면 크기가 커질 경우
            $('#logo').css({
                'margin-top': ''
            });
            $('#header').css({
                'position': 'fixed',
                'height': '100%',
                'top': 0
            });
            $('#header, #sidePanelToggle, #homeButton').css({
                '-webkit-transform': '',
                '-ms-transform': '',
                'transform': '',
                'left': ''
            });
            $('#main, #footer').css({
                '-webkit-transform': '',
                '-ms-transform': '',
                'transform': '',
                'min-width': ''
            });
            $('#main, #footer').css({
                'cursor': ''
            });
            isToggled = false;
        // }
        if (height < (sidePanelMinHeight + 1)) {
            // 화면 높이가 지나치게 작아질 경우 사이드 패널을 scrollable하게 만든다.
            // 이때, header의 top과 bottom 사이가 어색하지 않도록 구분선을 추가한다.
            $('#logo').css({
                'margin-top': ($(document).scrollTop() + 25)
            });
            $('#header').css({
                'position': 'absolute',
                'height': $('html').height(),
                'min-height': sidePanelMinHeight
            });
            $('#header .top').css({
                'position': 'relative'
            });
            $('#header .bottom').css({
                'border-top': 'solid 1px rgba(255,255,255,0.05)',
                'box-shadow': '0 -1px 0 0 rgba(0,0,0,0.15)',
                'padding-top': '1em',
                'margin-top': '1em',
                'bottom': 'auto',
                'position': 'relative'
            });
            needScrollRefresh = 1;
        } else { // 사이드 패널이 scrollable할 필요가 없을 때는 원래대로 되돌린다.
            needScrollRefresh = 0;
            $('#logo').css({
                'margin-top': ''
            });
            $('#header').css({
                'position': '',
                'height': '',
                'min-height': ''
            });
            $('#header .top').css({
                'position': ''
            });
            $('#header .bottom').css({
                'border-top': '',
                'box-shadow': '',
                'padding-top': '',
                'margin-top': '',
                'bottom': '',
                'position': ''
            });
        }
    } else if (width <= 768) {
        // 브라우저 크기가 일정 이하로 줄어들면 각종 옵션을 추가한다.
        needScrollRefresh = 0;
        $('#logo').css({
            'margin-top': ''
        });
        $('#header').css({
            'position': '',
            'height': 0,
            'min-height': ''
        });
        $('#header .top').css({
            'position': ''
        });
        $('#header .bottom').css({
            'border-top': '',
            'box-shadow': '',
            'padding-top': '',
            'margin-top': '',
            'bottom': '',
            'position': ''
        });
        $('[data-scroll]').attr('data-options', 'offset: ' + $('#whiteOverlay').height());
        if (isToggled && !widthUnchanged) {
            $('#logo').css({
                'margin-top': ''
            });
            $('#header').css({
                'position': '',
                'min-height': '',
                'height': 0,
                'top':''
            });
            $('#header, #sidePanelToggle, #homeButton').css({
                '-webkit-transform': '',
                '-ms-transform': '',
                'transform': '',
                'left': ''
            });
            $('#main, #footer').css({
                '-webkit-transform': '',
                '-ms-transform': '',
                'transform': '',
                'min-width': ''
            });
            $('#main, #footer').off('click');
            isToggled = false;
        }
        // $('#header').css({
        //     'height': 0
        // });
        $('#main, #footer').css({
            'cursor': '',
            'min-width': ''
        });
        $('#main, #footer').off('click');
        isToggled = false;
    }
    // toggleOff();
}


$(document).ready(function () {
    // 브라우저 크기 변경에 따른 조정과 header scroll refresh가 너무 자주 일어나지 않도록 텀을 둔다
    setTimeout(jqUpdateSize, 500);
    setTimeout(scrollRefreshCurrent, 500);
});

var timer;
$(window).resize(function () {
    // 브라우저 크기가 바뀌는 것을 인식한다.
    clearTimeout(timer);
    timer = setTimeout(jqUpdateSize, 100);
    // it doesn't have to be too fast
});

// Side Panel Toggle
function toggleOff(fast) {
    // 토글 끄는 옵션
    if (isToggled) {
        if (fast == true) {
            $('#header').css({
                'height': 0,
                'top': ''
            });
        }
        else {
            $('#header').transition({
                'height': 0,
                'top': ''
            }, transitionTime, sidePanelEaseType);
        }
        // support low-end devices
        /*document.getElementById("header").setAttribute("style", "'-webkit-transform' : 'translate(0, 0)',	'-ms-transform' : 'translate(0, 0)','transform' : 'translate(0, 0)'");
		 document.getElementById("sidePanelToggle").setAttribute("style", "'-webkit-transform' : 'translate(0, 0)',	'-ms-transform' : 'translate(0, 0)','transform' : 'translate(0, 0)'");
		 document.getElementById("main").setAttribute("style", "'-webkit-transform' : 'translate(0, 0)',	'-ms-transform' : 'translate(0, 0)','transform' : 'translate(0, 0)'");
		 document.getElementById("footer").setAttribute("style", "'-webkit-transform' : 'translate(0, 0)',	'-ms-transform' : 'translate(0, 0)','transform' : 'translate(0, 0)'");
		 $('#header, #sidePanelToggle, #homeButton, #main, #footer').css({
		 '-webkit-transform' : 'translate(0, 0)',
		 '-ms-transform' : 'translate(0, 0)',
		 'transform' : 'translate(0, 0)'
		 });*/
        $('#main, #footer').css({
            'cursor': ''
        });
        $('#main, #footer').off('click');
        isToggled = false;
    }
}


$(document).ready(function () {
    $('#sidePanelToggle').on('click', function () {
        // 토글 버튼을 누를 때 패널을 토글한다.
        if (isToggled) {
            toggleOff();
        } else {
            if (width <= 768) {
                if (height < $('#header .bottom').offset().top + 40 - $(document).scrollTop()) {
                    // needScrollRefresh = 0;
                    $('#logo').css({
                        'margin-top': ''
                    });
                    $('#header').css({
                        'position': 'absolute',
                        'top': $(document).scrollTop(),
                        'min-height': '',
                        'height': 0
                    });
                    $('#header .top').css({
                        'position': ''
                    });
                    $('#header .bottom').css({
                        'border-top': '',
                        'box-shadow': '',
                        'padding-top': '',
                        'margin-top': '',
                        'bottom': '',
                        'position': ''
                    });

                    needScrollRefresh = 2;
                } else {
                    needScrollRefresh = 0;
                    $('#logo').css({
                        'margin-top': ''
                    });
                    $('#header').css({
                        'position': '',
                        'height': 0,
                        'min-height': ''
                    });
                    $('#header .top').css({
                        'position': ''
                    });
                    $('#header .bottom').css({
                        'border-top': '',
                        'box-shadow': '',
                        'padding-top': '',
                        'margin-top': '',
                        'bottom': '',
                        'position': ''
                    });
                }
            }
            // $('#header').css({
            //     'height': 0
            // });
            $('#header').transition({
                'height': $('#header .bottom').offset().top + 40 - $(document).scrollTop()
            }, transitionTime, sidePanelEaseType);
            $('#main, #footer').css({
                'cursor': 'pointer'
                // iOS tweak: iOS only supports click on anywhere if is is touchable;
                // which is pointable with mouse
            });
            isToggled = true;
            $('#main, #footer').click(function () {
                toggleOff();
                return false;
            });
        }

    });
});

function scrollRefresh(anchor) {
    // 외부에서 지정된 id의 anchor로 윈도우를 스크롤해주는 함수
    if (needScrollRefresh == 1) {
        var target = $(anchor);
        target = target.length ? target : $('[name=' + anchor.slice(1) + ']');
        $('#logo').transition({
            marginTop: (target.offset().top + 25)
        }, transitionTime, 'ease');
    }
}

function scrollRefreshCurrent() {
    // header를 현재 위치로 이동시키는 함수.
    // 브라우저 높이가 너무 작을 때 사용
    if (needScrollRefresh == 1) {
        $('#logo').transition({
            marginTop: ($(document).scrollTop() + 25)
        }, transitionTime, 'ease');
    } else if (needScrollRefresh == 2) {
        $('#header').transition({
            'top': $(document).scrollTop()
        }, transitionTime, 'ease');
    }
}

function getIsToggled() {
    // 토글 여부를 외부에서 확인 가능하도록 한다.
    return isToggled;
}

var scrollTimer;
$(window).scroll(function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(scrollRefreshCurrent, 3000);
    // height이 지나치게 작고, 스크롤 후 일정 시간 이상 움직임 없을 시 사이드패널 이동
});