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

