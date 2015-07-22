// 初始化全局库
!function () {
  var e = function (e) {
    this.debug = e, this.log = function (e) { this.debug && console.log(e) }
  };
  Logger = new e(Meteor.settings.deubgLog),
  Meals = new Mongo.Collection("meals"),
  Orders = new Mongo.Collection("orders"),
  Reviews = new Mongo.Collection("reviews"),
  Comments = new Mongo.Collection("comments"),
  Notifications = new Mongo.Collection("notifications"),
  ContactUsMessage = new Mongo.Collection("contactUsMessage"),
  Inbox = new Mongo.Collection("inbox"),
  GType = {
    placeType: ["Private Residency", "Cafe", "Restaurant", "Other", "Studio", "Outdoor"],
    hostingStyle: ["Plated", "Self-served"],
    gender: ["Male", "Female", "Other", "Prefer Not to Tell"],
    notificationType: ["Review", "Request", "Reminder", "Comment"]
  }
}();


!function () {
  !function (e, t, a) {
    "use strict";
    function n(t, f, v) {
      function X() {
        if (gt.initialized) {
          var a = 0, n = Dt.length;
          if (zt.old = e.extend({}, zt),
              bt = mt ? 0 : yt[pt.horizontal ? "width" : "height"](),
              St = It[pt.horizontal ? "width" : "height"](),
              Pt = mt ? t : wt[pt.horizontal ? "outerWidth" : "outerHeight"](),
              Dt.length = 0, zt.start = 0, zt.end = N(Pt - bt, 0), jt) {
            a = qt.length, At = wt.children(pt.itemSelector), qt.length = 0;
            var i = c(wt, pt.horizontal ? "paddingLeft" : "paddingTop"),
                r = c(wt, pt.horizontal ? "paddingRight" : "paddingBottom"),
                s = "border-box" === e(At).css("boxSizing"),
                o = "none" !== At.css("float"), l = 0,
                u = At.length - 1, f; Pt = 0, At.each(function (t, a) {
                  var n = e(a),
                      s = n[pt.horizontal ? "outerWidth" : "outerHeight"](),
                      d = c(n, pt.horizontal ? "marginLeft" : "marginTop"),
                      v = c(n, pt.horizontal ? "marginRight" : "marginBottom"),
                      h = s + d + v, p = !d || !v, g = {};
                  g.el = a, g.size = p ? s : h,
                  g.half = g.size / 2,
                  g.start = Pt + (p ? d : 0),
                  g.center = g.start - q(bt / 2 - g.size / 2),
                  g.end = g.start - bt + g.size, t || (Pt += i),
                  Pt += h, pt.horizontal || o || v && d && t > 0 && (Pt -= O(d, v)),
                  t === u && (g.end += r, Pt += r, l = p ? v : 0),
                  qt.push(g), f = g
                }),
                wt[0].style[pt.horizontal ?
                    "width" : "height"] = (s ? Pt : Pt - i - r) + "px",
                Pt -= l, qt.length ? (zt.start = qt[0][Ft ? "center" : "start"],
                zt.end = Ft ? f.center : Pt > bt ? f.end : zt.start) :
                zt.start = zt.end = 0
          }
          if (zt.center = q(zt.end / 2 + zt.start / 2),
              Q(), Ct.length && St > 0 &&
              (pt.dynamicHandle ? (Bt = zt.start === zt.end ? St : q(St * bt / Pt),
              Bt = d(Bt, pt.minHandleSize, St),
              Ct[0].style[pt.horizontal ? "width" : "height"] = Bt + "px") :
              Bt = Ct[pt.horizontal ? "outerWidth" : "outerHeight"](),
              Tt.end = St - Bt, aa || F()), !mt && bt > 0) {
            var v = zt.start, h = ""; if (jt) e.each(qt, function (e, t) {
              Ft ? Dt.push(t.center) : t.start + t.size > v &&
              v <= zt.end && (v = t.start, Dt.push(v), v += bt, v > zt.end &&
              v < zt.end + bt && Dt.push(zt.end))
            }); else
              for (; v - bt < zt.end;) Dt.push(v), v += bt; if (kt[0] &&
                  n !== Dt.length) {
                for (var p = 0; p < Dt.length; p++)
                  h += pt.pageBuilder.call(gt, p);
                xt = kt.html(h).children(),
                xt.eq(Nt.activePage).addClass(pt.activeClass)
              }
          }
          if (Nt.slideeSize = Pt, Nt.frameSize = bt, Nt.sbSize = St,
              Nt.handleSize = Bt, jt) {
            gt.initialized ?
            (Nt.activeItem >= qt.length || 0 === a && qt.length > 0) &&
            U(Nt.activeItem >= qt.length ? qt.length - 1 : 0, !a) :
            (U(pt.startAt), gt[Mt ? "toCenter" : "toStart"](pt.startAt));
            var g = qt[Nt.activeItem]; Y(Mt && g ? g.center :
                d(zt.dest, zt.start, zt.end))
          }
          else gt.initialized ? Y(d(zt.dest, zt.start, zt.end)) :
              Y(pt.startAt, 1); ht("load")
        }
      }
      function Y(e, t, a) {
        if (jt && ea.released && !a) {
          var n = $(e),
              i = e > zt.start && e < zt.end; Mt ? (i && (e = qt[n.centerItem].center),
              Ft && pt.activateMiddle && U(n.centerItem)) : i &&
              (e = qt[n.firstItem].start)
        }
        ea.init && ea.slidee && pt.elasticBounds ? e > zt.end ?
        e = zt.end + (e - zt.end) / 6 : e < zt.start &&
        (e = zt.start + (e - zt.start) / 6) : e = d(e, zt.start, zt.end),
        Vt.start = +new Date, Vt.time = 0, Vt.from = zt.cur, Vt.to = e,
        Vt.delta = e - zt.cur, Vt.tweesing = ea.tweese || ea.init &&
            !ea.slidee, Vt.immediate = !Vt.tweesing && (t || ea.init &&
            ea.slidee || !pt.speed), ea.tweese = 0, e !== zt.dest &&
        (zt.dest = e, ht("change"), aa || H()), K(), Q(), Z(), M()
      }
      function H() {
        if (gt.initialized) {
          if (!aa)
            return aa = g(H),
            void (ea.released && ht("moveStart"));
          Vt.immediate ? zt.cur = Vt.to : Vt.tweesing ?
          (Vt.tweeseDelta = Vt.to - zt.cur, x(Vt.tweeseDelta) < .1 ?
          zt.cur = Vt.to : zt.cur += Vt.tweeseDelta * (ea.released ? pt.swingSpeed :
              pt.syncSpeed)) : (Vt.time = O(+new Date - Vt.start, pt.speed),
          zt.cur = Vt.from + Vt.delta * jQuery.easing[pt.easing](Vt.time / pt.speed,
              Vt.time, 0, 1, pt.speed)), Vt.to === zt.cur ?
          (zt.cur = Vt.to, ea.tweese = aa = 0) : aa = g(H), ht("move"),
          mt || (m ? wt[0].style[m] = y + (pt.horizontal ? "translateX" : "translateY")
              + "(" + -zt.cur + "px)" : wt[0].style[pt.horizontal ? "left" : "top"] =
              -q(zt.cur) + "px"), !aa && ea.released && ht("moveEnd"), F()
        }
      }
      function F() {
        Ct.length && (Tt.cur = zt.start === zt.end ? 0 :
            ((ea.init && !ea.slidee ? zt.dest : zt.cur) - zt.start) /
            (zt.end - zt.start) * Tt.end, Tt.cur = d(q(Tt.cur), Tt.start, Tt.end),
        Kt.hPos !== Tt.cur && (Kt.hPos = Tt.cur, m ? Ct[0].style[m] = y +
            (pt.horizontal ? "translateX" : "translateY") + "(" + Tt.cur + "px)" :
        Ct[0].style[pt.horizontal ? "left" : "top"] = Tt.cur + "px"))
      } function M() {
        xt[0] && Kt.page !== Nt.activePage && (Kt.page =
            Nt.activePage, xt.removeClass(pt.activeClass).eq(Nt.activePage).
            addClass(pt.activeClass), ht("activePage", Kt.page))
      }
      function j() {
        _t.speed && zt.cur !== (_t.speed > 0 ? zt.end : zt.start)
        || gt.stop(), ra = ea.init ? g(j) : 0, _t.now = +new Date, _t.pos =
            zt.cur + (_t.now - _t.lastTime) / 1e3 * _t.speed, Y(ea.init ?
            _t.pos : q(_t.pos)), ea.init || zt.cur !== zt.dest || ht("moveEnd"),
        _t.lastTime = _t.now
      }
      function L(e, t, n) {
        if ("boolean" === i(t) && (n = t, t = a), t === a)
          Y(zt[e], n);
        else {
          if (Mt && "center" !== e)
            return;
          var r = gt.getPos(t); r && Y(r[e], n, !Mt)
        }
      }
      function R(e) {
        return null != e ? l(e) ? e >= 0 && e < qt.length ? e : -1 : At.index(e) : -1
      }
      function W(e) {
        return R(l(e) && 0 > e ? e + qt.length : e)
      }
      function U(e, t) {
        var a = R(e);
        return !jt || 0 > a ? false : ((Kt.active !== a || t) &&
            (At.eq(Nt.activeItem).removeClass(pt.activeClass),
            At.eq(a).addClass(pt.activeClass), Kt.active = Nt.activeItem = a, Z(),
            ht("active", a)), a)
      }
      function $(e) {
        e = d(l(e) ? e : zt.dest, zt.start, zt.end);
        var t = {}, a = Ft ? 0 : bt / 2; if (!mt)
          for (var n = 0, i = Dt.length; i > n; n++) {
            if (e >= zt.end || n === Dt.length - 1) {
              t.activePage = Dt.length - 1;
              break
            }
            if (e <= Dt[n] + a) {
              t.activePage = n;
              break
            }
          }
        if (jt) {
          for (var r = false, s = false, o = false, c = 0, u = qt.length; u > c; c++)
            if (r === false && e <= qt[c].start + qt[c].half && (r = c), o === false &&
                e <= qt[c].center + qt[c].half && (o = c), c === u - 1 ||
                e <= qt[c].end + qt[c].half) {
              s = c;
              break
            }
          t.firstItem = l(r) ? r : 0, t.centerItem = l(o) ?
            o : t.firstItem, t.lastItem = l(s) ? s : t.centerItem
        }
        return t
      }
      function Q(t) {
        e.extend(Nt, $(t))
      }
      function Z() {
        var e = zt.dest <= zt.start, t = zt.dest >= zt.end, a = e ? 1 : t ? 2 : 3;
        if (Kt.slideePosState !== a && (Kt.slideePosState = a, Zt.is("button,input") &&
            Zt.prop("disabled", e), Gt.is("button,input") && Gt.prop("disabled", t),
            Zt.add(Ut)[e ? "addClass" : "removeClass"](pt.disabledClass),
            Gt.add(Wt)[t ? "addClass" : "removeClass"](pt.disabledClass)),
            Kt.fwdbwdState !== a && ea.released && (Kt.fwdbwdState = a,
            Ut.is("button,input") && Ut.prop("disabled", e), Wt.is("button,input") &&
            Wt.prop("disabled", t)), jt) {
          var n = 0 === Nt.activeItem,
              i = Nt.activeItem >= qt.length - 1, r = n ? 1 : i ? 2 : 3;
          Kt.itemsButtonState !== r && (Kt.itemsButtonState = r,
          $t.is("button,input") && $t.prop("disabled", n),
          Qt.is("button,input") && Qt.prop("disabled", i),
          $t[n ? "addClass" : "removeClass"](pt.disabledClass),
          Qt[i ? "addClass" : "removeClass"](pt.disabledClass))
        }
      }
      function G(e, t, a) {
        if (e = W(e), t = W(t), e > -1 && t > -1 && e !== t && (!a || t !== e - 1) &&
            (a || t !== e + 1)) {
          At.eq(e)[a ? "insertAfter" : "insertBefore"](qt[t].el);
          var n = t > e ? e : a ? t : t - 1, i = e > t ? e : a ? t + 1 : t, r = e > t;
          e === Nt.activeItem ? Kt.active = Nt.activeItem = a ? r ? t + 1 : t : r ?
            t : t - 1 : Nt.activeItem > n && Nt.activeItem < i &&
          (Kt.active = Nt.activeItem += r ? 1 : -1), X()
        }
      }
      function J(e, t) {
        for (var a = 0, n = Jt[e].length; n > a; a++)
          if (Jt[e][a] === t)
            return a;
        return -1
      }
      function K() {
        ea.released && !gt.isPaused && gt.resume()
      }
      function V(e) {
        return q(d(e, Tt.start, Tt.end) / Tt.end * (zt.end - zt.start)) + zt.start
      }
      function _() {
        ea.history[0] = ea.history[1], ea.history[1] = ea.history[2],
        ea.history[2] = ea.history[3], ea.history[3] = ea.delta
      }
      function et(e) {
        ea.released = 0, ea.source = e, ea.slidee = "slidee" === e
      }
      function tt(t) {
        var a = "touchstart" === t.type, n = t.data.source, i = "slidee" === n;
        ea.init || !a && it(t.target) || ("handle" !== n || pt.dragHandle &&
        Tt.start !== Tt.end) && (!i || (a ? pt.touchDragging : pt.mouseDragging &&
        t.which < 2)) && (a || r(t), et(n), ea.init = 0, ea.$source = e(t.target),
        ea.touch = a, ea.pointer = a ? t.originalEvent.touches[0] : t,
        ea.initX = ea.pointer.pageX, ea.initY = ea.pointer.pageY,
        ea.initPos = i ? zt.cur : Tt.cur, ea.start = +new Date,
        ea.time = 0, ea.path = 0, ea.delta = 0, ea.locked = 0,
        ea.history = [0, 0, 0, 0], ea.pathToLock = i ? a ? 30 : 10 : 0, w.on(a ? z : P, at),
        gt.pause(1), (i ? wt : Ct).addClass(pt.draggedClass), ht("moveStart"),
        i && (na = setInterval(_, 10)))
      } function at(e) {
        if (ea.released = "mouseup" === e.type ||
            "touchend" === e.type, ea.pointer = ea.touch ? e.originalEvent[ea.released ?
            "changedTouches" : "touches"][0] : e,
            ea.pathX = ea.pointer.pageX - ea.initX, ea.pathY = ea.pointer.pageY - ea.initY,
            ea.path = D(A(ea.pathX, 2) + A(ea.pathY, 2)), ea.delta = pt.horizontal ?
            ea.pathX : ea.pathY, !ea.init) {
          if (!(pt.horizontal ?
              x(ea.pathX) > x(ea.pathY) : x(ea.pathX) < x(ea.pathY)))
            return nt(); ea.init = 1
        }
        r(e), !ea.locked && ea.path > ea.pathToLock && ea.slidee &&
        (ea.locked = 1,
        ea.$source.on(C, s)), ea.released && (nt(), pt.releaseSwing &&
        ea.slidee && (ea.swing = (ea.delta - ea.history[0]) / 40 * 300,
        ea.delta += ea.swing, ea.tweese = x(ea.swing) > 10)), Y(ea.slidee ?
            q(ea.initPos - ea.delta) : V(ea.initPos + ea.delta))
      }
      function nt() {
        clearInterval(na), w.off(ea.touch ? z : P, at),
            (ea.slidee ? wt : Ct).removeClass(pt.draggedClass),
        setTimeout(function () { ea.$source.off(C, s) }), gt.resume(1),
        zt.cur === zt.dest && ea.init && ht("moveEnd"), ea.init = 0
      }
      function it(t) {
        return ~e.inArray(t.nodeName, B) || e(t).is(pt.interactive)
      }
      function rt() { gt.stop(), w.off("mouseup", rt) }
      function st(e) {
        switch (r(e), this) {
          case Wt[0]:
          case Ut[0]:
            gt.moveBy(Wt.is(this) ? pt.moveBy : -pt.moveBy),
            w.on("mouseup", rt);
            break;
          case $t[0]:
            gt.prev();
            break;
          case Qt[0]:
            gt.next();
            break;
          case Zt[0]:
            gt.prevPage();
            break;
          case Gt[0]:
            gt.nextPage()
        }
      }
      function ot(e) {
        return ta.curDelta = (pt.horizontal ? e.deltaY ||
            e.deltaX : e.deltaY) || -e.wheelDelta, ta.curDelta /= 1 === e.deltaMode ?
            3 : 100, jt ? (k = +new Date, ta.last < k - ta.resetTime &&
            (ta.delta = 0), ta.last = k, ta.delta += ta.curDelta, x(ta.delta) < 1 ?
            ta.finalDelta = 0 : (ta.finalDelta = q(ta.delta / 1), ta.delta %= 1),
            ta.finalDelta) : ta.curDelta
      }
      function lt(e) {
        var t = +new Date;
        if (E + 300 > t)
          return void (E = t);
        if (pt.scrollBy && zt.start !== zt.end) {
          var a = ot(e.originalEvent); (pt.scrollTrap || a > 0 && zt.dest < zt.end ||
          0 > a && zt.dest > zt.start) && r(e, 1), gt.slideBy(pt.scrollBy * a)
        }
      }
      function ct(e) {
        pt.clickBar && e.target === It[0] &&
        (r(e), Y(V((pt.horizontal ? e.pageX - It.offset().left : e.pageY - It.offset().top)
            - Bt / 2)))
      } function dt(e) {
        if (pt.keyboardNavBy)
          switch (e.which) {
            case pt.horizontal ? 37 : 38: r(e),
                gt["pages" === pt.keyboardNavBy ? "prevPage" : "prev"]();
              break;
            case pt.horizontal ? 39 : 40: r(e),
                gt["pages" === pt.keyboardNavBy ? "nextPage" : "next"]()
          }
      } function ut(e) {
        return it(this) ? void e.stopPropagation() :
            void (this.parentNode === wt[0] && gt.activate(this))
      } function ft() {
        this.parentNode === kt[0] && gt.activatePage(xt.index(this))
      } function vt(e) {
        pt.pauseOnHover && gt["mouseenter" === e.type ? "pause" : "resume"](2)
      } function ht(e, t) {
        if (Jt[e]) {
          for (oa = Jt[e].length, T.length = 0, sa = 0; oa > sa; sa++)
            T.push(Jt[e][sa]);
          for (sa = 0; oa > sa; sa++) T[sa].call(gt, e, t)
        }
      }
      var pt = e.extend({}, n.defaults, f),
          gt = this, mt = l(t), yt = e(t), wt = yt.children().eq(0),
          bt = 0, Pt = 0, zt = { start: 0, center: 0, end: 0, cur: 0, dest: 0 },
          It = e(pt.scrollBar).eq(0), Ct = It.children().eq(0), St = 0, Bt = 0,
          Tt = { start: 0, end: 0, cur: 0 }, kt = e(pt.pagesBar), xt = 0, Dt = [],
          At = 0, qt = [], Nt = {
            firstItem: 0, lastItem: 0, centerItem: 0,
            activeItem: -1, activePage: 0
          },
          Ot = new u(yt[0]), Et =
          new u(wt[0]), Xt = new u(It[0]), Yt = new u(Ct[0]),
          Ht = "basic" === pt.itemNav, Ft = "forceCentered" === pt.itemNav,
          Mt = "centered" === pt.itemNav || Ft, jt = !mt && (Ht || Mt || Ft),
          Lt = pt.scrollSource ? e(pt.scrollSource) : yt,
          Rt = pt.dragSource ? e(pt.dragSource) : yt, Wt = e(pt.forward),
          Ut = e(pt.backward), $t = e(pt.prev), Qt = e(pt.next),
          Zt = e(pt.prevPage), Gt = e(pt.nextPage), Jt = {},
          Kt = {}, Vt = {}, _t = {}, ea = { released: 1 },
          ta = { last: 0, delta: 0, resetTime: 200 }, aa = 0,
          na = 0, ia = 0, ra = 0, sa, oa; mt || (t = yt[0]),
          gt.initialized = 0, gt.frame = t, gt.slidee = wt[0],
          gt.pos = zt, gt.rel = Nt, gt.items = qt, gt.pages = Dt,
          gt.isPaused = 0, gt.options = pt, gt.dragging = ea,
          gt.reload = X, gt.getPos = function (e) {
            if (jt) {
              var t = R(e); return -1 !== t ? qt[t] : false
            }
            var a = wt.find(e).eq(0);
            if (a[0]) {
              var n = pt.horizontal ? a.offset().left - wt.offset().left :
                  a.offset().top - wt.offset().top, i = a[pt.horizontal ?
                  "outerWidth" : "outerHeight"]();
              return { start: n, center: n - bt / 2 + i / 2, end: n - bt + i, size: i }
            }
            return false
          }, gt.moveBy = function (e) {
            _t.speed = e, !ea.init && _t.speed && zt.cur !== (_t.speed > 0 ? zt.end :
            zt.start) && (_t.lastTime = +new Date, _t.startPos = zt.cur,
            et("button"), ea.init = 1, ht("moveStart"), p(ra), j())
          }, gt.stop = function () {
            "button" === ea.source && (ea.init = 0, ea.released = 1)
          }, gt.prev = function () {
            gt.activate(Nt.activeItem - 1)
          }, gt.next = function () {
            gt.activate(Nt.activeItem + 1)
          }, gt.prevPage = function () {
            gt.activatePage(Nt.activePage - 1)
          }, gt.nextPage = function () {
            gt.activatePage(Nt.activePage + 1)
          }, gt.slideBy = function (e, t) {
            e && (jt ? gt[Mt ? "toCenter" : "toStart"](d((Mt ? Nt.centerItem :
                Nt.firstItem) + pt.scrollBy * e, 0, qt.length)) : Y(zt.dest + e, t))
          }, gt.slideTo = function (e, t) {
            Y(e, t)
          }, gt.toStart = function (e, t) {
            L("start", e, t)
          }, gt.toEnd = function (e, t) {
            L("end", e, t)
          }, gt.toCenter = function (e, t) {
            L("center", e, t)
          }, gt.getIndex = R,
          gt.activate = function (e, t) {
            var a = U(e);
            pt.smart && a !== false && (Mt ? gt.toCenter(a, t) :
            a >= Nt.lastItem ? gt.toStart(a, t) : a <= Nt.firstItem ? gt.toEnd(a, t) : K())
          }, gt.activatePage = function (e, t) {
            l(e) && Y(Dt[d(e, 0, Dt.length - 1)], t)
          }, gt.resume = function (e) {
            !pt.cycleBy || !pt.cycleInterval ||
                "items" === pt.cycleBy && !qt[0] || e < gt.isPaused ||
            (gt.isPaused = 0, ia ? ia = clearTimeout(ia) : ht("resume"),
            ia = setTimeout(function () {
              switch (ht("cycle"), pt.cycleBy) {
                case "items":
                  gt.activate(Nt.activeItem >= qt.length - 1 ?
                  0 : Nt.activeItem + 1);
                  break;
                case "pages":
                  gt.activatePage(Nt.activePage >= Dt.length - 1 ? 0 :
                      Nt.activePage + 1)
              }
            }, pt.cycleInterval))
          }, gt.pause = function (e) {
            e < gt.isPaused || (gt.isPaused = e || 100, ia &&
            (ia = clearTimeout(ia), ht("pause")))
          }, gt.toggle = function () {
            gt[ia ? "pause" : "resume"]()
          },
          gt.set = function (t, a) {
            e.isPlainObject(t) ? e.extend(pt, t) : pt.hasOwnProperty(t) && (pt[t] = a)
          }, gt.add = function (t, a) {
            var n = e(t); jt ? (null == a || !qt[0] || a >= qt.length ?
            n.appendTo(wt) : qt.length && n.insertBefore(qt[a].el),
            a <= Nt.activeItem && (Kt.active = Nt.activeItem += n.length)) :
            wt.append(n), X()
          }, gt.remove = function (t) {
            if (jt) {
              var a = W(t);
              if (a > -1) {
                At.eq(a).remove();
                var n = a === Nt.activeItem;
                a < Nt.activeItem && (Kt.active = --Nt.activeItem), X(),
                n && (Kt.active = null, gt.activate(Nt.activeItem))
              }
            }
            else e(t).remove(), X()
          }, gt.moveAfter = function (e, t) {
            G(e, t, 1)
          }, gt.moveBefore = function (e, t) {
            G(e, t)
          }, gt.on = function (e, t) {
            if ("object" === i(e))
              for (var a in e)
                e.hasOwnProperty(a) && gt.on(a, e[a]);
            else if ("function" === i(t))
              for (var n = e.split(" "),
                  r = 0, s = n.length;
                  s > r; r++)
                Jt[n[r]] = Jt[n[r]] || [], -1 === J(n[r], t) && Jt[n[r]].push(t);
            else if ("array" === i(t))
              for (var o = 0, l = t.length; l > o; o++) gt.on(e, t[o])
          }, gt.one = function (e, t) {
            function a() { t.apply(gt, arguments), gt.off(e, a) } gt.on(e, a)
          }, gt.off = function (e, t) {
            if (t instanceof Array)
              for (var a = 0, n = t.length; n > a; a++)
                gt.off(e, t[a]);
            else
              for (var i = e.split(" "), r = 0, s = i.length; s > r; r++)
                if (Jt[i[r]] = Jt[i[r]] || [], null == t)
                  Jt[i[r]].length = 0;
                else {
                  var o = J(i[r], t); -1 !== o && Jt[i[r]].splice(o, 1)
                }
          }, gt.destroy = function () {
            return w.add(Lt).add(Ct).add(It).add(kt).add(Wt).add(Ut).add($t).add(Qt).
                add(Zt).add(Gt).unbind("." + h), $t.add(Qt).add(Zt).add(Gt).
                removeClass(pt.disabledClass), At && At.eq(Nt.activeItem).
                removeClass(pt.activeClass), kt.empty(), mt || (yt.unbind("." + h),
                Ot.restore(), Et.restore(), Xt.restore(), Yt.restore(), e.removeData(t, h)),
                qt.length = Dt.length = 0, Kt = {}, gt.initialized = 0, gt
          }, gt.init = function () {
            if (!gt.initialized) {
              gt.on(v);
              var e = ["overflow", "position"],
                  t = ["position", "webkitTransform", "msTransform",
                      "transform", "left", "top", "width", "height"];
              Ot.save.apply(Ot, e), Xt.save.apply(Xt, e),
              Et.save.apply(Et, t), Yt.save.apply(Yt, t);
              var a = Ct; return mt || (a = a.add(wt), yt.css("overflow", "hidden"),
                  m || "static" !== yt.css("position") || yt.css("position", "relative")),
                  m ? y && a.css(m, y) :
                  ("static" === It.css("position") && It.css("position", "relative"),
                  a.css({ position: "absolute" })), pt.forward && Wt.on(S, st),
                  pt.backward && Ut.on(S, st), pt.prev && $t.on(C, st),
                  pt.next && Qt.on(C, st), pt.prevPage && Zt.on(C, st),
                  pt.nextPage && Gt.on(C, st), Lt.on(I, lt), It[0] &&
                  It.on(C, ct),
                  jt && pt.activateOn && yt.on(pt.activateOn + "." + h, "*", ut),
                  kt[0] && pt.activatePageOn && kt.on(pt.activatePageOn + "." + h,
                  "*", ft), Rt.on(b, { source: "slidee" }, tt), Ct && Ct.on(b,
                  { source: "handle" }, tt), w.bind("keydown." + h, dt), mt ||
                  (yt.on("mouseenter." + h + " mouseleave." + h, vt),
                  yt.on("scroll." + h, o)), gt.initialized = 1, X(),
                  pt.cycleBy && !mt && gt[pt.startPaused ? "pause" : "resume"](), gt
            }
          }
    }
    function i(e) {
      return null == e ? String(e) : "object" == typeof e ||
          "function" == typeof e ?
          Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase() ||
          "object" : typeof e
    }
    function r(e, t) {
      e.preventDefault(), t && e.stopPropagation()
    } function s(t) {
      r(t, 1), e(this).off(t.type, s)
    }
    function o() {
      this.scrollLeft = 0, this.scrollTop = 0
    }
    function l(e) {
      return !isNaN(parseFloat(e)) && isFinite(e)
    }
    function c(e, t) {
      return 0 | q(String(e.css(t)).replace(/[^\-0-9.]/g, ""))
    }
    function d(e, t, a) { return t > e ? t : e > a ? a : e }
    function u(e) {
      var t = {};
      return t.style = {}, t.save = function () {
        if (e) {
          for (var a = 0; a < arguments.length; a++)
            t.style[arguments[a]] = e.style[arguments[a]];
          return t
        }
      }, t.restore = function () {
        if (e) {
          for (var a in t.style)
            t.style.hasOwnProperty(a) && (e.style[a] = t.style[a]);
          return t
        }
      },
          t
    }
    var f = "sly", v = "Sly", h = f, p = t.cancelAnimationFrame ||
        t.cancelRequestAnimationFrame,
        g = t.requestAnimationFrame, m, y, w = e(document),
        b = "touchstart." + h + " mousedown." + h, P = "mousemove." +
        h + " mouseup." + h, z = "touchmove." + h + " touchend." + h,
        I = (document.implementation.hasFeature("Event.wheel", "3.0") ?
        "wheel." : "mousewheel.") + h, C = "click." + h, S = "mousedown." + h,
        B = ["INPUT", "SELECT", "BUTTON", "TEXTAREA"], T = [],
        k, x = Math.abs, D = Math.sqrt, A = Math.pow, q = Math.round,
        N = Math.max, O = Math.min, E = 0; w.on(I, function () {
          E = +new Date
        }),
    function (e) {
      function t(e) {
        var t = (new Date).getTime(), n = Math.max(0, 16 - (t - a)),
            i = setTimeout(e, n);
        return a = t, i
      }
      g = e.requestAnimationFrame || e.webkitRequestAnimationFrame || t;
      var a = (new Date).getTime(), n = e.cancelAnimationFrame ||
          e.webkitCancelAnimationFrame || e.clearTimeout;
      p = function (t) {
        n.call(e, t)
      }
    }(window), function () {
      function e(e) {
        for (var n = 0, i = t.length; i > n; n++) {
          var r = t[n] ? t[n] + e.charAt(0).toUpperCase() + e.slice(1) : e;
          if (null != a.style[r])
            return r
        }
      }
      var t = ["", "webkit", "moz", "ms", "o"],
          a = document.createElement("div");
      m = e("transform"), y = e("perspective") ? "translateZ(0) " : ""
    }(),
    t[v] = n, e.fn[f] = function (t, a) {
      var r, s;
      return e.isPlainObject(t) || (("string" === i(t) || t === false) &&
          (r = t === false ? "destroy" : t,
          s = Array.prototype.slice.call(arguments, 1)), t = {}),
          this.each(function (i, o) {
            var l = e.data(o, h);
            l || r ? l && r && l[r] && l[r].apply(l, s) :
            l = e.data(o, h,
                new n(o, t, a).init())
          })
    },
    n.defaults = {
      horizontal: false, itemNav: null, itemSelector: null,
      smart: false, activateOn: null, activateMiddle: false, scrollSource: null,
      scrollBy: 0, scrollHijack: 300, scrollTrap: false, dragSource: null,
      mouseDragging: false, touchDragging: false, releaseSwing: false, swingSpeed: .2,
      elasticBounds: false, interactive: null, scrollBar: null, dragHandle: false,
      dynamicHandle: false, minHandleSize: 50, clickBar: false, syncSpeed: .5, pagesBar: null,
      activatePageOn: null, pageBuilder: function (e) { return "<li>" + (e + 1) + "</li>" },
      forward: null, backward: null, prev: null, next: null, prevPage: null, nextPage: null,
      cycleBy: null, cycleInterval: 5e3, pauseOnHover: false, startPaused: false, moveBy: 300,
      speed: 0, easing: "swing", startAt: 0, keyboardNavBy: null,
      draggedClass: "dragged", activeClass: "active", disabledClass: "disabled"
    }
  }(jQuery, window)
}();

!function () {
  var e = function (e) {
    var t = [], r = e.name, n = e.recipient, o = e.line1, i = e.city,
        s = e.state, a = e.zipCode, u = e.country;
    return r ||
            t.push("Name on the bank account cannot be empty"),
        n || t.push("Recipient cannot be empty"), o ||
        t.push("Address cannot be empty"), i || t.push("City cannot be empty"),
        s || t.push("State cannot be empty"), a || t.push("Zip Code cannot be empty"),
        u || t.push("Country cannot be empty"), t
  },
  t = function (e, t, r, n, o) {
    var i = [],
        s = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return s.test(e) || i.push("Email is not valid"),
        t.length < 8 || !/^(?=.*[a-z])(?=.*[0-9])/.test(t) ?
        i.push("Password length must be at least 8 and includes letter and number") :
        t != r && i.push("Passwords do not match"),
        (0 == n.length || 0 == o.length) &&
        i.push("First name/last name cannot be empty"),
        0 == n.length || 0 == o.length || /^[a-zA-Z \-]+$/.test(n) &&
        /^[a-zA-Z \-]+$/.test(o) ||
        i.push("First name/last name should only contains alphabets/dashes"), i
  },
  r = function (e) {
    var t = [], r = new Date; return e.title && 0 != e.title.length ||
        t.push("Meal title cannot be empty"), e.summary ||
        t.push("Summary cannot be empty"), (isNaN(parseFloat(e.pricePerGuest)) ||
        parseFloat(e.pricePerGuest) < 0) && t.push("Price is invalid or too low"),
        0 == e.pricePerGuest || e.pricePerGuest || t.push("Price cannot be empty"),
        (isNaN(parseInt(e.maxParty)) || parseInt(e.maxParty) < 1) &&
        t.push("Max number of guests is invalid"), e.maxParty ||
        t.push("Max number of guests cannot be empty"),
        e.time && e.time.deadline || t.push("Deadline cannot be empty"),
        (!e.time || e.time.deadline < r) &&
        t.push("Users cannot reserve your event because the deadline has already passed"),
        e.time && e.time.startAt || t.push("Start time of event cannot be empty"),
        e.time.startAt < e.time.deadline &&
        t.push("Deadline should not be later than the start time"),
        e.time && e.time.endAt && e.time.startAt &&
        e.time.endAt <= e.time.startAt &&
        t.push("End time of the event cannot be earlier than the start time - 1"),
        (parseInt(e.placeType) < 0 || parseInt(e.placeType) > 8) &&
        t.push("Event place is invalid"), e.address && e.address.full ||
        t.push("Address cannot be empty"), t
  },
  n = function (e) {
    var t = [], r = e.profile, n = e.emergency;
    if (r.lastName ? /^[a-zA-Z \-]+$/.test(r.lastName) ||
        t.push("Last Name must be alphabet characters only") :
        t.push("Last Name cannot be empty"), r.firstName ?
        /^[a-zA-Z \-]+$/.test(r.firstName) ||
        t.push("First Name must be alphabet characters only") :
        t.push("First Name cannot be empty"), r.gender && (/^[0-3]+$/.test(r.gender) ||
        t.push("Gender input error")), r.birthday) {
      var o = new Date(r.birthday); isNaN(o) ? t.push("Birthday input error") :
      o > new Date && t.push("Birthday must be in the past")
    } return r.phone && !/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(r.phone) &&
        t.push("Phone Number input error"), n.name && !/^[a-zA-Z ]+$/.test(n.name) &&
        t.push("Emergency Contact's Name must be alphabet characters only"), n.email &&
        !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.
        test(n.email) &&
        t.push("Emergency Contact's Email is not a valid email"), t
  },
  o = function (e, t) {
    var r = []; t || r.push("Login is required to comment"),
        e.content && 0 != e.content.length || r.push("Comment cannot be empty");
    var n = Meals.findOne({ _id: e.mealId });
    if (n || r.push("Meal cannot be found"), e.replyToId) {
      n && n.hostId != t && r.push("Must be a host to reply a comment");
      var o = Comments.findOne({ _id: e.replyToId }); o ? o.replied &&
      r.push("Comment has been replied") : r.push("Comment cannot be found")
    }
    else
      n.hostId == t && r.push("Host can only reply");
    return r
  },
  i = function (e, t) {
    var r = [], n = Meals.findOne({ _id: e.mealId }),
        o = n.hostId, i = e.mealId, s = new Date; n ||
    r.push("Meal cannot be found"), (n.time.startAt > s ||
    n.time.endAt && n.time.endAt > s) && r.push("Event has not ended yet");
    var a = new Date(n.time.endAt || n.time.startAt);
    if (a.setDate(a.getDate() + 14), s > a && r.push("The review deadline has passed"),
        n.status < 1 && r.push("Event has not published yet"),
        e.content && 0 != e.content.length ||
        r.push("Experience/impression cannot be empty"),
        e.userToHost) {
      t == o && r.push("You cannot review yourself");
      var u = Orders.findOne({ status: 1, mealId: i, userId: t });
      u || r.push("You can only review if you attends the event");
      var d = Reviews.findOne({ mealId: i, userId: t, userToHost: true });
      d && r.push("You can only review once"), (!e.overallRating ||
      "number" != typeof e.overallRating || e.overallRating > 5 ||
      e.overallRating < 1) && r.push("Overall Rating cannot be found/format is wrong"),
      (!e.communicationRating || "number" != typeof
      e.communicationRating || e.communicationRating > 5 ||
      e.communicationRating < 1) &&
      r.push("Communication Rating cannot be found/format is wrong")
    } else {
      o != t && r.push("User not authorized"), e.userId ||
      r.push("Cannot identify guest [guestId is missing]");
      var u = Orders.findOne({ status: 1, mealId: i, userId: e.userId });
      u ||
      r.push("This user didn't attend your event");
      var d = Reviews.findOne({ mealId: i, userId: t, userToHost: false });
      d && r.push("You can only review once"), (!e.overallRating ||
      "number" != typeof e.overallRating || e.overallRating > 5 || e.overallRating < 1)
      && r.push("Overall Rating cannot be found/format is wrong")
    } return r
  },
  s = function (e) {
    return e.replace(/\w\S*/g, function (e) {
      return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
    })
  },
  a = function (e, r, n, o, i, s) {
    var a = t(e, r, n, o, i);
    return a.length > 0 ? (Logger.log(a),
        s(new Meteor.Error("invalid-params", a.toString()))) :
        (o = o.substr(0, 1).toUpperCase() + o.substr(1),
        i = i.substr(0, 1).toUpperCase() + i.substr(1),
        Accounts.createUser({ email: e, password: r, profile: { firstName: o, lastName: i } },
        s), void 0)
  },
  u = function (e, t, r) {
    Meteor.loginWithPassword(e, t, function (e) {
      return e ? (Logger.log(JSON.stringify(e)), r(e)) : void r()
    })
  },
  d = function (e, t) {
    if (e.userId = t, e.createdAt = new Date, e.replyToId) {
      var r = Comments.findOne({ _id: e.replyToId });
      CreateNotification(3, 1, e.mealId, t, r.userId),
      Comments.update({ _id: e.replyToId }, { $set: { replied: true } }),
      Notifications.update({
        type: 3, subType: 0,
        mealId: e.mealId, toUserId: t, fromUserId: r.userId
      }, { $set: { hidden: true } })
    } else {
      var n = Meals.findOne({ _id: e.mealId });
      CreateNotification(3, 0, e.mealId, t, n.hostId)
    } return Comments.insert(e)
  },
  l = function (e, t) {
    e.hostId = t, e.status = 1, e.numberOfAcceptedGuests = 0,
    e.createdAt = new Date, e.numberOfGuests = 0,
    e.spotsLeft = parseInt(e.maxParty), e.time.zone = -7,
    e.address.full = s(e.address.full); var r = Meteor.wrapAsync(Cloudinary.uploader.upload); try { r(e.cover.org) } catch (n) { e.cover.cloudinaryPublicId = n.public_id } var o = Meals.insert(e), i = new Date(e.time.startAt), a = new Date(e.time.startAt), u = new Date; return i.setDate(i.getDate() - 1), a.setDate(a.getDate() - 3), Queue.add({ command: "create24HoursNotificationForHost('" + o + "');", execute_after: i }), a >= u && Queue.add({ command: "create3DaysNotificationForHost('" + o + "');", execute_after: a }), Queue.add({ command: "createMealEndNotificationForHost('" + o + "');", execute_after: new Date(e.time.endAt || e.time.startAt) }), o
  },
  c = function (e, t, r) {
    var n = r / 111300, o = Math.random(),
        i = Math.random(), s = n * Math.sqrt(o),
        a = 2 * Math.PI * i, u = s * Math.cos(a),
        d = s * Math.sin(a), l = u / Math.cos(e);
    return { lat: e + d, lng: t + l }
  },
  f = function (e) {
    return Meals.find({ _id: e, status: { $ne: 0 } })
  },
  m = function (e) {
    for (var t = 0; t < e.emails.length; t++)
      if (e.emails[t].verified)
        return true;
    return false
  },
  p = function (e) {
    return e.phoneVerification && 1 == e.phoneVerification.status
  },
  h = function () {
    return Meteor.user().idVerification &&
        1 == Meteor.user().idVerification.status
  },
  g = function () {
    for (var e = 0; e < Meteor.user().emails.length; e++)
      if (Meteor.user().emails[e].verified &&
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/.
          test(Meteor.user().emails[e].address))
        return true; return false
  },
  v = function (e) {
    for (var t = {}, r = [], n = e.length, o = 0, i = 0; n > i; i++) {
      var s = e[i]; 1 !== t[s] && (t[s] = 1, r[o++] = s)
    } return r
  };
  if (Array.prototype.remove = function () {
      for (var e, t = arguments, r = t.length, n; r && this.length;)
      for (e = t[--r]; -1 !== (n = this.indexOf(e)) ;)
      this.splice(n, 1);
      return this
  },
      Meteor.methods({
    addPayoutAddress: function (e) {
      return W(this.userId, e)
  },
    getEmailList: function (e) { return j(e) },
    getCommonEvents: function (e) {
      return J(this.userId, e)
  },
    messageRead: function (e) {
      return Y(this.userId, e)
  }, sendIndividualMessage: function (e, t) {
      return z(this.userId, e, t)
  }, updateMeal: function (e, t) {
      Logger.log("Updating temp meal: " + e),
      Logger.log("Fields: " + JSON.stringify(t)),
      Meals.update({ _id: e }, { $set: t })
  },
    updateThumnail: function () {
      for 
        (
      var e = Meteor.users.find({
"profile.thumbnail.org":
      { $exists: true }, "profile.thumbnail.cloudinaryPublicId": null
  }).toArray(),
      t = Meteor.wrapAsync(Cloudinary.uploader.upload), r = 0; r < e.length; r++)
      try { t(e[r].profile.thumbnail.org) }
      catch (n) {
Meteor.users.update({ _id: e[r]._id },
      { $set: { "profile.thumbnail.cloudinaryPublicId": n.public_id } })
  }
  },
    becomeAHost: function () {
      b(this.userId)
  }, newContactUsMessage: function (e, t, r) {
      ContactUsMessage.insert({ name: e, email: t, message: r, createdAt: new Date }),
      Email.send({
    to: "service@plenry.com", from: "Plenry <automated@plenry.com>",
    subject: "New Contact Us Message", text: "Name: " + e + "\nEmail: " +
      t + "\nMessage: " + r
  })
  }, newMeal: function (e) {
      if (Logger.log("Creating new meal..."), !this.userId)
      throw new Meteor.Error("not-authenticated", "User must log in to create an event");
      var t = r(e);
      if (0 == t.length) {
      if (this.isSimulation)
      return;
      var n = new GeoCoder, o;
      try { o = n.geocode(e.address.full) }
      catch (i) {
      throw Logger.log("Geocoder error:" + JSON.stringify(i)),
      new Meteor.Error("location-error", "We cannot locate your address; please provide an accurate address")
  }
      if (Logger.log("Geocoder result:" + JSON.stringify(o)), 1 != o.length)
      throw new Meteor.Error("location-error", "We cannot locate your address; please provide an accurate address");
      if (e.location = {}, e.location.lat = o[0].latitude, e.location.lng = o[0].longitude,
      e.address.city = o[0].city, e.address.state = o[0].stateCode, "CA" != e.address.state)
      throw new Meteor.Error("location-error", "Sorry we do not support city outside San Francisco Bay Area now");
      var s = c(e.location.lat, e.location.lng, 500);
      return e.location.latApprox = s.lat, e.location.lngApprox = s.lng,
      Logger.log("Geocode result: " +
      JSON.stringify(o)), l(e, this.userId)
  }
      throw new Meteor.Error("invalid-params", t.toString())
  }, editMeal: function (e, t) {
      if (!this.userId)
      throw new Meteor.Error("not-authenticated", "User must log in to create an event");
      var n = Meals.findOne({ _id: e, "time.startAt": { $gt: new Date } });
      if (!n)
      throw new Meteor.Error("not-permitted", "Cannot edit a past event");
      var o = this.userId == n.hostId; if (!o)
      throw new Meteor.Error("not-authenticated",
      "User must be the host of the event to edit the event");
      t.pricePerGuest = n.pricePerGuest;
      var i = r(t); if (0 == i.length) {
if (this.isSimulation)
      return;
      var s = new GeoCoder, a;
      try { a = s.geocode(t.address.full) }
      catch (u) {
      throw Logger.log("Geocoder error:" + JSON.stringify(u)),
      new Meteor.Error("location-error",
      "We cannot locate your address; please provide an accurate address")
  } if (Logger.log("Geocoder result:" + JSON.stringify(a)), 1 != a.length)
      throw new Meteor.Error("location-error",
      "We cannot locate your address; please provide an accurate address");
      if (t.location = {}, t.location.lat = a[0].latitude, t.location.lng = a[0].longitude,
      t.address.city = a[0].city, t.address.state = a[0].stateCode,
      t.time.zone = -7, "CA" != t.address.state)
      throw new Meteor.Error("location-error",
      "Sorry we do not support city outside San Francisco Bay Area now");
      var d = c(t.location.lat, t.location.lng, 500);
      return t.location.latApprox = d.lat, t.location.lngApprox = d.lng, K(t, e)
  }
      throw new Meteor.Error("invalid-params", i.toString())
  }, newComment: function (e) {
      if (Logger.log("Creating new comment..."), !this.userId)
      throw new Meteor.Error("not-authenticated",
      "User must log in to write a comment");
      var t = o(e, this.userId); if (0 == t.length) return d(e, this.userId);
      throw new Meteor.Error("invalid-params", t.toString())
  }, newReview: function (e) {
      if (Logger.log("Creating new review..."),
      !this.userId)
      throw new Meteor.Error("not-authenticated",
      "User must log in to write a review");
      var t = i(e, this.userId); if (0 == t.length)
      return w(e, this.userId); throw new Meteor.Error("invalid-params", t.toString())
  }, editProfile: function (e) {
      if (Logger.log("Editing user's profile..."),
      !this.userId)
      throw new Meteor.Error("not-authenticated", "User must log in to write a review");
      var t = n(e);
      if (0 == t.length) {
      if (this.isSimulation) return;
      return L(e, this.userId), true
  }
      throw new Meteor.Error("invalid-params", t.toString())
  }, updateProfilePicture: function (e) {
      D(e, this.userId)
  }, acceptGuest: function (e) {
      var t = Orders.findOne({ _id: e }), r = Meals.findOne({ _id: t.mealId });
      if (!t)
      throw new Meteor.Error("internal-error", "Cannot find order");
      if (0 != t.status)
      throw new Meteor.Error("invalid-params", "User isn't in pending");
      if (!(r.autoAccept || this.userId && t.hostId == this.userId))
      throw new Meteor.Error("not-permitted", "User must be the host to accept guest");
      if (moment(t.createdAt).add(1, "day") < new Date)
      throw new Meteor.Error("not-permitted", "Cannot accept guests after the order expired");
      this.isSimulation || I(t)
  }, declineGuest: function (e) {
var t = Orders.findOne({ _id: e }); if (!t)
      throw new Meteor.Error("internal-error", "Cannot find order"); if (0 != t.status) throw new Meteor.Error("invalid-params", "User isn't in pending"); if (!this.userId || t.hostId != this.userId) throw new Meteor.Error("not-permitted", "User must be the host to decline guest"); if (moment(t.createdAt).add(1, "day") < new Date) throw new Meteor.Error("not-permitted", "Cannot accept guests after the order expired"); this.isSimulation || S(t)
  }, notifyGuestEventUpdated: function (e) {
      var t = Meals.findOne({ _id: e }), r = Orders.find({ mealId: e, status: { $gte: 0 } }); r.forEach(function (e) { var r = Meteor.users.findOne({ _id: e.userId }); nexmoSender.hostUpdatedEvent(r, t) })
  }, cancelMeal: function (e, t) {
var r = Meals.findOne({ _id: e }); if (!r)
      throw new Meteor.Error("internal-error", "Cannot find meal");
      if (1 != r.status) throw new Meteor.Error("invalid-params", "Meal has alredy been cancelled");
      if (r.hostId != this.userId) throw new Meteor.Error("not-permitted", "User is not the host of event"); if (t && t.length <= 0) throw new Meteor.Error("invalid-params", "You must provide a reason"); Meals.update({ _id: e }, { $set: { status: -1 } }), k(e, t)
  }, cancelReservation: function (e) {
var t = Orders.findOne({ _id: e });
      if (!t) throw new Meteor.Error("internal-error", "Cannot find order");
      if (t.userId != this.userId) throw new Meteor.Error("not-permitted", "User must cancel reservation by himself"); if (0 > t) throw new Meteor.Error("internal-error", "User's requests is not pending or confirmed/user doesn't join this event"); this.isSimulation || O(t)
  }, verifyPhone: function (e) {
if (Logger.log("Verifying number..."), !this.userId)
      throw new Meteor.Error("not-authenticated", "User must log in to create an event");
      if (!/^[0-9]{10}$/.test(e)) throw new Meteor.Error("invalid-params", "Your number is invalid");
      this.isSimulation || R(this.userId, e)
  }, verifyCode: function (e) {
if (Logger.log("Verifying code"), Meteor.users.findOne({
    _id: this.userId
  }).phoneVerification && e == Meteor.users.findOne({ _id: this.userId }).phoneVerification.code)
      return Meteor.users.update({ _id: this.userId },
      { $set: { "phoneVerification.status": 1 } }), true;
      throw new Meteor.Error("invalid-code", "We cannot match the code")
  }, getJumioUrl: function () {
if (!this.isSimulation) {
      var e = N(this.userId); return e
  }
  },
    updateJumioScan: function (e, t) {
Meteor.users.update({ _id: e },
      { $set: { "idVerification.scanRef": t, "idVerification.status": 1 } })
  }, hideNotification: function (e) { return this.isSimulation ? void 0 : x(e, this.userId) },
    base64tos3: function (e) {
AWS.config.update({
    accessKeyId:
      Meteor.settings.aws.accessKeyId, secretAccessKey: Meteor.settings.aws.secretAccessKey,
    region: Meteor.settings.aws.region
  }), buf = new Buffer(e.replace(/^data:image\/\w+;base64,/, ""), "base64"),

      str = +new Date + Math.floor(100 * Math.random() + 1) + ".jpg";
      var t = {
    Bucket: "plenry-meteor-development", Key: str, Body: buf, ACL: "public-read",
    ContentEncoding: "base64", ContentType: "image/jpeg"
  }, r = new AWS.S3; r.putObject(t, function (e, t) {
if (e) console.log(e); else {
Logger.log(t),
      Logger.log("Successfully uploaded data to s3"); var n = {
    Bucket: "plenry-meteor-development",
    Key: "/users/" + this.userId + "/" + Meteor.uuid() + ".jpg"
  }; r.getSignedUrl("getObject", n, function (e, t) {
      console.log("the url of the image is " + t)
  })
  }
  })
  }, getClientToken: function (e) {
if (!this.isSimulation) {
      var t = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken),
      r = {}; e && (r.clientId = e); var n = t(r); return n.clientToken
  }
  }, createTransaction: function (e) {
var t = Orders.findOne({
    userId: this.userId,
    mealId: e.mealId, status: { $gt: -2 }
  }), r = Meals.findOne({ _id: e.mealId }); if (t && -4 != t.status)
      throw new Meteor.Error("invalid-params", "You have joined this meal already");
      if (r.hostId == this.userId) throw new Meteor.Error("invalid-params",
      "You cannot reserve your own meal"); if (r.time.deadline < new Date)
      throw new Meteor.Error("invalid-params", "The deadline was passed");
      if (e.numberOfGuest > r.spotsLeft)
      throw new Meteor.Error("invalid-params", "This event cannot accommodate " +
      e.numberOfGuest + " guests");
      if (!this.isSimulation) {
      var n = (e.donationPerGuest + .15 * r.pricePerGuest) * e.numberOfGuest;
      if (0 == n) var o = true; if (o) {
var t = {}; t.userId = this.userId,
      t.mealId = e.mealId, t.mealEndAt = r.time.endAt || r.time.startAt,
      t.hostId = r.hostId, t.numberOfGuests = parseInt(e.numberOfGuest),
      t.donationPerGuest = e.donationPerGuest, t.total = n, t.status = 0,
      t.messageToHost = e.messageToHost, t.createdAt = new Date; var i = Orders.insert(t);
      Meals.update({ _id: e.mealId }, {
    $inc: {
    spotsLeft: -parseInt(e.numberOfGuest),
    numberOfGuests: parseInt(e.numberOfGuest)
  }
  }), r.autoAccept || Meteor.setTimeout(function () {
CreateNotification(1, 0,
      t.mealId, t.hostId, t.userId), CreateNotification(1, 3, t.mealId, t.userId, t.hostId);
      var e = new Date; e.setDate(e.getDate() + 1),
      Queue.add({ command: "expireAnOrder('" + i + "');", execute_after: e });
      var n = Meteor.users.findOne({ _id: t.hostId }), o = Meteor.users.findOne({ _id: t.userId });
      nexmoSender.requestInForGuest(o, r), nexmoSender.requestInForHost(o, n, r, t.messageToHost),
      EmailSender.bookingRequestForGuest(o, r, n, t.numberOfGuests, t.total.toFixed(2)),
      EmailSender.bookingRequestForHost(o, r, n, t.numberOfGuests, t.total.toFixed(2),
      t.messageToHost)
  }, 3e3)
  } else {
var s = Meteor.wrapAsync(gateway.transaction.sale, gateway.transaction);
      try {
var a = s({ amount: n.toFixed(2).toString(), paymentMethodNonce: e.nonce });
      if (!a.success)
      throw new Error("Transaction Declined");
      var t =
      { payment: {}, braintree: {} }; t.userId = this.userId, t.mealId = e.mealId, t.mealEndAt =
      r.time.endAt || r.time.startAt, t.hostId = r.hostId, t.numberOfGuests =
      parseInt(e.numberOfGuest), t.donationPerGuest = e.donationPerGuest, t.total = n,
      t.status = 0, t.messageToHost = e.messageToHost, t.payment.card =
      a.transaction.creditCard.last4, t.payment.cardType = a.transaction.creditCard.cardType,
      t.createdAt = new Date,
      t.braintree.transactionId = a.transaction.id, t.braintree.status = 0;
      var i = Orders.insert(t);
      return Meals.update({ _id: e.mealId },
      {
    $inc: {
    spotsLeft: -parseInt(e.numberOfGuest), numberOfGuests:
      parseInt(e.numberOfGuest)
  }
  }), r.autoAccept || Meteor.setTimeout(function () {
      CreateNotification(1, 0, t.mealId, t.hostId, t.userId),
      CreateNotification(1, 3, t.mealId, t.userId, t.hostId);
      var e = new Date; e.setDate(e.getDate() + 1), Queue.add(
      { command: "expireAnOrder('" + i + "');", execute_after: e });
      var n = Meteor.users.findOne({ _id: t.hostId }), o = Meteor.users.findOne({ _id: t.userId });
      nexmoSender.requestInForGuest(o, r), nexmoSender.requestInForHost(o, n, r, t.messageToHost),
      EmailSender.bookingRequestForGuest(o, r, n, t.numberOfGuests, t.total.toFixed(2)),
      EmailSender.bookingRequestForHost(o, r, n, t.numberOfGuests, t.total.toFixed(2),
      t.messageToHost)
  }, 3e3), a
  } catch (u) {
throw Logger.log(JSON.stringify(u)),
      new Meteor.Error("transaction-error",
      "Sorry we cannot process the transaction; please check your card info")
  }
  }
  }
  }, setPassword: function (e) {
      return U(e, this.userId)
  }, addBank: function (e) {
      return F(e, this.userId)
  }, verifyEduEmail: function (e) { return V(this.userId, e) },
    facebookQualifying: function () { return H(this.userId) },
    resendVerificationEmail: function () {
      return Accounts.sendVerificationEmail(this.userId)
  },
    changeEmail: function (e) {
      var t = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!t.test(e))
      throw new Meteor.Error("invalid-params", "The new email address is invalid");
      for (var r = Meteor.users.findOne(this.userId), n = r.emails, o = 0; o < n.length; o++) {
var i = n[o].address;
    if (i == e) {
var s = n.splice(o, 1)[0];
      return n.unshift(s), Meteor.users.update({ _id: this.userId }, { $set: { emails: n } }),
      void (s.verified || this.isSimulation || Accounts.sendVerificationEmail(this.userId,
      s.address))
  }
  }
    n.unshift({ address: e, verified: false });
    try {
Meteor.users.update({ _id: this.userId },
      { $set: { emails: n } })
  }
    catch (a) { throw new Meteor.Error("internal-errors", "The email address is taken") }
      this.isSimulation || Accounts.sendVerificationEmail(this.userId, e)
  },

    updateFromFacebookProfile: function () {
var e = Meteor.users.findOne({
    _id: this.userId
  }); if (e.lastUpdate = new Date, delete e._id, e.services.facebook) {
e.emails || (e.emails = []); for (var t = true, r = 0; r < e.emails.length; r++)
      e.emails[r].address == e.services.facebook.email && (t = false); t &&
      e.emails.push({ address: e.services.facebook.email, verified: true }),
      e.profile.thumbnail = {
    org: "http://graph.facebook.com/" +
      e.services.facebook.id + "/picture/?type=large"
  }; var n = Meteor.wrapAsync(Cloudinary.uploader.upload);
      try { n(e.profile.thumbnail.org) }
      catch (o) {
      e.profile.thumbnail.cloudinaryPublicId = o.public_id
  } e.services.facebook.thumbnail = "http://graph.facebook.com/" +
      e.services.facebook.id + "/picture/?type=large",
      e.services.facebook.gender && (e.profile.gender = "male" == e.services.facebook.gender ?
      0 : "female" == e.services.facebook.gender ? 1 : 2);
      var i = HTTP.get("https://graph.facebook.com/me/friends?access_token=" +
      e.services.facebook.accessToken); e.services.facebook.numberOfFriends =
      i.data.summary.total_count, e.facebookQualification = {},
      e.facebookQualification.status = i.data.summary.total_count > 100 ? 1 : 0
  } Meteor.users.update({ _id: this.userId }, { $set: e })
  }
  }), Meteor.isClient) {
    Meteor.startup(function () {
      SEO.config({
        title: "Plenry",
        meta: { description: "Socialize with Neighbors" },
        og: {
          description: "Socialize with Neighbors",
          image: "https://res.cloudinary.com/plenry/image/upload/c_scale,w_1920/v1432001726/iStock_000038412272_XXXLarge_gmgkyz.jpg",
          title: "Plenry",
          url: "https://plenry.com/"
        },
        ignore: {
          meta: ["fragment", "viewport"],
          link: ["stylesheet", "icon", "apple-touch-icon"]
        }
      }),
      GoogleMaps.load({ libraries: "geometry,places,drawing" }),
      $.cloudinary.config({ cloud_name: "plenry" })
    }),
    Session.setDefault("counter", 0),
    Session.set("Sign up error", false),
    Session.set("Login error", false),
    Tracker.autorun(function () {
      if (Meteor.userId())
        try {
          UserStatus.startMonitor({ threshold: 3e4, interval: 1e3, idleOnBlur: true })
        }
        catch (e) { console.log(e) }
    }),
    ApplicationController = RouteController.extend({
      layoutTemplate: "AppLayout", onBeforeAction: function () {
        this.next()
      }, fastRender: true
    }),
    HomeController = ApplicationController.extend({
      show: function () {
        this.render(Meteor.user() ? "home" : "landing")
      }
    }),
    UserController = ApplicationController.extend({
      show: function () {
        return this.redirect("me" == this.params.userId ||
            Meteor.userId() == this.params.userId ?
            "/users/me/dashboard" : "me" != this.params.userId ? "/users/" +
            this.params.userId + "/reviews/guest" : "/")
      }
    }),
    MealController = ApplicationController.extend({
      "new": function () {
        Meteor.user() ? this.render("mealNew") : this.redirect("/")
      }, edit: function () {
        var e = Meals.findOne({
          _id: this.params.mealId, "time.startAt":
              { $gt: new Date }
        }), t = e.hostId == Meteor.userId(); e &&
        t ? (Session.set("editMealId", this.params.mealId),
        this.render("mealEdit", { data: e })) :
        this.redirect("/events/" + e._id)
      }, show: function () {
        var e = Meals.findOne({ _id: this.params.mealId });
        return e ? (Meteor.subscribe("selfOrders"),
            this.render("mealShow", { data: e })) :
            this.redirect("/")
      }, reserve: function () {
        var e = Meals.findOne({ _id: this.params.mealId });
        return e ? (Session.set("Donation", e.pricePerGuest),
            this.render("mealReserve", { data: e })) : this.redirect("/")
      }, guests: function () {
        var e = Meals.findOne({ _id: this.params.mealId });
        return this.render("guestList", { data: e })
      }
    }),
    DashboardController = ApplicationController.extend({
      layoutTemplate: "dashboardLayout", main: function () {
        this.render("dashboardDashboard")
      }, inbox: function () {
        this.render("inboxPage")
      }, listing: function () {
        this.render("dashboardListings")
      },
      reservations: function () {
        this.render("dashboardReservations")
      }, profile: function () {
        this.render("dashboardProfile")
      }, settings: function () { this.render("dashboardSettings") },
      search: function () { this.render("Search") }
    }),
    DashboardProfileController = ApplicationController.extend({
      layoutTemplate: "DashboardProfileLayout", trustAndVerification: function () {
        this.render("TrustAndVerification")
      }, editProfile: function () { this.render("EditProfile") }
    }),
    SearchController = ApplicationController.extend({
      search: function () {
        return this.render("Search")
      }
    }),
    StaticPageController = ApplicationController.extend({
      privacy: function () {
        return this.render("termsAndPrivacy")
      }, aboutUs: function () {
        return this.render("aboutUs")
      },
      contactUs: function () {
        return this.render("contactUs")
      }, help: function () { return this.render("help") }
    }),
    OrderController = ApplicationController.extend({
      show: function () {
        var e = Orders.findOne({ _id: this.params.orderId });
        return this.render("bookingDetails", { data: e })
      }, showByMealId: function () {
        var e = Orders.findOne({ mealId: this.params.mealId });
        return this.render("bookingDetails", { data: e })
      }
    }),
    GuestController = ApplicationController.extend({
      show: function () {
        return this.render("guestList")
      }
    }),
    ReviewsController = ApplicationController.extend({
      postReviewForHost: function () {
        var e = Meals.findOne({ _id: this.params.mealId });
        return this.render("reviewForHost", { data: e })
      }, postReviewForGuest: function () {
        var e = Meals.findOne({ _id: this.params.mealId });
        return this.render("reviewForGuest", { data: e })
      }
    }),
    Template.dishPhotoUpload.events({
      "click #ss": function () {
        var e = { mealId: "y4bDwSsNos88vpLHb" },
            t = new Slingshot.Upload("dishPhotoUpload", e);
        t.send(document.getElementById("dish-photo").files[0],
            function (e, t) { })
      }
    }),
    Template.domainValidationCode.rendered = function () {
      $('link[rel="stylesheet"]').remove(), $("head").remove()
    },
    Template.help.rendered = function () {
      this.$("#help-menu").sticky({ context: ".help-content", offset: 20 }),
      $(document).scroll(function (e) { })
    },
    Template.help.events({
      "click #help-menu .item": function (e) {
        var t = $(e.target).index() + 1,
            r = "help-content-" + t;
        $("html, body").animate({ scrollTop: $("#" + r).offset().top }, 500)
      }
    }),
    Template.TrustAndVerification.events({
      "click #edu-verify": function () {
        $("#edu-verify-modal").modal("show"),
        $("#submit-edu-email").click(function () {
          var e = $("input[name='edu-email']").val(); Meteor.call("verifyEduEmail", e)
        })
      }, "click #facebook-qualify": function () {
        var e = Meteor.user(); e.services.facebook ||
        Meteor.linkWithFacebook({

          requestPermissions: ["email", "user_friends", "user_birthday",
              "user_education_history",
              "user_work_history", "user_interests"]
        }, function (e) {
          if (e) throw new Meteor.Error("Facebook connect failed");
          Meteor.call("updateFromFacebookProfile")
        }), Meteor.call("facebookQualifying", function (e, t) {
          t ||
          $("#facebookQualificationSegment").append("<p class='ui red text'>Sorry, you are not qualified.</p>")
        })
      }, "click #facebook-connect-button": function () {
        Meteor.linkWithFacebook({
          requestPermissions: ["email", "user_friends",
              "user_birthday", "user_education_history", "user_work_history",
              "user_interests"]
        }, function (e) {
          if (e) throw new Meteor.Error("Facebook connect failed");
          Meteor.call("updateFromFacebookProfile")
        })
      }, "click #google-connect-button": function () {
        Meteor.linkWithGoogle({}, function (e) {
          if (e) throw new Meteor.Error("Facebook connect failed")
        })
      }, "click #resend-email-button": function () {
        Meteor.call("resendVerificationEmail"),
        $("#resend-email-button").addClass("green"),
        $("#resend-email-button").html("<i class='ui checkmark icon'></i> Email Sent")
      }, "click #change-email-button": function () {
        $("#change-email-modal").modal("show")
      }
    }),
    Template.TrustAndVerification.helpers({
      currentEmailAddress: function () {
        return Meteor.user().emails[0].address
      }
    }),
    Template.input.events = {
      "click #send-message-button": function () {
        if (Meteor.user()) {
          var e = $("#message").val(); "" !== e.value && 0 != e.length &&
          (Meteor.call("sendIndividualMessage", Session.get("toUserId"), e),
          $("#message").val(""))
        } else alert("login to chat")
      }
    },
    Template.inboxLeftColumn.rendered = function () {
      $(".ui.dropdown").dropdown()
    },
    Template.inboxLeftColumn.helpers({
      selected: function () {
        return Session.get("toUserId") == this._id
      }, myContactsForSearch: function () {
        var e = Meteor.user().contacts;
        return Meteor.users.find({ _id: { $in: e } }, {
          field: { "profile.firstName": 1 },
          sort: { "profile.firstName": 1 }
        })
      }, myContacts: function () {
        var e = Meteor.user().contacts;
        return e.forEach(function (e) {
          var t = Inbox.find({
            $or: [{ fromUserId: e },
                { toUserId: { $in: [e] } }]
          }, { limit: 1, sort: { createdAt: -1 } });
          t && t.forEach(function (t) {
            Meteor.users._collection.update({ _id: e },
                { $set: { msgDate: t.createdAt } })
          })
        }),
            Meteor.users.find({ _id: { $in: e } },
            {
              field: { "profile.firstName": 1 },
              sort: { "status.online": -1, msgDate: -1 }
            })
      }
    }),
    Template.inboxLeftColumn.events({
      "click .user": function () {
        Session.set("toUserId", this._id)
      }, "click #user-db-update-button": function () {
        Meteor.call("updateUserDbForInbox")
      }
    }),
    Template.inboxPage.helpers({
      hasSelectedThread: function () {
        return Session.get("toUserId")
      }, fromUserName: function () {
        return Meteor.users.findOne({ _id: Session.get("toUserId") }).profile.firstName
      }, userStatus: function () {
        var e = Meteor.users.findOne({ _id: Session.get("toUserId") });
        if (e.status.online) return e.status.idle ? "(idle)" : "(online)";
        var t = Meteor.users.findOne({ _id: Session.get("toUserId") }).status.lastLogin.date;
        return t ? "(last logged in on " + moment(t).format("M/D, h:mma") + ")" : ""
      }
    }),
    Template.inboxRightColumn.helpers({
      userName: function () {
        return Meteor.users.findOne({ _id: Session.get("toUserId") }).profile.firstName
      }, cloudinaryPublicId: function () {
        return Meteor.users.findOne(
            { _id: Session.get("toUserId") }).profile.thumbnail.cloudinaryPublicId
      }, eventsMet: function () {
        return Meteor.call("getCommonEvents", Session.get("toUserId"),
            function (e, t) {
              if (e) throw new Error("Cannot get common events");
              Session.set("commonEvents", t)
            }), Meals.find({ _id: { $in: Session.get("commonEvents") } },
            { sort: { "time.startAt": -1 }, limit: 3 })
      }
    }),
    Template.inboxEventsMet.helpers({
      timeAgo: function () {
        return moment(this.time.startAt).fromNow()
      }
    }),
    Template.loggedOutMenu.rendered = function () {
      this.$(".login.modal").modal(),
          this.$(".signUp.modal").modal(), $(".sign-up-btn").click(function () {
            Logger.log("Signing in user...");
            var e = $("#sign-up-email").val(); Logger.log("Signing up with email: " + e);
            var t = $("#sign-up-first-name").val();
            Logger.log("Signing up with first name: " + t);
            var r = $("#sign-up-last-name").val(); Logger.log("Signing up with last name: " + r);
            var n = $("#sign-up-password").val(); Logger.log("Signing up with password: " + n);
            var o = $("#sign-up-confirm-password").val();
            Logger.log("Signing up with confirm password: " + o),
            a(e, n, o, t, r, function (e) {
              if (e) {
                Logger.log(e); for (var t = e.reason.split(","), r = [], n = 0; n < t.length; n++) r.push({ reason: t[n] }); Session.set("Sign up errors", r), Session.set("Sign up error", true)
              } else Logger.log("Sign up succeeds"), Session.set("Sign up error", false), $("#sign-up-email").val(""), $("#sign-up-password").val(""), $("#sign-up-first-name").val(""), $("#sign-up-last-name").val(""), $("#sign-up-confirm-password").val(""), $(".signUp.modal").modal("hide")
            })
          }), $(".login-btn").click(function () {
            Logger.log("Logging in user...");
            var e = $("#login-email").val(), t = $("#login-password").val();
            u(e, t, function (e) {
              e ? (Logger.log(e), Session.set("Login errors",
                  [{ reason: "Incorrect email/password" }]),
              Session.set("Login error", true)) :
              (Logger.log("Log in succeeds"),
              Session.set("Login error", false), $("#login-email").val(""),
              $("#login-password").val(""), $(".login.modal").modal("hide"))
            })
          }), $(".ui.facebook.login.button").click(function () {
            Logger.log("Logging in using Facebook..."),
            Meteor.loginWithFacebook({
              requestPermissions:
                  ["email", "user_friends", "user_birthday", "user_education_history",
                      "user_work_history", "user_interests"]
            }, function (e) {
              if ($(".login.modal").modal("hide"),
                  $(".signUp.modal").modal("hide"), e) throw e
            })
          }), $(".ui.google.login.button").click(function () {
            Logger.log("Loggin in using Google..."),
            Meteor.loginWithGoogle({}, function (e) {
              if ($(".login.modal").modal("hide"),
                  $(".signUp.modal").modal("hide"), e) throw e
            })
          }), $(".forgot-password-button").click(function () {
            Logger.log("Forgot password"),
                $(".forgot-password").modal("show"),
            $("#forgot-password-send").click(function () {
              var e = $("#forgot-password-email").val(); e.length > 0 &&
              (Accounts.forgotPassword({ email: e }), $(".forgot-password").modal("hide"))
            })
          })
    },
    Template.signUp.helpers({
      hasError: function () { return Session.get("Sign up error") },
      errors: function () { return Session.get("Sign up errors") }
    }),
    Template.login.helpers({
      hasError: function () {
        return Session.get("Login error")
      }, errors: function () { return Session.get("Login errors") }
    }),
    Template.listingsList.rendered = function () {
      $(".dashboard-listings-content .ui.dropdown").dropdown()
    },
    Template.mealReserve.rendered = function () {
      this.$(".has-popup").popup(), Session.set("Reserve error", false),
      Session.set("numberOfGuest", 1),
      this.$(".ui.dropdown").dropdown(), Meteor.call("getClientToken",
          function (e, t) {
            return e ? void console.log("There was an error", e) :
                void braintree.setup(t, "dropin", {
                  container: "dropin",
                  paymentMethodNonceReceived: function (e, t) {
                    var r = {};
                    r.mealId = Router.current().params.mealId,
                    r.numberOfGuest = $("#request-number").val(),
                    r.donationPerGuest = Session.get("Donation"),
                    r.messageToHost = $("#hello-to-host").val(),
                    r.nonce = t, $(".pusher").dimmer("show"),
                    Meteor.call("createTransaction", r, function (e, t) {
                      if (e) {
                        Logger.log(JSON.stringify(e));
                        for (var n = e.reason.split(","),
                            o = [], i = 0; i < n.length; i++) {
                          Logger.log(JSON.stringify(e));
                          for (var n = e.reason.split(","),
                              o = [], i = 0; i < n.length; i++)
                            o.push({ reason: n[i] });
                          Session.set("Reserve errors", o),
                          Session.set("Reserve error", true),
                          $(".pusher").dimmer("hide")
                        }
                      } else
                        $(".pusher").dimmer("hide"),
                            Meals.findOne({ _id: r.mealId }).autoAccept ?
                            (Meteor.call("acceptGuest",
                            Orders.findOne({
                              userId: Meteor.userId(),
                              mealId: r.mealId, status: 0
                            })._id), Router.go("/events/" + r.mealId)) :
                            Router.go("/users/me/reservations")
                    })
                  }
                })
          })
    },
    Template.mealReserve.events({
      "click #join-event": function () {
        $(".pusher").dimmer("show");
        var e = {}; e.messageToHost = $("#hello-to-host").val(),
        e.mealId = Router.current().params.mealId,
        e.numberOfGuest = $("#request-number").val(),
        e.donationPerGuest = 0, Meteor.call("createTransaction", e,
            function (t, r) {
              if (t) {
                Logger.log(JSON.stringify(t));
                for (var n = t.reason.split(","),
                    o = [], i = 0; i < n.length; i++) o.push({ reason: n[i] });
                Session.set("Reserve errors", o),
                Session.set("Reserve error", true),
                $(".pusher").dimmer("hide")
              } else $(".pusher").dimmer("hide"),
                  Meals.findOne({ _id: e.mealId }).autoAccept ?
                  (Meteor.call("acceptGuest", Orders.findOne({
                    userId: Meteor.userId()
                      , mealId: e.mealId, status: 0
                  })._id), Router.go("/events/" + e.mealId)) :
                  Router.go("/users/me/reservations")
            })
      }
    }),
    Template.mealReserve.helpers({
      mealDate: function () {
        return moment(this.time.startAt).utcOffset(this.time.zone).
            format("MMM DD, YYYY ddd")
      }, mealStartTime: function () {
        return moment(this.time.startAt).
            utcOffset(this.time.zone).format("hh:mmA")
      }, mealEndTime: function () {
        return moment(this.time.endAt).
            utcOffset(this.time.zone).format("hh:mmA")
      }, donationWithService: function () {
        return (Session.get("Donation") + .15 * this.pricePerGuest).toFixed(2)
      }, totalService: function () {
        return (.15 * this.pricePerGuest * Session.get("numberOfGuest")).toFixed(2)
      }, donation: function () {
        return Session.get("Donation").toFixed(2)
      },
      numberOfGuest: function () {
        return Session.get("numberOfGuest")
      }, requestNumber: function () {
        return parseInt(Session.get("numberOfGuest"))
      }, totalDonation: function () {
        return (Session.get("numberOfGuest") * (Session.get("Donation") +
            .15 * this.pricePerGuest)).toFixed(2)
      }, service: function () {
        return (.15 * this.pricePerGuest).toFixed(2)
      }, hasError: function () { return Session.get("Reserve error") },
      errors: function () { return Session.get("Reserve errors") },
      noCharge: function () {
        return Session.get("numberOfGuest") * (Session.get("Donation") +
            .15 * this.pricePerGuest) == 0
      }, hasEndTime: function () {
        return this.time.endAt
      },
      hostCloudinaryPublicId: function () {
        var e = Meteor.users.findOne({ _id: this.hostId });
        return e.profile.thumbnail.cloudinaryPublicId
      }, reserveOptions: function () {
        for (var e = [], t = 1; t <= this.spotsLeft; t++)
          e.push(1 == t ? { value: 1, text: "Only You" } :
                        { value: t, text: "You + " + (t - 1) + " Guest(s)" });
        return e
      }, hostName: function () {
        var e = Meteor.users.findOne({ _id: this.hostId });
        return e.profile.firstName
      }, questionForGuest: function () {
        return this.questionForGuest
      }
    }),
    Template.mealReserve.events({
      "click #add-donation": function () {
        Session.set("Donation",
            Session.get("Donation") + 1)
      }, "click #minus-donation": function () {
        Session.get("Donation") > 0 &&
        !this.autoAccept && Session.set("Donation", Session.get("Donation") - 1)
      }, "change #request-number": function (e) {
        Session.set("numberOfGuest", $("#request-number").val())
      }
    }),
    Template.dashboardListings.rendered = function () {
      Session.setDefault("Listings section", 1),
      Router.current().params.query.section &&
      Session.set("Listings section", parseInt(Router.current().params.query.section))
    },
    Template.dashboardListings.helpers({
      isSection: function (e) {
        return e == Session.get("Listings section")
      }
    }),
    Template.dashboardListings.events({
      "click .dashboard-listings-link": function (e) {
        var t = 0; t = 0 == $(e.target).index() ? 1 : 4,
        Session.set("Listings section", t)
      }, "click .host-event-btn": function (e) {
        Logger.log("Host an event"),
            p(Meteor.user()) && m(Meteor.user()) ? (Router.go("mealNew"),
        Session.set("New meal section one valid", false),
        Session.set("New meal section two valid", false),
        Session.set("New meal section three valid", false)) :
        (Session.set("Verification warning", true),
        Session.set("Verification warning header",
            "Your must verify your email and phone before hosting an Event"),
        Router.go("trustAndVerification"))
      }
    }),
    Template.upcomingListing.events({
      "click .past-listing-link": function () {
        Session.set("Listings section", 2)
      }, "click .cancelled-listing-link": function () {
        Session.set("Listings section", 3)
      }
    }),
    Template.cancelledListing.helpers({
      listings: function () {
        return Meals.find({ hostId: Meteor.userId(), status: -1 })
      }
    }),
    Template.cancelledListingsRow.helpers({
      mealDate: function () {
        return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D YYYY")
      }, mealTime: function () {
        return moment(this.time.startAt).utcOffset(this.time.zone).format("ddd @ hh:mma")
      }
    }),
    Template.cancelledListing.events({
      "click .upcoming-listing-link": function () {
        Session.set("Listings section", 1)
      }, "click .past-listing-link": function () {
        Session.set("Listings section", 2)
      }
    }),
    Template.contactUs.rendered = function () {
      Session.set("Contact us success", false),
      Session.set("Contact us fail", false)
    },
    Template.contactUs.events({
      "click #contact-us-submit": function () {
        var e = $("#contact-us-name").val(),
            t = $("#contact-us-email").val(),
            r = $("#contact-us-message").val();
        e.length > 0 && t.length > 0 && r.length > 0 ?
        (Meteor.call("newContactUsMessage", e, t, r),
        Session.set("Contact us success", true),
        Session.set("Contact us fail", false),
        $("#contact-us-name").val(""), $("#contact-us-email").val(""),
        $("#contact-us-message").val("")) :
        (Session.set("Contact us success", false),
        Session.set("Contact us fail", true))
      }
    }),
    Template.contactUs.helpers({
      success: function () {
        return Session.get("Contact us success")
      }, error: function () {
        return Session.get("Contact us fail")
      }
    }),
    Template.phoneVerification.created = function () {
      var e = this; e.newVerify = new ReactiveVar(true),
      e.hasError = new ReactiveVar(false), e.errors = new ReactiveVar
    },
    Template.phoneVerification.helpers({
      hasError: function () {
        return Template.instance().hasError.get()
      }, newVerify: function () {
        return Template.instance().newVerify.get()
      }, errors: function () {
        return Template.instance().errors.get()
      }
    }),
    Template.phoneVerification.events({
      "click .send-verify-code": function () {
        var e = Template.instance(),
            t = $("#phone-verify-number").val().replace(/-/g, "").replace(/\//g, "");
        Meteor.call("verifyPhone", t, function (t, r) {
          if (t) {
            e.hasError.set(true);
            for (var n = t.reason.split(","), o = [], i = 0; i < n.length; i++)
              o.push({ reason: n[i] }); e.errors.set(o)
          }
          else e.hasError.set(false), e.newVerify.set(false)
        })
      }, "click .close.icon": function () {
        var e = Template.instance(); e.hasError.set(false), e.newVerify.set(true)
      }, "click .verify-code-btn": function () {
        var e = Template.instance(), t = $("#verify-code").val();
        Meteor.call("verifyCode", t, function (t, r) {
          if (t) {
            e.hasError.set(true);
            for (var n = t.reason.split(","), o = [], i = 0; i < n.length; i++)
              o.push({ reason: n[i] }); e.errors.set(o)
          }
          else
            e.hasError.set(false),
                e.newVerify.set(true),
                Session.get("Verification redirect") &&
                (Router.go("reserve", { mealId: Session.get("Verification redirect")[0] },
                { query: "number=" + Session.get("Verification redirect")[1] }),
                Session.set("Verification redirect", null)),
                $("#phone-verification-modal").modal("hide")
        })
      }
    }),
    Template.dashboardReservations.rendered = function () {
      Session.set("Reservation section", 1),
      Router.current().params.query.section && Session.set("Reservation section",
          parseInt(Router.current().params.query.section))
    },
    Template.dashboardReservations.helpers({
      isSection: function (e) {
        return e == Session.get("Reservation section")
      }
    }),
    Template.dashboardReservations.events({
      "click .dashboard-reservation-link": function (e) {
        Session.set("Reservation section", $(e.target).index() + 1)
      }
    }),
    Template.dashboardProfile.rendered = function () {
      Router.current().params.query.section ?
      Session.set("Profile section",
          parseInt(Router.current().params.query.section)) :
      (Session.set("Verification warning", false),
      Session.set("Profile section", 1)),
      window.scrollTo(0, 0)
    },
    Template.dashboardProfile.helpers({
      isSection: function (e) {
        return e == Session.get("Profile section")
      }
    }),
    Template.dashboardProfile.events({
      "click .dashboard-profile-link": function (e) {
        Session.set("Profile section", $(e.target).index() + 1)
      }
    }),
    Template.EditProfile.rendered = function () {
      Session.set("Edit profile success", false);
      var e = Template.instance(); Template.instance().autorun(function () {
        Meteor.user() && e.$(".ui.dropdown").dropdown()
      }), $("#profile-photo-file-btn").click(function () {
        $("#profile-photo-file").click()
      }), this.$(".has-popup").popup()
    },
    Template.EditProfile.events({
      "click #update-profile-button": function () {
        var e = { profile: {}, emergency: {} };
        return Logger.log("First Name: " + $("input[name='first-name']").val()),
            e.profile.firstName = $("input[name='first-name']").val(),
            Logger.log("Last Name: " + $("input[name='last-name']").val()),
            e.profile.lastName = $("input[name='last-name']").val(),
            Logger.log("Profile Picture: " + $("#profile-photo-url").val()),
            $("#profile-photo-url").val().length > 0 &&
            (e.profile.thumbnail = { org: $("#profile-photo-url").val() }),
            Logger.log("Gender: " + $("input[name='gender']").val()),
            $("input[name='gender']").val().length > 0 &&
            (e.profile.gender = parseInt($("input[name='gender']").val())),
            $("input[name='year']").val().length > 0 &&
            $("input[name='month']").val().length > 0 &&
            $("input[name='day']").val().length > 0 ?
            (Logger.log("Birthday: " +
            new Date(moment(new Date($("input[name='year']").val() + "-" +
            $("input[name='month']").val() + "-" +
            $("input[name='day']").val())).zone(0).format("l"))),
            e.profile.birthday = new Date(moment(new Date($("input[name='year']").val() +
            "-" + $("input[name='month']").val() + "-" +
            $("input[name='day']").val())).zone(0).format("l"))) :
            Logger.log("Birthday: "), Logger.log("City: " +
            $("input[name='profile-city']").val()),
            e.profile.city = $("input[name='profile-city']").val(),
            Logger.log("Description: " + $("#user-description").val()),
            e.profile.description = $("#user-description").val(),
            Logger.log("School: " + $("input[name='school']").val()),
            e.profile.school = $("input[name='school']").val(),
            Logger.log("Work: " + $("input[name='work']").val()),
            e.profile.work = $("input[name='work']").val(),
            Logger.log("Language: " + $("input[name='language']").val()),
            e.profile.language = $("input[name='language']").val(),
            Logger.log("Emergency Contact's Name: " +
            $("input[name='emergency-contact-name']").val()),
            e.emergency.name = $("input[name='emergency-contact-name']").val(),
            Logger.log("Emergency Contact's Phone: " +
            $("input[name='emergency-contact-phone']").val()),
            e.emergency.phone = $("input[name='emergency-contact-phone']").val(),
            Logger.log("Emergency Contact's Email: " +
            $("input[name='emergency-contact-email']").val()),
            e.emergency.email = $("input[name='emergency-contact-email']").val(),
            Logger.log("Emergency Contact's Relationship: " +
            $("input[name='emergency-contact-relationship']").val()),
            e.emergency.relationship = $("input[name='emergency-contact-relationship']").val(),
            Meteor.call("editProfile", e, function (e) {
              e && Logger.log(JSON.stringify(e)),
                  Session.set("Edit profile success", true),
              $("html, body").animate({ scrollTop: 0 }, 500)
            })
      }, "keyup input": function () {
        Session.set("Edit profile success", false)
      }, "change input[type='file']": function (e) {
        Logger.log("Filetype: " + e.target.files);
        var t = new Slingshot.Upload("profilePhotoUpload");
        t.send(e.target.files[0], function (e, t) {
          Meteor.call("updateProfilePicture", t)
        })
      }
    }),
    Template.EditProfile.helpers({
      currentUserEmail: function () {
        return Meteor.user().emails[0].address
      }, currentUserBirthdayMonth: function () {
        return Meteor.user().profile.birthday ?
            moment(Meteor.user().profile.birthday).format("MM") : void 0
      }, currentUserBirthdayDay: function () {
        return Meteor.user().profile.birthday ?
            moment(Meteor.user().profile.birthday).format("DD") : void 0
      }, currentUserBirthdayYear: function () {
        return Meteor.user().profile.birthday ?
            moment(Meteor.user().profile.birthday).format("YYYY") : void 0
      }, saved: function () {
        return Session.get("Edit profile success")
      }
    }),
    Template.ReviewsAboutYou.events({
      "click .reviews-by-you-link": function () {
        Session.set("Profile section", 4)
      }
    }),
    Template.ReviewsByYou.events({
      "click .reviews-about-you-link": function () {
        Session.set("Profile section", 3)
      }
    }),
    Template.dashboardSettings.rendered = function () {
      Router.current().params.query.section ? Session.set("Dashboard section",
          parseInt(Router.current().params.query.section)) :
      Session.set("Dashboard section", 1)
    },
    Template.dashboardSettings.helpers({
      isSection: function (e) {
        return e == Session.get("Dashboard section")
      }
    }),
    Template.dashboardSettings.events({
      "click .dashboard-settings-link": function (e) {
        Session.set("Dashboard section", $(e.target).index() + 1)
      }
    }),
    Template.stars.helpers({
      getStar: function (e) {
        return this.rating < e - 1 + .25 ? "yellow empty star icon" : this.rating < e - 1 + .75 ? "yellow half empty star icon" : "yellow star icon"
      }
    }),
    Template.showUserIcons.helpers({
      spots: function () {
        var e = []; this.maxParty > 30 && (this.maxParty = 30, this.spotsLeft = parseInt(this.spotsLeft / this.maxParty * 30)); for (var t = 0; t < this.maxParty - this.spotsLeft; t++) e.push({ taken: true }); for (var t = 0; t < this.spotsLeft; t++) e.push({ taken: false }); return e
      }
    }),
    Template.birthdayYearOptions.helpers({
      years: function () {
        for (var e = (new Date).getFullYear(), t = [], r = e; r > e - 90; r--) t.push({ year: r }); return t
      }
    }),
    Template.cardYearOptions.helpers({
      years: function () {
        for (var e = (new Date).getFullYear(), t = [], r = e; e + 21 > r; r++) t.push({ year: r }); return t
      }
    }),
    Template.TrustAndVerification.rendered = function () {
      $("#phone-verification-modal").modal({
        closable: false, onShow: function () {
          $("#why-verify").accordion(), $("#why-verify").accordion("open", 0), $("#why-verify").accordion("close", 0)
        }
      }), $("#phone-verification").click(function () {
        $("#phone-verification-modal").modal("show")
      })
    },
    Template.TrustAndVerification.helpers({
      fbFriendsVerified: function () {
        return Template.instance().FBCollection.find().fetch();
        return console.log("Helpers" + MeteorFBCollection.user().services.facebook.id),
            fbFriendsVerified(Meteor.user().services.facebook.id,
            Meteor.user().services.facebook.name)
      }, emailVerified:
          function () {
            for (var e = 0; e < Meteor.user().emails.length; e++)
              if (Meteor.user().emails[e].verified) return true
          }, phoneVerified: function () {
            return 1 == Meteor.user().phoneVerification.status
          }, idVerified: function () {
            return Meteor.user().idVerification && 1 == Meteor.user().idVerification.status
          }, eduVerified: function () {
            for (var e = 0; e < Meteor.user().emails.length; e++)
              if (Meteor.user().emails[e].verified &&
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/.
                  test(Meteor.user().emails[e].address)) return true; return false
          }, facebookQualified: function () {
            var e = Meteor.user();
            return e.facebookQualification && 1 == e.facebookQualification.status ? true : false
          }, hasWarning: function () {
            return Session.get("Verification warning")
          }, warningHeader: function () {
            return Session.get("Verification warning header")
          }, warningMessage: function () {
            Session.get("Verification warning message")
          }
    }),
    Template.idVerification.created = function () {
      var e = this; e.token = new ReactiveVar,
      e.hasError = new ReactiveVar(false), Meteor.call("getJumioUrl",
          function (e, t) {
            window.location.replace(t)
          })
    },
    Template.reviewSection.created = function () {
      Meteor.subscribe("oneUser", Template.instance().data.userId),
      Meteor.subscribe("oneMeal", Template.instance().data.mealId)
    },
    Template.reviewSection.helpers({
      userName: function () {
        var e = Meteor.users.findOne({ _id: this.userId });
        return e.profile.firstName
      }, timeAgo: function () {
        return moment(this.createdAt).fromNow()
      }, mealTitle: function () {
        var e = Meals.findOne({ _id: this.mealId });
        return e.title
      }, mealDate: function () {
        var e = Meals.findOne({ _id: this.mealId });
        return moment(e.time.startAt).utcOffset(e.time.zone).format("MMM YY")
      }, userCloudinaryPublicId: function () {
        var e = Meteor.users.findOne({ _id: this.userId });
        return e.profile.thumbnail.cloudinaryPublicId
      }
    }),
    Template.pastEventsOption.helpers({
      mealTitle: function () {
        return this.title
      }, mealId: function () { return this._id }
    }),
    Template.dashboardDashboard.helpers({
      notifications: function () {
        var e = Notifications.find({ toUserId: Meteor.userId() }, { sort: { createdAt: -1 } });
        return e
      }, emailVerified: function () {
        for (var e = 0; e < Meteor.user().emails.length; e++)
          if (Meteor.user().emails[e].verified) return true
      }, phoneVerified: function () {
        return Meteor.user().phoneVerification && 1 == Meteor.user().phoneVerification.status
      }, facebookLinked: function () {
        return Meteor.user().services.facebook
      }, facebookNumberOfFriends: function () {
        return Meteor.user().services.facebook ?
            Meteor.user().services.facebook.numberOfFriends : false
      }, googleLinked: function () {
        return Meteor.user().services.google
      }, idVerified: function () {
        return Meteor.user().idVerification && 1 == Meteor.user().idVerification.status
      }, eduVerified: function () {
        for (var e = 0; e < Meteor.user().emails.length; e++)
          if (Meteor.user().emails[e].verified &&
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/
              .test(Meteor.user().emails[e].address)) return true; return false
      }, reviewed: function () { },
      hasSchool: function () {
        return Meteor.user().profile.school && Meteor.user().profile.school.length > 0
      }, hasWork: function () {
        return Meteor.user().profile.work && Meteor.user().profile.work.length > 0
      }, hasLanguage: function () {
        return Meteor.user().profile.language && Meteor.user().profile.language.length > 0
      }, hasCity: function () {
        return Meteor.user().profile.city && Meteor.user().profile.city.length > 0
      }, joinDate: function () {
        return moment(Meteor.user().createdAt).format("MMM, YYYY")
      }, hasDescription: function () {
        return Meteor.user().profile.description &&
            Meteor.user().profile.description.length > 0
      }, hasNotifications: function () {
        return Notifications.find({ toUserId: Meteor.userId() }).count() > 0
      }
    }),
    Template.reviewCard.created = function () {
      var e; e = this.data.userToHost ? this.data.userId :
          this.data.hostId, Meteor.subscribe("oneUser", e),
      Meteor.subscribe("oneMeal", this.data.mealId)
    },
    Template.reviewCard.helpers({
      userCloudinaryPublicId: function () {
        var e; e = this.userToHost ? this.userId :
            this.hostId; var t = Meteor.users.findOne({ _id: e });
        return t.profile.thumbnail.cloudinaryPublicId
      },
      userName: function () {
        var e; e = this.userToHost ? this.userId : this.hostId;
        var t = Meteor.users.findOne({ _id: e });
        return t.profile.firstName
      }, mealTitle: function () {
        var e = Meals.findOne({ _id: this.mealId });
        return e.title
      }, mealDate: function () {
        var e = Meals.findOne({ _id: this.mealId });
        return moment(e.time.startAt).utcOffset(e.time.zone).format("MMM YY")
      }, reviewContent: function () {
        return this.content
      }
    }),
    Template.upcomingListing.helpers({
      listings: function () {
        return Meals.find({
          hostId: Meteor.userId(), "time.startAt": { $gt: new Date },
          status: 1
        }, { sort: { "time.startAt": 1 } })
      }
    });
    var y = {
      date: function () {
        return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D YYYY")
      }, time: function () {
        return moment(this.time.startAt).utcOffset(this.time.zone).format("ddd @ hh:mmA")
      }, active: function () { return 1 == this.status }
    };
    Template.listingsRow.rendered = function () {
      var e = this.data._id; $("#cancel-event-" + e).modal(),
      $("#cancel-event-confirm-" + e).click(function () {
        var t = $("#cancel-event-" + e).find(".cancel-reason").val();
        return Logger.log("Cancel reason: " + t), t.length > 0 ?
            (Meteor.call("cancelMeal", e, t), true) :
            ($("#cancel-event-" + e).find(".required.field").addClass("error"), false)
      })
    },
    Template.listingsRow.helpers(y),
    Template.listingsRow.events({
      "click .cancel-event-button": function (e) {
        var t = Template.instance().data._id; $("#cancel-event-" + t).modal("show")
      }
    }),
    Template.PhotosAndVideo.helpers({
      photo: function () {
        return Session.get("photo")
      }
    }),
    Template.PhotosAndVideo.events({
      "click #photo-taking-button": function () {
        var e = { width: 800, height: 600 };
        MeteorCamera.getPicture(e, function (e, t) {
          Session.set("photo", t), t && Meteor.call("base64tos3", t)
        })
      }
    }),
    Template.Account.events({
      "click #change-password-button": function () {
        var e = $("input[name=old-password]").val(),
            t = $("input[name=new-password]").val(),
            r = $("input[name=confirm-password]").val();
        if (t != r)
          throw new Meteor.Error("Passwords do not match");
        if (t.length < 8 || !/^(?=.*[a-z])(?=.*[0-9])/.test(t))
          throw new Meteor.Error("Password length must be at least 8 and includes letter and number");
        Meteor.user().services.password || Meteor.call("setPassword", t),
        Accounts.changePassword(e, t, function (e) {
          e && Logger.log("Update Password Error: " + e)
        })
      }
    }),
    Template.PayoutPreference.rendered = function () {
      this.$(".ui.dropdown").dropdown(), Session.set("payout section", 1),
      $("#to-payout-section-2").click(function () {
        var t = $(".payout.modal input[name=name]").val(),
            r = $(".payout.modal input[name=recipient]").val(),
            n = $(".payout.modal input[name=line1]").val(),
            o = $(".payout.modal input[name=line2]").val(),
            i = $(".payout.modal input[name=city]").val(),
            s = $(".payout.modal input[name=state]").val(),
            a = $(".payout.modal input[name=zip-code]").val(),
            u = $(".payout.modal input[name=country]").val(),
            d = {
              name: t, recipient: r, line1: n, line2: o,
              city: i, state: s, zipCode: a, country: u
            }, l = e(d); 0 != l.length ?
        $("#payout-method-window :input").map(function () {
          $(this).val() || $(this).parent(".required.field").addClass("error")
        }) : ($(".payout.modal input[name=line1]").val(""),
        $(".payout.modal input[name=line2]").val(""),
        $(".payout.modal input[name=city]").val(""),
        $(".payout.modal input[name=zip-code]").val(""),
        $("#payout-method-window").find(".required.field").removeClass("error"),
        Session.set("payoutAddress", d), Session.set("payout section", 2))
      }), $("#add-payout-method-done").click(function () {
        Meteor.call("addPayoutAddress", Session.get("payoutAddress"))
      })
    },
    Template.PayoutPreference.helpers({
      lastFourAccNumber: function () {
        var e = Meteor.user().bank.accountNumber; return e.substr(e.length - 4)
      }, isSection: function (e) {
        return Session.get("payout section") == e
      }, hasPaymentMethod: function () {
        var e = Meteor.user().payout.method;
        return 0 == e ? true : false
      }, name: function () {
        return Meteor.user().payout.address.name
      }, address: function () {
        var e = Meteor.user().payout.address, t = e.recipient,
            r = e.line1; e.line2 && (r += " " + e.line2);
        var n = e.city, o = e.state, i = e.zipCode;
        return t + ", " + r + ", " + n + ", " + o + " " + i
      }
    }),
    Template.PayoutPreference.events({
      "click #add-payout-method-button": function () {
        Session.set("payout section", 1),
        $("#payout-method-window").modal("show").modal({
          onHide: function () {
            Meteor.setTimeout(function () {
              Session.set("payout section", 1)
            }, 500)
          }
        })
      }
    }),
    Accounts.onEmailVerificationLink(function (e, t) {
      return Accounts.verifyEmail(e, function (e) {
        if (e) throw new Meteor.Error("Cannot verify EDU email: " + e)
      }), t()
    })
  }
  if (Meteor.isServer) {
    Accounts.onCreateUser(function (e, t) {
      if (e.profile && (t.profile = e.profile),
          t.lastUpdate = new Date,
          t.profile.thumbnail = {
        org: "http://plenry.com/images/defaultAvatar.jpg",
        cloudinaryPublicId: "default_avatar"
      }, t.isHost = true, t.host = {}, t.host.reviewsCount = 0,
          t.host.overallRating = 0, t.host.communicationRating = 0,
          t.host.totalResponds = 0, t.host.totalResponseTime = 0,
          t.host.nextPay = 0, t.services.facebook) {
        t.emails ||
        (t.emails = []),
        t.emails.push({
          address: t.services.facebook.email,
          verified: true
        }), t.profile = {}, t.profile.firstName =
            t.services.facebook.first_name, t.profile.lastName =
            t.services.facebook.last_name, t.profile.thumbnail =
            {
              org: "http://graph.facebook.com/" +
                t.services.facebook.id + "/picture/?type=large"
            }; var r = Meteor.wrapAsync(Cloudinary.uploader.upload);
        try { r(t.profile.thumbnail.org) } catch (n) {
          t.profile.thumbnail.cloudinaryPublicId = n.public_id
        } t.services.facebook.thumbnail = "http://graph.facebook.com/" +
            t.services.facebook.id + "/picture/?type=large",
        t.services.facebook.gender &&
        (t.profile.gender = "male" == t.services.facebook.gender ?
            0 : "female" == t.services.facebook.gender ? 1 : 2);
        var o = t.services.facebook.accessToken, i =
            HTTP.get("https://graph.facebook.com/me/friends?access_token=" + o);
        if (t.services.facebook.numberOfFriends = i.data.summary.total_count,
            t.facebookQualification = {},
            t.facebookQualification.status = i.data.summary.total_count > 100 ?
            1 : 0, i = HTTP.get("https://graph.facebook.com/me/?access_token=" + o), t.profile.birthday = new Date(i.data.birthday), t.services.facebook.work = i.data.work, i.data.work) { if (t.profile.work) var s = t.profile.work; else var s = ""; i.data.work.forEach(function (e) { (t.profile.work && t.profile.work.indexOf(e.employer.name) < 0 || !t.profile.work) && ("" != s && (s += ", "), s += e.employer.name) }), t.profile.work = s } if (t.services.facebook.school = i.data.education, i.data.education) { if (t.profile.school) var a = t.profile.school; else var a = ""; i.data.education.forEach(function (e) { (t.profile.school && t.profile.school.indexOf(e.school.name) < 0 || !t.profile.school) && ("" != a && (a += ", "), a += e.school.name) }), t.profile.school = a } if (i = HTTP.get("https://graph.facebook.com/me/interests?access_token=" + o), t.services.facebook.interests = i.data.data, i.data.data) { var u = "I love: "; i.data.data.forEach(function (e) { u.indexOf(e.name) < 0 && (u += e.name + ", ") }), u = u.substring(0, u.length - 2), "I love" != u && (t.profile.description ? t.profile.description += u : t.profile.description = u) } return t
      } if (t.services.google) {
        t.emails || (t.emails = []),
            t.emails.push({ address: t.services.google.email, verified: true }),
        t.profile = {}, t.profile.firstName = t.services.google.given_name,
        t.profile.lastName = t.services.google.family_name,
        t.guest = { reviewsCount: 0, totalOverallRating: 0, showingOverallRating: 0 },
        t.profile.thumbnail = { org: t.services.google.picture };
        var r = Meteor.wrapAsync(Cloudinary.uploader.upload);
        try { r(t.profile.thumbnail.org.replace("https", "http")) }
        catch (n) { t.profile.thumbnail.cloudinaryPublicId = n.public_id }
        return t.services.google.gender &&
            (t.profile.gender = "male" == t.services.google.gender ?
            0 : "female" == t.services.google.gender ? 1 : 2), t
      } return Meteor.setTimeout(function () {
        Accounts.sendVerificationEmail(t._id),
        Logger.log("Sending Verification Email...")
      }, 5e3), t
    });
    var b = function (e) {
      Meteor.users.update({ _id: e }, {
        $set: {
          isHost: true, "host.reviewsCount": 0, "host.overallRating": 0,
          "host.communicationRating": 0, "host.totalResponds": 0,
          "host.totalResponseTime": 0, "host.nextPay": 0
        }
      })
    },
    w = function (e, t) {
      if (e.createdAt = new Date, e.userToHost) {
        e.userId = t;
        var r = Meals.findOne({ _id: e.mealId });
        e.hostId = r.hostId, CreateNotification(0, 0, e.mealId,
            e.userId, e.hostId), Notifications.update({
              type: 0,
              subType: 1, mealId: e.mealId, toUserId: e.userId
            }, { $set: { hidden: true } });
        var n = Meteor.users.findOne({ _id: r.hostId }),
            o = (n.host.overallRating * n.host.reviewsCount + e.overallRating)
            / (n.host.reviewsCount + 1),
            i = (n.host.communicationRating * n.host.reviewsCount + e.communicationRating) /
            (n.host.reviewsCount + 1); Meteor.users.update({ _id: r.hostId },
                { $inc: { "host.reviewsCount": 1 } }),
            Meteor.users.update({ _id: r.hostId }, {
              $set: {
                "host.overallRating": o,
                "host.communicationRating": i
              }
            }), Orders.update({ mealId: e.mealId, userId: e.userId },
                { $set: { guestReviewed: true } })
      } else
        e.hostId = t, Meteor.users.update({ _id: e.userId }, {
          $inc: { "guest.reviewsCount": 1, "guest.totalOverallRating": e.overallRating }
        }), CreateNotification(0, 0, e.mealId, e.hostId, e.userId),
            Orders.update({ mealId: e.mealId, userId: e.userId },
            { $set: { hostReviewed: true } });
      return Reviews.insert(e)
    },
    M = function (e, t, r, n, o) {
      var i = {};
      return i.mealId = e._id, i.userId = t,
          i.hostId = e.hostId, i.numberOfGuests = n, i.donation = (r / 1.15).toFixed(2),
          i.pricePerGuest = r, i.total = r * n, i.createdAt = new Date, i.status = 0,
          i.payment = {}, i.payment.card = o.card.substring(12),
          i.payment.cardType = o.cardType, i.payment.address = o.address,
          createPayment(i), Meals.update({ _id: e._id },
          { $inc: { numberOfGuests: n, spotsLeft: -n } }), Orders.insert(i)
    },
    I = function (e) {
      var t = e.mealId, r = e.hostId, n = e.userId; Meals.update({ _id: t },
          { $inc: { numberOfAcceptedGuests: e.numberOfGuests } });
      var o = moment().diff(e.createdAt) / 1e3 / 60;
      Meteor.users.update({ _id: r }, {
        $inc: { "host.totalResponds": 1, "host.totalResponseTime": o }
      }), Orders.update({ _id: e._id },
          { $set: { status: 1, respondTime: new Date } }),
      Meteor.users.update({ _id: r }, { $inc: { "host.nextPay": e.total / 1.15 } }),
      Meteor.users.update({ _id: n }, { $addToSet: { contacts: r, events: t } }),
      Meteor.users.update({ _id: r }, { $addToSet: { contacts: n, events: t } });
      var i = Meteor.users.findOne({ _id: n }), s = Meteor.users.findOne({ _id: r }),
          a = Meals.findOne({ _id: t }),
          u = new Date(a.time.startAt),
          d = new Date(a.time.startAt),
          l = new Date; u.setDate(u.getDate() - 1),
      d.setDate(d.getDate() - 3), u > l &&
      Queue.add({
        command: "create24HoursNotificationForGuest('" + e._id + "');",
        execute_after: u
      }), d >= l && Queue.add(
              {
                command: "create3DaysNotificationForGuest('" + e._id + "');",
                execute_after: d
              }), Queue.add({
                command: "createMealEndNotificationForGuest('" + e._id + "');",
                execute_after: new Date(a.time.endAt || a.time.startAt)
              }),
      nexmoSender.acceptedForGuest(i, s, a), a.autoAccept ?
      (nexmoSender.autoAcceptedForHost(i, s, a, e.messageToHost),
      CreateNotification(1, 6, t, n, r)) : nexmoSender.acceptedForHost(i, s),
      CreateNotification(1, 1, t, r, n),
      EmailSender.bookingConfirmationforGuest(i, a, s, e.numberOfGuests, e.total),
      0 != e.total && C(e)
    },
    S = function (e) {
      var t = e.mealId, r = e.hostId, n = e.userId; Meals.update({ _id: t },
          { $inc: { numberOfGuests: -e.numberOfGuests, spotsLeft: e.numberOfGuests } });
      var o = moment().diff(e.createdAt) / 1e3 / 60; Meteor.users.update({ _id: r },
          { $inc: { "host.totalResponds": 1, "host.totalResponseTime": o } }),
      Orders.update({ _id: e._id }, { $set: { status: -1, respondTime: new Date } }),
      CreateNotification(1, 2, t, r, n), 0 != e.total && E(e);
      var i = Meteor.users.findOne({ _id: n }), s = Meals.findOne({ _id: t });
      nexmoSender.declinedForGuest(i, s), EmailSender.bookingDeclined(i, s)
    },
    O = function (e) {
      CreateNotification(2, 3, e.mealId, e.userId, e.hostId);
      var t = Meals.findOne({ _id: e.mealId }), r = Meteor.users.findOne({ _id: e.userId }), n = Meteor.users.findOne({ _id: e.hostId }); nexmoSender.cancellationByGuest(r, n, t), nexmoSender.cancellationByGuestForHost(r, n, t), Meals.update({ _id: e.mealId }, { $inc: { numberOfGuests: -e.numberOfGuests, spotsLeft: e.numberOfGuests } }), 0 == e.status && 0 != e.total && E(e), moment().add(3, "days") > t.time.startAt ? (EmailSender.lateCancellationByGuestForHost(r, t, n, e.numberOfGuests), EmailSender.cancellationByGuestWithNoRefund(r, t, n, e.numberOfGuests, e.total)) : (1 == e.status && (0 != e.total && P(e), Meals.update({ _id: e.mealId }, { $inc: { numberOfAcceptedGuests: -e.numberOfGuests } })), EmailSender.cancellationByGuestForHost(r, t, n, e.numberOfGuests), EmailSender.cancellationByGuest(r, t, n, e.numberOfGuests, e.total)), Orders.update({ _id: e._id }, { $set: { status: -2 } })
    },
    k = function (e, t) {
      Meals.update({ _id: e }, { $set: { status: -1 } });
      var r = Meals.findOne({ _id: e }); CreateNotification(2, 4, e, r.hostId, r.hostId);
      var n = Meteor.users.findOne({ _id: r.hostId }), o = Orders.find({ mealId: e });
      o.forEach(function (o) {
        var i = Meteor.users.findOne({ _id: o.userId });
        CreateNotification(2, 2, e, o.hostId, o.userId), 0 == o.status ? 0 != o.total &&
        E(o) : 1 == o.status && P(o), Orders.update({ _id: o._id },
            { $set: { status: -3 } }), nexmoSender.cancellationByHostForGuest(i, n, r),
        EmailSender.cancellationEmailforGuest(i, r, n, o.numberOfGuests, o.total, t)
      }), EmailSender.cancellationByHost(r, n), nexmoSender.cancellationByHost(n, r)
    },
    T = function (e) { var t = Orders.update({ mealId: e }, { $set: { status: 0 } }) },
    A = function (e) {
      var t = Orders.update({ mealId: e },
          { $set: { status: 1 } })
    },
    E = function (e) {
      Orders.update({ _id: e._id },
          { $set: { "braintree.status": -1 } }),
      gateway.transaction.void(e.braintree.transactionId,
          function (t, r) {
            r.success ? console.log("Payment (OrderId: " + e._id + ") voided successcully")
                : (console.log("Payment (OrderId: " + e._id + ") voided failed"),
            console.log(r.message))
          })
    },
    C = function (e) {
      Orders.update({ _id: e._id },
          { $set: { "braintree.status": 1 } }),
      gateway.transaction.submitForSettlement(e.braintree.transactionId,
          function (t, r) {
            r.success ? console.log("Payment (OrderId: " + e._id +
                ") settle submitted successcully") :
            (console.log("Payment (OrderId: " + e._id + ") settle failed"),
            console.log(r.message))
          })
    },
    P = function (e) {
      Orders.update({ _id: e._id }, { $set: { "braintree.status": -2 } }),

      gateway.transaction.refund(e.braintree.transactionId,

          function (t, r) {
            r && r.success ? console.log("Payment (OrderId: " + e._id +
                ") refunded successfully") :
            "Cannot refund a transaction unless it is settled." ==
            r.message ? gateway.transaction.void(e.braintree.transactionId,
                function (t, r) {
                  r.success ? console.log("Payment (OrderId: " + e._id +
                      ") voided successcully") :
                  (console.log("Payment (OrderId: " + e._id +
                      ") voided failed"), console.log(r.message))
                }) : (console.log("Payment (OrderId: " + e._id +
                ") refund failed"), console.log(r.message))
          })
    };
    Accounts.emailTemplates.from = "Plenry <automated@plenry.com>",
    Accounts.emailTemplates.siteName = "Plenry",
    Accounts.emailTemplates.verifyEmail.subject = function (e) {
      return "Please Confirm Your Email Address"
    },
    Accounts.emailTemplates.verifyEmail.html = function (e, t) {
      var r = Npm.require("fs"), n = Meteor.wrapAsync(r.readFile);
      try {
        var o = n(process.env.PWD + "/emailTemplates/email_confirmation.template"),
            i = o.toString(), s = i.replace(/"/g, "'");
        return s = s.replace(/&userFirstName&/g, e.profile.firstName),
            s = s.replace(/&confirmationUrl&/g, t)
      } catch (a) { return void console.log(a) }
    };
    var L = function (e, t) {
      if (e.profile.lastUpdate = new Date, e.profile.thumbnail && e.profile.thumbnail.org) {
        var r = Meteor.wrapAsync(Cloudinary.uploader.upload);
        try { r(e.profile.thumbnail.org) }
        catch (n) { e.profile.thumbnail.cloudinaryPublicId = n.public_id }
      } else e.profile.thumbnail = Meteor.user().profile.thumbnail;
      e.profile.phone = Meteor.users.findOne({ _id: t }).profile.phone,
      Meteor.users.update({ _id: t }, { $set: e })
    },
    D = function (e, t) {
      var r = { org: e },
          n = Meteor.wrapAsync(Cloudinary.uploader.upload);
      try { n(r.org) }
      catch (o) { r.cloudinaryPublicId = o.public_id }
      Meteor.users.update({ _id: t }, { $set: { "profile.thumbnail": r } })
    };
    CreateNotification = function (e, t, r, n, o) {
      var i = { hidden: false }; i.type = e,
      i.subType = t, i.fromUserId = n, i.toUserId = o, i.mealId = r;
      var s = Notifications.findOne(i); if (s)
        return void Logger.log("Notification already exist");
      var a = {}; if (a.type = e, a.subType = t,
          a.createdAt = new Date, a.hidden = false, a.mealId = r, a.fromUserId = n,
          a.toUserId = o, e = 0) {
        var u = Meals.findOne(r), d = u.time.endAt ||
            u.time.startAt, l = new Date(d);
        l.setDate(l.getDate() + 14), a.expiredAt = l
      }
      return 1 != e || 1 != t && 2 != t
          || (Notifications.update({ type: 1, subType: 0, mealId: r, toUserId: o },
          { $set: { hidden: true } }),
          Notifications.update({ type: 1, subType: 3, mealId: r, toUserId: n, fromUserId: o },
          { $set: { hidden: true } })), Notifications.insert(a)
    };
    var G = function (e, t) {
      Meteor.users.update({ _id: e },
          { $set: { "idVerification.scanRef": t, "idVerification.status": 1 } })
    },
    R = function (e, t) {
      for (var r = "9db1d946", n = "ba8229cf", o = Math.floor(1e4 * Math.random()).toString(),
          i = 0; i < 4 - o.length; i++) o = "0" + o;
      var s = {
        headers: {
          Accept: "application/json",
          "Content-type": "application/x-www-form-urlencoded",
          "Content-Length": 0
        }
      },
      a = "https://rest.nexmo.com/sc/us/2fa/json?api_key=" + r + "&api_secret=" + n +
      "&to=1" + t + "&pin=" + o;
      HTTP.call("POST", a, s, function (r, n) {
        if (r)
          throw new Error("internal-error", "Sorry our server cannot send you the message; please try again later");
        Meteor.users.update({ _id: e },
            {
              $set: {
                "phoneVerification.status": 2, "profile.phone": t,
                "phoneVerification.code": o
              }
            })
      })
    },
    N = function (e) {
      var t = "https://netverify.com/api/netverify/v2/initiateNetverify",
          r = "da8fb0a8-2677-456c-b936-be2ccc66122d",
          n = "qqC7fN8dDopJVlILS7YA9TEQB6vRx9w0",
          o = "Plenry Plenry/1.0.0", i = "Basic " +
          new Buffer(r + ":" + n).toString("base64"),
          s = {
            Accept: "application/json",
            "Content-type": "application/json", "User-Agent": o,
            Authorization: i
          },
          a = {
            merchantIdScanReference: e,
            successUrl: "http://plenry.com/jumio_call_back",
            errorUrl: "http://plenry.com/jumio_call_back",
            callbackUrl: "http://plenry.com"
          },
          u = HTTP.call("Post", t, { data: a, headers: s });
      return u.data.clientRedirectUrl
    },
    x = function (e, t) {
      var r = Notifications.findOne({ _id: e });
      if (!r || t != r.toUserId)
        throw new Meteor.Error("User not authorized");
      Notifications.update({ _id: e }, { $set: { hidden: true } })
    },
    U = function (e, t) {
      Accounts.setPassword(t, e)
    },
    F = function (e, t) {
      Meteor.users.update({ _id: t }, { $set: { bank: e } })
    },
    V = function (e, t) {
      if (Logger.log("Verifying Edu Email...."), !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/.test(t)) throw new Meteor.Error("invalid-params", "It is not a valid EDU email"); Meteor.users.update({ _id: e }, { $addToSet: { emails: { address: t } } }, function (e) { if (e) throw new Meteor.Error("internal-error", "User not authorized") }), Accounts.sendVerificationEmail(e, t)
    },
    H = function (e) {
      var t = Meteor.users.findOne({ _id: e }),
          r = HTTP.get("https://graph.facebook.com/me/friends?access_token=" +
          t.services.facebook.accessToken), n = r.data.summary.total_count;
      return n > 100 ? (Meteor.users.update({ _id: e },
          {
            $set: {
              "facebookQualification.status": 1,
              "services.facebook.numberOfFriends": n
            }
          }), true) : (Meteor.users.update({ _id: e },
          {
            $set: {
              "facebookQualification.status": 0,
              "services.facebook.numberOfFriends": n
            }
          }), false)
    },
    Y = function (e, t) {
      Inbox.update({ _id: t }, { $push: { readBy: e } })
    },
    z = function (e, t, r) {
      messageSender.sendToIndividual(e, t, r)
    },
    q = function (e) {
      var t = [], r = Orders.find({
        $and: [{ status: 1 },
            { $or: [{ userId: e }, { hostId: e }] }]
      }, { fields: { mealId: 1, _id: 0, status: 1 } });
      r.forEach(function (e) { t.push(e.mealId) });
      var n = v(t), o = []; n.forEach(function (e) {
        var t = Meals.findOne({ _id: e, status: 1 },
            { fields: { hostId: 1, _id: 0, status: 1 } });
        if (t) { var r = t.hostId; o.push(r) }
        var n = Orders.find({ status: 1, mealId: e },
            { fields: { userId: 1, _id: 0 } });
        n.forEach(function (e) {
          o.push(e.userId)
        })
      }), o = _.without(o, e);
      var i = v(o); i = i.filter(function (e) {
        return void 0 != e
      }), Meteor.users.update({ _id: e },
          { $set: { contacts: i } })
    },
    B = function (e) {
      var t = [], r = Orders.find({
        $and: [{ status: 1 },
            { $or: [{ userId: e }, { hostId: e }] }]
      }, { fields: { mealId: 1, _id: 0 } });
      r.forEach(function (e) {
        t.push(e.mealId)
      });
      var n = v(t); Meteor.users.update({ _id: e },
          { $set: { events: n } })
    },
    Q = function (e) {
      var t = Meteor.users.find({}, { fields: { _id: 1 } });
      t.forEach(function (e) {
        q(e._id), B(e._id)
      })
    },
    j = function (e) {
      var t = [],
          r = Meteor.users.find({ createdAt: { $gte: new Date(e) } },
          { fields: { emails: 1 }, sort: { createdAt: -1 } });
      r.forEach(function (e) {
        var r = e.emails[0].address.toLowerCase();
        t.push(r)
      }), console.log(t)
    },
    W = function (e, t) {
      Meteor.users.update({ _id: e },
          { $set: { payout: { method: 0, address: t } } })
    },
    Z = function (e, t) {
      return Orders.find({
        $and: [{ status: 1 },
            { $or: [{ userId: e }, { hostId: e }] }]
      })
    },
    J = function (e, t) {
      var r = new Date,
          n = Orders.find({
            $and: [{ mealEndAt: { $lt: r } }, { status: 1 },
                { $or: [{ userId: e }, { hostId: e }] }]
          }, { field: { mealId: 1 } }),
          o = Orders.find({
            $and: [{ mealEndAt: { $lt: r } },
                { status: 1 }, { $or: [{ userId: t }, { hostId: t }] }]
          }, { field: { mealId: 1 } }), i = {}; n.forEach(function (e) {
            i[e.mealId] = 0
          }), o.forEach(function (e) {
            0 == i[e.mealId] && (i[e.mealId] = 1)
          });
      var s = [];
      for (var a in i) 1 == i[a] && s.push(a);
      return s
    },
    K = function (e, t) {
      var r = Meteor.wrapAsync(Cloudinary.uploader.upload);
      try { r(e.cover.org) } catch (n) { e.cover.cloudinaryPublicId = n.public_id }
      Meals.update({ _id: t }, {
        $set: {
          autoAccept: e.autoAccept, title:
              e.title, summary: e.summary, pricePerGuest: e.pricePerGuest,
          maxParty: e.maxParty, time: e.time, placeType: e.placeType,
          environment: e.environment, interaction: e.interaction,
          note: e.note, location: e.location, updatedAt: new Date,
          address: e.address, questionForGuest: e.questionForGuest,
          cover: e.cover
        }
      }, function (e, t) { return t })
    };
    Meteor.startup(function () {
      var e = Meteor.npmRequire("braintree");
      gateway = e.connect({
        environment:
            e.Environment.Production, publicKey:
                Meteor.settings.braintree.publicKey, privateKey:
                    Meteor.settings.braintree.privateKey, merchantId:
                        Meteor.settings.braintree.merchantId
      }), Cloudinary.config({
        cloud_name: "plenry", api_key: "391732461231266",
        api_secret: "hcMfSQu5FdwZ822O4gdAwRekQOY"
      }), Meteor.setInterval(function () {
        Queue.run()
      }, 15e3),
      Meteor.setInterval(function () {
        Queue.purgeOldLocks()
      }, 6e4),
      Meteor.setInterval(function () {
        Queue.purgeCompletedTasks()
      }, 432e5),
      Meteor.setInterval(function () {
        Queue.purgeLogs()
      }, 432e5),
      Houston.add_collection(Meteor.users),
      Houston.add_collection(Houston._admins)
    })
  }
}();