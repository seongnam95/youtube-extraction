function V3() {
  import.meta.url, import('_').catch(() => 1);
  async function* e() {}
}
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === 'childList')
        for (const i of s.addedNodes) i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i);
  }).observe(document, {
    childList: !0,
    subtree: !0,
  });
  function n(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : o.crossOrigin === 'anonymous'
          ? (s.credentials = 'omit')
          : (s.credentials = 'same-origin'),
      s
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = n(o);
    fetch(o.href, s);
  }
})();
function To(e, t) {
  const n = Object.create(null),
    r = e.split(',');
  for (let o = 0; o < r.length; o++) n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
function xo(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        o = xe(r) ? Ua(r) : xo(r);
      if (o) for (const s in o) t[s] = o[s];
    }
    return t;
  } else {
    if (xe(e)) return e;
    if (me(e)) return e;
  }
}
const Va = /;(?![^(]*\))/g,
  Ba = /:([^]+)/,
  ja = new RegExp('\\/\\*.*?\\*\\/', 'gs');
function Ua(e) {
  const t = {};
  return (
    e
      .replace(ja, '')
      .split(Va)
      .forEach((n) => {
        if (n) {
          const r = n.split(Ba);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Ro(e) {
  let t = '';
  if (xe(e)) t = e;
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ro(e[n]);
      r && (t += r + ' ');
    }
  else if (me(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
const Wa = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Ka = To(Wa);
function Xi(e) {
  return !!e || e === '';
}
function Ga(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++) n = Mr(e[r], t[r]);
  return n;
}
function Mr(e, t) {
  if (e === t) return !0;
  let n = gs(e),
    r = gs(t);
  if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
  if (((n = Rn(e)), (r = Rn(t)), n || r)) return e === t;
  if (((n = q(e)), (r = q(t)), n || r)) return n && r ? Ga(e, t) : !1;
  if (((n = me(e)), (r = me(t)), n || r)) {
    if (!n || !r) return !1;
    const o = Object.keys(e).length,
      s = Object.keys(t).length;
    if (o !== s) return !1;
    for (const i in e) {
      const a = e.hasOwnProperty(i),
        l = t.hasOwnProperty(i);
      if ((a && !l) || (!a && l) || !Mr(e[i], t[i])) return !1;
    }
  }
  return String(e) === String(t);
}
function qa(e, t) {
  return e.findIndex((n) => Mr(n, t));
}
const Br = (e) =>
    xe(e)
      ? e
      : e == null
        ? ''
        : q(e) || (me(e) && (e.toString === tl || !Z(e.toString)))
          ? JSON.stringify(e, Qi, 2)
          : String(e),
  Qi = (e, t) =>
    t && t.__v_isRef
      ? Qi(e, t.value)
      : tn(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, o]) => ((n[`${r} =>`] = o), n), {}),
          }
        : Ar(t)
          ? {
              [`Set(${t.size})`]: [...t.values()],
            }
          : me(t) && !q(t) && !nl(t)
            ? String(t)
            : t,
  _e = {},
  en = [],
  tt = () => {},
  Ya = () => !1,
  Ja = /^on[^a-z]/,
  Cr = (e) => Ja.test(e),
  So = (e) => e.startsWith('onUpdate:'),
  Ve = Object.assign,
  ko = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Za = Object.prototype.hasOwnProperty,
  oe = (e, t) => Za.call(e, t),
  q = Array.isArray,
  tn = (e) => $n(e) === '[object Map]',
  Ar = (e) => $n(e) === '[object Set]',
  gs = (e) => $n(e) === '[object Date]',
  Z = (e) => typeof e == 'function',
  xe = (e) => typeof e == 'string',
  Rn = (e) => typeof e == 'symbol',
  me = (e) => e !== null && typeof e == 'object',
  el = (e) => me(e) && Z(e.then) && Z(e.catch),
  tl = Object.prototype.toString,
  $n = (e) => tl.call(e),
  Xa = (e) => $n(e).slice(8, -1),
  nl = (e) => $n(e) === '[object Object]',
  Io = (e) => xe(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  rr = To(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
  ),
  Pr = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Qa = /-(\w)/g,
  mt = Pr((e) => e.replace(Qa, (t, n) => (n ? n.toUpperCase() : ''))),
  e1 = /\B([A-Z])/g,
  Ut = Pr((e) => e.replace(e1, '-$1').toLowerCase()),
  Or = Pr((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  jr = Pr((e) => (e ? `on${Or(e)}` : '')),
  Sn = (e, t) => !Object.is(e, t),
  or = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  ur = (e, t, n) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      value: n,
    });
  },
  fr = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let ys;
const t1 = () =>
  ys ||
  (ys =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {});
let Ge;
class rl {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ge),
      !t && Ge && (this.index = (Ge.scopes || (Ge.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Ge;
      try {
        return (Ge = this), t();
      } finally {
        Ge = n;
      }
    }
  }
  on() {
    Ge = this;
  }
  off() {
    Ge = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function ol(e) {
  return new rl(e);
}
function n1(e, t = Ge) {
  t && t.active && t.effects.push(e);
}
function sl() {
  return Ge;
}
function r1(e) {
  Ge && Ge.cleanups.push(e);
}
const Lo = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  il = (e) => (e.w & Pt) > 0,
  ll = (e) => (e.n & Pt) > 0,
  o1 = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Pt;
  },
  s1 = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const o = t[r];
        il(o) && !ll(o) ? o.delete(e) : (t[n++] = o), (o.w &= ~Pt), (o.n &= ~Pt);
      }
      t.length = n;
    }
  },
  dr = new WeakMap();
let zn = 0,
  Pt = 1;
const to = 30;
let Qe;
const $t = Symbol(''),
  no = Symbol('');
class Ho {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      n1(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Qe,
      n = Mt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Qe),
        (Qe = this),
        (Mt = !0),
        (Pt = 1 << ++zn),
        zn <= to ? o1(this) : vs(this),
        this.fn()
      );
    } finally {
      zn <= to && s1(this),
        (Pt = 1 << --zn),
        (Qe = this.parent),
        (Mt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Qe === this
      ? (this.deferStop = !0)
      : this.active && (vs(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function vs(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Mt = !0;
const al = [];
function dn() {
  al.push(Mt), (Mt = !1);
}
function hn() {
  const e = al.pop();
  Mt = e === void 0 ? !0 : e;
}
function We(e, t, n) {
  if (Mt && Qe) {
    let r = dr.get(e);
    r || dr.set(e, (r = new Map()));
    let o = r.get(n);
    o || r.set(n, (o = Lo())), cl(o);
  }
}
function cl(e, t) {
  let n = !1;
  zn <= to ? ll(e) || ((e.n |= Pt), (n = !il(e))) : (n = !e.has(Qe)), n && (e.add(Qe), Qe.deps.push(e));
}
function gt(e, t, n, r, o, s) {
  const i = dr.get(e);
  if (!i) return;
  let a = [];
  if (t === 'clear') a = [...i.values()];
  else if (n === 'length' && q(e)) {
    const l = Number(r);
    i.forEach((c, u) => {
      (u === 'length' || u >= l) && a.push(c);
    });
  } else
    switch ((n !== void 0 && a.push(i.get(n)), t)) {
      case 'add':
        q(e) ? Io(n) && a.push(i.get('length')) : (a.push(i.get($t)), tn(e) && a.push(i.get(no)));
        break;
      case 'delete':
        q(e) || (a.push(i.get($t)), tn(e) && a.push(i.get(no)));
        break;
      case 'set':
        tn(e) && a.push(i.get($t));
        break;
    }
  if (a.length === 1) a[0] && ro(a[0]);
  else {
    const l = [];
    for (const c of a) c && l.push(...c);
    ro(Lo(l));
  }
}
function ro(e, t) {
  const n = q(e) ? e : [...e];
  for (const r of n) r.computed && bs(r);
  for (const r of n) r.computed || bs(r);
}
function bs(e, t) {
  (e !== Qe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function i1(e, t) {
  var n;
  return (n = dr.get(e)) === null || n === void 0 ? void 0 : n.get(t);
}
const l1 = To('__proto__,__v_isRef,__isVue'),
  ul = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Rn),
  ),
  a1 = Do(),
  c1 = Do(!1, !0),
  u1 = Do(!0),
  zs = f1();
function f1() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const r = le(this);
        for (let s = 0, i = this.length; s < i; s++) We(r, 'get', s + '');
        const o = r[t](...n);
        return o === -1 || o === !1 ? r[t](...n.map(le)) : o;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        dn();
        const r = le(this)[t].apply(this, n);
        return hn(), r;
      };
    }),
    e
  );
}
function d1(e) {
  const t = le(this);
  return We(t, 'has', e), t.hasOwnProperty(e);
}
function Do(e = !1, t = !1) {
  return function (r, o, s) {
    if (o === '__v_isReactive') return !e;
    if (o === '__v_isReadonly') return e;
    if (o === '__v_isShallow') return t;
    if (o === '__v_raw' && s === (e ? (t ? O1 : pl) : t ? ml : hl).get(r)) return r;
    const i = q(r);
    if (!e) {
      if (i && oe(zs, o)) return Reflect.get(zs, o, s);
      if (o === 'hasOwnProperty') return d1;
    }
    const a = Reflect.get(r, o, s);
    return (Rn(o) ? ul.has(o) : l1(o)) || (e || We(r, 'get', o), t)
      ? a
      : Oe(a)
        ? i && Io(o)
          ? a
          : a.value
        : me(a)
          ? e
            ? Vn(a)
            : Ot(a)
          : a;
  };
}
const h1 = fl(),
  m1 = fl(!0);
function fl(e = !1) {
  return function (n, r, o, s) {
    let i = n[r];
    if (sn(i) && Oe(i) && !Oe(o)) return !1;
    if (!e && (!hr(o) && !sn(o) && ((i = le(i)), (o = le(o))), !q(n) && Oe(i) && !Oe(o)))
      return (i.value = o), !0;
    const a = q(n) && Io(r) ? Number(r) < n.length : oe(n, r),
      l = Reflect.set(n, r, o, s);
    return n === le(s) && (a ? Sn(o, i) && gt(n, 'set', r, o) : gt(n, 'add', r, o)), l;
  };
}
function p1(e, t) {
  const n = oe(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && gt(e, 'delete', t, void 0), r;
}
function _1(e, t) {
  const n = Reflect.has(e, t);
  return (!Rn(t) || !ul.has(t)) && We(e, 'has', t), n;
}
function g1(e) {
  return We(e, 'iterate', q(e) ? 'length' : $t), Reflect.ownKeys(e);
}
const dl = {
    get: a1,
    set: h1,
    deleteProperty: p1,
    has: _1,
    ownKeys: g1,
  },
  y1 = {
    get: u1,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  v1 = Ve({}, dl, {
    get: c1,
    set: m1,
  }),
  No = (e) => e,
  Tr = (e) => Reflect.getPrototypeOf(e);
function Un(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = le(e),
    s = le(t);
  n || (t !== s && We(o, 'get', t), We(o, 'get', s));
  const { has: i } = Tr(o),
    a = r ? No : n ? Vo : kn;
  if (i.call(o, t)) return a(e.get(t));
  if (i.call(o, s)) return a(e.get(s));
  e !== o && e.get(t);
}
function Wn(e, t = !1) {
  const n = this.__v_raw,
    r = le(n),
    o = le(e);
  return t || (e !== o && We(r, 'has', e), We(r, 'has', o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function Kn(e, t = !1) {
  return (e = e.__v_raw), !t && We(le(e), 'iterate', $t), Reflect.get(e, 'size', e);
}
function ws(e) {
  e = le(e);
  const t = le(this);
  return Tr(t).has.call(t, e) || (t.add(e), gt(t, 'add', e, e)), this;
}
function Es(e, t) {
  t = le(t);
  const n = le(this),
    { has: r, get: o } = Tr(n);
  let s = r.call(n, e);
  s || ((e = le(e)), (s = r.call(n, e)));
  const i = o.call(n, e);
  return n.set(e, t), s ? Sn(t, i) && gt(n, 'set', e, t) : gt(n, 'add', e, t), this;
}
function Ms(e) {
  const t = le(this),
    { has: n, get: r } = Tr(t);
  let o = n.call(t, e);
  o || ((e = le(e)), (o = n.call(t, e))), r && r.call(t, e);
  const s = t.delete(e);
  return o && gt(t, 'delete', e, void 0), s;
}
function Cs() {
  const e = le(this),
    t = e.size !== 0,
    n = e.clear();
  return t && gt(e, 'clear', void 0, void 0), n;
}
function Gn(e, t) {
  return function (r, o) {
    const s = this,
      i = s.__v_raw,
      a = le(i),
      l = t ? No : e ? Vo : kn;
    return !e && We(a, 'iterate', $t), i.forEach((c, u) => r.call(o, l(c), l(u), s));
  };
}
function qn(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      s = le(o),
      i = tn(s),
      a = e === 'entries' || (e === Symbol.iterator && i),
      l = e === 'keys' && i,
      c = o[e](...r),
      u = n ? No : t ? Vo : kn;
    return (
      !t && We(s, 'iterate', l ? no : $t),
      {
        next() {
          const { value: f, done: d } = c.next();
          return d
            ? {
                value: f,
                done: d,
              }
            : {
                value: a ? [u(f[0]), u(f[1])] : u(f),
                done: d,
              };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function vt(e) {
  return function (...t) {
    return e === 'delete' ? !1 : this;
  };
}
function b1() {
  const e = {
      get(s) {
        return Un(this, s);
      },
      get size() {
        return Kn(this);
      },
      has: Wn,
      add: ws,
      set: Es,
      delete: Ms,
      clear: Cs,
      forEach: Gn(!1, !1),
    },
    t = {
      get(s) {
        return Un(this, s, !1, !0);
      },
      get size() {
        return Kn(this);
      },
      has: Wn,
      add: ws,
      set: Es,
      delete: Ms,
      clear: Cs,
      forEach: Gn(!1, !0),
    },
    n = {
      get(s) {
        return Un(this, s, !0);
      },
      get size() {
        return Kn(this, !0);
      },
      has(s) {
        return Wn.call(this, s, !0);
      },
      add: vt('add'),
      set: vt('set'),
      delete: vt('delete'),
      clear: vt('clear'),
      forEach: Gn(!0, !1),
    },
    r = {
      get(s) {
        return Un(this, s, !0, !0);
      },
      get size() {
        return Kn(this, !0);
      },
      has(s) {
        return Wn.call(this, s, !0);
      },
      add: vt('add'),
      set: vt('set'),
      delete: vt('delete'),
      clear: vt('clear'),
      forEach: Gn(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((s) => {
      (e[s] = qn(s, !1, !1)), (n[s] = qn(s, !0, !1)), (t[s] = qn(s, !1, !0)), (r[s] = qn(s, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [z1, w1, E1, M1] = b1();
function Fo(e, t) {
  const n = t ? (e ? M1 : E1) : e ? w1 : z1;
  return (r, o, s) =>
    o === '__v_isReactive'
      ? !e
      : o === '__v_isReadonly'
        ? e
        : o === '__v_raw'
          ? r
          : Reflect.get(oe(n, o) && o in r ? n : r, o, s);
}
const C1 = {
    get: Fo(!1, !1),
  },
  A1 = {
    get: Fo(!1, !0),
  },
  P1 = {
    get: Fo(!0, !1),
  },
  hl = new WeakMap(),
  ml = new WeakMap(),
  pl = new WeakMap(),
  O1 = new WeakMap();
function T1(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function x1(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : T1(Xa(e));
}
function Ot(e) {
  return sn(e) ? e : $o(e, !1, dl, C1, hl);
}
function R1(e) {
  return $o(e, !1, v1, A1, ml);
}
function Vn(e) {
  return $o(e, !0, y1, P1, pl);
}
function $o(e, t, n, r, o) {
  if (!me(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const s = o.get(e);
  if (s) return s;
  const i = x1(e);
  if (i === 0) return e;
  const a = new Proxy(e, i === 2 ? r : n);
  return o.set(e, a), a;
}
function nn(e) {
  return sn(e) ? nn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function sn(e) {
  return !!(e && e.__v_isReadonly);
}
function hr(e) {
  return !!(e && e.__v_isShallow);
}
function _l(e) {
  return nn(e) || sn(e);
}
function le(e) {
  const t = e && e.__v_raw;
  return t ? le(t) : e;
}
function gl(e) {
  return ur(e, '__v_skip', !0), e;
}
const kn = (e) => (me(e) ? Ot(e) : e),
  Vo = (e) => (me(e) ? Vn(e) : e);
function Bo(e) {
  Mt && Qe && ((e = le(e)), cl(e.dep || (e.dep = Lo())));
}
function jo(e, t) {
  e = le(e);
  const n = e.dep;
  n && ro(n);
}
function Oe(e) {
  return !!(e && e.__v_isRef === !0);
}
function ce(e) {
  return yl(e, !1);
}
function wn(e) {
  return yl(e, !0);
}
function yl(e, t) {
  return Oe(e) ? e : new S1(e, t);
}
class S1 {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : le(t)),
      (this._value = n ? t : kn(t));
  }
  get value() {
    return Bo(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || hr(t) || sn(t);
    (t = n ? t : le(t)),
      Sn(t, this._rawValue) && ((this._rawValue = t), (this._value = n ? t : kn(t)), jo(this));
  }
}
function nt(e) {
  return Oe(e) ? e.value : e;
}
const k1 = {
  get: (e, t, n) => nt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return Oe(o) && !Oe(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function vl(e) {
  return nn(e) ? e : new Proxy(e, k1);
}
class I1 {
  constructor(t) {
    (this.dep = void 0), (this.__v_isRef = !0);
    const { get: n, set: r } = t(
      () => Bo(this),
      () => jo(this),
    );
    (this._get = n), (this._set = r);
  }
  get value() {
    return this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function L1(e) {
  return new I1(e);
}
class H1 {
  constructor(t, n, r) {
    (this._object = t), (this._key = n), (this._defaultValue = r), (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return i1(le(this._object), this._key);
  }
}
function bl(e, t, n) {
  const r = e[t];
  return Oe(r) ? r : new H1(e, t, n);
}
var zl;
class D1 {
  constructor(t, n, r, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[zl] = !1),
      (this._dirty = !0),
      (this.effect = new Ho(t, () => {
        this._dirty || ((this._dirty = !0), jo(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = le(this);
    return Bo(t), (t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
zl = '__v_isReadonly';
function N1(e, t, n = !1) {
  let r, o;
  const s = Z(e);
  return s ? ((r = e), (o = tt)) : ((r = e.get), (o = e.set)), new D1(r, o, s || !o, n);
}
function Ct(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (s) {
    xr(s, t, n);
  }
  return o;
}
function rt(e, t, n, r) {
  if (Z(e)) {
    const s = Ct(e, t, n, r);
    return (
      s &&
        el(s) &&
        s.catch((i) => {
          xr(i, t, n);
        }),
      s
    );
  }
  const o = [];
  for (let s = 0; s < e.length; s++) o.push(rt(e[s], t, n, r));
  return o;
}
function xr(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy,
      a = n;
    for (; s; ) {
      const c = s.ec;
      if (c) {
        for (let u = 0; u < c.length; u++) if (c[u](e, i, a) === !1) return;
      }
      s = s.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      Ct(l, null, 10, [e, i, a]);
      return;
    }
  }
  F1(e, n, o, r);
}
function F1(e, t, n, r = !0) {
  console.error(e);
}
let In = !1,
  oo = !1;
const De = [];
let ft = 0;
const rn = [];
let _t = null,
  Ht = 0;
const wl = Promise.resolve();
let Uo = null;
function Wt(e) {
  const t = Uo || wl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function $1(e) {
  let t = ft + 1,
    n = De.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    Ln(De[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Wo(e) {
  (!De.length || !De.includes(e, In && e.allowRecurse ? ft + 1 : ft)) &&
    (e.id == null ? De.push(e) : De.splice($1(e.id), 0, e), El());
}
function El() {
  !In && !oo && ((oo = !0), (Uo = wl.then(Cl)));
}
function V1(e) {
  const t = De.indexOf(e);
  t > ft && De.splice(t, 1);
}
function B1(e) {
  q(e) ? rn.push(...e) : (!_t || !_t.includes(e, e.allowRecurse ? Ht + 1 : Ht)) && rn.push(e), El();
}
function As(e, t = In ? ft + 1 : 0) {
  for (; t < De.length; t++) {
    const n = De[t];
    n && n.pre && (De.splice(t, 1), t--, n());
  }
}
function Ml(e) {
  if (rn.length) {
    const t = [...new Set(rn)];
    if (((rn.length = 0), _t)) {
      _t.push(...t);
      return;
    }
    for (_t = t, _t.sort((n, r) => Ln(n) - Ln(r)), Ht = 0; Ht < _t.length; Ht++) _t[Ht]();
    (_t = null), (Ht = 0);
  }
}
const Ln = (e) => (e.id == null ? 1 / 0 : e.id),
  j1 = (e, t) => {
    const n = Ln(e) - Ln(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Cl(e) {
  (oo = !1), (In = !0), De.sort(j1);
  const t = tt;
  try {
    for (ft = 0; ft < De.length; ft++) {
      const n = De[ft];
      n && n.active !== !1 && Ct(n, null, 14);
    }
  } finally {
    (ft = 0), (De.length = 0), Ml(), (In = !1), (Uo = null), (De.length || rn.length) && Cl();
  }
}
function U1(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || _e;
  let o = n;
  const s = t.startsWith('update:'),
    i = s && t.slice(7);
  if (i && i in r) {
    const u = `${i === 'modelValue' ? 'model' : i}Modifiers`,
      { number: f, trim: d } = r[u] || _e;
    d && (o = n.map((p) => (xe(p) ? p.trim() : p))), f && (o = n.map(fr));
  }
  let a,
    l = r[(a = jr(t))] || r[(a = jr(mt(t)))];
  !l && s && (l = r[(a = jr(Ut(t)))]), l && rt(l, e, 6, o);
  const c = r[a + 'Once'];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), rt(c, e, 6, o);
  }
}
function Al(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e);
  if (o !== void 0) return o;
  const s = e.emits;
  let i = {},
    a = !1;
  if (!Z(e)) {
    const l = (c) => {
      const u = Al(c, t, !0);
      u && ((a = !0), Ve(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !s && !a
    ? (me(e) && r.set(e, null), null)
    : (q(s) ? s.forEach((l) => (i[l] = null)) : Ve(i, s), me(e) && r.set(e, i), i);
}
function Rr(e, t) {
  return !e || !Cr(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      oe(e, t[0].toLowerCase() + t.slice(1)) || oe(e, Ut(t)) || oe(e, t));
}
let He = null,
  Sr = null;
function mr(e) {
  const t = He;
  return (He = e), (Sr = (e && e.type.__scopeId) || null), t;
}
function B3(e) {
  Sr = e;
}
function j3() {
  Sr = null;
}
function sr(e, t = He, n) {
  if (!t || e._n) return e;
  const r = (...o) => {
    r._d && Ds(-1);
    const s = mr(t);
    let i;
    try {
      i = e(...o);
    } finally {
      mr(s), r._d && Ds(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Ur(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: s,
    propsOptions: [i],
    slots: a,
    attrs: l,
    emit: c,
    render: u,
    renderCache: f,
    data: d,
    setupState: p,
    ctx: m,
    inheritAttrs: g,
  } = e;
  let v, y;
  const z = mr(e);
  try {
    if (n.shapeFlag & 4) {
      const S = o || r;
      (v = ct(u.call(S, S, f, s, p, d, m))), (y = l);
    } else {
      const S = t;
      (v = ct(
        S.length > 1
          ? S(s, {
              attrs: l,
              slots: a,
              emit: c,
            })
          : S(s, null),
      )),
        (y = t.props ? l : W1(l));
    }
  } catch (S) {
    (An.length = 0), xr(S, e, 1), (v = de(Tt));
  }
  let C = v;
  if (y && g !== !1) {
    const S = Object.keys(y),
      { shapeFlag: O } = C;
    S.length && O & 7 && (i && S.some(So) && (y = K1(y, i)), (C = ln(C, y)));
  }
  return (
    n.dirs && ((C = ln(C)), (C.dirs = C.dirs ? C.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (C.transition = n.transition),
    (v = C),
    mr(z),
    v
  );
}
const W1 = (e) => {
    let t;
    for (const n in e) (n === 'class' || n === 'style' || Cr(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  K1 = (e, t) => {
    const n = {};
    for (const r in e) (!So(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function G1(e, t, n) {
  const { props: r, children: o, component: s } = e,
    { props: i, children: a, patchFlag: l } = t,
    c = s.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return r ? Ps(r, i, c) : !!i;
    if (l & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const d = u[f];
        if (i[d] !== r[d] && !Rr(c, d)) return !0;
      }
    }
  } else return (o || a) && (!a || !a.$stable) ? !0 : r === i ? !1 : r ? (i ? Ps(r, i, c) : !0) : !!i;
  return !1;
}
function Ps(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (t[s] !== e[s] && !Rr(n, s)) return !0;
  }
  return !1;
}
function q1({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Y1 = (e) => e.__isSuspense;
function J1(e, t) {
  t && t.pendingBranch ? (q(e) ? t.effects.push(...e) : t.effects.push(e)) : B1(e);
}
function ir(e, t) {
  if (Ae) {
    let n = Ae.provides;
    const r = Ae.parent && Ae.parent.provides;
    r === n && (n = Ae.provides = Object.create(r)), (n[e] = t);
  }
}
function Ue(e, t, n = !1) {
  const r = Ae || He;
  if (r) {
    const o = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && Z(t) ? t.call(r.proxy) : t;
  }
}
function Pl(e, t) {
  return Ko(e, null, t);
}
const Yn = {};
function Re(e, t, n) {
  return Ko(e, t, n);
}
function Ko(e, t, { immediate: n, deep: r, flush: o, onTrack: s, onTrigger: i } = _e) {
  const a = sl() === (Ae == null ? void 0 : Ae.scope) ? Ae : null;
  let l,
    c = !1,
    u = !1;
  if (
    (Oe(e)
      ? ((l = () => e.value), (c = hr(e)))
      : nn(e)
        ? ((l = () => e), (r = !0))
        : q(e)
          ? ((u = !0),
            (c = e.some((C) => nn(C) || hr(C))),
            (l = () =>
              e.map((C) => {
                if (Oe(C)) return C.value;
                if (nn(C)) return Ft(C);
                if (Z(C)) return Ct(C, a, 2);
              })))
          : Z(e)
            ? t
              ? (l = () => Ct(e, a, 2))
              : (l = () => {
                  if (!(a && a.isUnmounted)) return f && f(), rt(e, a, 3, [d]);
                })
            : (l = tt),
    t && r)
  ) {
    const C = l;
    l = () => Ft(C());
  }
  let f,
    d = (C) => {
      f = y.onStop = () => {
        Ct(C, a, 4);
      };
    },
    p;
  if (Dn)
    if (((d = tt), t ? n && rt(t, a, 3, [l(), u ? [] : void 0, d]) : l(), o === 'sync')) {
      const C = Bc();
      p = C.__watcherHandles || (C.__watcherHandles = []);
    } else return tt;
  let m = u ? new Array(e.length).fill(Yn) : Yn;
  const g = () => {
    if (y.active)
      if (t) {
        const C = y.run();
        (r || c || (u ? C.some((S, O) => Sn(S, m[O])) : Sn(C, m))) &&
          (f && f(), rt(t, a, 3, [C, m === Yn ? void 0 : u && m[0] === Yn ? [] : m, d]), (m = C));
      } else y.run();
  };
  g.allowRecurse = !!t;
  let v;
  o === 'sync'
    ? (v = g)
    : o === 'post'
      ? (v = () => je(g, a && a.suspense))
      : ((g.pre = !0), a && (g.id = a.uid), (v = () => Wo(g)));
  const y = new Ho(l, v);
  t ? (n ? g() : (m = y.run())) : o === 'post' ? je(y.run.bind(y), a && a.suspense) : y.run();
  const z = () => {
    y.stop(), a && a.scope && ko(a.scope.effects, y);
  };
  return p && p.push(z), z;
}
function Z1(e, t, n) {
  const r = this.proxy,
    o = xe(e) ? (e.includes('.') ? Ol(r, e) : () => r[e]) : e.bind(r, r);
  let s;
  Z(t) ? (s = t) : ((s = t.handler), (n = t));
  const i = Ae;
  an(this);
  const a = Ko(o, s.bind(r), n);
  return i ? an(i) : Vt(), a;
}
function Ol(e, t) {
  const n = t.split('.');
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++) r = r[n[o]];
    return r;
  };
}
function Ft(e, t) {
  if (!me(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), Oe(e))) Ft(e.value, t);
  else if (q(e)) for (let n = 0; n < e.length; n++) Ft(e[n], t);
  else if (Ar(e) || tn(e))
    e.forEach((n) => {
      Ft(n, t);
    });
  else if (nl(e)) for (const n in e) Ft(e[n], t);
  return e;
}
function Go(e) {
  return Z(e)
    ? {
        setup: e,
        name: e.name,
      }
    : e;
}
const En = (e) => !!e.type.__asyncLoader,
  Tl = (e) => e.type.__isKeepAlive;
function qo(e, t) {
  xl(e, 'a', t);
}
function Yo(e, t) {
  xl(e, 'da', t);
}
function xl(e, t, n = Ae) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((kr(t, r, n), n)) {
    let o = n.parent;
    for (; o && o.parent; ) Tl(o.parent.vnode) && X1(r, t, n, o), (o = o.parent);
  }
}
function X1(e, t, n, r) {
  const o = kr(t, e, r, !0);
  mn(() => {
    ko(r[t], o);
  }, n);
}
function kr(e, t, n = Ae, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          dn(), an(n);
          const a = rt(t, n, e, i);
          return Vt(), hn(), a;
        });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const yt =
    (e) =>
    (t, n = Ae) =>
      (!Dn || e === 'sp') && kr(e, (...r) => t(...r), n),
  Q1 = yt('bm'),
  Bn = yt('m'),
  ec = yt('bu'),
  tc = yt('u'),
  Rl = yt('bum'),
  mn = yt('um'),
  nc = yt('sp'),
  rc = yt('rtg'),
  oc = yt('rtc');
function sc(e, t = Ae) {
  kr('ec', e, t);
}
function U3(e, t) {
  const n = He;
  if (n === null) return e;
  const r = Hr(n) || n.proxy,
    o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, a, l, c = _e] = t[s];
    i &&
      (Z(i) &&
        (i = {
          mounted: i,
          updated: i,
        }),
      i.deep && Ft(a),
      o.push({
        dir: i,
        instance: r,
        value: a,
        oldValue: void 0,
        arg: l,
        modifiers: c,
      }));
  }
  return e;
}
function kt(e, t, n, r) {
  const o = e.dirs,
    s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    s && (a.oldValue = s[i].value);
    let l = a.dir[r];
    l && (dn(), rt(l, n, 8, [e.el, a, e, t]), hn());
  }
}
const Sl = 'components';
function so(e, t) {
  return lc(Sl, e, !0, t) || e;
}
const ic = Symbol();
function lc(e, t, n = !0, r = !1) {
  const o = He || Ae;
  if (o) {
    const s = o.type;
    if (e === Sl) {
      const a = Fc(s, !1);
      if (a && (a === t || a === mt(t) || a === Or(mt(t)))) return s;
    }
    const i = Os(o[e] || s[e], t) || Os(o.appContext[e], t);
    return !i && r ? s : i;
  }
}
function Os(e, t) {
  return e && (e[t] || e[mt(t)] || e[Or(mt(t))]);
}
function Ts(e, t, n, r) {
  let o;
  const s = n && n[r];
  if (q(e) || xe(e)) {
    o = new Array(e.length);
    for (let i = 0, a = e.length; i < a; i++) o[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == 'number') {
    o = new Array(e);
    for (let i = 0; i < e; i++) o[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (me(e))
    if (e[Symbol.iterator]) o = Array.from(e, (i, a) => t(i, a, void 0, s && s[a]));
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let a = 0, l = i.length; a < l; a++) {
        const c = i[a];
        o[a] = t(e[c], c, a, s && s[a]);
      }
    }
  else o = [];
  return n && (n[r] = o), o;
}
function W3(e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (q(r)) for (let o = 0; o < r.length; o++) e[r[o].name] = r[o].fn;
    else
      r &&
        (e[r.name] = r.key
          ? (...o) => {
              const s = r.fn(...o);
              return s && (s.key = r.key), s;
            }
          : r.fn);
  }
  return e;
}
function K3(e, t, n = {}, r, o) {
  if (He.isCE || (He.parent && En(He.parent) && He.parent.isCE))
    return t !== 'default' && (n.name = t), de('slot', n, r && r());
  let s = e[t];
  s && s._c && (s._d = !1), dt();
  const i = s && kl(s(n)),
    a = Ir(
      Fe,
      {
        key: n.key || (i && i.key) || `_${t}`,
      },
      i || (r ? r() : []),
      i && e._ === 1 ? 64 : -2,
    );
  return !o && a.scopeId && (a.slotScopeIds = [a.scopeId + '-s']), s && s._c && (s._d = !0), a;
}
function kl(e) {
  return e.some((t) => (_r(t) ? !(t.type === Tt || (t.type === Fe && !kl(t.children))) : !0)) ? e : null;
}
const io = (e) => (e ? (Ul(e) ? Hr(e) || e.proxy : io(e.parent)) : null),
  Mn = Ve(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => io(e.parent),
    $root: (e) => io(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Jo(e),
    $forceUpdate: (e) => e.f || (e.f = () => Wo(e.update)),
    $nextTick: (e) => e.n || (e.n = Wt.bind(e.proxy)),
    $watch: (e) => Z1.bind(e),
  }),
  Wr = (e, t) => e !== _e && !e.__isScriptSetup && oe(e, t),
  ac = {
    get({ _: e }, t) {
      const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: a, appContext: l } = e;
      let c;
      if (t[0] !== '$') {
        const p = i[t];
        if (p !== void 0)
          switch (p) {
            case 1:
              return r[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return s[t];
          }
        else {
          if (Wr(r, t)) return (i[t] = 1), r[t];
          if (o !== _e && oe(o, t)) return (i[t] = 2), o[t];
          if ((c = e.propsOptions[0]) && oe(c, t)) return (i[t] = 3), s[t];
          if (n !== _e && oe(n, t)) return (i[t] = 4), n[t];
          lo && (i[t] = 0);
        }
      }
      const u = Mn[t];
      let f, d;
      if (u) return t === '$attrs' && We(e, 'get', t), u(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (n !== _e && oe(n, t)) return (i[t] = 4), n[t];
      if (((d = l.config.globalProperties), oe(d, t))) return d[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: s } = e;
      return Wr(o, t)
        ? ((o[t] = n), !0)
        : r !== _e && oe(r, t)
          ? ((r[t] = n), !0)
          : oe(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((s[t] = n), !0);
    },
    has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: s } }, i) {
      let a;
      return (
        !!n[i] ||
        (e !== _e && oe(e, i)) ||
        Wr(t, i) ||
        ((a = s[0]) && oe(a, i)) ||
        oe(r, i) ||
        oe(Mn, i) ||
        oe(o.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null ? (e._.accessCache[t] = 0) : oe(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let lo = !0;
function cc(e) {
  const t = Jo(e),
    n = e.proxy,
    r = e.ctx;
  (lo = !1), t.beforeCreate && xs(t.beforeCreate, e, 'bc');
  const {
    data: o,
    computed: s,
    methods: i,
    watch: a,
    provide: l,
    inject: c,
    created: u,
    beforeMount: f,
    mounted: d,
    beforeUpdate: p,
    updated: m,
    activated: g,
    deactivated: v,
    beforeDestroy: y,
    beforeUnmount: z,
    destroyed: C,
    unmounted: S,
    render: O,
    renderTracked: k,
    renderTriggered: T,
    errorCaptured: I,
    serverPrefetch: A,
    expose: N,
    inheritAttrs: B,
    components: J,
    directives: ze,
    filters: ge,
  } = t;
  if ((c && uc(c, r, null, e.appContext.config.unwrapInjectedRef), i))
    for (const Y in i) {
      const te = i[Y];
      Z(te) && (r[Y] = te.bind(n));
    }
  if (o) {
    const Y = o.call(n, n);
    me(Y) && (e.data = Ot(Y));
  }
  if (((lo = !0), s))
    for (const Y in s) {
      const te = s[Y],
        ve = Z(te) ? te.bind(n, n) : Z(te.get) ? te.get.bind(n, n) : tt,
        Ie = !Z(te) && Z(te.set) ? te.set.bind(n) : tt,
        Se = ie({
          get: ve,
          set: Ie,
        });
      Object.defineProperty(r, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => Se.value,
        set: (Ee) => (Se.value = Ee),
      });
    }
  if (a) for (const Y in a) Il(a[Y], r, n, Y);
  if (l) {
    const Y = Z(l) ? l.call(n) : l;
    Reflect.ownKeys(Y).forEach((te) => {
      ir(te, Y[te]);
    });
  }
  u && xs(u, e, 'c');
  function ee(Y, te) {
    q(te) ? te.forEach((ve) => Y(ve.bind(n))) : te && Y(te.bind(n));
  }
  if (
    (ee(Q1, f),
    ee(Bn, d),
    ee(ec, p),
    ee(tc, m),
    ee(qo, g),
    ee(Yo, v),
    ee(sc, I),
    ee(oc, k),
    ee(rc, T),
    ee(Rl, z),
    ee(mn, S),
    ee(nc, A),
    q(N))
  )
    if (N.length) {
      const Y = e.exposed || (e.exposed = {});
      N.forEach((te) => {
        Object.defineProperty(Y, te, {
          get: () => n[te],
          set: (ve) => (n[te] = ve),
        });
      });
    } else e.exposed || (e.exposed = {});
  O && e.render === tt && (e.render = O),
    B != null && (e.inheritAttrs = B),
    J && (e.components = J),
    ze && (e.directives = ze);
}
function uc(e, t, n = tt, r = !1) {
  q(e) && (e = ao(e));
  for (const o in e) {
    const s = e[o];
    let i;
    me(s) ? ('default' in s ? (i = Ue(s.from || o, s.default, !0)) : (i = Ue(s.from || o))) : (i = Ue(s)),
      Oe(i) && r
        ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (a) => (i.value = a),
          })
        : (t[o] = i);
  }
}
function xs(e, t, n) {
  rt(q(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Il(e, t, n, r) {
  const o = r.includes('.') ? Ol(n, r) : () => n[r];
  if (xe(e)) {
    const s = t[e];
    Z(s) && Re(o, s);
  } else if (Z(e)) Re(o, e.bind(n));
  else if (me(e))
    if (q(e)) e.forEach((s) => Il(s, t, n, r));
    else {
      const s = Z(e.handler) ? e.handler.bind(n) : t[e.handler];
      Z(s) && Re(o, s, e);
    }
}
function Jo(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: s,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    a = s.get(t);
  let l;
  return (
    a
      ? (l = a)
      : !o.length && !n && !r
        ? (l = t)
        : ((l = {}), o.length && o.forEach((c) => pr(l, c, i, !0)), pr(l, t, i)),
    me(t) && s.set(t, l),
    l
  );
}
function pr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && pr(e, s, n, !0), o && o.forEach((i) => pr(e, i, n, !0));
  for (const i in t)
    if (!(r && i === 'expose')) {
      const a = fc[i] || (n && n[i]);
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const fc = {
  data: Rs,
  props: Lt,
  emits: Lt,
  methods: Lt,
  computed: Lt,
  beforeCreate: Ne,
  created: Ne,
  beforeMount: Ne,
  mounted: Ne,
  beforeUpdate: Ne,
  updated: Ne,
  beforeDestroy: Ne,
  beforeUnmount: Ne,
  destroyed: Ne,
  unmounted: Ne,
  activated: Ne,
  deactivated: Ne,
  errorCaptured: Ne,
  serverPrefetch: Ne,
  components: Lt,
  directives: Lt,
  watch: hc,
  provide: Rs,
  inject: dc,
};
function Rs(e, t) {
  return t
    ? e
      ? function () {
          return Ve(Z(e) ? e.call(this, this) : e, Z(t) ? t.call(this, this) : t);
        }
      : t
    : e;
}
function dc(e, t) {
  return Lt(ao(e), ao(t));
}
function ao(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ne(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Lt(e, t) {
  return e ? Ve(Ve(Object.create(null), e), t) : t;
}
function hc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ve(Object.create(null), e);
  for (const r in t) n[r] = Ne(e[r], t[r]);
  return n;
}
function mc(e, t, n, r = !1) {
  const o = {},
    s = {};
  ur(s, Lr, 1), (e.propsDefaults = Object.create(null)), Ll(e, t, o, s);
  for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
  n ? (e.props = r ? o : R1(o)) : e.type.props ? (e.props = o) : (e.props = s), (e.attrs = s);
}
function pc(e, t, n, r) {
  const {
      props: o,
      attrs: s,
      vnode: { patchFlag: i },
    } = e,
    a = le(o),
    [l] = e.propsOptions;
  let c = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let d = u[f];
        if (Rr(e.emitsOptions, d)) continue;
        const p = t[d];
        if (l)
          if (oe(s, d)) p !== s[d] && ((s[d] = p), (c = !0));
          else {
            const m = mt(d);
            o[m] = co(l, a, m, p, e, !1);
          }
        else p !== s[d] && ((s[d] = p), (c = !0));
      }
    }
  } else {
    Ll(e, t, o, s) && (c = !0);
    let u;
    for (const f in a)
      (!t || (!oe(t, f) && ((u = Ut(f)) === f || !oe(t, u)))) &&
        (l ? n && (n[f] !== void 0 || n[u] !== void 0) && (o[f] = co(l, a, f, void 0, e, !0)) : delete o[f]);
    if (s !== a) for (const f in s) (!t || !oe(t, f)) && (delete s[f], (c = !0));
  }
  c && gt(e, 'set', '$attrs');
}
function Ll(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1,
    a;
  if (t)
    for (let l in t) {
      if (rr(l)) continue;
      const c = t[l];
      let u;
      o && oe(o, (u = mt(l)))
        ? !s || !s.includes(u)
          ? (n[u] = c)
          : ((a || (a = {}))[u] = c)
        : Rr(e.emitsOptions, l) || ((!(l in r) || c !== r[l]) && ((r[l] = c), (i = !0)));
    }
  if (s) {
    const l = le(n),
      c = a || _e;
    for (let u = 0; u < s.length; u++) {
      const f = s[u];
      n[f] = co(o, l, f, c[f], e, !oe(c, f));
    }
  }
  return i;
}
function co(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const a = oe(i, 'default');
    if (a && r === void 0) {
      const l = i.default;
      if (i.type !== Function && Z(l)) {
        const { propsDefaults: c } = o;
        n in c ? (r = c[n]) : (an(o), (r = c[n] = l.call(null, t)), Vt());
      } else r = l;
    }
    i[0] && (s && !a ? (r = !1) : i[1] && (r === '' || r === Ut(n)) && (r = !0));
  }
  return r;
}
function Hl(e, t, n = !1) {
  const r = t.propsCache,
    o = r.get(e);
  if (o) return o;
  const s = e.props,
    i = {},
    a = [];
  let l = !1;
  if (!Z(e)) {
    const u = (f) => {
      l = !0;
      const [d, p] = Hl(f, t, !0);
      Ve(i, d), p && a.push(...p);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !l) return me(e) && r.set(e, en), en;
  if (q(s))
    for (let u = 0; u < s.length; u++) {
      const f = mt(s[u]);
      Ss(f) && (i[f] = _e);
    }
  else if (s)
    for (const u in s) {
      const f = mt(u);
      if (Ss(f)) {
        const d = s[u],
          p = (i[f] =
            q(d) || Z(d)
              ? {
                  type: d,
                }
              : Object.assign({}, d));
        if (p) {
          const m = Ls(Boolean, p.type),
            g = Ls(String, p.type);
          (p[0] = m > -1), (p[1] = g < 0 || m < g), (m > -1 || oe(p, 'default')) && a.push(f);
        }
      }
    }
  const c = [i, a];
  return me(e) && r.set(e, c), c;
}
function Ss(e) {
  return e[0] !== '$';
}
function ks(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? 'null' : '';
}
function Is(e, t) {
  return ks(e) === ks(t);
}
function Ls(e, t) {
  return q(t) ? t.findIndex((n) => Is(n, e)) : Z(t) && Is(t, e) ? 0 : -1;
}
const Dl = (e) => e[0] === '_' || e === '$stable',
  Zo = (e) => (q(e) ? e.map(ct) : [ct(e)]),
  _c = (e, t, n) => {
    if (t._n) return t;
    const r = sr((...o) => Zo(t(...o)), n);
    return (r._c = !1), r;
  },
  Nl = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
      if (Dl(o)) continue;
      const s = e[o];
      if (Z(s)) t[o] = _c(o, s, r);
      else if (s != null) {
        const i = Zo(s);
        t[o] = () => i;
      }
    }
  },
  Fl = (e, t) => {
    const n = Zo(t);
    e.slots.default = () => n;
  },
  gc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = le(t)), ur(t, '_', n)) : Nl(t, (e.slots = {}));
    } else (e.slots = {}), t && Fl(e, t);
    ur(e.slots, Lr, 1);
  },
  yc = (e, t, n) => {
    const { vnode: r, slots: o } = e;
    let s = !0,
      i = _e;
    if (r.shapeFlag & 32) {
      const a = t._;
      a ? (n && a === 1 ? (s = !1) : (Ve(o, t), !n && a === 1 && delete o._)) : ((s = !t.$stable), Nl(t, o)),
        (i = t);
    } else
      t &&
        (Fl(e, t),
        (i = {
          default: 1,
        }));
    if (s) for (const a in o) !Dl(a) && !(a in i) && delete o[a];
  };
function $l() {
  return {
    app: null,
    config: {
      isNativeTag: Ya,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let vc = 0;
function bc(e, t) {
  return function (r, o = null) {
    Z(r) || (r = Object.assign({}, r)), o != null && !me(o) && (o = null);
    const s = $l(),
      i = new Set();
    let a = !1;
    const l = (s.app = {
      _uid: vc++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: es,
      get config() {
        return s.config;
      },
      set config(c) {},
      use(c, ...u) {
        return (
          i.has(c) || (c && Z(c.install) ? (i.add(c), c.install(l, ...u)) : Z(c) && (i.add(c), c(l, ...u))), l
        );
      },
      mixin(c) {
        return s.mixins.includes(c) || s.mixins.push(c), l;
      },
      component(c, u) {
        return u ? ((s.components[c] = u), l) : s.components[c];
      },
      directive(c, u) {
        return u ? ((s.directives[c] = u), l) : s.directives[c];
      },
      mount(c, u, f) {
        if (!a) {
          const d = de(r, o);
          return (
            (d.appContext = s),
            u && t ? t(d, c) : e(d, c, f),
            (a = !0),
            (l._container = c),
            (c.__vue_app__ = l),
            Hr(d.component) || d.component.proxy
          );
        }
      },
      unmount() {
        a && (e(null, l._container), delete l._container.__vue_app__);
      },
      provide(c, u) {
        return (s.provides[c] = u), l;
      },
    });
    return l;
  };
}
function uo(e, t, n, r, o = !1) {
  if (q(e)) {
    e.forEach((d, p) => uo(d, t && (q(t) ? t[p] : t), n, r, o));
    return;
  }
  if (En(r) && !o) return;
  const s = r.shapeFlag & 4 ? Hr(r.component) || r.component.proxy : r.el,
    i = o ? null : s,
    { i: a, r: l } = e,
    c = t && t.r,
    u = a.refs === _e ? (a.refs = {}) : a.refs,
    f = a.setupState;
  if (
    (c != null && c !== l && (xe(c) ? ((u[c] = null), oe(f, c) && (f[c] = null)) : Oe(c) && (c.value = null)),
    Z(l))
  )
    Ct(l, a, 12, [i, u]);
  else {
    const d = xe(l),
      p = Oe(l);
    if (d || p) {
      const m = () => {
        if (e.f) {
          const g = d ? (oe(f, l) ? f[l] : u[l]) : l.value;
          o
            ? q(g) && ko(g, s)
            : q(g)
              ? g.includes(s) || g.push(s)
              : d
                ? ((u[l] = [s]), oe(f, l) && (f[l] = u[l]))
                : ((l.value = [s]), e.k && (u[e.k] = l.value));
        } else d ? ((u[l] = i), oe(f, l) && (f[l] = i)) : p && ((l.value = i), e.k && (u[e.k] = i));
      };
      i ? ((m.id = -1), je(m, n)) : m();
    }
  }
}
const je = J1;
function zc(e) {
  return wc(e);
}
function wc(e, t) {
  const n = t1();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: o,
      patchProp: s,
      createElement: i,
      createText: a,
      createComment: l,
      setText: c,
      setElementText: u,
      parentNode: f,
      nextSibling: d,
      setScopeId: p = tt,
      insertStaticContent: m,
    } = e,
    g = (h, _, E, M = null, R = null, H = null, $ = !1, L = null, D = !!_.dynamicChildren) => {
      if (h === _) return;
      h && !_n(h, _) && ((M = F(h)), Ee(h, R, H, !0), (h = null)),
        _.patchFlag === -2 && ((D = !1), (_.dynamicChildren = null));
      const { type: P, ref: b, shapeFlag: w } = _;
      switch (P) {
        case jn:
          v(h, _, E, M);
          break;
        case Tt:
          y(h, _, E, M);
          break;
        case lr:
          h == null && z(_, E, M, $);
          break;
        case Fe:
          J(h, _, E, M, R, H, $, L, D);
          break;
        default:
          w & 1
            ? O(h, _, E, M, R, H, $, L, D)
            : w & 6
              ? ze(h, _, E, M, R, H, $, L, D)
              : (w & 64 || w & 128) && P.process(h, _, E, M, R, H, $, L, D, ne);
      }
      b != null && R && uo(b, h && h.ref, H, _ || h, !_);
    },
    v = (h, _, E, M) => {
      if (h == null) r((_.el = a(_.children)), E, M);
      else {
        const R = (_.el = h.el);
        _.children !== h.children && c(R, _.children);
      }
    },
    y = (h, _, E, M) => {
      h == null ? r((_.el = l(_.children || '')), E, M) : (_.el = h.el);
    },
    z = (h, _, E, M) => {
      [h.el, h.anchor] = m(h.children, _, E, M, h.el, h.anchor);
    },
    C = ({ el: h, anchor: _ }, E, M) => {
      let R;
      for (; h && h !== _; ) (R = d(h)), r(h, E, M), (h = R);
      r(_, E, M);
    },
    S = ({ el: h, anchor: _ }) => {
      let E;
      for (; h && h !== _; ) (E = d(h)), o(h), (h = E);
      o(_);
    },
    O = (h, _, E, M, R, H, $, L, D) => {
      ($ = $ || _.type === 'svg'), h == null ? k(_, E, M, R, H, $, L, D) : A(h, _, R, H, $, L, D);
    },
    k = (h, _, E, M, R, H, $, L) => {
      let D, P;
      const { type: b, props: w, shapeFlag: j, transition: W, dirs: Q } = h;
      if (
        ((D = h.el = i(h.type, H, w && w.is, w)),
        j & 8 ? u(D, h.children) : j & 16 && I(h.children, D, null, M, R, H && b !== 'foreignObject', $, L),
        Q && kt(h, null, M, 'created'),
        T(D, h, h.scopeId, $, M),
        w)
      ) {
        for (const re in w) re !== 'value' && !rr(re) && s(D, re, null, w[re], H, h.children, M, R, V);
        'value' in w && s(D, 'value', null, w.value), (P = w.onVnodeBeforeMount) && lt(P, M, h);
      }
      Q && kt(h, null, M, 'beforeMount');
      const ae = (!R || (R && !R.pendingBranch)) && W && !W.persisted;
      ae && W.beforeEnter(D),
        r(D, _, E),
        ((P = w && w.onVnodeMounted) || ae || Q) &&
          je(() => {
            P && lt(P, M, h), ae && W.enter(D), Q && kt(h, null, M, 'mounted');
          }, R);
    },
    T = (h, _, E, M, R) => {
      if ((E && p(h, E), M)) for (let H = 0; H < M.length; H++) p(h, M[H]);
      if (R) {
        let H = R.subTree;
        if (_ === H) {
          const $ = R.vnode;
          T(h, $, $.scopeId, $.slotScopeIds, R.parent);
        }
      }
    },
    I = (h, _, E, M, R, H, $, L, D = 0) => {
      for (let P = D; P < h.length; P++) {
        const b = (h[P] = L ? zt(h[P]) : ct(h[P]));
        g(null, b, _, E, M, R, H, $, L);
      }
    },
    A = (h, _, E, M, R, H, $) => {
      const L = (_.el = h.el);
      let { patchFlag: D, dynamicChildren: P, dirs: b } = _;
      D |= h.patchFlag & 16;
      const w = h.props || _e,
        j = _.props || _e;
      let W;
      E && It(E, !1),
        (W = j.onVnodeBeforeUpdate) && lt(W, E, _, h),
        b && kt(_, h, E, 'beforeUpdate'),
        E && It(E, !0);
      const Q = R && _.type !== 'foreignObject';
      if ((P ? N(h.dynamicChildren, P, L, E, M, Q, H) : $ || te(h, _, L, null, E, M, Q, H, !1), D > 0)) {
        if (D & 16) B(L, _, w, j, E, M, R);
        else if (
          (D & 2 && w.class !== j.class && s(L, 'class', null, j.class, R),
          D & 4 && s(L, 'style', w.style, j.style, R),
          D & 8)
        ) {
          const ae = _.dynamicProps;
          for (let re = 0; re < ae.length; re++) {
            const we = ae[re],
              Je = w[we],
              Kt = j[we];
            (Kt !== Je || we === 'value') && s(L, we, Je, Kt, R, h.children, E, M, V);
          }
        }
        D & 1 && h.children !== _.children && u(L, _.children);
      } else !$ && P == null && B(L, _, w, j, E, M, R);
      ((W = j.onVnodeUpdated) || b) &&
        je(() => {
          W && lt(W, E, _, h), b && kt(_, h, E, 'updated');
        }, M);
    },
    N = (h, _, E, M, R, H, $) => {
      for (let L = 0; L < _.length; L++) {
        const D = h[L],
          P = _[L],
          b = D.el && (D.type === Fe || !_n(D, P) || D.shapeFlag & 70) ? f(D.el) : E;
        g(D, P, b, null, M, R, H, $, !0);
      }
    },
    B = (h, _, E, M, R, H, $) => {
      if (E !== M) {
        if (E !== _e) for (const L in E) !rr(L) && !(L in M) && s(h, L, E[L], null, $, _.children, R, H, V);
        for (const L in M) {
          if (rr(L)) continue;
          const D = M[L],
            P = E[L];
          D !== P && L !== 'value' && s(h, L, P, D, $, _.children, R, H, V);
        }
        'value' in M && s(h, 'value', E.value, M.value);
      }
    },
    J = (h, _, E, M, R, H, $, L, D) => {
      const P = (_.el = h ? h.el : a('')),
        b = (_.anchor = h ? h.anchor : a(''));
      let { patchFlag: w, dynamicChildren: j, slotScopeIds: W } = _;
      W && (L = L ? L.concat(W) : W),
        h == null
          ? (r(P, E, M), r(b, E, M), I(_.children, E, b, R, H, $, L, D))
          : w > 0 && w & 64 && j && h.dynamicChildren
            ? (N(h.dynamicChildren, j, E, R, H, $, L),
              (_.key != null || (R && _ === R.subTree)) && Xo(h, _, !0))
            : te(h, _, E, b, R, H, $, L, D);
    },
    ze = (h, _, E, M, R, H, $, L, D) => {
      (_.slotScopeIds = L),
        h == null
          ? _.shapeFlag & 512
            ? R.ctx.activate(_, E, M, $, D)
            : ge(_, E, M, R, H, $, D)
          : fe(h, _, D);
    },
    ge = (h, _, E, M, R, H, $) => {
      const L = (h.component = Ic(h, M, R));
      if ((Tl(h) && (L.ctx.renderer = ne), Lc(L), L.asyncDep)) {
        if ((R && R.registerDep(L, ee), !h.el)) {
          const D = (L.subTree = de(Tt));
          y(null, D, _, E);
        }
        return;
      }
      ee(L, h, _, E, R, H, $);
    },
    fe = (h, _, E) => {
      const M = (_.component = h.component);
      if (G1(h, _, E))
        if (M.asyncDep && !M.asyncResolved) {
          Y(M, _, E);
          return;
        } else (M.next = _), V1(M.update), M.update();
      else (_.el = h.el), (M.vnode = _);
    },
    ee = (h, _, E, M, R, H, $) => {
      const L = () => {
          if (h.isMounted) {
            let { next: b, bu: w, u: j, parent: W, vnode: Q } = h,
              ae = b,
              re;
            It(h, !1),
              b ? ((b.el = Q.el), Y(h, b, $)) : (b = Q),
              w && or(w),
              (re = b.props && b.props.onVnodeBeforeUpdate) && lt(re, W, b, Q),
              It(h, !0);
            const we = Ur(h),
              Je = h.subTree;
            (h.subTree = we),
              g(Je, we, f(Je.el), F(Je), h, R, H),
              (b.el = we.el),
              ae === null && q1(h, we.el),
              j && je(j, R),
              (re = b.props && b.props.onVnodeUpdated) && je(() => lt(re, W, b, Q), R);
          } else {
            let b;
            const { el: w, props: j } = _,
              { bm: W, m: Q, parent: ae } = h,
              re = En(_);
            if (
              (It(h, !1),
              W && or(W),
              !re && (b = j && j.onVnodeBeforeMount) && lt(b, ae, _),
              It(h, !0),
              w && X)
            ) {
              const we = () => {
                (h.subTree = Ur(h)), X(w, h.subTree, h, R, null);
              };
              re ? _.type.__asyncLoader().then(() => !h.isUnmounted && we()) : we();
            } else {
              const we = (h.subTree = Ur(h));
              g(null, we, E, M, h, R, H), (_.el = we.el);
            }
            if ((Q && je(Q, R), !re && (b = j && j.onVnodeMounted))) {
              const we = _;
              je(() => lt(b, ae, we), R);
            }
            (_.shapeFlag & 256 || (ae && En(ae.vnode) && ae.vnode.shapeFlag & 256)) && h.a && je(h.a, R),
              (h.isMounted = !0),
              (_ = E = M = null);
          }
        },
        D = (h.effect = new Ho(L, () => Wo(P), h.scope)),
        P = (h.update = () => D.run());
      (P.id = h.uid), It(h, !0), P();
    },
    Y = (h, _, E) => {
      _.component = h;
      const M = h.vnode.props;
      (h.vnode = _), (h.next = null), pc(h, _.props, M, E), yc(h, _.children, E), dn(), As(), hn();
    },
    te = (h, _, E, M, R, H, $, L, D = !1) => {
      const P = h && h.children,
        b = h ? h.shapeFlag : 0,
        w = _.children,
        { patchFlag: j, shapeFlag: W } = _;
      if (j > 0) {
        if (j & 128) {
          Ie(P, w, E, M, R, H, $, L, D);
          return;
        } else if (j & 256) {
          ve(P, w, E, M, R, H, $, L, D);
          return;
        }
      }
      W & 8
        ? (b & 16 && V(P, R, H), w !== P && u(E, w))
        : b & 16
          ? W & 16
            ? Ie(P, w, E, M, R, H, $, L, D)
            : V(P, R, H, !0)
          : (b & 8 && u(E, ''), W & 16 && I(w, E, M, R, H, $, L, D));
    },
    ve = (h, _, E, M, R, H, $, L, D) => {
      (h = h || en), (_ = _ || en);
      const P = h.length,
        b = _.length,
        w = Math.min(P, b);
      let j;
      for (j = 0; j < w; j++) {
        const W = (_[j] = D ? zt(_[j]) : ct(_[j]));
        g(h[j], W, E, null, R, H, $, L, D);
      }
      P > b ? V(h, R, H, !0, !1, w) : I(_, E, M, R, H, $, L, D, w);
    },
    Ie = (h, _, E, M, R, H, $, L, D) => {
      let P = 0;
      const b = _.length;
      let w = h.length - 1,
        j = b - 1;
      for (; P <= w && P <= j; ) {
        const W = h[P],
          Q = (_[P] = D ? zt(_[P]) : ct(_[P]));
        if (_n(W, Q)) g(W, Q, E, null, R, H, $, L, D);
        else break;
        P++;
      }
      for (; P <= w && P <= j; ) {
        const W = h[w],
          Q = (_[j] = D ? zt(_[j]) : ct(_[j]));
        if (_n(W, Q)) g(W, Q, E, null, R, H, $, L, D);
        else break;
        w--, j--;
      }
      if (P > w) {
        if (P <= j) {
          const W = j + 1,
            Q = W < b ? _[W].el : M;
          for (; P <= j; ) g(null, (_[P] = D ? zt(_[P]) : ct(_[P])), E, Q, R, H, $, L, D), P++;
        }
      } else if (P > j) for (; P <= w; ) Ee(h[P], R, H, !0), P++;
      else {
        const W = P,
          Q = P,
          ae = new Map();
        for (P = Q; P <= j; P++) {
          const Ke = (_[P] = D ? zt(_[P]) : ct(_[P]));
          Ke.key != null && ae.set(Ke.key, P);
        }
        let re,
          we = 0;
        const Je = j - Q + 1;
        let Kt = !1,
          ms = 0;
        const pn = new Array(Je);
        for (P = 0; P < Je; P++) pn[P] = 0;
        for (P = W; P <= w; P++) {
          const Ke = h[P];
          if (we >= Je) {
            Ee(Ke, R, H, !0);
            continue;
          }
          let it;
          if (Ke.key != null) it = ae.get(Ke.key);
          else
            for (re = Q; re <= j; re++)
              if (pn[re - Q] === 0 && _n(Ke, _[re])) {
                it = re;
                break;
              }
          it === void 0
            ? Ee(Ke, R, H, !0)
            : ((pn[it - Q] = P + 1),
              it >= ms ? (ms = it) : (Kt = !0),
              g(Ke, _[it], E, null, R, H, $, L, D),
              we++);
        }
        const ps = Kt ? Ec(pn) : en;
        for (re = ps.length - 1, P = Je - 1; P >= 0; P--) {
          const Ke = Q + P,
            it = _[Ke],
            _s = Ke + 1 < b ? _[Ke + 1].el : M;
          pn[P] === 0
            ? g(null, it, E, _s, R, H, $, L, D)
            : Kt && (re < 0 || P !== ps[re] ? Se(it, E, _s, 2) : re--);
        }
      }
    },
    Se = (h, _, E, M, R = null) => {
      const { el: H, type: $, transition: L, children: D, shapeFlag: P } = h;
      if (P & 6) {
        Se(h.component.subTree, _, E, M);
        return;
      }
      if (P & 128) {
        h.suspense.move(_, E, M);
        return;
      }
      if (P & 64) {
        $.move(h, _, E, ne);
        return;
      }
      if ($ === Fe) {
        r(H, _, E);
        for (let w = 0; w < D.length; w++) Se(D[w], _, E, M);
        r(h.anchor, _, E);
        return;
      }
      if ($ === lr) {
        C(h, _, E);
        return;
      }
      if (M !== 2 && P & 1 && L)
        if (M === 0) L.beforeEnter(H), r(H, _, E), je(() => L.enter(H), R);
        else {
          const { leave: w, delayLeave: j, afterLeave: W } = L,
            Q = () => r(H, _, E),
            ae = () => {
              w(H, () => {
                Q(), W && W();
              });
            };
          j ? j(H, Q, ae) : ae();
        }
      else r(H, _, E);
    },
    Ee = (h, _, E, M = !1, R = !1) => {
      const {
        type: H,
        props: $,
        ref: L,
        children: D,
        dynamicChildren: P,
        shapeFlag: b,
        patchFlag: w,
        dirs: j,
      } = h;
      if ((L != null && uo(L, null, E, h, !0), b & 256)) {
        _.ctx.deactivate(h);
        return;
      }
      const W = b & 1 && j,
        Q = !En(h);
      let ae;
      if ((Q && (ae = $ && $.onVnodeBeforeUnmount) && lt(ae, _, h), b & 6)) x(h.component, E, M);
      else {
        if (b & 128) {
          h.suspense.unmount(E, M);
          return;
        }
        W && kt(h, null, _, 'beforeUnmount'),
          b & 64
            ? h.type.remove(h, _, E, R, ne, M)
            : P && (H !== Fe || (w > 0 && w & 64))
              ? V(P, _, E, !1, !0)
              : ((H === Fe && w & 384) || (!R && b & 16)) && V(D, _, E),
          M && st(h);
      }
      ((Q && (ae = $ && $.onVnodeUnmounted)) || W) &&
        je(() => {
          ae && lt(ae, _, h), W && kt(h, null, _, 'unmounted');
        }, E);
    },
    st = (h) => {
      const { type: _, el: E, anchor: M, transition: R } = h;
      if (_ === Fe) {
        Me(E, M);
        return;
      }
      if (_ === lr) {
        S(h);
        return;
      }
      const H = () => {
        o(E), R && !R.persisted && R.afterLeave && R.afterLeave();
      };
      if (h.shapeFlag & 1 && R && !R.persisted) {
        const { leave: $, delayLeave: L } = R,
          D = () => $(E, H);
        L ? L(h.el, H, D) : D();
      } else H();
    },
    Me = (h, _) => {
      let E;
      for (; h !== _; ) (E = d(h)), o(h), (h = E);
      o(_);
    },
    x = (h, _, E) => {
      const { bum: M, scope: R, update: H, subTree: $, um: L } = h;
      M && or(M),
        R.stop(),
        H && ((H.active = !1), Ee($, h, _, E)),
        L && je(L, _),
        je(() => {
          h.isUnmounted = !0;
        }, _),
        _ &&
          _.pendingBranch &&
          !_.isUnmounted &&
          h.asyncDep &&
          !h.asyncResolved &&
          h.suspenseId === _.pendingId &&
          (_.deps--, _.deps === 0 && _.resolve());
    },
    V = (h, _, E, M = !1, R = !1, H = 0) => {
      for (let $ = H; $ < h.length; $++) Ee(h[$], _, E, M, R);
    },
    F = (h) =>
      h.shapeFlag & 6 ? F(h.component.subTree) : h.shapeFlag & 128 ? h.suspense.next() : d(h.anchor || h.el),
    K = (h, _, E) => {
      h == null ? _._vnode && Ee(_._vnode, null, null, !0) : g(_._vnode || null, h, _, null, null, null, E),
        As(),
        Ml(),
        (_._vnode = h);
    },
    ne = {
      p: g,
      um: Ee,
      m: Se,
      r: st,
      mt: ge,
      mc: I,
      pc: te,
      pbc: N,
      n: F,
      o: e,
    };
  let pe, X;
  return (
    t && ([pe, X] = t(ne)),
    {
      render: K,
      hydrate: pe,
      createApp: bc(K, pe),
    }
  );
}
function It({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Xo(e, t, n = !1) {
  const r = e.children,
    o = t.children;
  if (q(r) && q(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let a = o[s];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) && ((a = o[s] = zt(o[s])), (a.el = i.el)), n || Xo(i, a)),
        a.type === jn && (a.el = i.el);
    }
}
function Ec(e) {
  const t = e.slice(),
    n = [0];
  let r, o, s, i, a;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const c = e[r];
    if (c !== 0) {
      if (((o = n[n.length - 1]), e[o] < c)) {
        (t[r] = o), n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; ) (a = (s + i) >> 1), e[n[a]] < c ? (s = a + 1) : (i = a);
      c < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), (n[s] = r));
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; ) (n[s] = i), (i = t[i]);
  return n;
}
const Mc = (e) => e.__isTeleport,
  Cn = (e) => e && (e.disabled || e.disabled === ''),
  Hs = (e) => typeof SVGElement < 'u' && e instanceof SVGElement,
  fo = (e, t) => {
    const n = e && e.to;
    return xe(n) ? (t ? t(n) : null) : n;
  },
  Cc = {
    __isTeleport: !0,
    process(e, t, n, r, o, s, i, a, l, c) {
      const {
          mc: u,
          pc: f,
          pbc: d,
          o: { insert: p, querySelector: m, createText: g, createComment: v },
        } = c,
        y = Cn(t.props);
      let { shapeFlag: z, children: C, dynamicChildren: S } = t;
      if (e == null) {
        const O = (t.el = g('')),
          k = (t.anchor = g(''));
        p(O, n, r), p(k, n, r);
        const T = (t.target = fo(t.props, m)),
          I = (t.targetAnchor = g(''));
        T && (p(I, T), (i = i || Hs(T)));
        const A = (N, B) => {
          z & 16 && u(C, N, B, o, s, i, a, l);
        };
        y ? A(n, k) : T && A(T, I);
      } else {
        t.el = e.el;
        const O = (t.anchor = e.anchor),
          k = (t.target = e.target),
          T = (t.targetAnchor = e.targetAnchor),
          I = Cn(e.props),
          A = I ? n : k,
          N = I ? O : T;
        if (
          ((i = i || Hs(k)),
          S ? (d(e.dynamicChildren, S, A, o, s, i, a), Xo(e, t, !0)) : l || f(e, t, A, N, o, s, i, a, !1),
          y)
        )
          I || Jn(t, n, O, c, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const B = (t.target = fo(t.props, m));
          B && Jn(t, B, null, c, 0);
        } else I && Jn(t, k, T, c, 1);
      }
      Vl(t);
    },
    remove(e, t, n, r, { um: o, o: { remove: s } }, i) {
      const { shapeFlag: a, children: l, anchor: c, targetAnchor: u, target: f, props: d } = e;
      if ((f && s(u), (i || !Cn(d)) && (s(c), a & 16)))
        for (let p = 0; p < l.length; p++) {
          const m = l[p];
          o(m, t, n, !0, !!m.dynamicChildren);
        }
    },
    move: Jn,
    hydrate: Ac,
  };
function Jn(e, t, n, { o: { insert: r }, m: o }, s = 2) {
  s === 0 && r(e.targetAnchor, t, n);
  const { el: i, anchor: a, shapeFlag: l, children: c, props: u } = e,
    f = s === 2;
  if ((f && r(i, t, n), (!f || Cn(u)) && l & 16)) for (let d = 0; d < c.length; d++) o(c[d], t, n, 2);
  f && r(a, t, n);
}
function Ac(e, t, n, r, o, s, { o: { nextSibling: i, parentNode: a, querySelector: l } }, c) {
  const u = (t.target = fo(t.props, l));
  if (u) {
    const f = u._lpa || u.firstChild;
    if (t.shapeFlag & 16)
      if (Cn(t.props)) (t.anchor = c(i(e), t, a(e), n, r, o, s)), (t.targetAnchor = f);
      else {
        t.anchor = i(e);
        let d = f;
        for (; d; )
          if (((d = i(d)), d && d.nodeType === 8 && d.data === 'teleport anchor')) {
            (t.targetAnchor = d), (u._lpa = t.targetAnchor && i(t.targetAnchor));
            break;
          }
        c(f, t, u, n, r, o, s);
      }
    Vl(t);
  }
  return t.anchor && i(t.anchor);
}
const G3 = Cc;
function Vl(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute('data-v-owner', t.uid), (n = n.nextSibling);
    t.ut();
  }
}
const Fe = Symbol(void 0),
  jn = Symbol(void 0),
  Tt = Symbol(void 0),
  lr = Symbol(void 0),
  An = [];
let et = null;
function dt(e = !1) {
  An.push((et = e ? null : []));
}
function Pc() {
  An.pop(), (et = An[An.length - 1] || null);
}
let Hn = 1;
function Ds(e) {
  Hn += e;
}
function Bl(e) {
  return (e.dynamicChildren = Hn > 0 ? et || en : null), Pc(), Hn > 0 && et && et.push(e), e;
}
function Zt(e, t, n, r, o, s) {
  return Bl(at(e, t, n, r, o, s, !0));
}
function Ir(e, t, n, r, o) {
  return Bl(de(e, t, n, r, o, !0));
}
function _r(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function _n(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Lr = '__vInternal',
  jl = ({ key: e }) => (e != null ? e : null),
  ar = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? xe(e) || Oe(e) || Z(e)
        ? {
            i: He,
            r: e,
            k: t,
            f: !!n,
          }
        : e
      : null;
function at(e, t = null, n = null, r = 0, o = null, s = e === Fe ? 0 : 1, i = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && jl(t),
    ref: t && ar(t),
    scopeId: Sr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: He,
  };
  return (
    a ? (Qo(l, n), s & 128 && e.normalize(l)) : n && (l.shapeFlag |= xe(n) ? 8 : 16),
    Hn > 0 && !i && et && (l.patchFlag > 0 || s & 6) && l.patchFlag !== 32 && et.push(l),
    l
  );
}
const de = Oc;
function Oc(e, t = null, n = null, r = 0, o = null, s = !1) {
  if (((!e || e === ic) && (e = Tt), _r(e))) {
    const a = ln(e, t, !0);
    return (
      n && Qo(a, n),
      Hn > 0 && !s && et && (a.shapeFlag & 6 ? (et[et.indexOf(e)] = a) : et.push(a)),
      (a.patchFlag |= -2),
      a
    );
  }
  if (($c(e) && (e = e.__vccOpts), t)) {
    t = Tc(t);
    let { class: a, style: l } = t;
    a && !xe(a) && (t.class = Ro(a)), me(l) && (_l(l) && !q(l) && (l = Ve({}, l)), (t.style = xo(l)));
  }
  const i = xe(e) ? 1 : Y1(e) ? 128 : Mc(e) ? 64 : me(e) ? 4 : Z(e) ? 2 : 0;
  return at(e, t, n, r, o, i, s, !0);
}
function Tc(e) {
  return e ? (_l(e) || Lr in e ? Ve({}, e) : e) : null;
}
function ln(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: s, children: i } = e,
    a = t ? Rc(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && jl(a),
    ref: t && t.ref ? (n && o ? (q(o) ? o.concat(ar(t)) : [o, ar(t)]) : ar(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Fe ? (s === -1 ? 16 : s | 16) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ln(e.ssContent),
    ssFallback: e.ssFallback && ln(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function ho(e = ' ', t = 0) {
  return de(jn, null, e, t);
}
function q3(e, t) {
  const n = de(lr, null, e);
  return (n.staticCount = t), n;
}
function xc(e = '', t = !1) {
  return t ? (dt(), Ir(Tt, null, e)) : de(Tt, null, e);
}
function ct(e) {
  return e == null || typeof e == 'boolean'
    ? de(Tt)
    : q(e)
      ? de(Fe, null, e.slice())
      : typeof e == 'object'
        ? zt(e)
        : de(jn, null, String(e));
}
function zt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : ln(e);
}
function Qo(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (q(t)) n = 16;
  else if (typeof t == 'object')
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Qo(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(Lr in t)
        ? (t._ctx = He)
        : o === 3 && He && (He.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    Z(t)
      ? ((t = {
          default: t,
          _ctx: He,
        }),
        (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [ho(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Rc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === 'class') t.class !== r.class && (t.class = Ro([t.class, r.class]));
      else if (o === 'style') t.style = xo([t.style, r.style]);
      else if (Cr(o)) {
        const s = t[o],
          i = r[o];
        i && s !== i && !(q(s) && s.includes(i)) && (t[o] = s ? [].concat(s, i) : i);
      } else o !== '' && (t[o] = r[o]);
  }
  return t;
}
function lt(e, t, n, r = null) {
  rt(e, t, 7, [n, r]);
}
const Sc = $l();
let kc = 0;
function Ic(e, t, n) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || Sc,
    s = {
      uid: kc++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new rl(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Hl(r, o),
      emitsOptions: Al(r, o),
      emit: null,
      emitted: null,
      propsDefaults: _e,
      inheritAttrs: r.inheritAttrs,
      ctx: _e,
      data: _e,
      props: _e,
      attrs: _e,
      slots: _e,
      refs: _e,
      setupState: _e,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (s.ctx = {
      _: s,
    }),
    (s.root = t ? t.root : s),
    (s.emit = U1.bind(null, s)),
    e.ce && e.ce(s),
    s
  );
}
let Ae = null;
const xt = () => Ae || He,
  an = (e) => {
    (Ae = e), e.scope.on();
  },
  Vt = () => {
    Ae && Ae.scope.off(), (Ae = null);
  };
function Ul(e) {
  return e.vnode.shapeFlag & 4;
}
let Dn = !1;
function Lc(e, t = !1) {
  Dn = t;
  const { props: n, children: r } = e.vnode,
    o = Ul(e);
  mc(e, n, o, t), gc(e, r);
  const s = o ? Hc(e, t) : void 0;
  return (Dn = !1), s;
}
function Hc(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = gl(new Proxy(e.ctx, ac)));
  const { setup: r } = n;
  if (r) {
    const o = (e.setupContext = r.length > 1 ? Nc(e) : null);
    an(e), dn();
    const s = Ct(r, e, 0, [e.props, o]);
    if ((hn(), Vt(), el(s))) {
      if ((s.then(Vt, Vt), t))
        return s
          .then((i) => {
            Ns(e, i, t);
          })
          .catch((i) => {
            xr(i, e, 0);
          });
      e.asyncDep = s;
    } else Ns(e, s, t);
  } else Wl(e, t);
}
function Ns(e, t, n) {
  Z(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : me(t) && (e.setupState = vl(t)),
    Wl(e, n);
}
let Fs;
function Wl(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Fs && !r.render) {
      const o = r.template || Jo(e).template;
      if (o) {
        const { isCustomElement: s, compilerOptions: i } = e.appContext.config,
          { delimiters: a, compilerOptions: l } = r,
          c = Ve(
            Ve(
              {
                isCustomElement: s,
                delimiters: a,
              },
              i,
            ),
            l,
          );
        r.render = Fs(o, c);
      }
    }
    e.render = r.render || tt;
  }
  an(e), dn(), cc(e), hn(), Vt();
}
function Dc(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return We(e, 'get', '$attrs'), t[n];
    },
  });
}
function Nc(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = Dc(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Hr(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(vl(gl(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Mn) return Mn[n](e);
        },
        has(t, n) {
          return n in t || n in Mn;
        },
      }))
    );
}
function Fc(e, t = !0) {
  return Z(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function $c(e) {
  return Z(e) && '__vccOpts' in e;
}
const ie = (e, t) => N1(e, t, Dn);
function Dr(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? me(t) && !q(t)
      ? _r(t)
        ? de(e, null, [t])
        : de(e, t)
      : de(e, null, t)
    : (r > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : r === 3 && _r(n) && (n = [n]), de(e, t, n));
}
const Vc = Symbol(''),
  Bc = () => Ue(Vc),
  es = '3.2.47',
  jc = 'http://www.w3.org/2000/svg',
  Dt = typeof document < 'u' ? document : null,
  $s = Dt && Dt.createElement('template'),
  Uc = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const o = t
        ? Dt.createElementNS(jc, e)
        : Dt.createElement(
            e,
            n
              ? {
                  is: n,
                }
              : void 0,
          );
      return e === 'select' && r && r.multiple != null && o.setAttribute('multiple', r.multiple), o;
    },
    createText: (e) => Dt.createTextNode(e),
    createComment: (e) => Dt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Dt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, n, r, o, s) {
      const i = n ? n.previousSibling : t.lastChild;
      if (o && (o === s || o.nextSibling))
        for (; t.insertBefore(o.cloneNode(!0), n), !(o === s || !(o = o.nextSibling)); );
      else {
        $s.innerHTML = r ? `<svg>${e}</svg>` : e;
        const a = $s.content;
        if (r) {
          const l = a.firstChild;
          for (; l.firstChild; ) a.appendChild(l.firstChild);
          a.removeChild(l);
        }
        t.insertBefore(a, n);
      }
      return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
    },
  };
function Wc(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t);
}
function Kc(e, t, n) {
  const r = e.style,
    o = xe(n);
  if (n && !o) {
    if (t && !xe(t)) for (const s in t) n[s] == null && mo(r, s, '');
    for (const s in n) mo(r, s, n[s]);
  } else {
    const s = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute('style'), '_vod' in e && (r.display = s);
  }
}
const Vs = /\s*!important$/;
function mo(e, t, n) {
  if (q(n)) n.forEach((r) => mo(e, t, r));
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
  else {
    const r = Gc(e, t);
    Vs.test(n) ? e.setProperty(Ut(r), n.replace(Vs, ''), 'important') : (e[r] = n);
  }
}
const Bs = ['Webkit', 'Moz', 'ms'],
  Kr = {};
function Gc(e, t) {
  const n = Kr[t];
  if (n) return n;
  let r = mt(t);
  if (r !== 'filter' && r in e) return (Kr[t] = r);
  r = Or(r);
  for (let o = 0; o < Bs.length; o++) {
    const s = Bs[o] + r;
    if (s in e) return (Kr[t] = s);
  }
  return t;
}
const js = 'http://www.w3.org/1999/xlink';
function qc(e, t, n, r, o) {
  if (r && t.startsWith('xlink:'))
    n == null ? e.removeAttributeNS(js, t.slice(6, t.length)) : e.setAttributeNS(js, t, n);
  else {
    const s = Ka(t);
    n == null || (s && !Xi(n)) ? e.removeAttribute(t) : e.setAttribute(t, s ? '' : n);
  }
}
function Yc(e, t, n, r, o, s, i) {
  if (t === 'innerHTML' || t === 'textContent') {
    r && i(r, o, s), (e[t] = n == null ? '' : n);
    return;
  }
  if (t === 'value' && e.tagName !== 'PROGRESS' && !e.tagName.includes('-')) {
    e._value = n;
    const l = n == null ? '' : n;
    (e.value !== l || e.tagName === 'OPTION') && (e.value = l), n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === '' || n == null) {
    const l = typeof e[t];
    l === 'boolean'
      ? (n = Xi(n))
      : n == null && l === 'string'
        ? ((n = ''), (a = !0))
        : l === 'number' && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch (l) {}
  a && e.removeAttribute(t);
}
function Nt(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Jc(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Zc(e, t, n, r, o = null) {
  const s = e._vei || (e._vei = {}),
    i = s[t];
  if (r && i) i.value = r;
  else {
    const [a, l] = Xc(t);
    if (r) {
      const c = (s[t] = tu(r, o));
      Nt(e, a, c, l);
    } else i && (Jc(e, a, i, l), (s[t] = void 0));
  }
}
const Us = /(?:Once|Passive|Capture)$/;
function Xc(e) {
  let t;
  if (Us.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Us)); ) (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : Ut(e.slice(2)), t];
}
let Gr = 0;
const Qc = Promise.resolve(),
  eu = () => Gr || (Qc.then(() => (Gr = 0)), (Gr = Date.now()));
function tu(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    rt(nu(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = eu()), n;
}
function nu(e, t) {
  if (q(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (o) => !o._stopped && r && r(o))
    );
  } else return t;
}
const Ws = /^on[a-z]/,
  ru = (e, t, n, r, o = !1, s, i, a, l) => {
    t === 'class'
      ? Wc(e, r, o)
      : t === 'style'
        ? Kc(e, n, r)
        : Cr(t)
          ? So(t) || Zc(e, t, n, r, i)
          : (t[0] === '.' ? ((t = t.slice(1)), !0) : t[0] === '^' ? ((t = t.slice(1)), !1) : ou(e, t, r, o))
            ? Yc(e, t, r, s, i, a, l)
            : (t === 'true-value' ? (e._trueValue = r) : t === 'false-value' && (e._falseValue = r),
              qc(e, t, r, o));
  };
function ou(e, t, n, r) {
  return r
    ? !!(t === 'innerHTML' || t === 'textContent' || (t in e && Ws.test(t) && Z(n)))
    : t === 'spellcheck' ||
        t === 'draggable' ||
        t === 'translate' ||
        t === 'form' ||
        (t === 'list' && e.tagName === 'INPUT') ||
        (t === 'type' && e.tagName === 'TEXTAREA') ||
        (Ws.test(t) && xe(n))
      ? !1
      : t in e;
}
const gr = (e) => {
  const t = e.props['onUpdate:modelValue'] || !1;
  return q(t) ? (n) => or(t, n) : t;
};
function su(e) {
  e.target.composing = !0;
}
function Ks(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')));
}
const Y3 = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, o) {
      e._assign = gr(o);
      const s = r || (o.props && o.props.type === 'number');
      Nt(e, t ? 'change' : 'input', (i) => {
        if (i.target.composing) return;
        let a = e.value;
        n && (a = a.trim()), s && (a = fr(a)), e._assign(a);
      }),
        n &&
          Nt(e, 'change', () => {
            e.value = e.value.trim();
          }),
        t || (Nt(e, 'compositionstart', su), Nt(e, 'compositionend', Ks), Nt(e, 'change', Ks));
    },
    mounted(e, { value: t }) {
      e.value = t == null ? '' : t;
    },
    beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: r, number: o } }, s) {
      if (
        ((e._assign = gr(s)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== 'range' &&
            (n || (r && e.value.trim() === t) || ((o || e.type === 'number') && fr(e.value) === t))))
      )
        return;
      const i = t == null ? '' : t;
      e.value !== i && (e.value = i);
    },
  },
  J3 = {
    deep: !0,
    created(e, { value: t, modifiers: { number: n } }, r) {
      const o = Ar(t);
      Nt(e, 'change', () => {
        const s = Array.prototype.filter
          .call(e.options, (i) => i.selected)
          .map((i) => (n ? fr(yr(i)) : yr(i)));
        e._assign(e.multiple ? (o ? new Set(s) : s) : s[0]);
      }),
        (e._assign = gr(r));
    },
    mounted(e, { value: t }) {
      Gs(e, t);
    },
    beforeUpdate(e, t, n) {
      e._assign = gr(n);
    },
    updated(e, { value: t }) {
      Gs(e, t);
    },
  };
function Gs(e, t) {
  const n = e.multiple;
  if (!(n && !q(t) && !Ar(t))) {
    for (let r = 0, o = e.options.length; r < o; r++) {
      const s = e.options[r],
        i = yr(s);
      if (n) q(t) ? (s.selected = qa(t, i) > -1) : (s.selected = t.has(i));
      else if (Mr(yr(s), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function yr(e) {
  return '_value' in e ? e._value : e.value;
}
const iu = ['ctrl', 'shift', 'alt', 'meta'],
  lu = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && e.button !== 0,
    middle: (e) => 'button' in e && e.button !== 1,
    right: (e) => 'button' in e && e.button !== 2,
    exact: (e, t) => iu.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  Z3 =
    (e, t) =>
    (n, ...r) => {
      for (let o = 0; o < t.length; o++) {
        const s = lu[t[o]];
        if (s && s(n, t)) return;
      }
      return e(n, ...r);
    },
  au = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace',
  },
  X3 = (e, t) => (n) => {
    if (!('key' in n)) return;
    const r = Ut(n.key);
    if (t.some((o) => o === r || au[o] === r)) return e(n);
  },
  Q3 = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e._vod = e.style.display === 'none' ? '' : e.style.display), n && t ? n.beforeEnter(e) : gn(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), gn(e, !0), r.enter(e))
            : r.leave(e, () => {
                gn(e, !1);
              })
          : gn(e, t));
    },
    beforeUnmount(e, { value: t }) {
      gn(e, t);
    },
  };
function gn(e, t) {
  e.style.display = t ? e._vod : 'none';
}
const cu = Ve(
  {
    patchProp: ru,
  },
  Uc,
);
let qs;
function uu() {
  return qs || (qs = zc(cu));
}
const fu = (...e) => {
  const t = uu().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const o = du(r);
      if (!o) return;
      const s = t._component;
      !Z(s) && !s.render && !s.template && (s.template = o.innerHTML), (o.innerHTML = '');
      const i = n(o, !1, o instanceof SVGElement);
      return o instanceof Element && (o.removeAttribute('v-cloak'), o.setAttribute('data-v-app', '')), i;
    }),
    t
  );
};
function du(e) {
  return xe(e) ? document.querySelector(e) : e;
}
const hu = 'modulepreload',
  mu = function (e) {
    return '/' + e;
  },
  Ys = {},
  G = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const o = document.getElementsByTagName('link');
    return Promise.all(
      n.map((s) => {
        if (((s = mu(s)), s in Ys)) return;
        Ys[s] = !0;
        const i = s.endsWith('.css'),
          a = i ? '[rel="stylesheet"]' : '';
        if (!!r)
          for (let u = o.length - 1; u >= 0; u--) {
            const f = o[u];
            if (f.href === s && (!i || f.rel === 'stylesheet')) return;
          }
        else if (document.querySelector(`link[href="${s}"]${a}`)) return;
        const c = document.createElement('link');
        if (
          ((c.rel = i ? 'stylesheet' : hu),
          i || ((c.as = 'script'), (c.crossOrigin = '')),
          (c.href = s),
          document.head.appendChild(c),
          i)
        )
          return new Promise((u, f) => {
            c.addEventListener('load', u),
              c.addEventListener('error', () => f(new Error(`Unable to preload CSS for ${s}`)));
          });
      }),
    ).then(() => t());
  };
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */
const Yt = typeof window < 'u';
function pu(e) {
  return e.__esModule || e[Symbol.toStringTag] === 'Module';
}
const ue = Object.assign;
function qr(e, t) {
  const n = {};
  for (const r in t) {
    const o = t[r];
    n[r] = ot(o) ? o.map(e) : e(o);
  }
  return n;
}
const Pn = () => {},
  ot = Array.isArray,
  _u = /\/$/,
  gu = (e) => e.replace(_u, '');
function Yr(e, t, n = '/') {
  let r,
    o = {},
    s = '',
    i = '';
  const a = t.indexOf('#');
  let l = t.indexOf('?');
  return (
    a < l && a >= 0 && (l = -1),
    l > -1 && ((r = t.slice(0, l)), (s = t.slice(l + 1, a > -1 ? a : t.length)), (o = e(s))),
    a > -1 && ((r = r || t.slice(0, a)), (i = t.slice(a, t.length))),
    (r = zu(r != null ? r : t, n)),
    {
      fullPath: r + (s && '?') + s + i,
      path: r,
      query: o,
      hash: i,
    }
  );
}
function yu(e, t) {
  const n = t.query ? e(t.query) : '';
  return t.path + (n && '?') + n + (t.hash || '');
}
function Js(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || '/';
}
function vu(e, t, n) {
  const r = t.matched.length - 1,
    o = n.matched.length - 1;
  return (
    r > -1 &&
    r === o &&
    cn(t.matched[r], n.matched[o]) &&
    Kl(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function cn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Kl(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!bu(e[n], t[n])) return !1;
  return !0;
}
function bu(e, t) {
  return ot(e) ? Zs(e, t) : ot(t) ? Zs(t, e) : e === t;
}
function Zs(e, t) {
  return ot(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t;
}
function zu(e, t) {
  if (e.startsWith('/')) return e;
  if (!e) return t;
  const n = t.split('/'),
    r = e.split('/');
  let o = n.length - 1,
    s,
    i;
  for (s = 0; s < r.length; s++)
    if (((i = r[s]), i !== '.'))
      if (i === '..') o > 1 && o--;
      else break;
  return n.slice(0, o).join('/') + '/' + r.slice(s - (s === r.length ? 1 : 0)).join('/');
}
var Nn;
(function (e) {
  (e.pop = 'pop'), (e.push = 'push');
})(Nn || (Nn = {}));
var On;
(function (e) {
  (e.back = 'back'), (e.forward = 'forward'), (e.unknown = '');
})(On || (On = {}));
function wu(e) {
  if (!e)
    if (Yt) {
      const t = document.querySelector('base');
      (e = (t && t.getAttribute('href')) || '/'), (e = e.replace(/^\w+:\/\/[^\/]+/, ''));
    } else e = '/';
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), gu(e);
}
const Eu = /^[^#]+#/;
function Mu(e, t) {
  return e.replace(Eu, '#') + t;
}
function Cu(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const Nr = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset,
});
function Au(e) {
  let t;
  if ('el' in e) {
    const n = e.el,
      r = typeof n == 'string' && n.startsWith('#'),
      o = typeof n == 'string' ? (r ? document.getElementById(n.slice(1)) : document.querySelector(n)) : n;
    if (!o) return;
    t = Cu(o, e);
  } else t = e;
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset,
      );
}
function Xs(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const po = new Map();
function Pu(e, t) {
  po.set(e, t);
}
function Ou(e) {
  const t = po.get(e);
  return po.delete(e), t;
}
let Tu = () => location.protocol + '//' + location.host;
function Gl(e, t) {
  const { pathname: n, search: r, hash: o } = t,
    s = e.indexOf('#');
  if (s > -1) {
    let a = o.includes(e.slice(s)) ? e.slice(s).length : 1,
      l = o.slice(a);
    return l[0] !== '/' && (l = '/' + l), Js(l, '');
  }
  return Js(n, e) + r + o;
}
function xu(e, t, n, r) {
  let o = [],
    s = [],
    i = null;
  const a = ({ state: d }) => {
    const p = Gl(e, location),
      m = n.value,
      g = t.value;
    let v = 0;
    if (d) {
      if (((n.value = p), (t.value = d), i && i === m)) {
        i = null;
        return;
      }
      v = g ? d.position - g.position : 0;
    } else r(p);
    o.forEach((y) => {
      y(n.value, m, {
        delta: v,
        type: Nn.pop,
        direction: v ? (v > 0 ? On.forward : On.back) : On.unknown,
      });
    });
  };
  function l() {
    i = n.value;
  }
  function c(d) {
    o.push(d);
    const p = () => {
      const m = o.indexOf(d);
      m > -1 && o.splice(m, 1);
    };
    return s.push(p), p;
  }
  function u() {
    const { history: d } = window;
    d.state &&
      d.replaceState(
        ue({}, d.state, {
          scroll: Nr(),
        }),
        '',
      );
  }
  function f() {
    for (const d of s) d();
    (s = []), window.removeEventListener('popstate', a), window.removeEventListener('beforeunload', u);
  }
  return (
    window.addEventListener('popstate', a),
    window.addEventListener('beforeunload', u),
    {
      pauseListeners: l,
      listen: c,
      destroy: f,
    }
  );
}
function Qs(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? Nr() : null,
  };
}
function Ru(e) {
  const { history: t, location: n } = window,
    r = {
      value: Gl(e, n),
    },
    o = {
      value: t.state,
    };
  o.value ||
    s(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    );
  function s(l, c, u) {
    const f = e.indexOf('#'),
      d = f > -1 ? (n.host && document.querySelector('base') ? e : e.slice(f)) + l : Tu() + e + l;
    try {
      t[u ? 'replaceState' : 'pushState'](c, '', d), (o.value = c);
    } catch (p) {
      console.error(p), n[u ? 'replace' : 'assign'](d);
    }
  }
  function i(l, c) {
    const u = ue({}, t.state, Qs(o.value.back, l, o.value.forward, !0), c, {
      position: o.value.position,
    });
    s(l, u, !0), (r.value = l);
  }
  function a(l, c) {
    const u = ue({}, o.value, t.state, {
      forward: l,
      scroll: Nr(),
    });
    s(u.current, u, !0);
    const f = ue(
      {},
      Qs(r.value, l, null),
      {
        position: u.position + 1,
      },
      c,
    );
    s(l, f, !1), (r.value = l);
  }
  return {
    location: r,
    state: o,
    push: a,
    replace: i,
  };
}
function Su(e) {
  e = wu(e);
  const t = Ru(e),
    n = xu(e, t.state, t.location, t.replace);
  function r(s, i = !0) {
    i || n.pauseListeners(), history.go(s);
  }
  const o = ue(
    {
      location: '',
      base: e,
      go: r,
      createHref: Mu.bind(null, e),
    },
    t,
    n,
  );
  return (
    Object.defineProperty(o, 'location', {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(o, 'state', {
      enumerable: !0,
      get: () => t.state.value,
    }),
    o
  );
}
function ku(e) {
  return typeof e == 'string' || (e && typeof e == 'object');
}
function ql(e) {
  return typeof e == 'string' || typeof e == 'symbol';
}
const bt = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Yl = Symbol('');
var ei;
(function (e) {
  (e[(e.aborted = 4)] = 'aborted'),
    (e[(e.cancelled = 8)] = 'cancelled'),
    (e[(e.duplicated = 16)] = 'duplicated');
})(ei || (ei = {}));
function un(e, t) {
  return ue(
    new Error(),
    {
      type: e,
      [Yl]: !0,
    },
    t,
  );
}
function pt(e, t) {
  return e instanceof Error && Yl in e && (t == null || !!(e.type & t));
}
const ti = '[^/]+?',
  Iu = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0,
  },
  Lu = /[.+*?^${}()[\]/\\]/g;
function Hu(e, t) {
  const n = ue({}, Iu, t),
    r = [];
  let o = n.start ? '^' : '';
  const s = [];
  for (const c of e) {
    const u = c.length ? [] : [90];
    n.strict && !c.length && (o += '/');
    for (let f = 0; f < c.length; f++) {
      const d = c[f];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (d.type === 0) f || (o += '/'), (o += d.value.replace(Lu, '\\$&')), (p += 40);
      else if (d.type === 1) {
        const { value: m, repeatable: g, optional: v, regexp: y } = d;
        s.push({
          name: m,
          repeatable: g,
          optional: v,
        });
        const z = y || ti;
        if (z !== ti) {
          p += 10;
          try {
            new RegExp(`(${z})`);
          } catch (S) {
            throw new Error(`Invalid custom RegExp for param "${m}" (${z}): ` + S.message);
          }
        }
        let C = g ? `((?:${z})(?:/(?:${z}))*)` : `(${z})`;
        f || (C = v && c.length < 2 ? `(?:/${C})` : '/' + C),
          v && (C += '?'),
          (o += C),
          (p += 20),
          v && (p += -8),
          g && (p += -20),
          z === '.*' && (p += -50);
      }
      u.push(p);
    }
    r.push(u);
  }
  if (n.strict && n.end) {
    const c = r.length - 1;
    r[c][r[c].length - 1] += 0.7000000000000001;
  }
  n.strict || (o += '/?'), n.end ? (o += '$') : n.strict && (o += '(?:/|$)');
  const i = new RegExp(o, n.sensitive ? '' : 'i');
  function a(c) {
    const u = c.match(i),
      f = {};
    if (!u) return null;
    for (let d = 1; d < u.length; d++) {
      const p = u[d] || '',
        m = s[d - 1];
      f[m.name] = p && m.repeatable ? p.split('/') : p;
    }
    return f;
  }
  function l(c) {
    let u = '',
      f = !1;
    for (const d of e) {
      (!f || !u.endsWith('/')) && (u += '/'), (f = !1);
      for (const p of d)
        if (p.type === 0) u += p.value;
        else if (p.type === 1) {
          const { value: m, repeatable: g, optional: v } = p,
            y = m in c ? c[m] : '';
          if (ot(y) && !g)
            throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);
          const z = ot(y) ? y.join('/') : y;
          if (!z)
            if (v) d.length < 2 && (u.endsWith('/') ? (u = u.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${m}"`);
          u += z;
        }
    }
    return u || '/';
  }
  return {
    re: i,
    score: r,
    keys: s,
    parse: a,
    stringify: l,
  };
}
function Du(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === 40 + 40
        ? 1
        : -1
      : 0;
}
function Nu(e, t) {
  let n = 0;
  const r = e.score,
    o = t.score;
  for (; n < r.length && n < o.length; ) {
    const s = Du(r[n], o[n]);
    if (s) return s;
    n++;
  }
  if (Math.abs(o.length - r.length) === 1) {
    if (ni(r)) return 1;
    if (ni(o)) return -1;
  }
  return o.length - r.length;
}
function ni(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Fu = {
    type: 0,
    value: '',
  },
  $u = /[a-zA-Z0-9_]/;
function Vu(e) {
  if (!e) return [[]];
  if (e === '/') return [[Fu]];
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${c}": ${p}`);
  }
  let n = 0,
    r = n;
  const o = [];
  let s;
  function i() {
    s && o.push(s), (s = []);
  }
  let a = 0,
    l,
    c = '',
    u = '';
  function f() {
    c &&
      (n === 0
        ? s.push({
            type: 0,
            value: c,
          })
        : n === 1 || n === 2 || n === 3
          ? (s.length > 1 &&
              (l === '*' || l === '+') &&
              t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),
            s.push({
              type: 1,
              value: c,
              regexp: u,
              repeatable: l === '*' || l === '+',
              optional: l === '*' || l === '?',
            }))
          : t('Invalid state to consume buffer'),
      (c = ''));
  }
  function d() {
    c += l;
  }
  for (; a < e.length; ) {
    if (((l = e[a++]), l === '\\' && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        l === '/' ? (c && f(), i()) : l === ':' ? (f(), (n = 1)) : d();
        break;
      case 4:
        d(), (n = r);
        break;
      case 1:
        l === '(' ? (n = 2) : $u.test(l) ? d() : (f(), (n = 0), l !== '*' && l !== '?' && l !== '+' && a--);
        break;
      case 2:
        l === ')' ? (u[u.length - 1] == '\\' ? (u = u.slice(0, -1) + l) : (n = 3)) : (u += l);
        break;
      case 3:
        f(), (n = 0), l !== '*' && l !== '?' && l !== '+' && a--, (u = '');
        break;
      default:
        t('Unknown state');
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), f(), i(), o;
}
function Bu(e, t, n) {
  const r = Hu(Vu(e.path), n),
    o = ue(r, {
      record: e,
      parent: t,
      children: [],
      alias: [],
    });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function ju(e, t) {
  const n = [],
    r = new Map();
  t = si(
    {
      strict: !1,
      end: !0,
      sensitive: !1,
    },
    t,
  );
  function o(u) {
    return r.get(u);
  }
  function s(u, f, d) {
    const p = !d,
      m = Uu(u);
    m.aliasOf = d && d.record;
    const g = si(t, u),
      v = [m];
    if ('alias' in u) {
      const C = typeof u.alias == 'string' ? [u.alias] : u.alias;
      for (const S of C)
        v.push(
          ue({}, m, {
            components: d ? d.record.components : m.components,
            path: S,
            aliasOf: d ? d.record : m,
          }),
        );
    }
    let y, z;
    for (const C of v) {
      const { path: S } = C;
      if (f && S[0] !== '/') {
        const O = f.record.path,
          k = O[O.length - 1] === '/' ? '' : '/';
        C.path = f.record.path + (S && k + S);
      }
      if (
        ((y = Bu(C, f, g)),
        d ? d.alias.push(y) : ((z = z || y), z !== y && z.alias.push(y), p && u.name && !oi(y) && i(u.name)),
        m.children)
      ) {
        const O = m.children;
        for (let k = 0; k < O.length; k++) s(O[k], y, d && d.children[k]);
      }
      (d = d || y),
        ((y.record.components && Object.keys(y.record.components).length) ||
          y.record.name ||
          y.record.redirect) &&
          l(y);
    }
    return z
      ? () => {
          i(z);
        }
      : Pn;
  }
  function i(u) {
    if (ql(u)) {
      const f = r.get(u);
      f && (r.delete(u), n.splice(n.indexOf(f), 1), f.children.forEach(i), f.alias.forEach(i));
    } else {
      const f = n.indexOf(u);
      f > -1 &&
        (n.splice(f, 1), u.record.name && r.delete(u.record.name), u.children.forEach(i), u.alias.forEach(i));
    }
  }
  function a() {
    return n;
  }
  function l(u) {
    let f = 0;
    for (; f < n.length && Nu(u, n[f]) >= 0 && (u.record.path !== n[f].record.path || !Jl(u, n[f])); ) f++;
    n.splice(f, 0, u), u.record.name && !oi(u) && r.set(u.record.name, u);
  }
  function c(u, f) {
    let d,
      p = {},
      m,
      g;
    if ('name' in u && u.name) {
      if (((d = r.get(u.name)), !d))
        throw un(1, {
          location: u,
        });
      (g = d.record.name),
        (p = ue(
          ri(
            f.params,
            d.keys.filter((z) => !z.optional).map((z) => z.name),
          ),
          u.params &&
            ri(
              u.params,
              d.keys.map((z) => z.name),
            ),
        )),
        (m = d.stringify(p));
    } else if ('path' in u)
      (m = u.path), (d = n.find((z) => z.re.test(m))), d && ((p = d.parse(m)), (g = d.record.name));
    else {
      if (((d = f.name ? r.get(f.name) : n.find((z) => z.re.test(f.path))), !d))
        throw un(1, {
          location: u,
          currentLocation: f,
        });
      (g = d.record.name), (p = ue({}, f.params, u.params)), (m = d.stringify(p));
    }
    const v = [];
    let y = d;
    for (; y; ) v.unshift(y.record), (y = y.parent);
    return {
      name: g,
      path: m,
      params: p,
      matched: v,
      meta: Ku(v),
    };
  }
  return (
    e.forEach((u) => s(u)),
    {
      addRoute: s,
      resolve: c,
      removeRoute: i,
      getRoutes: a,
      getRecordMatcher: o,
    }
  );
}
function ri(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function Uu(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Wu(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      'components' in e
        ? e.components || null
        : e.component && {
            default: e.component,
          },
  };
}
function Wu(e) {
  const t = {},
    n = e.props || !1;
  if ('component' in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == 'boolean' ? n : n[r];
  return t;
}
function oi(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Ku(e) {
  return e.reduce((t, n) => ue(t, n.meta), {});
}
function si(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Jl(e, t) {
  return t.children.some((n) => n === e || Jl(e, n));
}
const Zl = /#/g,
  Gu = /&/g,
  qu = /\//g,
  Yu = /=/g,
  Ju = /\?/g,
  Xl = /\+/g,
  Zu = /%5B/g,
  Xu = /%5D/g,
  Ql = /%5E/g,
  Qu = /%60/g,
  ea = /%7B/g,
  e2 = /%7C/g,
  ta = /%7D/g,
  t2 = /%20/g;
function ts(e) {
  return encodeURI('' + e)
    .replace(e2, '|')
    .replace(Zu, '[')
    .replace(Xu, ']');
}
function n2(e) {
  return ts(e).replace(ea, '{').replace(ta, '}').replace(Ql, '^');
}
function _o(e) {
  return ts(e)
    .replace(Xl, '%2B')
    .replace(t2, '+')
    .replace(Zl, '%23')
    .replace(Gu, '%26')
    .replace(Qu, '`')
    .replace(ea, '{')
    .replace(ta, '}')
    .replace(Ql, '^');
}
function r2(e) {
  return _o(e).replace(Yu, '%3D');
}
function o2(e) {
  return ts(e).replace(Zl, '%23').replace(Ju, '%3F');
}
function s2(e) {
  return e == null ? '' : o2(e).replace(qu, '%2F');
}
function vr(e) {
  try {
    return decodeURIComponent('' + e);
  } catch (t) {}
  return '' + e;
}
function i2(e) {
  const t = {};
  if (e === '' || e === '?') return t;
  const r = (e[0] === '?' ? e.slice(1) : e).split('&');
  for (let o = 0; o < r.length; ++o) {
    const s = r[o].replace(Xl, ' '),
      i = s.indexOf('='),
      a = vr(i < 0 ? s : s.slice(0, i)),
      l = i < 0 ? null : vr(s.slice(i + 1));
    if (a in t) {
      let c = t[a];
      ot(c) || (c = t[a] = [c]), c.push(l);
    } else t[a] = l;
  }
  return t;
}
function ii(e) {
  let t = '';
  for (let n in e) {
    const r = e[n];
    if (((n = r2(n)), r == null)) {
      r !== void 0 && (t += (t.length ? '&' : '') + n);
      continue;
    }
    (ot(r) ? r.map((s) => s && _o(s)) : [r && _o(r)]).forEach((s) => {
      s !== void 0 && ((t += (t.length ? '&' : '') + n), s != null && (t += '=' + s));
    });
  }
  return t;
}
function l2(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 && (t[n] = ot(r) ? r.map((o) => (o == null ? null : '' + o)) : r == null ? r : '' + r);
  }
  return t;
}
const na = Symbol(''),
  li = Symbol(''),
  Fr = Symbol(''),
  ns = Symbol(''),
  go = Symbol('');
function yn() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const o = e.indexOf(r);
        o > -1 && e.splice(o, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e,
    reset: n,
  };
}
function a2(e, t, n) {
  const r = () => {
    e[t].delete(n);
  };
  mn(r),
    Yo(r),
    qo(() => {
      e[t].add(n);
    }),
    e[t].add(n);
}
function e4(e) {
  const t = Ue(na, {}).value;
  t && a2(t, 'leaveGuards', e);
}
function wt(e, t, n, r, o) {
  const s = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
  return () =>
    new Promise((i, a) => {
      const l = (f) => {
          f === !1
            ? a(
                un(4, {
                  from: n,
                  to: t,
                }),
              )
            : f instanceof Error
              ? a(f)
              : ku(f)
                ? a(
                    un(2, {
                      from: t,
                      to: f,
                    }),
                  )
                : (s && r.enterCallbacks[o] === s && typeof f == 'function' && s.push(f), i());
        },
        c = e.call(r && r.instances[o], t, n, l);
      let u = Promise.resolve(c);
      e.length < 3 && (u = u.then(l)), u.catch((f) => a(f));
    });
}
function Jr(e, t, n, r) {
  const o = [];
  for (const s of e)
    for (const i in s.components) {
      let a = s.components[i];
      if (!(t !== 'beforeRouteEnter' && !s.instances[i]))
        if (c2(a)) {
          const c = (a.__vccOpts || a)[t];
          c && o.push(wt(c, n, r, s, i));
        } else {
          let l = a();
          o.push(() =>
            l.then((c) => {
              if (!c) return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${s.path}"`));
              const u = pu(c) ? c.default : c;
              s.components[i] = u;
              const d = (u.__vccOpts || u)[t];
              return d && wt(d, n, r, s, i)();
            }),
          );
        }
    }
  return o;
}
function c2(e) {
  return typeof e == 'object' || 'displayName' in e || 'props' in e || '__vccOpts' in e;
}
function ai(e) {
  const t = Ue(Fr),
    n = Ue(ns),
    r = ie(() => t.resolve(nt(e.to))),
    o = ie(() => {
      const { matched: l } = r.value,
        { length: c } = l,
        u = l[c - 1],
        f = n.matched;
      if (!u || !f.length) return -1;
      const d = f.findIndex(cn.bind(null, u));
      if (d > -1) return d;
      const p = ci(l[c - 2]);
      return c > 1 && ci(u) === p && f[f.length - 1].path !== p ? f.findIndex(cn.bind(null, l[c - 2])) : d;
    }),
    s = ie(() => o.value > -1 && h2(n.params, r.value.params)),
    i = ie(() => o.value > -1 && o.value === n.matched.length - 1 && Kl(n.params, r.value.params));
  function a(l = {}) {
    return d2(l) ? t[nt(e.replace) ? 'replace' : 'push'](nt(e.to)).catch(Pn) : Promise.resolve();
  }
  return {
    route: r,
    href: ie(() => r.value.href),
    isActive: s,
    isExactActive: i,
    navigate: a,
  };
}
const u2 = Go({
    name: 'RouterLink',
    compatConfig: {
      MODE: 3,
    },
    props: {
      to: {
        type: [String, Object],
        required: !0,
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: 'page',
      },
    },
    useLink: ai,
    setup(e, { slots: t }) {
      const n = Ot(ai(e)),
        { options: r } = Ue(Fr),
        o = ie(() => ({
          [ui(e.activeClass, r.linkActiveClass, 'router-link-active')]: n.isActive,
          [ui(e.exactActiveClass, r.linkExactActiveClass, 'router-link-exact-active')]: n.isExactActive,
        }));
      return () => {
        const s = t.default && t.default(n);
        return e.custom
          ? s
          : Dr(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: o.value,
              },
              s,
            );
      };
    },
  }),
  f2 = u2;
function d2(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target');
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function h2(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n];
    if (typeof r == 'string') {
      if (r !== o) return !1;
    } else if (!ot(o) || o.length !== r.length || r.some((s, i) => s !== o[i])) return !1;
  }
  return !0;
}
function ci(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
}
const ui = (e, t, n) => (e != null ? e : t != null ? t : n),
  m2 = Go({
    name: 'RouterView',
    inheritAttrs: !1,
    props: {
      name: {
        type: String,
        default: 'default',
      },
      route: Object,
    },
    compatConfig: {
      MODE: 3,
    },
    setup(e, { attrs: t, slots: n }) {
      const r = Ue(go),
        o = ie(() => e.route || r.value),
        s = Ue(li, 0),
        i = ie(() => {
          let c = nt(s);
          const { matched: u } = o.value;
          let f;
          for (; (f = u[c]) && !f.components; ) c++;
          return c;
        }),
        a = ie(() => o.value.matched[i.value]);
      ir(
        li,
        ie(() => i.value + 1),
      ),
        ir(na, a),
        ir(go, o);
      const l = ce();
      return (
        Re(
          () => [l.value, a.value, e.name],
          ([c, u, f], [d, p, m]) => {
            u &&
              ((u.instances[f] = c),
              p &&
                p !== u &&
                c &&
                c === d &&
                (u.leaveGuards.size || (u.leaveGuards = p.leaveGuards),
                u.updateGuards.size || (u.updateGuards = p.updateGuards))),
              c && u && (!p || !cn(u, p) || !d) && (u.enterCallbacks[f] || []).forEach((g) => g(c));
          },
          {
            flush: 'post',
          },
        ),
        () => {
          const c = o.value,
            u = e.name,
            f = a.value,
            d = f && f.components[u];
          if (!d)
            return fi(n.default, {
              Component: d,
              route: c,
            });
          const p = f.props[u],
            m = p ? (p === !0 ? c.params : typeof p == 'function' ? p(c) : p) : null,
            v = Dr(
              d,
              ue({}, m, t, {
                onVnodeUnmounted: (y) => {
                  y.component.isUnmounted && (f.instances[u] = null);
                },
                ref: l,
              }),
            );
          return (
            fi(n.default, {
              Component: v,
              route: c,
            }) || v
          );
        }
      );
    },
  });
function fi(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const p2 = m2;
function _2(e) {
  const t = ju(e.routes, e),
    n = e.parseQuery || i2,
    r = e.stringifyQuery || ii,
    o = e.history,
    s = yn(),
    i = yn(),
    a = yn(),
    l = wn(bt);
  let c = bt;
  Yt && e.scrollBehavior && 'scrollRestoration' in history && (history.scrollRestoration = 'manual');
  const u = qr.bind(null, (x) => '' + x),
    f = qr.bind(null, s2),
    d = qr.bind(null, vr);
  function p(x, V) {
    let F, K;
    return ql(x) ? ((F = t.getRecordMatcher(x)), (K = V)) : (K = x), t.addRoute(K, F);
  }
  function m(x) {
    const V = t.getRecordMatcher(x);
    V && t.removeRoute(V);
  }
  function g() {
    return t.getRoutes().map((x) => x.record);
  }
  function v(x) {
    return !!t.getRecordMatcher(x);
  }
  function y(x, V) {
    if (((V = ue({}, V || l.value)), typeof x == 'string')) {
      const h = Yr(n, x, V.path),
        _ = t.resolve(
          {
            path: h.path,
          },
          V,
        ),
        E = o.createHref(h.fullPath);
      return ue(h, _, {
        params: d(_.params),
        hash: vr(h.hash),
        redirectedFrom: void 0,
        href: E,
      });
    }
    let F;
    if ('path' in x)
      F = ue({}, x, {
        path: Yr(n, x.path, V.path).path,
      });
    else {
      const h = ue({}, x.params);
      for (const _ in h) h[_] == null && delete h[_];
      (F = ue({}, x, {
        params: f(x.params),
      })),
        (V.params = f(V.params));
    }
    const K = t.resolve(F, V),
      ne = x.hash || '';
    K.params = u(d(K.params));
    const pe = yu(
        r,
        ue({}, x, {
          hash: n2(ne),
          path: K.path,
        }),
      ),
      X = o.createHref(pe);
    return ue(
      {
        fullPath: pe,
        hash: ne,
        query: r === ii ? l2(x.query) : x.query || {},
      },
      K,
      {
        redirectedFrom: void 0,
        href: X,
      },
    );
  }
  function z(x) {
    return typeof x == 'string' ? Yr(n, x, l.value.path) : ue({}, x);
  }
  function C(x, V) {
    if (c !== x)
      return un(8, {
        from: V,
        to: x,
      });
  }
  function S(x) {
    return T(x);
  }
  function O(x) {
    return S(
      ue(z(x), {
        replace: !0,
      }),
    );
  }
  function k(x) {
    const V = x.matched[x.matched.length - 1];
    if (V && V.redirect) {
      const { redirect: F } = V;
      let K = typeof F == 'function' ? F(x) : F;
      return (
        typeof K == 'string' &&
          ((K =
            K.includes('?') || K.includes('#')
              ? (K = z(K))
              : {
                  path: K,
                }),
          (K.params = {})),
        ue(
          {
            query: x.query,
            hash: x.hash,
            params: 'path' in K ? {} : x.params,
          },
          K,
        )
      );
    }
  }
  function T(x, V) {
    const F = (c = y(x)),
      K = l.value,
      ne = x.state,
      pe = x.force,
      X = x.replace === !0,
      h = k(F);
    if (h)
      return T(
        ue(z(h), {
          state: typeof h == 'object' ? ue({}, ne, h.state) : ne,
          force: pe,
          replace: X,
        }),
        V || F,
      );
    const _ = F;
    _.redirectedFrom = V;
    let E;
    return (
      !pe &&
        vu(r, K, F) &&
        ((E = un(16, {
          to: _,
          from: K,
        })),
        Ie(K, K, !0, !1)),
      (E ? Promise.resolve(E) : A(_, K))
        .catch((M) => (pt(M) ? (pt(M, 2) ? M : ve(M)) : Y(M, _, K)))
        .then((M) => {
          if (M) {
            if (pt(M, 2))
              return T(
                ue(
                  {
                    replace: X,
                  },
                  z(M.to),
                  {
                    state: typeof M.to == 'object' ? ue({}, ne, M.to.state) : ne,
                    force: pe,
                  },
                ),
                V || _,
              );
          } else M = B(_, K, !0, X, ne);
          return N(_, K, M), M;
        })
    );
  }
  function I(x, V) {
    const F = C(x, V);
    return F ? Promise.reject(F) : Promise.resolve();
  }
  function A(x, V) {
    let F;
    const [K, ne, pe] = g2(x, V);
    F = Jr(K.reverse(), 'beforeRouteLeave', x, V);
    for (const h of K)
      h.leaveGuards.forEach((_) => {
        F.push(wt(_, x, V));
      });
    const X = I.bind(null, x, V);
    return (
      F.push(X),
      Gt(F)
        .then(() => {
          F = [];
          for (const h of s.list()) F.push(wt(h, x, V));
          return F.push(X), Gt(F);
        })
        .then(() => {
          F = Jr(ne, 'beforeRouteUpdate', x, V);
          for (const h of ne)
            h.updateGuards.forEach((_) => {
              F.push(wt(_, x, V));
            });
          return F.push(X), Gt(F);
        })
        .then(() => {
          F = [];
          for (const h of x.matched)
            if (h.beforeEnter && !V.matched.includes(h))
              if (ot(h.beforeEnter)) for (const _ of h.beforeEnter) F.push(wt(_, x, V));
              else F.push(wt(h.beforeEnter, x, V));
          return F.push(X), Gt(F);
        })
        .then(
          () => (
            x.matched.forEach((h) => (h.enterCallbacks = {})),
            (F = Jr(pe, 'beforeRouteEnter', x, V)),
            F.push(X),
            Gt(F)
          ),
        )
        .then(() => {
          F = [];
          for (const h of i.list()) F.push(wt(h, x, V));
          return F.push(X), Gt(F);
        })
        .catch((h) => (pt(h, 8) ? h : Promise.reject(h)))
    );
  }
  function N(x, V, F) {
    for (const K of a.list()) K(x, V, F);
  }
  function B(x, V, F, K, ne) {
    const pe = C(x, V);
    if (pe) return pe;
    const X = V === bt,
      h = Yt ? history.state : {};
    F &&
      (K || X
        ? o.replace(
            x.fullPath,
            ue(
              {
                scroll: X && h && h.scroll,
              },
              ne,
            ),
          )
        : o.push(x.fullPath, ne)),
      (l.value = x),
      Ie(x, V, F, X),
      ve();
  }
  let J;
  function ze() {
    J ||
      (J = o.listen((x, V, F) => {
        if (!Me.listening) return;
        const K = y(x),
          ne = k(K);
        if (ne) {
          T(
            ue(ne, {
              replace: !0,
            }),
            K,
          ).catch(Pn);
          return;
        }
        c = K;
        const pe = l.value;
        Yt && Pu(Xs(pe.fullPath, F.delta), Nr()),
          A(K, pe)
            .catch((X) =>
              pt(X, 12)
                ? X
                : pt(X, 2)
                  ? (T(X.to, K)
                      .then((h) => {
                        pt(h, 20) && !F.delta && F.type === Nn.pop && o.go(-1, !1);
                      })
                      .catch(Pn),
                    Promise.reject())
                  : (F.delta && o.go(-F.delta, !1), Y(X, K, pe)),
            )
            .then((X) => {
              (X = X || B(K, pe, !1)),
                X &&
                  (F.delta && !pt(X, 8)
                    ? o.go(-F.delta, !1)
                    : F.type === Nn.pop && pt(X, 20) && o.go(-1, !1)),
                N(K, pe, X);
            })
            .catch(Pn);
      }));
  }
  let ge = yn(),
    fe = yn(),
    ee;
  function Y(x, V, F) {
    ve(x);
    const K = fe.list();
    return K.length ? K.forEach((ne) => ne(x, V, F)) : console.error(x), Promise.reject(x);
  }
  function te() {
    return ee && l.value !== bt
      ? Promise.resolve()
      : new Promise((x, V) => {
          ge.add([x, V]);
        });
  }
  function ve(x) {
    return ee || ((ee = !x), ze(), ge.list().forEach(([V, F]) => (x ? F(x) : V())), ge.reset()), x;
  }
  function Ie(x, V, F, K) {
    const { scrollBehavior: ne } = e;
    if (!Yt || !ne) return Promise.resolve();
    const pe = (!F && Ou(Xs(x.fullPath, 0))) || ((K || !F) && history.state && history.state.scroll) || null;
    return Wt()
      .then(() => ne(x, V, pe))
      .then((X) => X && Au(X))
      .catch((X) => Y(X, x, V));
  }
  const Se = (x) => o.go(x);
  let Ee;
  const st = new Set(),
    Me = {
      currentRoute: l,
      listening: !0,
      addRoute: p,
      removeRoute: m,
      hasRoute: v,
      getRoutes: g,
      resolve: y,
      options: e,
      push: S,
      replace: O,
      go: Se,
      back: () => Se(-1),
      forward: () => Se(1),
      beforeEach: s.add,
      beforeResolve: i.add,
      afterEach: a.add,
      onError: fe.add,
      isReady: te,
      install(x) {
        const V = this;
        x.component('RouterLink', f2),
          x.component('RouterView', p2),
          (x.config.globalProperties.$router = V),
          Object.defineProperty(x.config.globalProperties, '$route', {
            enumerable: !0,
            get: () => nt(l),
          }),
          Yt && !Ee && l.value === bt && ((Ee = !0), S(o.location).catch((ne) => {}));
        const F = {};
        for (const ne in bt) F[ne] = ie(() => l.value[ne]);
        x.provide(Fr, V), x.provide(ns, Ot(F)), x.provide(go, l);
        const K = x.unmount;
        st.add(x),
          (x.unmount = function () {
            st.delete(x),
              st.size < 1 && ((c = bt), J && J(), (J = null), (l.value = bt), (Ee = !1), (ee = !1)),
              K();
          });
      },
    };
  return Me;
}
function Gt(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function g2(e, t) {
  const n = [],
    r = [],
    o = [],
    s = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < s; i++) {
    const a = t.matched[i];
    a && (e.matched.find((c) => cn(c, a)) ? r.push(a) : n.push(a));
    const l = e.matched[i];
    l && (t.matched.find((c) => cn(c, l)) || o.push(l));
  }
  return [n, r, o];
}
function t4() {
  return Ue(Fr);
}
function y2() {
  return Ue(ns);
}
const ra = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, o] of t) n[r] = o;
    return n;
  },
  v2 = {};
function b2(e, t) {
  const n = so('router-view');
  return dt(), Ir(n);
}
const z2 = ra(v2, [['render', b2]]),
  w2 = Object.keys({
    ar: 'ar_AE',
    bg: 'bg_BG',
    cs: 'cs_CZ',
    da: 'da_DK',
    de: 'de_DE',
    el: 'el_GR',
    en: 'en_GB',
    es: 'es_ES',
    et: 'et_EE',
    fi: 'fi_FI',
    fr: 'fr_FR',
    he: 'he_IL',
    hi: 'hi_IN',
    hu: 'hu_HU',
    id: 'id_ID',
    it: 'it_IT',
    ja: 'ja_JP',
    ko: 'ko_KR',
    lt: 'lt_LT',
    lv: 'lv_LV',
    nb: 'nb_NO',
    nl: 'nl_NL',
    pl: 'pl_PL',
    pt: 'pt_BR',
    ro: 'ro_RO',
    ru: 'ru_RU',
    sk: 'sk_SK',
    sl: 'sl_SI',
    sv: 'sv_SE',
    th: 'th_TH',
    tr: 'tr_TR',
    uk: 'uk_UA',
    vi: 'vi_VN',
    zh: 'zh_CN',
  }).map((e) => ({
    path: e === 'en' ? '' : `/${e}/`,
    component: z2,
    children: [
      {
        path: '',
        name: `${e}__remover`,
        component: () =>
          G(
            () => import('./AppRemover-4e85aa9a.js'),
            [
              'assets/AppRemover-4e85aa9a.js',
              'assets/LandingUploadFile-b5cd046b.js',
              'assets/index-fd2fb30e.js',
              'assets/WaveForm-8c26cfd3.js',
              'assets/user-2a73f77a.js',
              'assets/AudioFile-25199808.js',
              'assets/AudioMixer-fba2512f.js',
              'assets/key-finder-f0700cb6.js',
            ],
          ),
      },
      {
        path: 'splitter-ai',
        name: `${e}__splitter`,
        component: () =>
          G(
            () => import('./AppSplitter-7b9b0b25.js'),
            [
              'assets/AppSplitter-7b9b0b25.js',
              'assets/AppRemover-4e85aa9a.js',
              'assets/LandingUploadFile-b5cd046b.js',
              'assets/index-fd2fb30e.js',
              'assets/WaveForm-8c26cfd3.js',
              'assets/user-2a73f77a.js',
              'assets/AudioFile-25199808.js',
              'assets/AudioMixer-fba2512f.js',
              'assets/key-finder-f0700cb6.js',
            ],
          ),
      },
      {
        path: 'pitch',
        name: `${e}__pitch`,
        component: () =>
          G(
            () => import('./AppPitch-5893b794.js'),
            [
              'assets/AppPitch-5893b794.js',
              'assets/WaveForm-8c26cfd3.js',
              'assets/index-fd2fb30e.js',
              'assets/CheckBox-986cfa49.js',
              'assets/LandingUploadFile-b5cd046b.js',
              'assets/key-finder-f0700cb6.js',
            ],
          ),
      },
      {
        path: 'cutter',
        name: `${e}__cutter`,
        component: () =>
          G(
            () => import('./AppCutter-7e2d8b79.js'),
            [
              'assets/AppCutter-7e2d8b79.js',
              'assets/WaveForm-8c26cfd3.js',
              'assets/index-fd2fb30e.js',
              'assets/InputTime-61f3e9aa.js',
              'assets/LandingUploadFile-b5cd046b.js',
              'assets/AudioFile-25199808.js',
            ],
          ),
      },
      {
        path: 'joiner',
        name: `${e}__joiner`,
        component: () =>
          G(
            () => import('./AppJoiner-5008ff3e.js'),
            [
              'assets/AppJoiner-5008ff3e.js',
              'assets/WaveForm-8c26cfd3.js',
              'assets/index-fd2fb30e.js',
              'assets/InputTime-61f3e9aa.js',
              'assets/LandingUploadFile-b5cd046b.js',
              'assets/AudioFile-25199808.js',
            ],
          ),
      },
      {
        path: 'key-bpm-finder',
        name: `${e}__bpm`,
        component: () =>
          G(
            () => import('./AppBpmFinder-d86dc8b0.js'),
            [
              'assets/AppBpmFinder-d86dc8b0.js',
              'assets/LandingUploadFile-b5cd046b.js',
              'assets/index-fd2fb30e.js',
              'assets/key-finder-f0700cb6.js',
            ],
          ),
      },
      {
        path: 'tap-tempo',
        name: `${e}__tap`,
        component: () => G(() => import('./AppTapBpm-5aa71fe8.js'), []),
      },
      {
        path: 'voice-recorder',
        name: `${e}__recorder`,
        component: () =>
          G(
            () => import('./AppVoiceRecorder-bb66b721.js'),
            [
              'assets/AppVoiceRecorder-bb66b721.js',
              'assets/PeakWorkletProcessor-0d3531ed.js',
              'assets/CheckBox-986cfa49.js',
              'assets/WaveForm-8c26cfd3.js',
              'assets/index-fd2fb30e.js',
              'assets/AudioFile-25199808.js',
            ],
          ),
      },
      {
        path: 'karaoke',
        name: `${e}__karaoke`,
        component: () =>
          G(
            () => import('./AppKaraoke-bdcb2b87.js'),
            [
              'assets/AppKaraoke-bdcb2b87.js',
              'assets/PeakWorkletProcessor-0d3531ed.js',
              'assets/CheckBox-986cfa49.js',
              'assets/WaveForm-8c26cfd3.js',
              'assets/index-fd2fb30e.js',
              'assets/LandingUploadFile-b5cd046b.js',
              'assets/AudioMixer-fba2512f.js',
              'assets/AudioFile-25199808.js',
            ],
          ),
      },
      {
        path: 'support',
        name: `${e}__support`,
        component: () =>
          G(
            () => import('./AppSupport-5ea81deb.js'),
            [
              'assets/AppSupport-5ea81deb.js',
              'assets/SignInPopup-4694aadf.js',
              'assets/user-2a73f77a.js',
              'assets/timeago-c2fe92fb.js',
            ],
          ),
      },
      {
        path: 'subscription',
        name: `${e}__subscription`,
        redirect: {
          name: `${e}__membership`,
        },
      },
      {
        path: 'terms-of-service',
        name: `${e}__terms-of-service`,
        component: () => G(() => import('./AppTerms-c5dcecdf.js'), []),
      },
      {
        path: 'privacy-policy',
        name: `${e}__privacy-policy`,
        component: () => G(() => import('./AppPrivacy-f0f82f00.js'), []),
      },
      {
        path: 'pricing',
        name: `${e}__pricing`,
        component: () =>
          G(
            () => import('./AppPricing-8c2afcf0.js'),
            [
              'assets/AppPricing-8c2afcf0.js',
              'assets/PageMain-d406fecc.js',
              'assets/SignInPopup-4694aadf.js',
              'assets/user-2a73f77a.js',
            ],
          ),
      },
      {
        path: 'membership',
        name: `${e}__membership`,
        component: () =>
          G(
            () => import('./AppMembership-0de2fe2c.js'),
            [
              'assets/AppMembership-0de2fe2c.js',
              'assets/PageMain-d406fecc.js',
              'assets/SignInPopup-4694aadf.js',
              'assets/user-2a73f77a.js',
              'assets/timeago-c2fe92fb.js',
            ],
          ),
      },
      {
        path: ':pathMatch(.*)*',
        name: `${e}__page_not_found`,
        component: () => G(() => import('./AppPageNotFound-ef123eca.js'), []),
      },
    ],
  })),
  Xe = _2({
    history: Su(),
    routes: w2,
  }),
  E2 = (e, t) => {
    const n = e[t];
    return n
      ? typeof n == 'function'
        ? n()
        : Promise.resolve(n)
      : new Promise((r, o) => {
          (typeof queueMicrotask == 'function' ? queueMicrotask : setTimeout)(
            o.bind(null, new Error('Unknown variable dynamic import: ' + t)),
          );
        });
  };
/*!
 * shared v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */
const yo = typeof window < 'u',
  M2 = typeof Symbol == 'function' && typeof Symbol.toStringTag == 'symbol',
  Rt = (e) => (M2 ? Symbol(e) : e),
  C2 = (e, t, n) =>
    A2({
      l: e,
      k: t,
      s: n,
    }),
  A2 = (e) =>
    JSON.stringify(e)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
      .replace(/\u0027/g, '\\u0027'),
  ke = (e) => typeof e == 'number' && isFinite(e),
  P2 = (e) => ss(e) === '[object Date]',
  br = (e) => ss(e) === '[object RegExp]',
  $r = (e) => se(e) && Object.keys(e).length === 0;
function O2(e, t) {
  typeof console < 'u' && (console.warn('[intlify] ' + e), t && console.warn(t.stack));
}
const $e = Object.assign;
let di;
const rs = () =>
  di ||
  (di =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {});
function hi(e) {
  return e.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
const T2 = Object.prototype.hasOwnProperty;
function os(e, t) {
  return T2.call(e, t);
}
const Te = Array.isArray,
  Le = (e) => typeof e == 'function',
  U = (e) => typeof e == 'string',
  Ce = (e) => typeof e == 'boolean',
  he = (e) => e !== null && typeof e == 'object',
  oa = Object.prototype.toString,
  ss = (e) => oa.call(e),
  se = (e) => ss(e) === '[object Object]',
  x2 = (e) =>
    e == null ? '' : Te(e) || (se(e) && e.toString === oa) ? JSON.stringify(e, null, 2) : String(e);
/*!
 * message-compiler v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */
const sa = {
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  __EXTEND_POINT__: 15,
};
function ia(e, t, n = {}) {
  const { domain: r, messages: o, args: s } = n,
    i = e,
    a = new SyntaxError(String(i));
  return (a.code = e), t && (a.location = t), (a.domain = r), a;
}
/*!
 * devtools-if v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */
const la = {
  I18nInit: 'i18n:init',
  FunctionTranslate: 'function:translate',
};
/*!
 * core-base v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */
const St = [];
St[0] = {
  w: [0],
  i: [3, 0],
  ['[']: [4],
  o: [7],
};
St[1] = {
  w: [1],
  ['.']: [2],
  ['[']: [4],
  o: [7],
};
St[2] = {
  w: [2],
  i: [3, 0],
  [0]: [3, 0],
};
St[3] = {
  i: [3, 0],
  [0]: [3, 0],
  w: [1, 1],
  ['.']: [2, 1],
  ['[']: [4, 1],
  o: [7, 1],
};
St[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ['[']: [4, 2],
  [']']: [1, 3],
  o: 8,
  l: [4, 0],
};
St[5] = {
  ["'"]: [4, 0],
  o: 8,
  l: [5, 0],
};
St[6] = {
  ['"']: [4, 0],
  o: 8,
  l: [6, 0],
};
const R2 = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function S2(e) {
  return R2.test(e);
}
function k2(e) {
  const t = e.charCodeAt(0),
    n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function I2(e) {
  if (e == null) return 'o';
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return 'i';
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return 'w';
  }
  return 'i';
}
function L2(e) {
  const t = e.trim();
  return e.charAt(0) === '0' && isNaN(parseInt(e)) ? !1 : S2(t) ? k2(t) : '*' + t;
}
function H2(e) {
  const t = [];
  let n = -1,
    r = 0,
    o = 0,
    s,
    i,
    a,
    l,
    c,
    u,
    f;
  const d = [];
  (d[0] = () => {
    i === void 0 ? (i = a) : (i += a);
  }),
    (d[1] = () => {
      i !== void 0 && (t.push(i), (i = void 0));
    }),
    (d[2] = () => {
      d[0](), o++;
    }),
    (d[3] = () => {
      if (o > 0) o--, (r = 4), d[0]();
      else {
        if (((o = 0), i === void 0 || ((i = L2(i)), i === !1))) return !1;
        d[1]();
      }
    });
  function p() {
    const m = e[n + 1];
    if ((r === 5 && m === "'") || (r === 6 && m === '"')) return n++, (a = '\\' + m), d[0](), !0;
  }
  for (; r !== null; )
    if ((n++, (s = e[n]), !(s === '\\' && p()))) {
      if (
        ((l = I2(s)),
        (f = St[r]),
        (c = f[l] || f.l || 8),
        c === 8 || ((r = c[0]), c[1] !== void 0 && ((u = d[c[1]]), u && ((a = s), u() === !1))))
      )
        return;
      if (r === 7) return t;
    }
}
const mi = new Map();
function D2(e, t) {
  return he(e) ? e[t] : null;
}
function N2(e, t) {
  if (!he(e)) return null;
  let n = mi.get(t);
  if ((n || ((n = H2(t)), n && mi.set(t, n)), !n)) return null;
  const r = n.length;
  let o = e,
    s = 0;
  for (; s < r; ) {
    const i = o[n[s]];
    if (i === void 0) return null;
    (o = i), s++;
  }
  return o;
}
const F2 = (e) => e,
  $2 = (e) => '',
  V2 = 'text',
  B2 = (e) => (e.length === 0 ? '' : e.join('')),
  j2 = x2;
function pi(e, t) {
  return (e = Math.abs(e)), t === 2 ? (e ? (e > 1 ? 1 : 0) : 1) : e ? Math.min(e, 2) : 0;
}
function U2(e) {
  const t = ke(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (ke(e.named.count) || ke(e.named.n))
    ? ke(e.named.count)
      ? e.named.count
      : ke(e.named.n)
        ? e.named.n
        : t
    : t;
}
function W2(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function K2(e = {}) {
  const t = e.locale,
    n = U2(e),
    r = he(e.pluralRules) && U(t) && Le(e.pluralRules[t]) ? e.pluralRules[t] : pi,
    o = he(e.pluralRules) && U(t) && Le(e.pluralRules[t]) ? pi : void 0,
    s = (y) => y[r(n, y.length, o)],
    i = e.list || [],
    a = (y) => i[y],
    l = e.named || {};
  ke(e.pluralIndex) && W2(n, l);
  const c = (y) => l[y];
  function u(y) {
    const z = Le(e.messages) ? e.messages(y) : he(e.messages) ? e.messages[y] : !1;
    return z || (e.parent ? e.parent.message(y) : $2);
  }
  const f = (y) => (e.modifiers ? e.modifiers[y] : F2),
    d = se(e.processor) && Le(e.processor.normalize) ? e.processor.normalize : B2,
    p = se(e.processor) && Le(e.processor.interpolate) ? e.processor.interpolate : j2,
    m = se(e.processor) && U(e.processor.type) ? e.processor.type : V2,
    v = {
      list: a,
      named: c,
      plural: s,
      linked: (y, ...z) => {
        const [C, S] = z;
        let O = 'text',
          k = '';
        z.length === 1
          ? he(C)
            ? ((k = C.modifier || k), (O = C.type || O))
            : U(C) && (k = C || k)
          : z.length === 2 && (U(C) && (k = C || k), U(S) && (O = S || O));
        let T = u(y)(v);
        return O === 'vnode' && Te(T) && k && (T = T[0]), k ? f(k)(T, O) : T;
      },
      message: u,
      type: m,
      interpolate: p,
      normalize: d,
    };
  return v;
}
let Fn = null;
function G2(e) {
  Fn = e;
}
function q2(e, t, n) {
  Fn &&
    Fn.emit(la.I18nInit, {
      timestamp: Date.now(),
      i18n: e,
      version: t,
      meta: n,
    });
}
const Y2 = J2(la.FunctionTranslate);
function J2(e) {
  return (t) => Fn && Fn.emit(e, t);
}
function Z2(e, t, n) {
  return [...new Set([n, ...(Te(t) ? t : he(t) ? Object.keys(t) : U(t) ? [t] : [n])])];
}
function aa(e, t, n) {
  const r = U(n) ? n : is,
    o = e;
  o.__localeChainCache || (o.__localeChainCache = new Map());
  let s = o.__localeChainCache.get(r);
  if (!s) {
    s = [];
    let i = [n];
    for (; Te(i); ) i = _i(s, i, t);
    const a = Te(t) || !se(t) ? t : t.default ? t.default : null;
    (i = U(a) ? [a] : a), Te(i) && _i(s, i, !1), o.__localeChainCache.set(r, s);
  }
  return s;
}
function _i(e, t, n) {
  let r = !0;
  for (let o = 0; o < t.length && Ce(r); o++) {
    const s = t[o];
    U(s) && (r = X2(e, t[o], n));
  }
  return r;
}
function X2(e, t, n) {
  let r;
  const o = t.split('-');
  do {
    const s = o.join('-');
    (r = Q2(e, s, n)), o.splice(-1, 1);
  } while (o.length && r === !0);
  return r;
}
function Q2(e, t, n) {
  let r = !1;
  if (!e.includes(t) && ((r = !0), t)) {
    r = t[t.length - 1] !== '!';
    const o = t.replace(/!/g, '');
    e.push(o), (Te(n) || se(n)) && n[o] && (r = n[o]);
  }
  return r;
}
const ef = '9.2.2',
  Vr = -1,
  is = 'en-US',
  gi = '',
  yi = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function tf() {
  return {
    upper: (e, t) =>
      t === 'text' && U(e)
        ? e.toUpperCase()
        : t === 'vnode' && he(e) && '__v_isVNode' in e
          ? e.children.toUpperCase()
          : e,
    lower: (e, t) =>
      t === 'text' && U(e)
        ? e.toLowerCase()
        : t === 'vnode' && he(e) && '__v_isVNode' in e
          ? e.children.toLowerCase()
          : e,
    capitalize: (e, t) =>
      t === 'text' && U(e) ? yi(e) : t === 'vnode' && he(e) && '__v_isVNode' in e ? yi(e.children) : e,
  };
}
let nf, ca;
function rf(e) {
  ca = e;
}
let ua;
function of(e) {
  ua = e;
}
let fa = null;
const vi = (e) => {
    fa = e;
  },
  sf = () => fa;
let da = null;
const bi = (e) => {
    da = e;
  },
  lf = () => da;
let zi = 0;
function af(e = {}) {
  const t = U(e.version) ? e.version : ef,
    n = U(e.locale) ? e.locale : is,
    r =
      Te(e.fallbackLocale) || se(e.fallbackLocale) || U(e.fallbackLocale) || e.fallbackLocale === !1
        ? e.fallbackLocale
        : n,
    o = se(e.messages)
      ? e.messages
      : {
          [n]: {},
        },
    s = se(e.datetimeFormats)
      ? e.datetimeFormats
      : {
          [n]: {},
        },
    i = se(e.numberFormats)
      ? e.numberFormats
      : {
          [n]: {},
        },
    a = $e({}, e.modifiers || {}, tf()),
    l = e.pluralRules || {},
    c = Le(e.missing) ? e.missing : null,
    u = Ce(e.missingWarn) || br(e.missingWarn) ? e.missingWarn : !0,
    f = Ce(e.fallbackWarn) || br(e.fallbackWarn) ? e.fallbackWarn : !0,
    d = !!e.fallbackFormat,
    p = !!e.unresolving,
    m = Le(e.postTranslation) ? e.postTranslation : null,
    g = se(e.processor) ? e.processor : null,
    v = Ce(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    y = !!e.escapeParameter,
    z = Le(e.messageCompiler) ? e.messageCompiler : nf,
    C = Le(e.messageResolver) ? e.messageResolver : ca || D2,
    S = Le(e.localeFallbacker) ? e.localeFallbacker : ua || Z2,
    O = he(e.fallbackContext) ? e.fallbackContext : void 0,
    k = Le(e.onWarn) ? e.onWarn : O2,
    T = e,
    I = he(T.__datetimeFormatters) ? T.__datetimeFormatters : new Map(),
    A = he(T.__numberFormatters) ? T.__numberFormatters : new Map(),
    N = he(T.__meta) ? T.__meta : {};
  zi++;
  const B = {
    version: t,
    cid: zi,
    locale: n,
    fallbackLocale: r,
    messages: o,
    modifiers: a,
    pluralRules: l,
    missing: c,
    missingWarn: u,
    fallbackWarn: f,
    fallbackFormat: d,
    unresolving: p,
    postTranslation: m,
    processor: g,
    warnHtmlMessage: v,
    escapeParameter: y,
    messageCompiler: z,
    messageResolver: C,
    localeFallbacker: S,
    fallbackContext: O,
    onWarn: k,
    __meta: N,
  };
  return (
    (B.datetimeFormats = s),
    (B.numberFormats = i),
    (B.__datetimeFormatters = I),
    (B.__numberFormatters = A),
    __INTLIFY_PROD_DEVTOOLS__ && q2(B, t, N),
    B
  );
}
function ls(e, t, n, r, o) {
  const { missing: s, onWarn: i } = e;
  if (s !== null) {
    const a = s(e, n, t, o);
    return U(a) ? a : t;
  } else return t;
}
function vn(e, t, n) {
  const r = e;
  (r.__localeChainCache = new Map()), e.localeFallbacker(e, n, t);
}
let ha = sa.__EXTEND_POINT__;
const Zr = () => ++ha,
  Xt = {
    INVALID_ARGUMENT: ha,
    INVALID_DATE_ARGUMENT: Zr(),
    INVALID_ISO_DATE_ARGUMENT: Zr(),
    __EXTEND_POINT__: Zr(),
  };
function Qt(e) {
  return ia(e, null, void 0);
}
const wi = () => '',
  ut = (e) => Le(e);
function Ei(e, ...t) {
  const {
      fallbackFormat: n,
      postTranslation: r,
      unresolving: o,
      messageCompiler: s,
      fallbackLocale: i,
      messages: a,
    } = e,
    [l, c] = vo(...t),
    u = Ce(c.missingWarn) ? c.missingWarn : e.missingWarn,
    f = Ce(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn,
    d = Ce(c.escapeParameter) ? c.escapeParameter : e.escapeParameter,
    p = !!c.resolvedMessage,
    m =
      U(c.default) || Ce(c.default)
        ? Ce(c.default)
          ? s
            ? l
            : () => l
          : c.default
        : n
          ? s
            ? l
            : () => l
          : '',
    g = n || m !== '',
    v = U(c.locale) ? c.locale : e.locale;
  d && cf(c);
  let [y, z, C] = p ? [l, v, a[v] || {}] : ma(e, l, v, i, f, u),
    S = y,
    O = l;
  if ((!p && !(U(S) || ut(S)) && g && ((S = m), (O = S)), !p && (!(U(S) || ut(S)) || !U(z))))
    return o ? Vr : l;
  let k = !1;
  const T = () => {
      k = !0;
    },
    I = ut(S) ? S : pa(e, l, z, S, O, T);
  if (k) return S;
  const A = df(e, z, C, c),
    N = K2(A),
    B = uf(e, I, N),
    J = r ? r(B, l) : B;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const ze = {
      timestamp: Date.now(),
      key: U(l) ? l : ut(S) ? S.key : '',
      locale: z || (ut(S) ? S.locale : ''),
      format: U(S) ? S : ut(S) ? S.source : '',
      message: J,
    };
    (ze.meta = $e({}, e.__meta, sf() || {})), Y2(ze);
  }
  return J;
}
function cf(e) {
  Te(e.list)
    ? (e.list = e.list.map((t) => (U(t) ? hi(t) : t)))
    : he(e.named) &&
      Object.keys(e.named).forEach((t) => {
        U(e.named[t]) && (e.named[t] = hi(e.named[t]));
      });
}
function ma(e, t, n, r, o, s) {
  const { messages: i, onWarn: a, messageResolver: l, localeFallbacker: c } = e,
    u = c(e, r, n);
  let f = {},
    d,
    p = null;
  const m = 'translate';
  for (
    let g = 0;
    g < u.length && ((d = u[g]), (f = i[d] || {}), (p = l(f, t)) === null && (p = f[t]), !(U(p) || Le(p)));
    g++
  ) {
    const v = ls(e, t, d, s, m);
    v !== t && (p = v);
  }
  return [p, d, f];
}
function pa(e, t, n, r, o, s) {
  const { messageCompiler: i, warnHtmlMessage: a } = e;
  if (ut(r)) {
    const c = r;
    return (c.locale = c.locale || n), (c.key = c.key || t), c;
  }
  if (i == null) {
    const c = () => r;
    return (c.locale = n), (c.key = t), c;
  }
  const l = i(r, ff(e, n, o, r, a, s));
  return (l.locale = n), (l.key = t), (l.source = r), l;
}
function uf(e, t, n) {
  return t(n);
}
function vo(...e) {
  const [t, n, r] = e,
    o = {};
  if (!U(t) && !ke(t) && !ut(t)) throw Qt(Xt.INVALID_ARGUMENT);
  const s = ke(t) ? String(t) : (ut(t), t);
  return (
    ke(n) ? (o.plural = n) : U(n) ? (o.default = n) : se(n) && !$r(n) ? (o.named = n) : Te(n) && (o.list = n),
    ke(r) ? (o.plural = r) : U(r) ? (o.default = r) : se(r) && $e(o, r),
    [s, o]
  );
}
function ff(e, t, n, r, o, s) {
  return {
    warnHtmlMessage: o,
    onError: (i) => {
      throw (s && s(i), i);
    },
    onCacheKey: (i) => C2(t, n, i),
  };
}
function df(e, t, n, r) {
  const {
      modifiers: o,
      pluralRules: s,
      messageResolver: i,
      fallbackLocale: a,
      fallbackWarn: l,
      missingWarn: c,
      fallbackContext: u,
    } = e,
    d = {
      locale: t,
      modifiers: o,
      pluralRules: s,
      messages: (p) => {
        let m = i(n, p);
        if (m == null && u) {
          const [, , g] = ma(u, p, t, a, l, c);
          m = i(g, p);
        }
        if (U(m)) {
          let g = !1;
          const y = pa(e, p, t, m, p, () => {
            g = !0;
          });
          return g ? wi : y;
        } else return ut(m) ? m : wi;
      },
    };
  return (
    e.processor && (d.processor = e.processor),
    r.list && (d.list = r.list),
    r.named && (d.named = r.named),
    ke(r.plural) && (d.pluralIndex = r.plural),
    d
  );
}
function Mi(e, ...t) {
  const { datetimeFormats: n, unresolving: r, fallbackLocale: o, onWarn: s, localeFallbacker: i } = e,
    { __datetimeFormatters: a } = e,
    [l, c, u, f] = bo(...t),
    d = Ce(u.missingWarn) ? u.missingWarn : e.missingWarn;
  Ce(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn;
  const p = !!u.part,
    m = U(u.locale) ? u.locale : e.locale,
    g = i(e, o, m);
  if (!U(l) || l === '') return new Intl.DateTimeFormat(m, f).format(c);
  let v = {},
    y,
    z = null;
  const C = 'datetime format';
  for (let k = 0; k < g.length && ((y = g[k]), (v = n[y] || {}), (z = v[l]), !se(z)); k++) ls(e, l, y, d, C);
  if (!se(z) || !U(y)) return r ? Vr : l;
  let S = `${y}__${l}`;
  $r(f) || (S = `${S}__${JSON.stringify(f)}`);
  let O = a.get(S);
  return (
    O || ((O = new Intl.DateTimeFormat(y, $e({}, z, f))), a.set(S, O)), p ? O.formatToParts(c) : O.format(c)
  );
}
const _a = [
  'localeMatcher',
  'weekday',
  'era',
  'year',
  'month',
  'day',
  'hour',
  'minute',
  'second',
  'timeZoneName',
  'formatMatcher',
  'hour12',
  'timeZone',
  'dateStyle',
  'timeStyle',
  'calendar',
  'dayPeriod',
  'numberingSystem',
  'hourCycle',
  'fractionalSecondDigits',
];
function bo(...e) {
  const [t, n, r, o] = e,
    s = {};
  let i = {},
    a;
  if (U(t)) {
    const l = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!l) throw Qt(Xt.INVALID_ISO_DATE_ARGUMENT);
    const c = l[3]
      ? l[3].trim().startsWith('T')
        ? `${l[1].trim()}${l[3].trim()}`
        : `${l[1].trim()}T${l[3].trim()}`
      : l[1].trim();
    a = new Date(c);
    try {
      a.toISOString();
    } catch (u) {
      throw Qt(Xt.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (P2(t)) {
    if (isNaN(t.getTime())) throw Qt(Xt.INVALID_DATE_ARGUMENT);
    a = t;
  } else if (ke(t)) a = t;
  else throw Qt(Xt.INVALID_ARGUMENT);
  return (
    U(n)
      ? (s.key = n)
      : se(n) &&
        Object.keys(n).forEach((l) => {
          _a.includes(l) ? (i[l] = n[l]) : (s[l] = n[l]);
        }),
    U(r) ? (s.locale = r) : se(r) && (i = r),
    se(o) && (i = o),
    [s.key || '', a, s, i]
  );
}
function Ci(e, t, n) {
  const r = e;
  for (const o in n) {
    const s = `${t}__${o}`;
    r.__datetimeFormatters.has(s) && r.__datetimeFormatters.delete(s);
  }
}
function Ai(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: o, onWarn: s, localeFallbacker: i } = e,
    { __numberFormatters: a } = e,
    [l, c, u, f] = zo(...t),
    d = Ce(u.missingWarn) ? u.missingWarn : e.missingWarn;
  Ce(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn;
  const p = !!u.part,
    m = U(u.locale) ? u.locale : e.locale,
    g = i(e, o, m);
  if (!U(l) || l === '') return new Intl.NumberFormat(m, f).format(c);
  let v = {},
    y,
    z = null;
  const C = 'number format';
  for (let k = 0; k < g.length && ((y = g[k]), (v = n[y] || {}), (z = v[l]), !se(z)); k++) ls(e, l, y, d, C);
  if (!se(z) || !U(y)) return r ? Vr : l;
  let S = `${y}__${l}`;
  $r(f) || (S = `${S}__${JSON.stringify(f)}`);
  let O = a.get(S);
  return (
    O || ((O = new Intl.NumberFormat(y, $e({}, z, f))), a.set(S, O)), p ? O.formatToParts(c) : O.format(c)
  );
}
const ga = [
  'localeMatcher',
  'style',
  'currency',
  'currencyDisplay',
  'currencySign',
  'useGrouping',
  'minimumIntegerDigits',
  'minimumFractionDigits',
  'maximumFractionDigits',
  'minimumSignificantDigits',
  'maximumSignificantDigits',
  'compactDisplay',
  'notation',
  'signDisplay',
  'unit',
  'unitDisplay',
  'roundingMode',
  'roundingPriority',
  'roundingIncrement',
  'trailingZeroDisplay',
];
function zo(...e) {
  const [t, n, r, o] = e,
    s = {};
  let i = {};
  if (!ke(t)) throw Qt(Xt.INVALID_ARGUMENT);
  const a = t;
  return (
    U(n)
      ? (s.key = n)
      : se(n) &&
        Object.keys(n).forEach((l) => {
          ga.includes(l) ? (i[l] = n[l]) : (s[l] = n[l]);
        }),
    U(r) ? (s.locale = r) : se(r) && (i = r),
    se(o) && (i = o),
    [s.key || '', a, s, i]
  );
}
function Pi(e, t, n) {
  const r = e;
  for (const o in n) {
    const s = `${t}__${o}`;
    r.__numberFormatters.has(s) && r.__numberFormatters.delete(s);
  }
}
typeof __INTLIFY_PROD_DEVTOOLS__ != 'boolean' && (rs().__INTLIFY_PROD_DEVTOOLS__ = !1);
/*!
 * vue-i18n v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */
const hf = '9.2.2';
function mf() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != 'boolean' && (rs().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
let ya = sa.__EXTEND_POINT__;
const Be = () => ++ya,
  qe = {
    UNEXPECTED_RETURN_TYPE: ya,
    INVALID_ARGUMENT: Be(),
    MUST_BE_CALL_SETUP_TOP: Be(),
    NOT_INSLALLED: Be(),
    NOT_AVAILABLE_IN_LEGACY_MODE: Be(),
    REQUIRED_VALUE: Be(),
    INVALID_VALUE: Be(),
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: Be(),
    NOT_INSLALLED_WITH_PROVIDE: Be(),
    UNEXPECTED_ERROR: Be(),
    NOT_COMPATIBLE_LEGACY_VUE_I18N: Be(),
    BRIDGE_SUPPORT_VUE_2_ONLY: Be(),
    MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: Be(),
    NOT_AVAILABLE_COMPOSITION_IN_LEGACY: Be(),
    __EXTEND_POINT__: Be(),
  };
function Ze(e, ...t) {
  return ia(e, null, void 0);
}
const wo = Rt('__transrateVNode'),
  Eo = Rt('__datetimeParts'),
  Mo = Rt('__numberParts'),
  pf = Rt('__setPluralRules');
Rt('__intlifyMeta');
const _f = Rt('__injectWithOption');
function Co(e) {
  if (!he(e)) return e;
  for (const t in e)
    if (os(e, t))
      if (!t.includes('.')) he(e[t]) && Co(e[t]);
      else {
        const n = t.split('.'),
          r = n.length - 1;
        let o = e;
        for (let s = 0; s < r; s++) n[s] in o || (o[n[s]] = {}), (o = o[n[s]]);
        (o[n[r]] = e[t]), delete e[t], he(o[n[r]]) && Co(o[n[r]]);
      }
  return e;
}
function va(e, t) {
  const { messages: n, __i18n: r, messageResolver: o, flatJson: s } = t,
    i = se(n)
      ? n
      : Te(r)
        ? {}
        : {
            [e]: {},
          };
  if (
    (Te(r) &&
      r.forEach((a) => {
        if ('locale' in a && 'resource' in a) {
          const { locale: l, resource: c } = a;
          l ? ((i[l] = i[l] || {}), Tn(c, i[l])) : Tn(c, i);
        } else U(a) && Tn(JSON.parse(a), i);
      }),
    o == null && s)
  )
    for (const a in i) os(i, a) && Co(i[a]);
  return i;
}
const Zn = (e) => !he(e) || Te(e);
function Tn(e, t) {
  if (Zn(e) || Zn(t)) throw Ze(qe.INVALID_VALUE);
  for (const n in e) os(e, n) && (Zn(e[n]) || Zn(t[n]) ? (t[n] = e[n]) : Tn(e[n], t[n]));
}
function ba(e) {
  return e.type;
}
function gf(e, t, n) {
  let r = he(t.messages) ? t.messages : {};
  '__i18nGlobal' in n &&
    (r = va(e.locale.value, {
      messages: r,
      __i18n: n.__i18nGlobal,
    }));
  const o = Object.keys(r);
  o.length &&
    o.forEach((s) => {
      e.mergeLocaleMessage(s, r[s]);
    });
  {
    if (he(t.datetimeFormats)) {
      const s = Object.keys(t.datetimeFormats);
      s.length &&
        s.forEach((i) => {
          e.mergeDateTimeFormat(i, t.datetimeFormats[i]);
        });
    }
    if (he(t.numberFormats)) {
      const s = Object.keys(t.numberFormats);
      s.length &&
        s.forEach((i) => {
          e.mergeNumberFormat(i, t.numberFormats[i]);
        });
    }
  }
}
function Oi(e) {
  return de(jn, null, e, 0);
}
const Ti = '__INTLIFY_META__';
let xi = 0;
function Ri(e) {
  return (t, n, r, o) => e(n, r, xt() || void 0, o);
}
const yf = () => {
  const e = xt();
  let t = null;
  return e && (t = ba(e)[Ti])
    ? {
        [Ti]: t,
      }
    : null;
};
function za(e = {}, t) {
  const { __root: n } = e,
    r = n === void 0;
  let o = Ce(e.inheritLocale) ? e.inheritLocale : !0;
  const s = ce(n && o ? n.locale.value : U(e.locale) ? e.locale : is),
    i = ce(
      n && o
        ? n.fallbackLocale.value
        : U(e.fallbackLocale) || Te(e.fallbackLocale) || se(e.fallbackLocale) || e.fallbackLocale === !1
          ? e.fallbackLocale
          : s.value,
    ),
    a = ce(va(s.value, e)),
    l = ce(
      se(e.datetimeFormats)
        ? e.datetimeFormats
        : {
            [s.value]: {},
          },
    ),
    c = ce(
      se(e.numberFormats)
        ? e.numberFormats
        : {
            [s.value]: {},
          },
    );
  let u = n ? n.missingWarn : Ce(e.missingWarn) || br(e.missingWarn) ? e.missingWarn : !0,
    f = n ? n.fallbackWarn : Ce(e.fallbackWarn) || br(e.fallbackWarn) ? e.fallbackWarn : !0,
    d = n ? n.fallbackRoot : Ce(e.fallbackRoot) ? e.fallbackRoot : !0,
    p = !!e.fallbackFormat,
    m = Le(e.missing) ? e.missing : null,
    g = Le(e.missing) ? Ri(e.missing) : null,
    v = Le(e.postTranslation) ? e.postTranslation : null,
    y = n ? n.warnHtmlMessage : Ce(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    z = !!e.escapeParameter;
  const C = n ? n.modifiers : se(e.modifiers) ? e.modifiers : {};
  let S = e.pluralRules || (n && n.pluralRules),
    O;
  (O = (() => {
    r && bi(null);
    const b = {
      version: hf,
      locale: s.value,
      fallbackLocale: i.value,
      messages: a.value,
      modifiers: C,
      pluralRules: S,
      missing: g === null ? void 0 : g,
      missingWarn: u,
      fallbackWarn: f,
      fallbackFormat: p,
      unresolving: !0,
      postTranslation: v === null ? void 0 : v,
      warnHtmlMessage: y,
      escapeParameter: z,
      messageResolver: e.messageResolver,
      __meta: {
        framework: 'vue',
      },
    };
    (b.datetimeFormats = l.value),
      (b.numberFormats = c.value),
      (b.__datetimeFormatters = se(O) ? O.__datetimeFormatters : void 0),
      (b.__numberFormatters = se(O) ? O.__numberFormatters : void 0);
    const w = af(b);
    return r && bi(w), w;
  })()),
    vn(O, s.value, i.value);
  function T() {
    return [s.value, i.value, a.value, l.value, c.value];
  }
  const I = ie({
      get: () => s.value,
      set: (b) => {
        (s.value = b), (O.locale = s.value);
      },
    }),
    A = ie({
      get: () => i.value,
      set: (b) => {
        (i.value = b), (O.fallbackLocale = i.value), vn(O, s.value, b);
      },
    }),
    N = ie(() => a.value),
    B = ie(() => l.value),
    J = ie(() => c.value);
  function ze() {
    return Le(v) ? v : null;
  }
  function ge(b) {
    (v = b), (O.postTranslation = b);
  }
  function fe() {
    return m;
  }
  function ee(b) {
    b !== null && (g = Ri(b)), (m = b), (O.missing = g);
  }
  const Y = (b, w, j, W, Q, ae) => {
    T();
    let re;
    if (__INTLIFY_PROD_DEVTOOLS__)
      try {
        vi(yf()), r || (O.fallbackContext = n ? lf() : void 0), (re = b(O));
      } finally {
        vi(null), r || (O.fallbackContext = void 0);
      }
    else re = b(O);
    if (ke(re) && re === Vr) {
      const [we, Je] = w();
      return n && d ? W(n) : Q(we);
    } else {
      if (ae(re)) return re;
      throw Ze(qe.UNEXPECTED_RETURN_TYPE);
    }
  };
  function te(...b) {
    return Y(
      (w) => Reflect.apply(Ei, null, [w, ...b]),
      () => vo(...b),
      'translate',
      (w) => Reflect.apply(w.t, w, [...b]),
      (w) => w,
      (w) => U(w),
    );
  }
  function ve(...b) {
    const [w, j, W] = b;
    if (W && !he(W)) throw Ze(qe.INVALID_ARGUMENT);
    return te(
      w,
      j,
      $e(
        {
          resolvedMessage: !0,
        },
        W || {},
      ),
    );
  }
  function Ie(...b) {
    return Y(
      (w) => Reflect.apply(Mi, null, [w, ...b]),
      () => bo(...b),
      'datetime format',
      (w) => Reflect.apply(w.d, w, [...b]),
      () => gi,
      (w) => U(w),
    );
  }
  function Se(...b) {
    return Y(
      (w) => Reflect.apply(Ai, null, [w, ...b]),
      () => zo(...b),
      'number format',
      (w) => Reflect.apply(w.n, w, [...b]),
      () => gi,
      (w) => U(w),
    );
  }
  function Ee(b) {
    return b.map((w) => (U(w) || ke(w) || Ce(w) ? Oi(String(w)) : w));
  }
  const Me = {
    normalize: Ee,
    interpolate: (b) => b,
    type: 'vnode',
  };
  function x(...b) {
    return Y(
      (w) => {
        let j;
        const W = w;
        try {
          (W.processor = Me), (j = Reflect.apply(Ei, null, [W, ...b]));
        } finally {
          W.processor = null;
        }
        return j;
      },
      () => vo(...b),
      'translate',
      (w) => w[wo](...b),
      (w) => [Oi(w)],
      (w) => Te(w),
    );
  }
  function V(...b) {
    return Y(
      (w) => Reflect.apply(Ai, null, [w, ...b]),
      () => zo(...b),
      'number format',
      (w) => w[Mo](...b),
      () => [],
      (w) => U(w) || Te(w),
    );
  }
  function F(...b) {
    return Y(
      (w) => Reflect.apply(Mi, null, [w, ...b]),
      () => bo(...b),
      'datetime format',
      (w) => w[Eo](...b),
      () => [],
      (w) => U(w) || Te(w),
    );
  }
  function K(b) {
    (S = b), (O.pluralRules = S);
  }
  function ne(b, w) {
    const j = U(w) ? w : s.value,
      W = h(j);
    return O.messageResolver(W, b) !== null;
  }
  function pe(b) {
    let w = null;
    const j = aa(O, i.value, s.value);
    for (let W = 0; W < j.length; W++) {
      const Q = a.value[j[W]] || {},
        ae = O.messageResolver(Q, b);
      if (ae != null) {
        w = ae;
        break;
      }
    }
    return w;
  }
  function X(b) {
    const w = pe(b);
    return w != null ? w : n ? n.tm(b) || {} : {};
  }
  function h(b) {
    return a.value[b] || {};
  }
  function _(b, w) {
    (a.value[b] = w), (O.messages = a.value);
  }
  function E(b, w) {
    (a.value[b] = a.value[b] || {}), Tn(w, a.value[b]), (O.messages = a.value);
  }
  function M(b) {
    return l.value[b] || {};
  }
  function R(b, w) {
    (l.value[b] = w), (O.datetimeFormats = l.value), Ci(O, b, w);
  }
  function H(b, w) {
    (l.value[b] = $e(l.value[b] || {}, w)), (O.datetimeFormats = l.value), Ci(O, b, w);
  }
  function $(b) {
    return c.value[b] || {};
  }
  function L(b, w) {
    (c.value[b] = w), (O.numberFormats = c.value), Pi(O, b, w);
  }
  function D(b, w) {
    (c.value[b] = $e(c.value[b] || {}, w)), (O.numberFormats = c.value), Pi(O, b, w);
  }
  xi++,
    n &&
      yo &&
      (Re(n.locale, (b) => {
        o && ((s.value = b), (O.locale = b), vn(O, s.value, i.value));
      }),
      Re(n.fallbackLocale, (b) => {
        o && ((i.value = b), (O.fallbackLocale = b), vn(O, s.value, i.value));
      }));
  const P = {
    id: xi,
    locale: I,
    fallbackLocale: A,
    get inheritLocale() {
      return o;
    },
    set inheritLocale(b) {
      (o = b),
        b && n && ((s.value = n.locale.value), (i.value = n.fallbackLocale.value), vn(O, s.value, i.value));
    },
    get availableLocales() {
      return Object.keys(a.value).sort();
    },
    messages: N,
    get modifiers() {
      return C;
    },
    get pluralRules() {
      return S || {};
    },
    get isGlobal() {
      return r;
    },
    get missingWarn() {
      return u;
    },
    set missingWarn(b) {
      (u = b), (O.missingWarn = u);
    },
    get fallbackWarn() {
      return f;
    },
    set fallbackWarn(b) {
      (f = b), (O.fallbackWarn = f);
    },
    get fallbackRoot() {
      return d;
    },
    set fallbackRoot(b) {
      d = b;
    },
    get fallbackFormat() {
      return p;
    },
    set fallbackFormat(b) {
      (p = b), (O.fallbackFormat = p);
    },
    get warnHtmlMessage() {
      return y;
    },
    set warnHtmlMessage(b) {
      (y = b), (O.warnHtmlMessage = b);
    },
    get escapeParameter() {
      return z;
    },
    set escapeParameter(b) {
      (z = b), (O.escapeParameter = b);
    },
    t: te,
    getLocaleMessage: h,
    setLocaleMessage: _,
    mergeLocaleMessage: E,
    getPostTranslationHandler: ze,
    setPostTranslationHandler: ge,
    getMissingHandler: fe,
    setMissingHandler: ee,
    [pf]: K,
  };
  return (
    (P.datetimeFormats = B),
    (P.numberFormats = J),
    (P.rt = ve),
    (P.te = ne),
    (P.tm = X),
    (P.d = Ie),
    (P.n = Se),
    (P.getDateTimeFormat = M),
    (P.setDateTimeFormat = R),
    (P.mergeDateTimeFormat = H),
    (P.getNumberFormat = $),
    (P.setNumberFormat = L),
    (P.mergeNumberFormat = D),
    (P[_f] = e.__injectWithOption),
    (P[wo] = x),
    (P[Eo] = F),
    (P[Mo] = V),
    P
  );
}
const as = {
  tag: {
    type: [String, Object],
  },
  locale: {
    type: String,
  },
  scope: {
    type: String,
    validator: (e) => e === 'parent' || e === 'global',
    default: 'parent',
  },
  i18n: {
    type: Object,
  },
};
function vf({ slots: e }, t) {
  return t.length === 1 && t[0] === 'default'
    ? (e.default ? e.default() : []).reduce(
        (r, o) => (r = [...r, ...(Te(o.children) ? o.children : [o])]),
        [],
      )
    : t.reduce((n, r) => {
        const o = e[r];
        return o && (n[r] = o()), n;
      }, {});
}
function wa(e) {
  return Fe;
}
const Si = {
  name: 'i18n-t',
  props: $e(
    {
      keypath: {
        type: String,
        required: !0,
      },
      plural: {
        type: [Number, String],
        validator: (e) => ke(e) || !isNaN(e),
      },
    },
    as,
  ),
  setup(e, t) {
    const { slots: n, attrs: r } = t,
      o =
        e.i18n ||
        cs({
          useScope: e.scope,
          __useComponent: !0,
        });
    return () => {
      const s = Object.keys(n).filter((f) => f !== '_'),
        i = {};
      e.locale && (i.locale = e.locale),
        e.plural !== void 0 && (i.plural = U(e.plural) ? +e.plural : e.plural);
      const a = vf(t, s),
        l = o[wo](e.keypath, a, i),
        c = $e({}, r),
        u = U(e.tag) || he(e.tag) ? e.tag : wa();
      return Dr(u, c, l);
    };
  },
};
function bf(e) {
  return Te(e) && !U(e[0]);
}
function Ea(e, t, n, r) {
  const { slots: o, attrs: s } = t;
  return () => {
    const i = {
      part: !0,
    };
    let a = {};
    e.locale && (i.locale = e.locale),
      U(e.format)
        ? (i.key = e.format)
        : he(e.format) &&
          (U(e.format.key) && (i.key = e.format.key),
          (a = Object.keys(e.format).reduce(
            (d, p) =>
              n.includes(p)
                ? $e({}, d, {
                    [p]: e.format[p],
                  })
                : d,
            {},
          )));
    const l = r(e.value, i, a);
    let c = [i.key];
    Te(l)
      ? (c = l.map((d, p) => {
          const m = o[d.type],
            g = m
              ? m({
                  [d.type]: d.value,
                  index: p,
                  parts: l,
                })
              : [d.value];
          return bf(g) && (g[0].key = `${d.type}-${p}`), g;
        }))
      : U(l) && (c = [l]);
    const u = $e({}, s),
      f = U(e.tag) || he(e.tag) ? e.tag : wa();
    return Dr(f, u, c);
  };
}
const ki = {
    name: 'i18n-n',
    props: $e(
      {
        value: {
          type: Number,
          required: !0,
        },
        format: {
          type: [String, Object],
        },
      },
      as,
    ),
    setup(e, t) {
      const n =
        e.i18n ||
        cs({
          useScope: 'parent',
          __useComponent: !0,
        });
      return Ea(e, t, ga, (...r) => n[Mo](...r));
    },
  },
  Ii = {
    name: 'i18n-d',
    props: $e(
      {
        value: {
          type: [Number, Date],
          required: !0,
        },
        format: {
          type: [String, Object],
        },
      },
      as,
    ),
    setup(e, t) {
      const n =
        e.i18n ||
        cs({
          useScope: 'parent',
          __useComponent: !0,
        });
      return Ea(e, t, _a, (...r) => n[Eo](...r));
    },
  };
function zf(e, t) {
  const n = e;
  if (e.mode === 'composition') return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function wf(e) {
  const t = (i) => {
    const { instance: a, modifiers: l, value: c } = i;
    if (!a || !a.$) throw Ze(qe.UNEXPECTED_ERROR);
    const u = zf(e, a.$),
      f = Li(c);
    return [Reflect.apply(u.t, u, [...Hi(f)]), u];
  };
  return {
    created: (i, a) => {
      const [l, c] = t(a);
      yo &&
        e.global === c &&
        (i.__i18nWatcher = Re(c.locale, () => {
          a.instance && a.instance.$forceUpdate();
        })),
        (i.__composer = c),
        (i.textContent = l);
    },
    unmounted: (i) => {
      yo && i.__i18nWatcher && (i.__i18nWatcher(), (i.__i18nWatcher = void 0), delete i.__i18nWatcher),
        i.__composer && ((i.__composer = void 0), delete i.__composer);
    },
    beforeUpdate: (i, { value: a }) => {
      if (i.__composer) {
        const l = i.__composer,
          c = Li(a);
        i.textContent = Reflect.apply(l.t, l, [...Hi(c)]);
      }
    },
    getSSRProps: (i) => {
      const [a] = t(i);
      return {
        textContent: a,
      };
    },
  };
}
function Li(e) {
  if (U(e))
    return {
      path: e,
    };
  if (se(e)) {
    if (!('path' in e)) throw Ze(qe.REQUIRED_VALUE, 'path');
    return e;
  } else throw Ze(qe.INVALID_VALUE);
}
function Hi(e) {
  const { path: t, locale: n, args: r, choice: o, plural: s } = e,
    i = {},
    a = r || {};
  return U(n) && (i.locale = n), ke(o) && (i.plural = o), ke(s) && (i.plural = s), [t, a, i];
}
function Ef(e, t, ...n) {
  const r = se(n[0]) ? n[0] : {},
    o = !!r.useI18nComponentName;
  (Ce(r.globalInstall) ? r.globalInstall : !0) &&
    (e.component(o ? 'i18n' : Si.name, Si), e.component(ki.name, ki), e.component(Ii.name, Ii)),
    e.directive('t', wf(t));
}
const Mf = Rt('global-vue-i18n');
function Cf(e = {}, t) {
  const n = Ce(e.globalInjection) ? e.globalInjection : !0,
    r = !0,
    o = new Map(),
    [s, i] = Af(e),
    a = Rt('');
  function l(f) {
    return o.get(f) || null;
  }
  function c(f, d) {
    o.set(f, d);
  }
  function u(f) {
    o.delete(f);
  }
  {
    const f = {
      get mode() {
        return 'composition';
      },
      get allowComposition() {
        return r;
      },
      async install(d, ...p) {
        (d.__VUE_I18N_SYMBOL__ = a),
          d.provide(d.__VUE_I18N_SYMBOL__, f),
          n && If(d, f.global),
          Ef(d, f, ...p);
        const m = d.unmount;
        d.unmount = () => {
          f.dispose(), m();
        };
      },
      get global() {
        return i;
      },
      dispose() {
        s.stop();
      },
      __instances: o,
      __getInstance: l,
      __setInstance: c,
      __deleteInstance: u,
    };
    return f;
  }
}
function cs(e = {}) {
  const t = xt();
  if (t == null) throw Ze(qe.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw Ze(qe.NOT_INSLALLED);
  const n = Pf(t),
    r = Tf(n),
    o = ba(t),
    s = Of(e, o);
  if (s === 'global') return gf(r, e, o), r;
  if (s === 'parent') {
    let l = xf(n, t, e.__useComponent);
    return l == null && (l = r), l;
  }
  const i = n;
  let a = i.__getInstance(t);
  if (a == null) {
    const l = $e({}, e);
    '__i18n' in o && (l.__i18n = o.__i18n), r && (l.__root = r), (a = za(l)), Rf(i, t), i.__setInstance(t, a);
  }
  return a;
}
function Af(e, t, n) {
  const r = ol();
  {
    const o = r.run(() => za(e));
    if (o == null) throw Ze(qe.UNEXPECTED_ERROR);
    return [r, o];
  }
}
function Pf(e) {
  {
    const t = Ue(e.isCE ? Mf : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t) throw Ze(e.isCE ? qe.NOT_INSLALLED_WITH_PROVIDE : qe.UNEXPECTED_ERROR);
    return t;
  }
}
function Of(e, t) {
  return $r(e) ? ('__i18n' in t ? 'local' : 'global') : e.useScope ? e.useScope : 'local';
}
function Tf(e) {
  return e.mode === 'composition' ? e.global : e.global.__composer;
}
function xf(e, t, n = !1) {
  let r = null;
  const o = t.root;
  let s = t.parent;
  for (; s != null; ) {
    const i = e;
    if ((e.mode === 'composition' && (r = i.__getInstance(s)), r != null || o === s)) break;
    s = s.parent;
  }
  return r;
}
function Rf(e, t, n) {
  Bn(() => {}, t),
    mn(() => {
      e.__deleteInstance(t);
    }, t);
}
const Sf = ['locale', 'fallbackLocale', 'availableLocales'],
  kf = ['t', 'rt', 'd', 'n', 'tm'];
function If(e, t) {
  const n = Object.create(null);
  Sf.forEach((r) => {
    const o = Object.getOwnPropertyDescriptor(t, r);
    if (!o) throw Ze(qe.UNEXPECTED_ERROR);
    const s = Oe(o.value)
      ? {
          get() {
            return o.value.value;
          },
          set(i) {
            o.value.value = i;
          },
        }
      : {
          get() {
            return o.get && o.get();
          },
        };
    Object.defineProperty(n, r, s);
  }),
    (e.config.globalProperties.$i18n = n),
    kf.forEach((r) => {
      const o = Object.getOwnPropertyDescriptor(t, r);
      if (!o || !o.value) throw Ze(qe.UNEXPECTED_ERROR);
      Object.defineProperty(e.config.globalProperties, `$${r}`, o);
    });
}
rf(N2);
of(aa);
mf();
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = rs();
  (e.__INTLIFY__ = !0), G2(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const Ma = {
    support: {
      metaInfo: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['Support']);
        },
      },
      form: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['Add message']);
        },
        textarea: {
          placeholder: (e) => {
            const { normalize: t } = e;
            return t(['ask your question or add a review']);
          },
        },
        input: {
          placeholder: (e) => {
            const { normalize: t } = e;
            return t(['Your name here']);
          },
        },
      },
      empty_list: (e) => {
        const { normalize: t } = e;
        return t(['No reviews yet']);
      },
      title: (e) => {
        const { normalize: t } = e;
        return t(['Support']);
      },
    },
    pitch: {
      metaInfo: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['Audio Speed and Pitch Changer — High Quality Pitch Shifter']);
        },
        description: (e) => {
          const { normalize: t } = e;
          return t([
            'This is free online PitchShifter tool. The app allows you to change Pitch and Speed of the audio independently by simply adjusting Song Key and BPM sliders',
          ]);
        },
      },
      promo: {
        features: {
          title: (e) => {
            const { normalize: t } = e;
            return t(['Features']);
          },
          content: (e) => {
            const { normalize: t } = e;
            return t([
              '<ul> <li>Analyzes music and finds musical key, scale and bpm</li> <li>Changes audio pitch</li> <li>Speed up or slow down music playback speed</li> </ul>',
            ]);
          },
        },
        content: (e) => {
          const { normalize: t } = e;
          return t([
            'This app changes the song pitch and/or playback speed using one of the best pitch shifting algorithms. The musical key, scale, and bpm will be automatically detected. <br><br>You can easily transpose music to a different key and change the tempo by adjusting the pitch shifter key and bpm sliders.',
          ]);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['Free Online Pitch Shifter']);
        },
      },
      title: (e) => {
        const { normalize: t } = e;
        return t(['Audio Speed and Pitch Changer']);
      },
      description: (e) => {
        const { normalize: t } = e;
        return t(['Changes pitch and tempo of the song by adjusting musical key and bpm sliders']);
      },
    },
    player: {
      restart: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['Are you sure you want to finish editing?']);
        },
        description: (e) => {
          const { normalize: t } = e;
          return t(['Any associated audio track settings will be deleted along with it.']);
        },
      },
      stems: {
        stem: (e) => {
          const { normalize: t } = e;
          return t([]);
        },
        bass: (e) => {
          const { normalize: t } = e;
          return t(['Bass']);
        },
        guitar: (e) => {
          const { normalize: t } = e;
          return t(['Guitar']);
        },
        piano: (e) => {
          const { normalize: t } = e;
          return t(['Piano']);
        },
        drums: (e) => {
          const { normalize: t } = e;
          return t(['Drums']);
        },
        music: (e) => {
          const { normalize: t } = e;
          return t(['Music']);
        },
        vocal: (e) => {
          const { normalize: t } = e;
          return t(['Vocal']);
        },
      },
      labels: {
        halfStep: (e) => {
          const { normalize: t } = e;
          return t(['semitones']);
        },
        tempo: (e) => {
          const { normalize: t } = e;
          return t(['Speed']);
        },
        pitch: (e) => {
          const { normalize: t } = e;
          return t(['Pitch']);
        },
        ms: (e) => {
          const { normalize: t } = e;
          return t(['ms']);
        },
        file_format: (e) => {
          const { normalize: t } = e;
          return t(['format']);
        },
        bpm: (e) => {
          const { normalize: t } = e;
          return t(['bpm']);
        },
        key: (e) => {
          const { normalize: t } = e;
          return t(['Key']);
        },
      },
      status: {
        encoding: (e) => {
          const { normalize: t } = e;
          return t(['encoding']);
        },
        processing: (e) => {
          const { normalize: t } = e;
          return t(['processing']);
        },
      },
      endTime: (e) => {
        const { normalize: t } = e;
        return t(['End']);
      },
      beginTime: (e) => {
        const { normalize: t } = e;
        return t(['Start']);
      },
    },
    button: {
      browse: (e) => {
        const { normalize: t, plural: n } = e;
        return n([t(['Browse my files']), t(['Browse my files'])]);
      },
      exportCSV: (e) => {
        const { normalize: t } = e;
        return t(['Export CSV']);
      },
      confirmDelete: (e) => {
        const { normalize: t } = e;
        return t(['Yes, delete']);
      },
      buy: (e) => {
        const { normalize: t } = e;
        return t(['Buy']);
      },
      signin: (e) => {
        const { normalize: t } = e;
        return t(['Sign in']);
      },
      signout: (e) => {
        const { normalize: t } = e;
        return t(['Sign out']);
      },
      add: (e) => {
        const { normalize: t } = e;
        return t(['Add']);
      },
      wait: (e) => {
        const { normalize: t } = e;
        return t(['Please wait']);
      },
      cut: (e) => {
        const { normalize: t } = e;
        return t(['Cut']);
      },
      addTracks: (e) => {
        const { normalize: t } = e;
        return t(['Add tracks']);
      },
      save: (e) => {
        const { normalize: t } = e;
        return t(['Save']);
      },
      cancel: (e) => {
        const { normalize: t } = e;
        return t(['Cancel']);
      },
      remove: (e) => {
        const { normalize: t } = e;
        return t(['Remove']);
      },
      status: {
        upload: (e) => {
          const { normalize: t } = e;
          return t(['Uploading file']);
        },
      },
      free: (e) => {
        const { normalize: t } = e;
        return t(['Get Free']);
      },
    },
    id3tags: {
      file: (e) => {
        const { normalize: t } = e;
        return t(['File']);
      },
      album: (e) => {
        const { normalize: t } = e;
        return t(['Album']);
      },
      genre: (e) => {
        const { normalize: t } = e;
        return t(['Genre']);
      },
      title: (e) => {
        const { normalize: t } = e;
        return t(['Title']);
      },
      artist: (e) => {
        const { normalize: t } = e;
        return t(['Artist']);
      },
      year: (e) => {
        const { normalize: t } = e;
        return t(['Year']);
      },
    },
    signInPopup: {
      error: {
        invalidEmail: (e) => {
          const { normalize: t } = e;
          return t(['Invalid email']);
        },
        mailServerError: (e) => {
          const { normalize: t } = e;
          return t(["Server error occurred. Can't send mail"]);
        },
        tooManyRequests: (e) => {
          const { normalize: t } = e;
          return t(['Too many requests. Please try again later']);
        },
      },
      inputEmailPlaceholder: (e) => {
        const { normalize: t } = e;
        return t(['email']);
      },
      signInWith: (e) => {
        const { normalize: t } = e;
        return t(['Sign in with']);
      },
      emailLink: {
        done: (e) => {
          const { normalize: t } = e;
          return t(['Done']);
        },
        description: (e) => {
          const { normalize: t } = e;
          return t(['Please check your mailbox to continue ...']);
        },
      },
      signOut: (e) => {
        const { normalize: t } = e;
        return t(['Sign out']);
      },
      title: (e) => {
        const { normalize: t } = e;
        return t(['Sign in']);
      },
      or: (e) => {
        const { normalize: t } = e;
        return t(['or']);
      },
      inputEmailLabel: (e) => {
        const { normalize: t } = e;
        return t(["Enter your email address and we'll send a sign in link to your inbox."]);
      },
    },
    menu: {
      karaoke: (e) => {
        const { normalize: t } = e;
        return t(['Karaoke']);
      },
      splitter: (e) => {
        const { normalize: t } = e;
        return t(['Splitter']);
      },
      cutter: (e) => {
        const { normalize: t } = e;
        return t(['Cutter']);
      },
      pitch: (e) => {
        const { normalize: t } = e;
        return t(['Pitcher']);
      },
      joiner: (e) => {
        const { normalize: t } = e;
        return t(['Joiner']);
      },
      bpm: (e) => {
        const { normalize: t } = e;
        return t(['Key BPM Finder']);
      },
      recorder: (e) => {
        const { normalize: t } = e;
        return t(['Recorder']);
      },
      tap: (e) => {
        const { normalize: t } = e;
        return t(['Tap tempo']);
      },
      support: (e) => {
        const { normalize: t } = e;
        return t(['Support']);
      },
      remover: (e) => {
        const { normalize: t } = e;
        return t(['Remover']);
      },
    },
    effects: {
      convolver: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['Reverb']);
        },
        presets: {
          hall: (e) => {
            const { normalize: t } = e;
            return t(['Hall']);
          },
          large_room: (e) => {
            const { normalize: t } = e;
            return t(['Large Room']);
          },
          studio: (e) => {
            const { normalize: t } = e;
            return t(['Studio']);
          },
        },
        distance: (e) => {
          const { normalize: t } = e;
          return t(['distance']);
        },
      },
      eq: {
        presets: {
          rock: (e) => {
            const { normalize: t } = e;
            return t(['Rock']);
          },
          custom: (e) => {
            const { normalize: t } = e;
            return t(['My settings']);
          },
          bass: (e) => {
            const { normalize: t } = e;
            return t(['Bass']);
          },
          bright: (e) => {
            const { normalize: t } = e;
            return t(['Bright']);
          },
          expressive: (e) => {
            const { normalize: t } = e;
            return t(['Expressive']);
          },
          clean: (e) => {
            const { normalize: t } = e;
            return t(['Clean']);
          },
        },
        treble: (e) => {
          const { normalize: t } = e;
          return t(['treble']);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['Equalizer']);
        },
        bass: (e) => {
          const { normalize: t } = e;
          return t(['bass']);
        },
        middle: (e) => {
          const { normalize: t } = e;
          return t(['middle']);
        },
      },
      volume: {
        'fade-out': (e) => {
          const { normalize: t } = e;
          return t(['Fade out']);
        },
        'fade-in': (e) => {
          const { normalize: t } = e;
          return t(['Fade in']);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['Volume']);
        },
        right: (e) => {
          const { normalize: t } = e;
          return t(['Right']);
        },
        left: (e) => {
          const { normalize: t } = e;
          return t(['Left']);
        },
      },
      sync: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['Voice Sync']);
        },
        late: (e) => {
          const { normalize: t } = e;
          return t(['late']);
        },
        early: (e) => {
          const { normalize: t } = e;
          return t(['early']);
        },
        sec: (e) => {
          const { normalize: t } = e;
          return t(['sec']);
        },
      },
      echo: {
        ms: (e) => {
          const { normalize: t } = e;
          return t(['ms']);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['Echo']);
        },
        feedback: (e) => {
          const { normalize: t } = e;
          return t(['Feedback']);
        },
        time: (e) => {
          const { normalize: t } = e;
          return t(['Time']);
        },
      },
    },
    mic: {
      error: {
        overconstrained: {
          description: (e) => {
            const { normalize: t, interpolate: n, named: r } = e;
            return t([
              'Constraints could be not satisfied. Constraint ',
              n(r('name')),
              ' is missing: ',
              n(r('message')),
              '. Try another options.',
            ]);
          },
          title: (e) => {
            const { normalize: t } = e;
            return t(['Constraints not satisfied']);
          },
        },
        webAudio: {
          title: (e) => {
            const { normalize: t } = e;
            return t(['Browser error']);
          },
          trySafari: (e) => {
            const { normalize: t } = e;
            return t(['Your browser is not support the Web Audio API. Try to use Safari browser.']);
          },
          description: (e) => {
            const { normalize: t } = e;
            return t([
              'Your browser is not support the Web Audio API. Try to update browser to the latest version or use another one.',
            ]);
          },
        },
        notReadable: {
          description: (e) => {
            const { normalize: t } = e;
            return t([
              'Your microphone is already in use (via Skype, etc). Free the other app from using the microphone and try again.',
            ]);
          },
          title: (e) => {
            const { normalize: t } = e;
            return t(['Microphone is already in use']);
          },
        },
        notAllowed: {
          description: (e) => {
            const { normalize: t } = e;
            return t([
              'Please allow browser to access your microphone. You can do this in browser settings or in the address bar.',
            ]);
          },
          title: (e) => {
            const { normalize: t } = e;
            return t(['Access Denied']);
          },
        },
        unknown: {
          description: (e) => {
            const { normalize: t, interpolate: n, list: r } = e;
            return t([n(r(0))]);
          },
          title: (e) => {
            const { normalize: t } = e;
            return t(['Error ocuired']);
          },
        },
        muted: {
          title: (e) => {
            const { normalize: t } = e;
            return t(['Microphone is muted']);
          },
          description: (e) => {
            const { normalize: t } = e;
            return t(['No audio signal found because your mic is muted. Please unmute it and try again.']);
          },
        },
        notFound: {
          description: (e) => {
            const { normalize: t } = e;
            return t(['Check your microphone device is plugged in and enabled in you OS preferences.']);
          },
          title: (e) => {
            const { normalize: t } = e;
            return t(['Microphone not found']);
          },
        },
      },
      prompt: (e) => {
        const { normalize: t } = e;
        return t(['Allow access to you mic device']);
      },
    },
    splitter: {
      metaInfo: {
        description: (e) => {
          const { normalize: t } = e;
          return t([
            'Separate music into separate parts [vocals, bass, drums, etc.] with AI-Powered algorithms',
          ]);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['Splitter AI — Isolate instruments from a song']);
        },
      },
      title: (e) => {
        const { normalize: t } = e;
        return t(['Splitter AI']);
      },
      promo: {
        content: (e) => {
          const { normalize: t } = e;
          return t([
            'This app allows to separate music into an individual streams such as vocal, bass, percussion, and lets you rebalance their individual volumes. This is the simplest way to get multitracks from any song.<br><br>Once you choose a song, artificial intelligence will separate music into stems:  vocals, bass, drums, others. Processing usually takes about 1 minute.',
          ]);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['AI-Powered Music Separator']);
        },
      },
      description: (e) => {
        const { normalize: t } = e;
        return t(['Split music into separated parts with AI-Powered algorithms']);
      },
    },
    remover: {
      watch: {
        status: {
          converting: (e) => {
            const { normalize: t } = e;
            return t(['encoding']);
          },
          process: (e) => {
            const { normalize: t } = e;
            return t(['AI processing']);
          },
          initial: (e) => {
            const { normalize: t } = e;
            return t(['Pending']);
          },
          idle: (e) => {
            const { normalize: t } = e;
            return t(['Pending']);
          },
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['Audio processing']);
        },
        description: (e) => {
          const { normalize: t } = e;
          return t([
            'Artificial intelligence algorithm now works, it may take a minute.<br>Please keep this page open.',
          ]);
        },
      },
      download: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['Loading']);
        },
      },
      error: {
        unknown: (e) => {
          const { normalize: t, interpolate: n, list: r } = e;
          return t(['An unknown error has occurred.<br>', n(r(0))]);
        },
        tooManyRequestsPatrons: (e) => {
          const { normalize: t } = e;
          return t([
            'Too many requests from your IP address. Please try again later<br>or become a <a href="https://www.patreon.com/vocalremover" target="_blank">patron</a>',
          ]);
        },
        decoding: (e) => {
          const { normalize: t } = e;
          return t(['Error occurred while decoding. Please try again or try another file']);
        },
        tooManyRequests: (e) => {
          const { normalize: t } = e;
          return t(['Too many requests from your IP address. Please try again later']);
        },
        invalidFileType: (e) => {
          const { normalize: t } = e;
          return t(['Invalid file type. Please upload the correct audio file.']);
        },
        sizeLimit: (e) => {
          const { normalize: t } = e;
          return t(['Files only up to 100 Mb allowed']);
        },
        socket: (e) => {
          const { normalize: t, interpolate: n, list: r } = e;
          return t(['Socket error occured. ', n(r(0)), '<br>Please try again or contact admin.']);
        },
        processing: (e) => {
          const { normalize: t } = e;
          return t(['Error occurred while processing. Please try again or try another file']);
        },
        tooManyRequestsMembership: (e) => {
          const { normalize: t } = e;
          return t([
            'Too many requests. Please try again later <br>or get a <a href="./pricing">membership</a>',
          ]);
        },
        server: (e) => {
          const { normalize: t, interpolate: n, list: r } = e;
          return t(['Server error occurred. Please try again or contact admin.<br>Error code ', n(r(0))]);
        },
        durationLimit: (e) => {
          const { normalize: t, interpolate: n, list: r } = e;
          return t(['Files only up to ', n(r(0)), 'min duration allowed']);
        },
        network: (e) => {
          const { normalize: t, interpolate: n, list: r } = e;
          return t(['Network error occured, check your internet connection.<br>Error code ', n(r(0))]);
        },
        proxyNotAllowed: (e) => {
          const { normalize: t } = e;
          return t(['Please turn off proxy or VPN and try again']);
        },
      },
      metaInfo: {
        title: (e) => {
          const { normalize: t, plural: n } = e;
          return n([t(['Vocal Remover and Isolation [AI]']), t(['Free Online'])]);
        },
        description: (e) => {
          const { normalize: t } = e;
          return t([
            "Split music into separated vocals and instrumental track. Perfect for making karaoke backing tracks or accapella extractor. Artificial intelligence algorithms are used. It's free.",
          ]);
        },
      },
      promo: {
        content: (e) => {
          const { normalize: t } = e;
          return t([
            'This free online application will help remove vocals from a song by creating karaoke.<br><br> Once you choose a song, artificial intelligence will separate the vocals from the instrumental ones. You will get two tracks - a karaoke version of your song (no vocals) and acapella version (isolated vocals).<br><br> Despite the complexity and high cost of service, you can use it absolutely free. Processing usually takes about 10 seconds.',
          ]);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['Remove vocals from a song']);
        },
      },
      description: (e) => {
        const { normalize: t } = e;
        return t(['Separate voice from music out of a song free with powerful AI algorithms']);
      },
      title: (e) => {
        const { normalize: t } = e;
        return t(['Vocal Remover and Isolation']);
      },
    },
    bpm: {
      promo: {
        content: (e) => {
          const { normalize: t } = e;
          return t([
            'This app analyzes music and estimates pitch and tempo  [e.g. A♭ major, 120 bpm]. You can upload multiple files at once. Processing time takes a few seconds.',
          ]);
        },
        pitch: {
          content: (e) => {
            const { normalize: t } = e;
            return t([
              'Using <a href="./pitch">Pitch Shifter</a> tool you can transpose song to a different key and tempo.',
            ]);
          },
          title: (e) => {
            const { normalize: t } = e;
            return t(['Change Key & BPM']);
          },
        },
        tap: {
          title: (e) => {
            const { normalize: t } = e;
            return t(['Tap tempo']);
          },
          content: (e) => {
            const { normalize: t } = e;
            return t([
              '<a href="./tap-tempo">Tap tempo</a> tool allows you to calculate tempo beats per minute by tapping space key to the rhythm or beat.',
            ]);
          },
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['How to find Key & BPM']);
        },
      },
      title: (e) => {
        const { normalize: t } = e;
        return t(['Song Key and BPM Finder']);
      },
      metaInfo: {
        description: (e) => {
          const { normalize: t } = e;
          return t([
            'Estimates Key and BPM for any song for free. Processing time takes a few seconds. You can analyze multiple files at once.',
          ]);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['Song Key and BPM Finder — Advanced Music Analyzer']);
        },
      },
      description: (e) => {
        const { normalize: t } = e;
        return t(['Analyzes music and finds Key, Scale and BPM for any song']);
      },
    },
    recorder: {
      settings: {
        echoCancellation: (e) => {
          const { normalize: t } = e;
          return t(['Echo Cancellation']);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['Advanced Settings']);
        },
        autoGainControl: (e) => {
          const { normalize: t } = e;
          return t(['Auto Gain Control']);
        },
        noiseSuppression: (e) => {
          const { normalize: t } = e;
          return t(['Noise Suppression']);
        },
      },
      metaInfo: {
        description: (e) => {
          const { normalize: t } = e;
          return t([
            'This is a free online audio recorder app which records sound from microphone. After recording is done you can edit audio track - trim any fragment, adjust equalizer and sound reverb',
          ]);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['Voice Audio Recorder [Stereo HQ]']);
        },
      },
      pressButtonPrompt: (e) => {
        const { normalize: t } = e;
        return t(['press button to start recording']);
      },
      promo: {
        features: {
          stereo: {
            title: (e) => {
              const { normalize: t } = e;
              return t(['Stereo']);
            },
            content: (e) => {
              const { normalize: t } = e;
              return t([
                'Stereo microphone gives a real stereo. Mono microphones can give mono or pseudo-stereo.',
              ]);
            },
          },
          effects: {
            title: (e) => {
              const { normalize: t } = e;
              return t(['Sound Effects & Editor']);
            },
            content: (e) => {
              const { normalize: t } = e;
              return t([
                'After recording is done you can edit audio track - trim any fragment, adjust equalizer and sound reverb',
              ]);
            },
          },
        },
        content: (e) => {
          const { normalize: t } = e;
          return t([
            'This is a free online audio recorder app which records sound from microphone. It is available for mobile devices.',
          ]);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['Audio Recorder & Editor']);
        },
      },
      title: (e) => {
        const { normalize: t } = e;
        return t(['Voice Recorder']);
      },
      description: (e) => {
        const { normalize: t } = e;
        return t(['Record live audio from the microphone. Just connect microphone device']);
      },
    },
    pricing: {
      period: {
        month: (e) => {
          const { normalize: t } = e;
          return t(['Month']);
        },
        trial: (e) => {
          const { normalize: t } = e;
          return t(['Free']);
        },
        year: (e) => {
          const { normalize: t } = e;
          return t(['Year']);
        },
      },
      metaInfo: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['Pricing']);
        },
      },
      payment: {
        checkoutProcessing: (e) => {
          const { normalize: t } = e;
          return t(['Payment processing']);
        },
        checkoutSuccess: (e) => {
          const { normalize: t } = e;
          return t(['Payment successful']);
        },
        checkoutFail: (e) => {
          const { normalize: t } = e;
          return t(['Payment error']);
        },
        checkoutError: (e) => {
          const { normalize: t } = e;
          return t(['Checkout error']);
        },
        alreadyMember: (e) => {
          const { normalize: t } = e;
          return t(['You already have an active membership']);
        },
      },
      authForSubscription: (e) => {
        const { normalize: t } = e;
        return t(['If you already have a subscription']);
      },
      label: {
        yes: (e) => {
          const { normalize: t } = e;
          return t(['Yes']);
        },
        minutes: (e) => {
          const { normalize: t } = e;
          return t(['minutes']);
        },
        no: (e) => {
          const { normalize: t } = e;
          return t(['No']);
        },
        perDay: (e) => {
          const { normalize: t } = e;
          return t(['Per day']);
        },
        perHour: (e) => {
          const { normalize: t } = e;
          return t(['Per hour']);
        },
      },
      features: {
        filesCount: (e) => {
          const { normalize: t } = e;
          return t(['Number of files']);
        },
        fastProcessing: (e) => {
          const { normalize: t } = e;
          return t(['Fast Processing Queue']);
        },
        uploadSizeLimit: (e) => {
          const { normalize: t } = e;
          return t(['Upload Size Limit per File']);
        },
        totalDuration: (e) => {
          const { normalize: t } = e;
          return t(['Total duration']);
        },
      },
      title: (e) => {
        const { normalize: t } = e;
        return t(['Get a membership']);
      },
      description: (e) => {
        const { normalize: t } = e;
        return t(['Choose a plan and start using the service without limits']);
      },
    },
    cutter: {
      metaInfo: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['Audio Cutter [HQ] — Online Audio Editor']);
        },
        description: (e) => {
          const { normalize: t } = e;
          return t([
            'Online Audio Editor helps to trim or cut MP3, WAV, FLAC, AAC audio files. This tool enables you to make your audio track to fade in and fade out smoothly.',
          ]);
        },
      },
      description: (e) => {
        const { normalize: t } = e;
        return t(['Free editor to trim and cut any audio file online']);
      },
      promo: {
        content: (e) => {
          const { normalize: t } = e;
          return t([
            'This app can be used to trim and/or cut audio tracks, remove an audio fragments. Fade in and fade out your music easily to make the audio harmoniously.<br><br> It fast and easy to use. You can save the audio file in any format (codec parameters are configured)<br><br> It works directly in the browser, no needs to install any software, is available for mobile devices.',
          ]);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['How to cut audio']);
        },
      },
      title: (e) => {
        const { normalize: t } = e;
        return t(['Audio Cutter']);
      },
    },
    membership: {
      title: {
        no_exists: (e) => {
          const { normalize: t } = e;
          return t(["You don't have an active subscription"]);
        },
        exists: (e) => {
          const { normalize: t } = e;
          return t(['Your subscription']);
        },
      },
      expires: (e) => {
        const { normalize: t } = e;
        return t(['active until']);
      },
      metaInfo: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['My membership']);
        },
      },
    },
    tap: {
      metaInfo: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['Tap tempo BPM — Beats Per Minute Counter']);
        },
        description: (e) => {
          const { normalize: t } = e;
          return t(["Simply tap along with the beat and you'll get the beats per minute."]);
        },
      },
      description: (e) => {
        const { normalize: t } = e;
        return t(['by pressing <span class="key">space</span> key or clicking on the area below']);
      },
      title: (e) => {
        const { normalize: t } = e;
        return t(['Tap tempo BPM']);
      },
    },
    joiner: {
      title: (e) => {
        const { normalize: t } = e;
        return t(['Audio Joiner']);
      },
      metaInfo: {
        description: (e) => {
          const { normalize: t } = e;
          return t([
            'App is designed to join multiple audio tracks into one. Crossfade feature make it easy to merge songs seamlessly and smoothly. Browse audio files, select fragments using the sliders, and save file on your hard drive.',
          ]);
        },
        title: (e) => {
          const { normalize: t } = e;
          return t(['Audio Joiner Online']);
        },
      },
      description: (e) => {
        const { normalize: t } = e;
        return t(['Join multiple audio tracks into one. Choose audio files you want to merge']);
      },
    },
    karaoke: {
      metaInfo: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['Sing & Record – Online Karaoke Studio']);
        },
        description: (e) => {
          const { normalize: t } = e;
          return t([
            'App allows recording your singing with a backing track. After recording is complete, you can tune voice audio filters, mix voice and karaoke track and save the result as a complete personal song. Effects are available: reverberation, equalization, volumes, panning, pass filters etc.',
          ]);
        },
      },
      title: (e) => {
        const { normalize: t } = e;
        return t(['Recording Voice Over a Song']);
      },
      description: (e) => {
        const { normalize: t } = e;
        return t([
          'Sing & record, tune voice and save complete song. Choose karaoke track you want to sing with',
        ]);
      },
    },
    'sticky-menu': {
      donate: (e) => {
        const { normalize: t } = e;
        return t(['Donate']);
      },
      about: (e) => {
        const { normalize: t } = e;
        return t(['How it works']);
      },
      'you-are-patron': (e) => {
        const { normalize: t } = e;
        return t(["You're patron"]);
      },
    },
    pageNotFound: {
      title: (e) => {
        const { normalize: t } = e;
        return t(['Page Not Found']);
      },
      goHome: (e) => {
        const { normalize: t } = e;
        return t(['Go to main page']);
      },
      description: (e) => {
        const { normalize: t } = e;
        return t(['You may have mistyped the address or the page may have moved.']);
      },
    },
    promo: {
      privacy: {
        title: (e) => {
          const { normalize: t } = e;
          return t(['Privacy and Security Guaranteed']);
        },
        content: (e) => {
          const { normalize: t } = e;
          return t(['This is serverless app. Your files does not leave your device']);
        },
      },
    },
  },
  Lf = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: Ma,
      },
      Symbol.toStringTag,
      {
        value: 'Module',
      },
    ),
  ),
  us = 'en',
  Hf = {
    en: Ma,
  },
  ht = Cf({
    globalInjection: !0,
    legacy: !1,
    fallbackLocale: us,
    messages: Hf,
  });
Ca(ht, us);
function Ca(e, t) {
  e.mode === 'legacy' ? (e.global.locale = t) : (e.global.locale.value = t),
    document.querySelector('html').setAttribute('lang', t);
}
async function Df(e, t) {
  const n = await E2(
    Object.assign({
      '../locales/ar_AE.yaml': () => G(() => import('./ar_AE-1a3a270c.js'), []),
      '../locales/bg_BG.yaml': () => G(() => import('./bg_BG-869f87b5.js'), []),
      '../locales/cs_CZ.yaml': () => G(() => import('./cs_CZ-de0961c3.js'), []),
      '../locales/da_DK.yaml': () => G(() => import('./da_DK-1b5a123e.js'), []),
      '../locales/de_DE.yaml': () => G(() => import('./de_DE-b2cf149f.js'), []),
      '../locales/el_GR.yaml': () => G(() => import('./el_GR-00d64e73.js'), []),
      '../locales/en_GB.yaml': () => G(() => Promise.resolve().then(() => Lf), void 0),
      '../locales/es_ES.yaml': () => G(() => import('./es_ES-152fd79c.js'), []),
      '../locales/et_EE.yaml': () => G(() => import('./et_EE-65b5ad1c.js'), []),
      '../locales/fi_FI.yaml': () => G(() => import('./fi_FI-33c05afa.js'), []),
      '../locales/fr_FR.yaml': () => G(() => import('./fr_FR-10aed41a.js'), []),
      '../locales/he_IL.yaml': () => G(() => import('./he_IL-6de3a798.js'), []),
      '../locales/hi_IN.yaml': () => G(() => import('./hi_IN-ce515916.js'), []),
      '../locales/hu_HU.yaml': () => G(() => import('./hu_HU-0e7d7436.js'), []),
      '../locales/id_ID.yaml': () => G(() => import('./id_ID-3e4aad44.js'), []),
      '../locales/it_IT.yaml': () => G(() => import('./it_IT-cc90029c.js'), []),
      '../locales/ja_JP.yaml': () => G(() => import('./ja_JP-0463d545.js'), []),
      '../locales/ko_KR.yaml': () => G(() => import('./ko_KR-0b10747c.js'), []),
      '../locales/lt_LT.yaml': () => G(() => import('./lt_LT-7cc85efb.js'), []),
      '../locales/lv_LV.yaml': () => G(() => import('./lv_LV-df3c2575.js'), []),
      '../locales/nb_NO.yaml': () => G(() => import('./nb_NO-488c3d13.js'), []),
      '../locales/nl_NL.yaml': () => G(() => import('./nl_NL-285d037d.js'), []),
      '../locales/pl_PL.yaml': () => G(() => import('./pl_PL-aa937acd.js'), []),
      '../locales/pt_BR.yaml': () => G(() => import('./pt_BR-d998577b.js'), []),
      '../locales/ro_RO.yaml': () => G(() => import('./ro_RO-fc343b8a.js'), []),
      '../locales/ru_RU.yaml': () => G(() => import('./ru_RU-9cd3959e.js'), []),
      '../locales/sk_SK.yaml': () => G(() => import('./sk_SK-a807a27a.js'), []),
      '../locales/sl_SI.yaml': () => G(() => import('./sl_SI-6170eb56.js'), []),
      '../locales/sv_SE.yaml': () => G(() => import('./sv_SE-12eb63ff.js'), []),
      '../locales/th_TH.yaml': () => G(() => import('./th_TH-5e9c99d6.js'), []),
      '../locales/tr_TR.yaml': () => G(() => import('./tr_TR-132b218e.js'), []),
      '../locales/uk_UA.yaml': () => G(() => import('./uk_UA-9b922126.js'), []),
      '../locales/vi_VN.yaml': () => G(() => import('./vi_VN-1b3c4935.js'), []),
      '../locales/zh_CN.yaml': () => G(() => import('./zh_CN-50b3e52b.js'), []),
    }),
    `../locales/${
      {
        ar: 'ar_AE',
        bg: 'bg_BG',
        cs: 'cs_CZ',
        da: 'da_DK',
        de: 'de_DE',
        el: 'el_GR',
        en: 'en_GB',
        es: 'es_ES',
        et: 'et_EE',
        fi: 'fi_FI',
        fr: 'fr_FR',
        he: 'he_IL',
        hi: 'hi_IN',
        hu: 'hu_HU',
        id: 'id_ID',
        it: 'it_IT',
        ja: 'ja_JP',
        ko: 'ko_KR',
        lt: 'lt_LT',
        lv: 'lv_LV',
        nb: 'nb_NO',
        nl: 'nl_NL',
        pl: 'pl_PL',
        pt: 'pt_BR',
        ro: 'ro_RO',
        ru: 'ru_RU',
        sk: 'sk_SK',
        sl: 'sl_SI',
        sv: 'sv_SE',
        th: 'th_TH',
        tr: 'tr_TR',
        uk: 'uk_UA',
        vi: 'vi_VN',
        zh: 'zh_CN',
      }[t]
    }.yaml`,
  );
  return e.global.setLocaleMessage(t, n.default), Wt();
}
Xe.beforeEach(async (e, t, n) => {
  var o;
  const r = ((o = e.name) == null ? void 0 : o.split('__')[0]) || us;
  return ht.global.availableLocales.includes(r) || (await Df(ht, r)), Ca(ht, r), n();
});
function Ao(e, t = {}, n) {
  for (const r in e) {
    const o = e[r],
      s = n ? `${n}:${r}` : r;
    typeof o == 'object' && o !== null ? Ao(o, t, s) : typeof o == 'function' && (t[s] = o);
  }
  return t;
}
const Nf = {
    run: (e) => e(),
  },
  Ff = () => Nf,
  Aa = typeof console.createTask < 'u' ? console.createTask : Ff;
function $f(e, t) {
  const n = t.shift(),
    r = Aa(n);
  return e.reduce((o, s) => o.then(() => r.run(() => s(...t))), Promise.resolve());
}
function Vf(e, t) {
  const n = t.shift(),
    r = Aa(n);
  return Promise.all(e.map((o) => r.run(() => o(...t))));
}
function Xr(e, t) {
  for (const n of [...e]) n(t);
}
class Bf {
  constructor() {
    (this._hooks = {}),
      (this._before = void 0),
      (this._after = void 0),
      (this._deprecatedMessages = void 0),
      (this._deprecatedHooks = {}),
      (this.hook = this.hook.bind(this)),
      (this.callHook = this.callHook.bind(this)),
      (this.callHookWith = this.callHookWith.bind(this));
  }
  hook(t, n, r = {}) {
    if (!t || typeof n != 'function') return () => {};
    const o = t;
    let s;
    for (; this._deprecatedHooks[t]; ) (s = this._deprecatedHooks[t]), (t = s.to);
    if (s && !r.allowDeprecated) {
      let i = s.message;
      i || (i = `${o} hook has been deprecated` + (s.to ? `, please use ${s.to}` : '')),
        this._deprecatedMessages || (this._deprecatedMessages = new Set()),
        this._deprecatedMessages.has(i) || (console.warn(i), this._deprecatedMessages.add(i));
    }
    if (!n.name)
      try {
        Object.defineProperty(n, 'name', {
          get: () => '_' + t.replace(/\W+/g, '_') + '_hook_cb',
          configurable: !0,
        });
      } catch (i) {}
    return (
      (this._hooks[t] = this._hooks[t] || []),
      this._hooks[t].push(n),
      () => {
        n && (this.removeHook(t, n), (n = void 0));
      }
    );
  }
  hookOnce(t, n) {
    let r,
      o = (...s) => (typeof r == 'function' && r(), (r = void 0), (o = void 0), n(...s));
    return (r = this.hook(t, o)), r;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const r = this._hooks[t].indexOf(n);
      r !== -1 && this._hooks[t].splice(r, 1), this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] =
      typeof n == 'string'
        ? {
            to: n,
          }
        : n;
    const r = this._hooks[t] || [];
    delete this._hooks[t];
    for (const o of r) this.hook(t, o);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t) this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = Ao(t),
      r = Object.keys(n).map((o) => this.hook(o, n[o]));
    return () => {
      for (const o of r.splice(0, r.length)) o();
    };
  }
  removeHooks(t) {
    const n = Ao(t);
    for (const r in n) this.removeHook(r, n[r]);
  }
  removeAllHooks() {
    for (const t in this._hooks) delete this._hooks[t];
  }
  callHook(t, ...n) {
    return n.unshift(t), this.callHookWith($f, t, ...n);
  }
  callHookParallel(t, ...n) {
    return n.unshift(t), this.callHookWith(Vf, t, ...n);
  }
  callHookWith(t, n, ...r) {
    const o =
      this._before || this._after
        ? {
            name: n,
            args: r,
            context: {},
          }
        : void 0;
    this._before && Xr(this._before, o);
    const s = t(n in this._hooks ? [...this._hooks[n]] : [], r);
    return s instanceof Promise
      ? s.finally(() => {
          this._after && o && Xr(this._after, o);
        })
      : (this._after && o && Xr(this._after, o), s);
  }
  beforeEach(t) {
    return (
      (this._before = this._before || []),
      this._before.push(t),
      () => {
        if (this._before !== void 0) {
          const n = this._before.indexOf(t);
          n !== -1 && this._before.splice(n, 1);
        }
      }
    );
  }
  afterEach(t) {
    return (
      (this._after = this._after || []),
      this._after.push(t),
      () => {
        if (this._after !== void 0) {
          const n = this._after.indexOf(t);
          n !== -1 && this._after.splice(n, 1);
        }
      }
    );
  }
}
function jf() {
  return new Bf();
}
function Uf(e) {
  return Array.isArray(e) ? e : [e];
}
const Pa = ['title', 'script', 'style', 'noscript'],
  Oa = ['base', 'meta', 'link', 'style', 'script', 'noscript'],
  Wf = [
    'title',
    'titleTemplate',
    'templateParams',
    'base',
    'htmlAttrs',
    'bodyAttrs',
    'meta',
    'link',
    'style',
    'script',
    'noscript',
  ],
  Kf = ['base', 'title', 'titleTemplate', 'bodyAttrs', 'htmlAttrs', 'templateParams'],
  Gf = ['tagPosition', 'tagPriority', 'tagDuplicateStrategy', 'innerHTML', 'textContent'];
function Ta(e) {
  let t = 9;
  for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function Po(e) {
  return Ta(
    `${e.tag}:${e.textContent || e.innerHTML || ''}:${Object.entries(e.props)
      .map(([t, n]) => `${t}:${String(n)}`)
      .join(',')}`,
  );
}
function qf(e) {
  let t = 9;
  for (const n of e) for (let r = 0; r < n.length; ) t = Math.imul(t ^ n.charCodeAt(r++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function xa(e, t) {
  const { props: n, tag: r } = e;
  if (Kf.includes(r)) return r;
  if (r === 'link' && n.rel === 'canonical') return 'canonical';
  if (n.charset) return 'charset';
  const o = ['id'];
  r === 'meta' && o.push('name', 'property', 'http-equiv');
  for (const s of o)
    if (typeof n[s] < 'u') {
      const i = String(n[s]);
      return t && !t(i) ? !1 : `${r}:${s}:${i}`;
    }
  return !1;
}
function Di(e, t) {
  return e == null ? t || null : typeof e == 'function' ? e(t) : e;
}
function Xn(e, t = !1, n) {
  const { tag: r, $el: o } = e;
  o &&
    (Object.entries(r.props).forEach(([s, i]) => {
      i = String(i);
      const a = `attr:${s}`;
      if (s === 'class') {
        if (!i) return;
        for (const l of i.split(' ')) {
          const c = `${a}:${l}`;
          n && n(e, c, () => o.classList.remove(l)), o.classList.contains(l) || o.classList.add(l);
        }
        return;
      }
      n && !s.startsWith('data-h-') && n(e, a, () => o.removeAttribute(s)),
        (t || o.getAttribute(s) !== i) && o.setAttribute(s, i);
    }),
    Pa.includes(r.tag) &&
      (r.textContent && r.textContent !== o.textContent
        ? (o.textContent = r.textContent)
        : r.innerHTML && r.innerHTML !== o.innerHTML && (o.innerHTML = r.innerHTML)));
}
let bn = !1;
async function Ra(e, t = {}) {
  var d, p;
  const n = {
    shouldRender: !0,
  };
  if ((await e.hooks.callHook('dom:beforeRender', n), !n.shouldRender)) return;
  const r = t.document || e.resolvedOptions.document || window.document,
    o = (await e.resolveTags()).map(a);
  if (e.resolvedOptions.experimentalHashHydration && ((bn = bn || e._hash || !1), bn)) {
    const m = qf(o.map((g) => g.tag._h));
    if (bn === m) return;
    bn = m;
  }
  const s = e._popSideEffectQueue();
  e.headEntries()
    .map((m) => m._sde)
    .forEach((m) => {
      Object.entries(m).forEach(([g, v]) => {
        s[g] = v;
      });
    });
  const i = (m, g, v) => {
    (g = `${m.renderId}:${g}`), m.entry && (m.entry._sde[g] = v), delete s[g];
  };
  function a(m) {
    const g = e.headEntries().find((y) => y._i === m._e),
      v = {
        renderId: m._d || Po(m),
        $el: null,
        shouldRender: !0,
        tag: m,
        entry: g,
        markSideEffect: (y, z) => i(v, y, z),
      };
    return v;
  }
  const l = [],
    c = {
      body: [],
      head: [],
    },
    u = (m) => {
      (e._elMap[m.renderId] = m.$el),
        l.push(m),
        i(m, 'el', () => {
          var g;
          (g = m.$el) == null || g.remove(), delete e._elMap[m.renderId];
        });
    };
  for (const m of o) {
    if ((await e.hooks.callHook('dom:beforeRenderTag', m), !m.shouldRender)) continue;
    const { tag: g } = m;
    if (g.tag === 'title') {
      (r.title = g.textContent || ''), l.push(m);
      continue;
    }
    if (g.tag === 'htmlAttrs' || g.tag === 'bodyAttrs') {
      (m.$el = r[g.tag === 'htmlAttrs' ? 'documentElement' : 'body']), Xn(m, !1, i), l.push(m);
      continue;
    }
    if (
      ((m.$el = e._elMap[m.renderId]),
      !m.$el &&
        g.key &&
        (m.$el = r.querySelector(
          `${(d = g.tagPosition) != null && d.startsWith('body') ? 'body' : 'head'} > ${g.tag}[data-h-${g._h}]`,
        )),
      m.$el)
    ) {
      m.tag._d && Xn(m), u(m);
      continue;
    }
    c[(p = g.tagPosition) != null && p.startsWith('body') ? 'body' : 'head'].push(m);
  }
  const f = {
    bodyClose: void 0,
    bodyOpen: void 0,
    head: void 0,
  };
  Object.entries(c).forEach(([m, g]) => {
    var y;
    if (!g.length) return;
    const v = (y = r == null ? void 0 : r[m]) == null ? void 0 : y.children;
    if (v) {
      for (const z of [...v].reverse()) {
        const C = z.tagName.toLowerCase();
        if (!Oa.includes(C)) continue;
        const S = z.getAttributeNames().reduce(
            (I, A) => ({
              ...I,
              [A]: z.getAttribute(A),
            }),
            {},
          ),
          O = {
            tag: C,
            props: S,
          };
        z.innerHTML && (O.innerHTML = z.innerHTML);
        const k = Po(O);
        let T = g.findIndex((I) => (I == null ? void 0 : I.renderId) === k);
        if (T === -1) {
          const I = xa(O);
          T = g.findIndex((A) => (A == null ? void 0 : A.tag._d) && A.tag._d === I);
        }
        if (T !== -1) {
          const I = g[T];
          (I.$el = z), Xn(I), u(I), delete g[T];
        }
      }
      g.forEach((z) => {
        const C = z.tag.tagPosition || 'head';
        (f[C] = f[C] || r.createDocumentFragment()),
          z.$el || ((z.$el = r.createElement(z.tag.tag)), Xn(z, !0)),
          f[C].appendChild(z.$el),
          u(z);
      });
    }
  }),
    f.head && r.head.appendChild(f.head),
    f.bodyOpen && r.body.insertBefore(f.bodyOpen, r.body.firstChild),
    f.bodyClose && r.body.appendChild(f.bodyClose);
  for (const m of l) await e.hooks.callHook('dom:renderTag', m);
  Object.values(s).forEach((m) => m());
}
let Qr = null;
async function Sa(e, t = {}) {
  function n() {
    return (Qr = null), Ra(e, t);
  }
  const r = t.delayFn || ((o) => setTimeout(o, 10));
  return (Qr = Qr || new Promise((o) => r(() => o(n()))));
}
function Yf(e) {
  return {
    hooks: {
      'entries:updated': function (t) {
        if (typeof (e == null ? void 0 : e.document) > 'u' && typeof window > 'u') return;
        let n = e == null ? void 0 : e.delayFn;
        !n && typeof requestAnimationFrame < 'u' && (n = requestAnimationFrame),
          Sa(t, {
            document: (e == null ? void 0 : e.document) || window.document,
            delayFn: n,
          });
      },
    },
  };
}
function Jf(e) {
  var t;
  return (
    ((t = e == null ? void 0 : e.head.querySelector('meta[name="unhead:ssr"]')) == null
      ? void 0
      : t.getAttribute('content')) || !1
  );
}
const Ni = {
  critical: 2,
  high: 9,
  low: 12,
  base: -1,
  title: 1,
  meta: 10,
};
function Fi(e) {
  if (typeof e.tagPriority == 'number') return e.tagPriority;
  if (e.tag === 'meta') {
    if (e.props.charset) return -2;
    if (e.props['http-equiv'] === 'content-security-policy') return 0;
  }
  const t = e.tagPriority || e.tag;
  return t in Ni ? Ni[t] : 10;
}
const Zf = [
  {
    prefix: 'before:',
    offset: -1,
  },
  {
    prefix: 'after:',
    offset: 1,
  },
];
function Xf() {
  return {
    hooks: {
      'tags:resolve': (e) => {
        const t = (n) => {
          var r;
          return (r = e.tags.find((o) => o._d === n)) == null ? void 0 : r._p;
        };
        for (const { prefix: n, offset: r } of Zf)
          for (const o of e.tags.filter(
            (s) => typeof s.tagPriority == 'string' && s.tagPriority.startsWith(n),
          )) {
            const s = t(o.tagPriority.replace(n, ''));
            typeof s < 'u' && (o._p = s + r);
          }
        e.tags.sort((n, r) => n._p - r._p).sort((n, r) => Fi(n) - Fi(r));
      },
    },
  };
}
function Qf() {
  return {
    hooks: {
      'tags:resolve': (e) => {
        const { tags: t } = e;
        let n = t.findIndex((o) => o.tag === 'titleTemplate');
        const r = t.findIndex((o) => o.tag === 'title');
        if (r !== -1 && n !== -1) {
          const o = Di(t[n].textContent, t[r].textContent);
          o !== null ? (t[r].textContent = o || t[r].textContent) : delete t[r];
        } else if (n !== -1) {
          const o = Di(t[n].textContent);
          o !== null && ((t[n].textContent = o), (t[n].tag = 'title'), (n = -1));
        }
        n !== -1 && delete t[n], (e.tags = t.filter(Boolean));
      },
    },
  };
}
function e0() {
  return {
    hooks: {
      'tag:normalise': function ({ tag: e }) {
        typeof e.props.body < 'u' && ((e.tagPosition = 'bodyClose'), delete e.props.body);
      },
    },
  };
}
const t0 = ['link', 'style', 'script', 'noscript'];
function n0() {
  return {
    hooks: {
      'tag:normalise': ({ tag: e, resolvedOptions: t }) => {
        t.experimentalHashHydration === !0 && (e._h = Po(e)),
          e.key && t0.includes(e.tag) && ((e._h = Ta(e.key)), (e.props[`data-h-${e._h}`] = ''));
      },
    },
  };
}
const $i = ['script', 'link', 'bodyAttrs'];
function r0() {
  const e = (t, n) => {
    const r = {},
      o = {};
    Object.entries(n.props).forEach(([i, a]) => {
      i.startsWith('on') && typeof a == 'function' ? (o[i] = a) : (r[i] = a);
    });
    let s;
    return (
      t === 'dom' &&
        n.tag === 'script' &&
        typeof r.src == 'string' &&
        typeof o.onload < 'u' &&
        ((s = r.src), delete r.src),
      {
        props: r,
        eventHandlers: o,
        delayedSrc: s,
      }
    );
  };
  return {
    hooks: {
      'ssr:render': function (t) {
        t.tags = t.tags.map(
          (n) => (
            !$i.includes(n.tag) ||
              !Object.entries(n.props).find(([r, o]) => r.startsWith('on') && typeof o == 'function') ||
              (n.props = e('ssr', n).props),
            n
          ),
        );
      },
      'dom:beforeRenderTag': function (t) {
        if (
          !$i.includes(t.tag.tag) ||
          !Object.entries(t.tag.props).find(([s, i]) => s.startsWith('on') && typeof i == 'function')
        )
          return;
        const { props: n, eventHandlers: r, delayedSrc: o } = e('dom', t.tag);
        Object.keys(r).length && ((t.tag.props = n), (t.tag._eventHandlers = r), (t.tag._delayedSrc = o));
      },
      'dom:renderTag': function (t) {
        const n = t.$el;
        if (!t.tag._eventHandlers || !n) return;
        const r = t.tag.tag === 'bodyAttrs' && typeof window < 'u' ? window : n;
        Object.entries(t.tag._eventHandlers).forEach(([o, s]) => {
          const i = `${t.tag._d || t.tag._p}:${o}`,
            a = o.slice(2).toLowerCase(),
            l = `data-h-${a}`;
          if ((t.markSideEffect(i, () => {}), n.hasAttribute(l))) return;
          const c = s;
          n.setAttribute(l, ''),
            r.addEventListener(a, c),
            t.entry &&
              (t.entry._sde[i] = () => {
                r.removeEventListener(a, c), n.removeAttribute(l);
              });
        }),
          t.tag._delayedSrc && n.setAttribute('src', t.tag._delayedSrc);
      },
    },
  };
}
const o0 = ['templateParams', 'htmlAttrs', 'bodyAttrs'];
function s0() {
  return {
    hooks: {
      'tag:normalise': function ({ tag: e }) {
        ['hid', 'vmid', 'key'].forEach((r) => {
          e.props[r] && ((e.key = e.props[r]), delete e.props[r]);
        });
        const n = xa(e) || (e.key ? `${e.tag}:${e.key}` : !1);
        n && (e._d = n);
      },
      'tags:resolve': function (e) {
        const t = {};
        e.tags.forEach((r) => {
          const o = (r.key ? `${r.tag}:${r.key}` : r._d) || r._p,
            s = t[o];
          if (s) {
            let a = r == null ? void 0 : r.tagDuplicateStrategy;
            if ((!a && o0.includes(r.tag) && (a = 'merge'), a === 'merge')) {
              const l = s.props;
              ['class', 'style'].forEach((c) => {
                r.props[c] &&
                  l[c] &&
                  (c === 'style' && !l[c].endsWith(';') && (l[c] += ';'),
                  (r.props[c] = `${l[c]} ${r.props[c]}`));
              }),
                (t[o].props = {
                  ...l,
                  ...r.props,
                });
              return;
            } else if (r._e === s._e) {
              (s._duped = s._duped || []), (r._d = `${s._d}:${s._duped.length + 1}`), s._duped.push(r);
              return;
            }
          }
          const i = Object.keys(r.props).length + (r.innerHTML ? 1 : 0) + (r.textContent ? 1 : 0);
          if (Oa.includes(r.tag) && i === 0) {
            delete t[o];
            return;
          }
          t[o] = r;
        });
        const n = [];
        Object.values(t).forEach((r) => {
          const o = r._duped;
          delete r._duped, n.push(r), o && n.push(...o);
        }),
          (e.tags = n);
      },
    },
  };
}
function Qn(e, t) {
  function n(s) {
    if (['s', 'pageTitle'].includes(s)) return t.pageTitle;
    let i;
    return (
      s.includes('.') ? (i = s.split('.').reduce((a, l) => (a && a[l]) || void 0, t)) : (i = t[s]),
      typeof i < 'u' ? i || '' : !1
    );
  }
  let r = e;
  try {
    r = decodeURI(e);
  } catch (s) {}
  return (
    (r.match(/%(\w+\.+\w+)|%(\w+)/g) || [])
      .sort()
      .reverse()
      .forEach((s) => {
        const i = n(s.slice(1));
        typeof i == 'string' && (e = e.replaceAll(new RegExp(`\\${s}(\\W|$)`, 'g'), `${i}$1`).trim());
      }),
    t.separator &&
      (e.endsWith(t.separator) && (e = e.slice(0, -t.separator.length).trim()),
      e.startsWith(t.separator) && (e = e.slice(t.separator.length).trim()),
      (e = e.replace(new RegExp(`\\${t.separator}\\s*\\${t.separator}`, 'g'), t.separator))),
    e
  );
}
function i0() {
  return {
    hooks: {
      'tags:resolve': (e) => {
        var s;
        const { tags: t } = e,
          n = (s = t.find((i) => i.tag === 'title')) == null ? void 0 : s.textContent,
          r = t.findIndex((i) => i.tag === 'templateParams'),
          o = r !== -1 ? t[r].props : {};
        o.pageTitle = o.pageTitle || n || '';
        for (const i of t)
          if (['titleTemplate', 'title'].includes(i.tag) && typeof i.textContent == 'string')
            i.textContent = Qn(i.textContent, o);
          else if (i.tag === 'meta' && typeof i.props.content == 'string')
            i.props.content = Qn(i.props.content, o);
          else if (i.tag === 'link' && typeof i.props.href == 'string') i.props.href = Qn(i.props.href, o);
          else if (
            i.tag === 'script' &&
            ['application/json', 'application/ld+json'].includes(i.props.type) &&
            typeof i.innerHTML == 'string'
          )
            try {
              i.innerHTML = JSON.stringify(JSON.parse(i.innerHTML), (a, l) =>
                typeof l == 'string' ? Qn(l, o) : l,
              );
            } catch (a) {}
        e.tags = t.filter((i) => i.tag !== 'templateParams');
      },
    },
  };
}
const l0 = typeof window < 'u';
let ka;
function a0(e) {
  return (ka = e);
}
function c0() {
  return ka;
}
async function u0(e, t) {
  const n = {
    tag: e,
    props: {},
  };
  return e === 'templateParams'
    ? ((n.props = t), n)
    : ['title', 'titleTemplate'].includes(e)
      ? ((n.textContent = t instanceof Promise ? await t : t), n)
      : typeof t == 'string'
        ? ['script', 'noscript', 'style'].includes(e)
          ? (e === 'script' && (/^(https?:)?\/\//.test(t) || t.startsWith('/'))
              ? (n.props.src = t)
              : (n.innerHTML = t),
            n)
          : !1
        : ((n.props = await d0(e, {
            ...t,
          })),
          n.props.children && (n.props.innerHTML = n.props.children),
          delete n.props.children,
          Object.keys(n.props)
            .filter((r) => Gf.includes(r))
            .forEach((r) => {
              (!['innerHTML', 'textContent'].includes(r) || Pa.includes(n.tag)) && (n[r] = n.props[r]),
                delete n.props[r];
            }),
          ['innerHTML', 'textContent'].forEach((r) => {
            if (
              n.tag === 'script' &&
              typeof n[r] == 'string' &&
              ['application/ld+json', 'application/json'].includes(n.props.type)
            )
              try {
                n[r] = JSON.parse(n[r]);
              } catch (o) {
                n[r] = '';
              }
            typeof n[r] == 'object' && (n[r] = JSON.stringify(n[r]));
          }),
          n.props.class && (n.props.class = f0(n.props.class)),
          n.props.content && Array.isArray(n.props.content)
            ? n.props.content.map((r) => ({
                ...n,
                props: {
                  ...n.props,
                  content: r,
                },
              }))
            : n);
}
function f0(e) {
  return (
    typeof e == 'object' && !Array.isArray(e) && (e = Object.keys(e).filter((t) => e[t])),
    (Array.isArray(e) ? e.join(' ') : e)
      .split(' ')
      .filter((t) => t.trim())
      .filter(Boolean)
      .join(' ')
  );
}
async function d0(e, t) {
  for (const n of Object.keys(t)) {
    const r = n.startsWith('data-');
    t[n] instanceof Promise && (t[n] = await t[n]),
      String(t[n]) === 'true'
        ? (t[n] = r ? 'true' : '')
        : String(t[n]) === 'false' && (r ? (t[n] = 'false') : delete t[n]);
  }
  return t;
}
const h0 = 10;
async function m0(e) {
  const t = [];
  return (
    Object.entries(e.resolvedInput)
      .filter(([n, r]) => typeof r < 'u' && Wf.includes(n))
      .forEach(([n, r]) => {
        const o = Uf(r);
        t.push(...o.map((s) => u0(n, s)).flat());
      }),
    (await Promise.all(t))
      .flat()
      .filter(Boolean)
      .map((n, r) => ((n._e = e._i), (n._p = (e._i << h0) + r), n))
  );
}
function p0() {
  return [s0(), Xf(), i0(), Qf(), n0(), r0(), e0()];
}
function _0(e = {}) {
  return [
    Yf({
      document: e == null ? void 0 : e.document,
      delayFn: e == null ? void 0 : e.domDelayFn,
    }),
  ];
}
function g0(e = {}) {
  const t = y0({
    ...e,
    plugins: [..._0(e), ...((e == null ? void 0 : e.plugins) || [])],
  });
  return (
    e.experimentalHashHydration && t.resolvedOptions.document && (t._hash = Jf(t.resolvedOptions.document)),
    a0(t),
    t
  );
}
function y0(e = {}) {
  let t = [],
    n = {},
    r = 0;
  const o = jf();
  e != null && e.hooks && o.addHooks(e.hooks),
    (e.plugins = [...p0(), ...((e == null ? void 0 : e.plugins) || [])]),
    e.plugins.forEach((a) => a.hooks && o.addHooks(a.hooks)),
    (e.document = e.document || (l0 ? document : void 0));
  const s = () => o.callHook('entries:updated', i),
    i = {
      resolvedOptions: e,
      headEntries() {
        return t;
      },
      get hooks() {
        return o;
      },
      use(a) {
        a.hooks && o.addHooks(a.hooks);
      },
      push(a, l) {
        const c = {
          _i: r++,
          input: a,
          _sde: {},
        };
        return (
          l != null && l.mode && (c._m = l == null ? void 0 : l.mode),
          l != null && l.transform && (c._t = l == null ? void 0 : l.transform),
          t.push(c),
          s(),
          {
            dispose() {
              t = t.filter((u) =>
                u._i !== c._i
                  ? !0
                  : ((n = {
                      ...n,
                      ...(u._sde || {}),
                    }),
                    (u._sde = {}),
                    s(),
                    !1),
              );
            },
            patch(u) {
              t = t.map((f) => (f._i === c._i && ((c.input = f.input = u), s()), f));
            },
          }
        );
      },
      async resolveTags() {
        const a = {
          tags: [],
          entries: [...t],
        };
        await o.callHook('entries:resolve', a);
        for (const l of a.entries) {
          const c = l._t || ((u) => u);
          if (((l.resolvedInput = c(l.resolvedInput || l.input)), l.resolvedInput))
            for (const u of await m0(l)) {
              const f = {
                tag: u,
                entry: l,
                resolvedOptions: i.resolvedOptions,
              };
              await o.callHook('tag:normalise', f), a.tags.push(f.tag);
            }
        }
        return await o.callHook('tags:resolve', a), a.tags;
      },
      _popSideEffectQueue() {
        const a = {
          ...n,
        };
        return (n = {}), a;
      },
      _elMap: {},
    };
  return i.hooks.callHook('init', i), i;
}
function v0(e) {
  return typeof e == 'function' ? e() : nt(e);
}
function zr(e, t = '') {
  if (e instanceof Promise) return e;
  const n = v0(e);
  return !e || !n
    ? n
    : Array.isArray(n)
      ? n.map((r) => zr(r, t))
      : typeof n == 'object'
        ? Object.fromEntries(
            Object.entries(n).map(([r, o]) =>
              r === 'titleTemplate' || r.startsWith('on') ? [r, nt(o)] : [r, zr(o, r)],
            ),
          )
        : n;
}
const b0 = es.startsWith('3'),
  z0 = typeof window < 'u',
  Ia = 'usehead';
function fs() {
  return (xt() && Ue(Ia)) || c0();
}
function w0(e) {
  return {
    install(n) {
      b0 &&
        ((n.config.globalProperties.$unhead = e), (n.config.globalProperties.$head = e), n.provide(Ia, e));
    },
  }.install;
}
function E0(e = {}) {
  const t = g0({
    ...e,
    domDelayFn: (n) => setTimeout(() => Wt(() => n()), 10),
    plugins: [M0(), ...((e == null ? void 0 : e.plugins) || [])],
  });
  return (t.install = w0(t)), t;
}
function M0() {
  return {
    hooks: {
      'entries:resolve': function (e) {
        for (const t of e.entries) t.resolvedInput = zr(t.input);
      },
    },
  };
}
function C0(e, t = {}) {
  const n = fs(),
    r = ce(!1),
    o = ce({});
  Pl(() => {
    o.value = r.value ? {} : zr(e);
  });
  const s = n.push(o.value, t);
  return (
    Re(o, (a) => {
      s.patch(a);
    }),
    xt() &&
      (Rl(() => {
        s.dispose();
      }),
      Yo(() => {
        r.value = !0;
      }),
      qo(() => {
        r.value = !1;
      })),
    s
  );
}
function A0(e, t = {}) {
  return fs().push(e, t);
}
function La(e, t = {}) {
  var r;
  const n = fs();
  if (n) {
    const o = z0 || !!((r = n.resolvedOptions) != null && r.document);
    return (t.mode === 'server' && o) || (t.mode === 'client' && !o) ? void 0 : o ? C0(e, t) : A0(e, t);
  }
}
function P0(e, t) {
  const n = E0(t || {}),
    r = {
      unhead: n,
      install(o) {
        es.startsWith('3') && ((o.config.globalProperties.$head = n), o.provide('usehead', n));
      },
      use(o) {
        n.use(o);
      },
      resolveTags() {
        return n.resolveTags();
      },
      headEntries() {
        return n.headEntries();
      },
      headTags() {
        return n.resolveTags();
      },
      push(o, s) {
        return n.push(o, s);
      },
      addEntry(o, s) {
        return n.push(o, s);
      },
      addHeadObjs(o, s) {
        return n.push(o, s);
      },
      addReactiveEntry(o, s) {
        const i = La(o, s);
        return typeof i < 'u' ? i.dispose : () => {};
      },
      removeHeadObjs() {},
      updateDOM(o, s) {
        s
          ? Ra(n, {
              document: o,
            })
          : Sa(n, {
              delayFn: (i) => setTimeout(() => i(), 50),
              document: o,
            });
      },
      internalHooks: n.hooks,
      hooks: {
        'before:dom': [],
        'resolved:tags': [],
        'resolved:entries': [],
      },
    };
  return (
    (n.addHeadObjs = r.addHeadObjs),
    (n.updateDOM = r.updateDOM),
    n.hooks.hook('dom:beforeRender', (o) => {
      for (const s of r.hooks['before:dom']) s() === !1 && (o.shouldRender = !1);
    }),
    e && r.addHeadObjs(e),
    r
  );
}
(function e(t, n, r) {
  function o(a, l) {
    if (!n[a]) {
      if (!t[a]) {
        var c = typeof require == 'function' && require;
        if (!l && c) return c(a, !0);
        if (s) return s(a, !0);
        var u = new Error("Cannot find module '" + a + "'");
        throw ((u.code = 'MODULE_NOT_FOUND'), u);
      }
      var f = (n[a] = {
        exports: {},
      });
      t[a][0].call(
        f.exports,
        function (d) {
          var p = t[a][1][d];
          return o(p || d);
        },
        f,
        f.exports,
        e,
        t,
        n,
        r,
      );
    }
    return n[a].exports;
  }
  for (var s = typeof require == 'function' && require, i = 0; i < r.length; i++) o(r[i]);
  return o;
})(
  {
    1: [
      function (e, t, n) {
        (function (r) {
          Object.defineProperty(n, '__esModule', {
            value: !0,
          }),
            (n.install = i);
          var o = r.AnalyserNode;
          function s() {
            if (!o.prototype.hasOwnProperty('getFloatTimeDomainData')) {
              var a = new Uint8Array(2048);
              o.prototype.getFloatTimeDomainData = function (l) {
                this.getByteTimeDomainData(a);
                for (var c = 0, u = l.length; c < u; c++) l[c] = (a[c] - 128) * 0.0078125;
              };
            }
          }
          function i() {
            s();
          }
        }).call(
          this,
          typeof global < 'u' ? global : typeof self < 'u' ? self : typeof window < 'u' ? window : {},
        );
      },
      {},
    ],
    2: [
      function (e, t, n) {
        (function (r) {
          Object.defineProperty(n, '__esModule', {
            value: !0,
          }),
            (n.install = a);
          var o = r.AudioBuffer;
          function s() {
            o.prototype.hasOwnProperty('copyFromChannel') ||
              (o.prototype.copyFromChannel = function (l, c, u) {
                var f = this.getChannelData(c | 0).subarray(u | 0);
                l.set(f.subarray(0, Math.min(f.length, l.length)));
              });
          }
          function i() {
            o.prototype.hasOwnProperty('copyToChannel') ||
              (o.prototype.copyToChannel = function (l, c, u) {
                var f = l.subarray(0, Math.min(l.length, this.length - (u | 0)));
                this.getChannelData(c | 0).set(f, u | 0);
              });
          }
          function a() {
            s(), i();
          }
        }).call(
          this,
          typeof global < 'u' ? global : typeof self < 'u' ? self : typeof window < 'u' ? window : {},
        );
      },
      {},
    ],
    3: [
      function (e, t, n) {
        (function (r) {
          Object.defineProperty(n, '__esModule', {
            value: !0,
          });
          var o = (function () {
              function k(T, I) {
                for (var A = 0; A < I.length; A++) {
                  var N = I[A];
                  (N.enumerable = N.enumerable || !1),
                    (N.configurable = !0),
                    'value' in N && (N.writable = !0),
                    Object.defineProperty(T, N.key, N);
                }
              }
              return function (T, I, A) {
                return I && k(T.prototype, I), A && k(T, A), T;
              };
            })(),
            s = function (T, I, A) {
              var N = !0;
              e: for (; N; ) {
                var B = T,
                  J = I,
                  ze = A;
                (ge = fe = ee = void 0), (N = !1), B === null && (B = Function.prototype);
                var ge = Object.getOwnPropertyDescriptor(B, J);
                if (ge === void 0) {
                  var fe = Object.getPrototypeOf(B);
                  if (fe === null) return;
                  (T = fe), (I = J), (A = ze), (N = !0);
                  continue e;
                } else {
                  if ('value' in ge) return ge.value;
                  var ee = ge.get;
                  return ee === void 0 ? void 0 : ee.call(ze);
                }
              }
            };
          n.install = O;
          function i(k, T) {
            if (!(k instanceof T)) throw new TypeError('Cannot call a class as a function');
          }
          function a(k, T) {
            if (typeof T != 'function' && T !== null)
              throw new TypeError('Super expression must either be null or a function, not ' + typeof T);
            (k.prototype = Object.create(T && T.prototype, {
              constructor: {
                value: k,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              T && (k.__proto__ = T);
          }
          var l = r.AudioContext,
            c = r.OfflineAudioContext,
            u = r.AudioNode,
            f = r.EventTarget || r.Object.constructor;
          function d() {}
          function p(k, T) {
            k.prototype = Object.create(T.prototype, {
              constructor: {
                value: k,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            });
          }
          function m() {
            if (r.AudioContext !== l) return;
            function k(A) {
              (this._ = {}),
                (this._.audioContext = A),
                (this._.destination = A.destination),
                (this._.state = ''),
                (this._.currentTime = 0),
                (this._.sampleRate = A.sampleRate),
                (this._.onstatechange = null);
            }
            p(k, f),
              Object.defineProperties(k.prototype, {
                destination: {
                  get: function () {
                    return this._.destination;
                  },
                },
                sampleRate: {
                  get: function () {
                    return this._.sampleRate;
                  },
                },
                currentTime: {
                  get: function () {
                    return this._.currentTime || this._.audioContext.currentTime;
                  },
                },
                listener: {
                  get: function () {
                    return this._.audioContext.listener;
                  },
                },
                state: {
                  get: function () {
                    return this._.state;
                  },
                },
                onstatechange: {
                  set: function (N) {
                    typeof N == 'function' && (this._.onstatechange = N);
                  },
                  get: function () {
                    return this._.onstatechange;
                  },
                },
              });
            var T = (function (A) {
              function N() {
                i(this, N),
                  s(Object.getPrototypeOf(N.prototype), 'constructor', this).call(this, new l()),
                  (this._.state = 'running'),
                  l.prototype.hasOwnProperty('suspend') ||
                    ((this._.destination = this._.audioContext.createGain()),
                    this._.destination.connect(this._.audioContext.destination),
                    (this._.destination.connect = function () {
                      this._.audioContext.destination.connect.apply(
                        this._.audioContext.destination,
                        arguments,
                      );
                    }),
                    (this._.destination.disconnect = function () {
                      this._.audioContext.destination.connect.apply(
                        this._.audioContext.destination,
                        arguments,
                      );
                    }),
                    (this._.destination.channelCountMode = 'explicit'));
              }
              return a(N, A), N;
            })(k);
            (T.prototype.suspend = function () {
              var A = this;
              if (this._.state === 'closed')
                return Promise.reject(new Error('cannot suspend a closed AudioContext'));
              function N() {
                (this._.state = 'suspended'), (this._.currentTime = this._.audioContext.currentTime);
              }
              var B = void 0;
              return (
                typeof this._.audioContext == 'function'
                  ? ((B = this._.audioContext.suspend()),
                    B.then(function () {
                      N.call(A);
                    }))
                  : (u.prototype.disconnect.call(this._.destination),
                    (B = Promise.resolve()),
                    B.then(function () {
                      N.call(A);
                      var J = new r.Event('statechange');
                      typeof A._.onstatechange == 'function' && A._.onstatechange(J), A.dispatchEvent(J);
                    })),
                B
              );
            }),
              (T.prototype.resume = function () {
                var A = this;
                if (this._.state === 'closed')
                  return Promise.reject(new Error('cannot resume a closed AudioContext'));
                function N() {
                  (this._.state = 'running'), (this._.currentTime = 0);
                }
                var B = void 0;
                return (
                  typeof this._.audioContext.resume == 'function'
                    ? ((B = this._.audioContext.resume()),
                      B.then(function () {
                        N.call(A);
                      }))
                    : (u.prototype.connect.call(this._.destination, this._.audioContext.destination),
                      (B = Promise.resolve()),
                      B.then(function () {
                        N.call(A);
                        var J = new r.Event('statechange');
                        typeof A._.onstatechange == 'function' && A._.onstatechange(J), A.dispatchEvent(J);
                      })),
                  B
                );
              }),
              (T.prototype.close = function () {
                var A = this;
                if (this._.state === 'closed')
                  return Promise.reject(
                    new Error('Cannot close a context that is being closed or has already been closed.'),
                  );
                function N() {
                  (this._.state = 'closed'), (this._.currentTime = 1 / 0), (this._.sampleRate = 0);
                }
                var B = void 0;
                return (
                  typeof this._.audioContext.close == 'function'
                    ? ((B = this._.audioContext.close()),
                      B.then(function () {
                        N.call(A);
                      }))
                    : (typeof this._.audioContext.suspend == 'function'
                        ? this._.audioContext.suspend()
                        : u.prototype.disconnect.call(this._.destination),
                      (B = Promise.resolve()),
                      B.then(function () {
                        N.call(A);
                        var J = new r.Event('statechange');
                        typeof A._.onstatechange == 'function' && A._.onstatechange(J), A.dispatchEvent(J);
                      })),
                  B
                );
              }),
              ['addEventListener', 'removeEventListener', 'dispatchEvent', 'createBuffer'].forEach(
                function (A) {
                  T.prototype[A] = function () {
                    return this._.audioContext[A].apply(this._.audioContext, arguments);
                  };
                },
              ),
              [
                'decodeAudioData',
                'createBufferSource',
                'createMediaElementSource',
                'createMediaStreamSource',
                'createMediaStreamDestination',
                'createAudioWorker',
                'createScriptProcessor',
                'createAnalyser',
                'createGain',
                'createDelay',
                'createBiquadFilter',
                'createWaveShaper',
                'createPanner',
                'createStereoPanner',
                'createConvolver',
                'createChannelSplitter',
                'createChannelMerger',
                'createDynamicsCompressor',
                'createOscillator',
                'createPeriodicWave',
              ].forEach(function (A) {
                T.prototype[A] = function () {
                  if (this._.state === 'closed')
                    throw new Error(
                      "Failed to execute '" + A + "' on 'AudioContext': AudioContext has been closed",
                    );
                  return this._.audioContext[A].apply(this._.audioContext, arguments);
                };
              });
            var I = (function (A) {
              function N(B, J, ze) {
                i(this, N),
                  s(Object.getPrototypeOf(N.prototype), 'constructor', this).call(this, new c(B, J, ze)),
                  (this._.state = 'suspended');
              }
              return (
                a(N, A),
                o(N, [
                  {
                    key: 'oncomplete',
                    set: function (J) {
                      this._.audioContext.oncomplete = J;
                    },
                    get: function () {
                      return this._.audioContext.oncomplete;
                    },
                  },
                ]),
                N
              );
            })(k);
            [
              'addEventListener',
              'removeEventListener',
              'dispatchEvent',
              'createBuffer',
              'decodeAudioData',
              'createBufferSource',
              'createMediaElementSource',
              'createMediaStreamSource',
              'createMediaStreamDestination',
              'createAudioWorker',
              'createScriptProcessor',
              'createAnalyser',
              'createGain',
              'createDelay',
              'createBiquadFilter',
              'createWaveShaper',
              'createPanner',
              'createStereoPanner',
              'createConvolver',
              'createChannelSplitter',
              'createChannelMerger',
              'createDynamicsCompressor',
              'createOscillator',
              'createPeriodicWave',
            ].forEach(function (A) {
              I.prototype[A] = function () {
                return this._.audioContext[A].apply(this._.audioContext, arguments);
              };
            }),
              (I.prototype.startRendering = function () {
                var A = this;
                if (this._.state !== 'suspended')
                  return Promise.reject(new Error('cannot call startRendering more than once'));
                this._.state = 'running';
                var N = this._.audioContext.startRendering();
                return (
                  N.then(function () {
                    A._.state = 'closed';
                    var B = new r.Event('statechange');
                    typeof A._.onstatechange == 'function' && A._.onstatechange(B), A.dispatchEvent(B);
                  }),
                  N
                );
              }),
              (I.prototype.suspend = function () {
                return typeof this._.audioContext.suspend == 'function'
                  ? this._.audioContext.suspend()
                  : Promise.reject(new Error('cannot suspend an OfflineAudioContext'));
              }),
              (I.prototype.resume = function () {
                return typeof this._.audioContext.resume == 'function'
                  ? this._.audioContext.resume()
                  : Promise.reject(new Error('cannot resume an OfflineAudioContext'));
              }),
              (I.prototype.close = function () {
                return typeof this._.audioContext.close == 'function'
                  ? this._.audioContext.close()
                  : Promise.reject(new Error('cannot close an OfflineAudioContext'));
              }),
              (r.AudioContext = T),
              (r.OfflineAudioContext = I);
          }
          function g() {
            if (!l.prototype.hasOwnProperty('createStereoPanner')) {
              var k = e('stereo-panner-node');
              l.prototype.createStereoPanner = function () {
                return new k(this);
              };
            }
          }
          function v() {
            var k = new c(1, 1, 44100),
              T = !1;
            try {
              var I = new Uint32Array([
                1179011410, 48, 1163280727, 544501094, 16, 131073, 44100, 176400, 1048580, 1635017060, 8, 0,
                0, 0, 0,
              ]).buffer;
              T = !!k.decodeAudioData(I, d);
            } catch (N) {}
            if (!T) {
              var A = l.prototype.decodeAudioData;
              (l.prototype.decodeAudioData = function (N, B, J) {
                var ze = this,
                  ge = new Promise(function (fe, ee) {
                    return A.call(ze, N, fe, ee);
                  });
                return ge.then(B, J), ge;
              }),
                (l.prototype.decodeAudioData.original = A);
            }
          }
          function y() {
            l.prototype.hasOwnProperty('close') || m();
          }
          function z() {
            l.prototype.hasOwnProperty('resume') || m();
          }
          function C() {
            l.prototype.hasOwnProperty('suspend') || m();
          }
          function S() {
            var k = new c(1, 1, 44100),
              T = !1;
            try {
              T = !!k.startRendering();
            } catch (A) {}
            if (!T) {
              var I = c.prototype.startRendering;
              (c.prototype.startRendering = function () {
                var A = this;
                return new Promise(function (N) {
                  var B = A.oncomplete;
                  (A.oncomplete = function (J) {
                    N(J.renderedBuffer), typeof B == 'function' && B.call(A, J);
                  }),
                    I.call(A);
                });
              }),
                (c.prototype.startRendering.original = I);
            }
          }
          function O(k) {
            g(), v(), S(), k !== 0 && (y(), z(), C());
          }
        }).call(
          this,
          typeof global < 'u' ? global : typeof self < 'u' ? self : typeof window < 'u' ? window : {},
        );
      },
      {
        'stereo-panner-node': 9,
      },
    ],
    4: [
      function (e, t, n) {
        (function (r) {
          Object.defineProperty(n, '__esModule', {
            value: !0,
          }),
            (n.install = p);
          var o = r.OfflineAudioContext,
            s = r.AudioNode,
            i = s.prototype.connect,
            a = s.prototype.disconnect;
          function l(m, g) {
            for (var v = 0, y = m.length; v < y; v++) if (m[v] !== g[v]) return !1;
            return !0;
          }
          function c(m) {
            for (var g = 0, v = m.numberOfOutputs; g < v; g++) a.call(m, g);
            m._shim$connections = [];
          }
          function u(m, g) {
            a.call(m, g),
              (m._shim$connections = m._shim$connections.filter(function (v) {
                return v[1] !== g;
              }));
          }
          function f(m, g) {
            var v = [],
              y = !1;
            if (
              (m._shim$connections.forEach(function (z) {
                (y = y || g[0] === z[0]), l(g, z) || v.push(z);
              }),
              !y)
            )
              throw new Error(
                "Failed to execute 'disconnect' on 'AudioNode': the given destination is not connected.",
              );
            c(m),
              v.forEach(function (z) {
                i.call(m, z[0], z[1], z[2]);
              }),
              (m._shim$connections = v);
          }
          function d() {
            var m = new o(1, 1, 44100),
              g = !1;
            try {
              m.createGain().disconnect(m.destination);
            } catch (v) {
              g = !0;
            }
            g ||
              ((s.prototype.disconnect = function () {
                this._shim$connections = this._shim$connections || [];
                for (var v = arguments.length, y = Array(v), z = 0; z < v; z++) y[z] = arguments[z];
                y.length === 0
                  ? c(this)
                  : y.length === 1 && typeof y[0] == 'number'
                    ? u(this, y[0])
                    : f(this, y);
              }),
              (s.prototype.disconnect.original = a),
              (s.prototype.connect = function (v) {
                var y = arguments[1] === void 0 ? 0 : arguments[1],
                  z = arguments[2] === void 0 ? 0 : arguments[2],
                  C = void 0;
                (this._shim$connections = this._shim$connections || []),
                  v instanceof s ? (i.call(this, v, y, z), (C = z)) : (i.call(this, v, y), (C = 0)),
                  this._shim$connections.push([v, y, C]);
              }),
              (s.prototype.connect.original = i));
          }
          function p(m) {
            m !== 0 && d();
          }
        }).call(
          this,
          typeof global < 'u' ? global : typeof self < 'u' ? self : typeof window < 'u' ? window : {},
        );
      },
      {},
    ],
    5: [
      function (e, t, n) {
        (function (r) {
          Object.defineProperty(n, '__esModule', {
            value: !0,
          }),
            (n.default = o);
          function o() {
            var s = arguments[0] === void 0 ? 1 / 0 : arguments[0];
            !r.hasOwnProperty('AudioContext') &&
              r.hasOwnProperty('webkitAudioContext') &&
              (r.AudioContext = r.webkitAudioContext),
              !r.hasOwnProperty('OfflineAudioContext') &&
                r.hasOwnProperty('webkitOfflineAudioContext') &&
                (r.OfflineAudioContext = r.webkitOfflineAudioContext),
              r.AudioContext &&
                (e('./AnalyserNode').install(s),
                e('./AudioBuffer').install(s),
                e('./AudioNode').install(s),
                e('./AudioContext').install(s));
          }
          t.exports = n.default;
        }).call(
          this,
          typeof global < 'u' ? global : typeof self < 'u' ? self : typeof window < 'u' ? window : {},
        );
      },
      {
        './AnalyserNode': 1,
        './AudioBuffer': 2,
        './AudioContext': 3,
        './AudioNode': 4,
      },
    ],
    6: [
      function (e, t, n) {
        t.exports = e('./lib/install')(0);
      },
      {
        './lib/install': 5,
      },
    ],
    7: [
      function (e, t, n) {
        var r = 4096,
          o = new Float32Array(r),
          s = new Float32Array(r);
        (function () {
          var i;
          for (i = 0; i < r; i++)
            (o[i] = Math.cos((i / r) * Math.PI * 0.5)), (s[i] = Math.sin((i / r) * Math.PI * 0.5));
        })(),
          (t.exports = {
            L: o,
            R: s,
          });
      },
      {},
    ],
    8: [
      function (e, t, n) {
        (function (r) {
          var o = e('./curve');
          function s(i) {
            (this.audioContext = i),
              (this.inlet = i.createChannelSplitter(2)),
              (this._pan = i.createGain()),
              (this.pan = this._pan.gain),
              (this._wsL = i.createWaveShaper()),
              (this._wsR = i.createWaveShaper()),
              (this._L = i.createGain()),
              (this._R = i.createGain()),
              (this.outlet = i.createChannelMerger(2)),
              (this.inlet.channelCount = 2),
              (this.inlet.channelCountMode = 'explicit'),
              (this._pan.gain.value = 0),
              (this._wsL.curve = o.L),
              (this._wsR.curve = o.R),
              (this._L.gain.value = 0),
              (this._R.gain.value = 0),
              this.inlet.connect(this._L, 0),
              this.inlet.connect(this._R, 1),
              this._L.connect(this.outlet, 0, 0),
              this._R.connect(this.outlet, 0, 1),
              this._pan.connect(this._wsL),
              this._pan.connect(this._wsR),
              this._wsL.connect(this._L.gain),
              this._wsR.connect(this._R.gain),
              (this._isConnected = !1),
              (this._dc1buffer = null),
              (this._dc1 = null);
          }
          (s.prototype.connect = function (i) {
            var a = this.audioContext;
            this._isConnected ||
              ((this._isConnected = !0),
              (this._dc1buffer = a.createBuffer(1, 2, a.sampleRate)),
              this._dc1buffer.getChannelData(0).set([1, 1]),
              (this._dc1 = a.createBufferSource()),
              (this._dc1.buffer = this._dc1buffer),
              (this._dc1.loop = !0),
              this._dc1.start(a.currentTime),
              this._dc1.connect(this._pan)),
              r.AudioNode.prototype.connect.call(this.outlet, i);
          }),
            (s.prototype.disconnect = function () {
              var i = this.audioContext;
              this._isConnected &&
                ((this._isConnected = !1),
                this._dc1.stop(i.currentTime),
                this._dc1.disconnect(),
                (this._dc1 = null),
                (this._dc1buffer = null)),
                r.AudioNode.prototype.disconnect.call(this.outlet);
            }),
            (t.exports = s);
        }).call(
          this,
          typeof global < 'u' ? global : typeof self < 'u' ? self : typeof window < 'u' ? window : {},
        );
      },
      {
        './curve': 7,
      },
    ],
    9: [
      function (e, t, n) {
        (function (r) {
          var o = e('./stereo-panner-impl'),
            s = r.AudioContext || r.webkitAudioContext;
          function i(a) {
            var l = new o(a);
            return (
              Object.defineProperties(l.inlet, {
                pan: {
                  value: l.pan,
                  enumerable: !0,
                },
                connect: {
                  value: function (c) {
                    return l.connect(c);
                  },
                },
                disconnect: {
                  value: function () {
                    return l.disconnect();
                  },
                },
              }),
              l.inlet
            );
          }
          (i.polyfill = function () {
            !s ||
              s.prototype.hasOwnProperty('createStereoPanner') ||
              (s.prototype.createStereoPanner = function () {
                return new i(this);
              });
          }),
            (t.exports = i);
        }).call(
          this,
          typeof global < 'u' ? global : typeof self < 'u' ? self : typeof window < 'u' ? window : {},
        );
      },
      {
        './stereo-panner-impl': 8,
      },
    ],
  },
  {},
  [6],
);
(function () {
  var e,
    t = [];
  function n(s) {
    var i = this,
      a = {},
      l = -1;
    this.parameters.forEach(function (f, d) {
      var p = t[++l] || (t[l] = new Float32Array(i.bufferSize));
      p.fill(f.value), (a[d] = p);
    }),
      this.processor.realm.exec(
        'self.sampleRate=sampleRate=' +
          this.context.sampleRate +
          ';self.currentTime=currentTime=' +
          this.context.currentTime,
      );
    var c = r(s.inputBuffer),
      u = r(s.outputBuffer);
    this.instance.process([c], [u], a);
  }
  function r(s) {
    for (var i = [], a = 0; a < s.numberOfChannels; a++) i[a] = s.getChannelData(a);
    return i;
  }
  function o(s) {
    return s.$$processors || (s.$$processors = {});
  }
  typeof AudioWorkletNode != 'function' &&
    ((self.AudioWorkletNode = function (s, i, a) {
      var l = o(s)[i],
        c = s.createScriptProcessor(void 0, 2, a && a.outputChannelCount ? a.outputChannelCount[0] : 2);
      if (((c.parameters = new Map()), l.properties))
        for (var u = 0; u < l.properties.length; u++) {
          var f = l.properties[u],
            d = s.createGain().gain;
          (d.value = f.defaultValue), c.parameters.set(f.name, d);
        }
      var p = new MessageChannel();
      e = p.port2;
      var m = new l.Processor(a || {});
      return (e = null), (c.port = p.port1), (c.processor = l), (c.instance = m), (c.onaudioprocess = n), c;
    }),
    Object.defineProperty((self.AudioContext || self.webkitAudioContext).prototype, 'audioWorklet', {
      get: function () {
        return this.$$audioWorklet || (this.$$audioWorklet = new self.AudioWorklet(this));
      },
    }),
    (self.AudioWorklet = (function () {
      function s(i) {
        this.$$context = i;
      }
      return (
        (s.prototype.addModule = function (i, a) {
          var l = this;
          return fetch(i)
            .then(function (c) {
              if (!c.ok) throw Error(c.status);
              return c.text();
            })
            .then(function (c) {
              var u = {
                sampleRate: 0,
                currentTime: 0,
                AudioWorkletProcessor: function () {
                  this.port = e;
                },
                registerProcessor: function (d, p) {
                  o(l.$$context)[d] = {
                    realm: f,
                    context: u,
                    Processor: p,
                    properties: p.parameterDescriptors || [],
                  };
                },
              };
              u.self = u;
              var f = new (function (d, p) {
                var m = document.createElement('iframe');
                (m.style.cssText = 'position:absolute;left:0;top:-999px;width:1px;height:1px;'),
                  p.appendChild(m);
                var g = m.contentWindow,
                  v = g.document,
                  y = 'var window,$hook';
                for (var z in g) z in d || z === 'eval' || ((y += ','), (y += z));
                for (var C in d) (y += ','), (y += C), (y += '=self.'), (y += C);
                var S = v.createElement('script');
                S.appendChild(
                  v.createTextNode(
                    `function $hook(self,console) {"use strict";
      ` +
                      y +
                      ';return function() {return eval(arguments[0])}}',
                  ),
                ),
                  v.body.appendChild(S),
                  (this.exec = g.$hook(d, console));
              })(u, document.documentElement);
              return f.exec(((a && a.transpile) || String)(c)), null;
            });
        }),
        s
      );
    })()));
})();
const O0 = Go({
    name: 'SvgIcon',
    props: {
      prefix: {
        type: String,
        default: 'icon',
      },
      name: {
        type: String,
        required: !0,
      },
      size: {
        type: String,
        default: '1em',
      },
      width: {
        type: String,
        default: null,
      },
      height: {
        type: String,
        default: null,
      },
      color: {
        type: String,
        default: 'currentColor',
      },
      stroke: {
        type: String,
        default: 'currentColor',
      },
    },
    setup(e) {
      const t = ie(() => `#${e.prefix}-${e.name}`),
        n = ie(() => e.width || e.size),
        r = ie(() => e.height || e.size);
      return {
        symbolId: t,
        w: n,
        h: r,
      };
    },
  }),
  T0 = ['width', 'height', 'fill', 'stroke'],
  x0 = ['xlink:href'];
function R0(e, t, n, r, o, s) {
  return (
    dt(),
    Zt(
      'svg',
      {
        'aria-hidden': 'true',
        width: e.w,
        height: e.h,
        fill: e.color,
        stroke: e.stroke,
      },
      [
        at(
          'use',
          {
            'xlink:href': e.symbolId,
          },
          null,
          8,
          x0,
        ),
      ],
      8,
      T0,
    )
  );
}
const Ha = ra(O0, [['render', R0]]),
  S0 = {
    __name: 'ButtonSvg',
    props: {
      name: {
        type: String,
        default: '',
      },
      size: {
        type: String,
        default: '1em',
      },
      color: {
        type: String,
        default: 'currentColor',
      },
    },
    setup(e) {
      return (t, n) => {
        const r = Ha;
        return (
          dt(),
          Zt('button', null, [
            de(
              r,
              {
                name: e.name,
                size: e.size,
                color: e.color,
                stroke: '',
              },
              null,
              8,
              ['name', 'size', 'color'],
            ),
          ])
        );
      };
    },
  };
function jt(e) {
  return sl() ? (r1(e), !0) : !1;
}
function on() {
  const e = new Set(),
    t = (o) => {
      e.delete(o);
    };
  return {
    on: (o) => {
      e.add(o);
      const s = () => t(o);
      return (
        jt(s),
        {
          off: s,
        }
      );
    },
    off: t,
    trigger: (o) => Promise.all(Array.from(e).map((s) => s(o))),
  };
}
function k0(e) {
  let t = !1,
    n;
  const r = ol(!0);
  return (...o) => (t || ((n = r.run(() => e(...o))), (t = !0)), n);
}
function Pe(e) {
  return typeof e == 'function' ? e() : nt(e);
}
const fn = typeof window < 'u',
  I0 = (e) => e != null,
  At = () => {},
  n4 = L0();
function L0() {
  var e;
  return (
    fn &&
    ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) &&
    /iP(ad|hone|od)/.test(window.navigator.userAgent)
  );
}
function H0(e, t) {
  function n(...r) {
    return new Promise((o, s) => {
      Promise.resolve(
        e(() => t.apply(this, r), {
          fn: t,
          thisArg: this,
          args: r,
        }),
      )
        .then(o)
        .catch(s);
    });
  }
  return n;
}
const Da = (e) => e();
function D0(e = Da) {
  const t = ce(!0);
  function n() {
    t.value = !1;
  }
  function r() {
    t.value = !0;
  }
  const o = (...s) => {
    t.value && e(...s);
  };
  return {
    isActive: Vn(t),
    pause: n,
    resume: r,
    eventFilter: o,
  };
}
const r4 = {
  mounted: 'mounted',
  updated: 'updated',
  unmounted: 'unmounted',
};
function Vi(e, t = !1, n = 'Timeout') {
  return new Promise((r, o) => {
    setTimeout(t ? () => o(n) : r, e);
  });
}
function N0(e, ...t) {
  return t.some((n) => n in e);
}
function eo(...e) {
  if (e.length !== 1) return bl(...e);
  const t = e[0];
  return typeof t == 'function'
    ? Vn(
        L1(() => ({
          get: t,
          set: At,
        })),
      )
    : ce(t);
}
function F0(e, t = !0) {
  xt() ? Bn(e) : t ? e() : Wt(e);
}
function $0(e) {
  xt() && mn(e);
}
function Oo(e, t = !1) {
  function n(f, { flush: d = 'sync', deep: p = !1, timeout: m, throwOnTimeout: g } = {}) {
    let v = null;
    const z = [
      new Promise((C) => {
        v = Re(
          e,
          (S) => {
            f(S) !== t && (v == null || v(), C(S));
          },
          {
            flush: d,
            deep: p,
            immediate: !0,
          },
        );
      }),
    ];
    return (
      m != null &&
        z.push(
          Vi(m, g)
            .then(() => Pe(e))
            .finally(() => (v == null ? void 0 : v())),
        ),
      Promise.race(z)
    );
  }
  function r(f, d) {
    if (!Oe(f)) return n((S) => S === f, d);
    const { flush: p = 'sync', deep: m = !1, timeout: g, throwOnTimeout: v } = d != null ? d : {};
    let y = null;
    const C = [
      new Promise((S) => {
        y = Re(
          [e, f],
          ([O, k]) => {
            t !== (O === k) && (y == null || y(), S(O));
          },
          {
            flush: p,
            deep: m,
            immediate: !0,
          },
        );
      }),
    ];
    return (
      g != null &&
        C.push(
          Vi(g, v)
            .then(() => Pe(e))
            .finally(() => (y == null || y(), Pe(e))),
        ),
      Promise.race(C)
    );
  }
  function o(f) {
    return n((d) => !!d, f);
  }
  function s(f) {
    return r(null, f);
  }
  function i(f) {
    return r(void 0, f);
  }
  function a(f) {
    return n(Number.isNaN, f);
  }
  function l(f, d) {
    return n((p) => {
      const m = Array.from(p);
      return m.includes(f) || m.includes(Pe(f));
    }, d);
  }
  function c(f) {
    return u(1, f);
  }
  function u(f = 1, d) {
    let p = -1;
    return n(() => ((p += 1), p >= f), d);
  }
  return Array.isArray(Pe(e))
    ? {
        toMatch: n,
        toContains: l,
        changed: c,
        changedTimes: u,
        get not() {
          return Oo(e, !t);
        },
      }
    : {
        toMatch: n,
        toBe: r,
        toBeTruthy: o,
        toBeNull: s,
        toBeNaN: a,
        toBeUndefined: i,
        changed: c,
        changedTimes: u,
        get not() {
          return Oo(e, !t);
        },
      };
}
function V0(e) {
  return Oo(e);
}
function o4(e, t = 1e3, n = {}) {
  const { immediate: r = !0, immediateCallback: o = !1 } = n;
  let s = null;
  const i = ce(!1);
  function a() {
    s && (clearInterval(s), (s = null));
  }
  function l() {
    (i.value = !1), a();
  }
  function c() {
    const u = Pe(t);
    u <= 0 || ((i.value = !0), o && e(), a(), (s = setInterval(e, u)));
  }
  if ((r && fn && c(), Oe(t) || typeof t == 'function')) {
    const u = Re(t, () => {
      i.value && fn && c();
    });
    jt(u);
  }
  return (
    jt(l),
    {
      isActive: i,
      pause: l,
      resume: c,
    }
  );
}
function B0(e, t, n = {}) {
  const { immediate: r = !0 } = n,
    o = ce(!1);
  let s = null;
  function i() {
    s && (clearTimeout(s), (s = null));
  }
  function a() {
    (o.value = !1), i();
  }
  function l(...c) {
    i(),
      (o.value = !0),
      (s = setTimeout(() => {
        (o.value = !1), (s = null), e(...c);
      }, Pe(t)));
  }
  return (
    r && ((o.value = !0), fn && l()),
    jt(a),
    {
      isPending: Vn(o),
      start: l,
      stop: a,
    }
  );
}
var Bi = Object.getOwnPropertySymbols,
  j0 = Object.prototype.hasOwnProperty,
  U0 = Object.prototype.propertyIsEnumerable,
  W0 = (e, t) => {
    var n = {};
    for (var r in e) j0.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && Bi) for (var r of Bi(e)) t.indexOf(r) < 0 && U0.call(e, r) && (n[r] = e[r]);
    return n;
  };
function K0(e, t, n = {}) {
  const r = n,
    { eventFilter: o = Da } = r,
    s = W0(r, ['eventFilter']);
  return Re(e, H0(o, t), s);
}
var G0 = Object.defineProperty,
  q0 = Object.defineProperties,
  Y0 = Object.getOwnPropertyDescriptors,
  wr = Object.getOwnPropertySymbols,
  Na = Object.prototype.hasOwnProperty,
  Fa = Object.prototype.propertyIsEnumerable,
  ji = (e, t, n) =>
    t in e
      ? G0(e, t, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: n,
        })
      : (e[t] = n),
  J0 = (e, t) => {
    for (var n in t || (t = {})) Na.call(t, n) && ji(e, n, t[n]);
    if (wr) for (var n of wr(t)) Fa.call(t, n) && ji(e, n, t[n]);
    return e;
  },
  Z0 = (e, t) => q0(e, Y0(t)),
  X0 = (e, t) => {
    var n = {};
    for (var r in e) Na.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && wr) for (var r of wr(e)) t.indexOf(r) < 0 && Fa.call(e, r) && (n[r] = e[r]);
    return n;
  };
function Q0(e, t, n = {}) {
  const r = n,
    { eventFilter: o } = r,
    s = X0(r, ['eventFilter']),
    { eventFilter: i, pause: a, resume: l, isActive: c } = D0(o);
  return {
    stop: K0(
      e,
      t,
      Z0(J0({}, s), {
        eventFilter: i,
      }),
    ),
    pause: a,
    resume: l,
    isActive: c,
  };
}
function s4(e, t, n) {
  return Re(
    e,
    (r, o, s) => {
      r && t(r, o, s);
    },
    n,
  );
}
function Bt(e) {
  var t;
  const n = Pe(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Ye = fn ? window : void 0,
  e3 = fn ? window.document : void 0;
function be(...e) {
  let t, n, r, o;
  if ((typeof e[0] == 'string' || Array.isArray(e[0]) ? (([n, r, o] = e), (t = Ye)) : ([t, n, r, o] = e), !t))
    return At;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const s = [],
    i = () => {
      s.forEach((u) => u()), (s.length = 0);
    },
    a = (u, f, d, p) => (u.addEventListener(f, d, p), () => u.removeEventListener(f, d, p)),
    l = Re(
      () => [Bt(t), Pe(o)],
      ([u, f]) => {
        i(), u && s.push(...n.flatMap((d) => r.map((p) => a(u, d, p, f))));
      },
      {
        immediate: !0,
        flush: 'post',
      },
    ),
    c = () => {
      l(), i();
    };
  return jt(c), c;
}
function t3() {
  const e = ce(!1);
  return (
    xt() &&
      Bn(() => {
        e.value = !0;
      }),
    e
  );
}
function ds(e) {
  const t = t3();
  return ie(() => (t.value, !!e()));
}
const er =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
        ? window
        : typeof global < 'u'
          ? global
          : typeof self < 'u'
            ? self
            : {},
  tr = '__vueuse_ssr_handlers__',
  n3 = r3();
function r3() {
  return tr in er || (er[tr] = er[tr] || {}), er[tr];
}
function o3(e, t) {
  return n3[e] || t;
}
function s3(e) {
  return e == null
    ? 'any'
    : e instanceof Set
      ? 'set'
      : e instanceof Map
        ? 'map'
        : e instanceof Date
          ? 'date'
          : typeof e == 'boolean'
            ? 'boolean'
            : typeof e == 'string'
              ? 'string'
              : typeof e == 'object'
                ? 'object'
                : Number.isNaN(e)
                  ? 'any'
                  : 'number';
}
var i3 = Object.defineProperty,
  Ui = Object.getOwnPropertySymbols,
  l3 = Object.prototype.hasOwnProperty,
  a3 = Object.prototype.propertyIsEnumerable,
  Wi = (e, t, n) =>
    t in e
      ? i3(e, t, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: n,
        })
      : (e[t] = n),
  Ki = (e, t) => {
    for (var n in t || (t = {})) l3.call(t, n) && Wi(e, n, t[n]);
    if (Ui) for (var n of Ui(t)) a3.call(t, n) && Wi(e, n, t[n]);
    return e;
  };
const c3 = {
    boolean: {
      read: (e) => e === 'true',
      write: (e) => String(e),
    },
    object: {
      read: (e) => JSON.parse(e),
      write: (e) => JSON.stringify(e),
    },
    number: {
      read: (e) => Number.parseFloat(e),
      write: (e) => String(e),
    },
    any: {
      read: (e) => e,
      write: (e) => String(e),
    },
    string: {
      read: (e) => e,
      write: (e) => String(e),
    },
    map: {
      read: (e) => new Map(JSON.parse(e)),
      write: (e) => JSON.stringify(Array.from(e.entries())),
    },
    set: {
      read: (e) => new Set(JSON.parse(e)),
      write: (e) => JSON.stringify(Array.from(e)),
    },
    date: {
      read: (e) => new Date(e),
      write: (e) => e.toISOString(),
    },
  },
  Gi = 'vueuse-storage';
function u3(e, t, n, r = {}) {
  var o;
  const {
      flush: s = 'pre',
      deep: i = !0,
      listenToStorageChanges: a = !0,
      writeDefaults: l = !0,
      mergeDefaults: c = !1,
      shallow: u,
      window: f = Ye,
      eventFilter: d,
      onError: p = (I) => {
        console.error(I);
      },
    } = r,
    m = (u ? wn : ce)(t);
  if (!n)
    try {
      n = o3('getDefaultStorage', () => {
        var I;
        return (I = Ye) == null ? void 0 : I.localStorage;
      })();
    } catch (I) {
      p(I);
    }
  if (!n) return m;
  const g = Pe(t),
    v = s3(g),
    y = (o = r.serializer) != null ? o : c3[v],
    { pause: z, resume: C } = Q0(m, () => S(m.value), {
      flush: s,
      deep: i,
      eventFilter: d,
    });
  return f && a && (be(f, 'storage', T), be(f, Gi, k)), T(), m;
  function S(I) {
    try {
      if (I == null) n.removeItem(e);
      else {
        const A = y.write(I),
          N = n.getItem(e);
        N !== A &&
          (n.setItem(e, A),
          f &&
            f.dispatchEvent(
              new CustomEvent(Gi, {
                detail: {
                  key: e,
                  oldValue: N,
                  newValue: A,
                  storageArea: n,
                },
              }),
            ));
      }
    } catch (A) {
      p(A);
    }
  }
  function O(I) {
    const A = I ? I.newValue : n.getItem(e);
    if (A == null) return l && g !== null && n.setItem(e, y.write(g)), g;
    if (!I && c) {
      const N = y.read(A);
      return typeof c == 'function' ? c(N, g) : v === 'object' && !Array.isArray(N) ? Ki(Ki({}, g), N) : N;
    } else return typeof A != 'string' ? A : y.read(A);
  }
  function k(I) {
    T(I.detail);
  }
  function T(I) {
    if (!(I && I.storageArea !== n)) {
      if (I && I.key == null) {
        m.value = g;
        return;
      }
      if (!(I && I.key !== e)) {
        z();
        try {
          m.value = O(I);
        } catch (A) {
          p(A);
        } finally {
          I ? Wt(C) : C();
        }
      }
    }
  }
}
function i4(e = ce(!1)) {
  const t = on(),
    n = on(),
    r = on();
  let o = At;
  const s = (l) => (
      r.trigger(l),
      (e.value = !0),
      new Promise((c) => {
        o = c;
      })
    ),
    i = (l) => {
      (e.value = !1),
        t.trigger(l),
        o({
          data: l,
          isCanceled: !1,
        });
    },
    a = (l) => {
      (e.value = !1),
        n.trigger(l),
        o({
          data: l,
          isCanceled: !0,
        });
    };
  return {
    isRevealed: ie(() => e.value),
    reveal: s,
    confirm: i,
    cancel: a,
    onReveal: r.on,
    onConfirm: t.on,
    onCancel: n.on,
  };
}
var qi = Object.getOwnPropertySymbols,
  f3 = Object.prototype.hasOwnProperty,
  d3 = Object.prototype.propertyIsEnumerable,
  h3 = (e, t) => {
    var n = {};
    for (var r in e) f3.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && qi) for (var r of qi(e)) t.indexOf(r) < 0 && d3.call(e, r) && (n[r] = e[r]);
    return n;
  };
function l4(e, t, n = {}) {
  const r = n,
    { window: o = Ye } = r,
    s = h3(r, ['window']);
  let i;
  const a = ds(() => o && 'ResizeObserver' in o),
    l = () => {
      i && (i.disconnect(), (i = void 0));
    },
    c = ie(() => (Array.isArray(e) ? e.map((d) => Bt(d)) : [Bt(e)])),
    u = Re(
      c,
      (d) => {
        if ((l(), a.value && o)) {
          i = new ResizeObserver(t);
          for (const p of d) p && i.observe(p, s);
        }
      },
      {
        immediate: !0,
        flush: 'post',
        deep: !0,
      },
    ),
    f = () => {
      l(), u();
    };
  return (
    jt(f),
    {
      isSupported: a,
      stop: f,
    }
  );
}
function a4(e, t = {}) {
  const { delayEnter: n = 0, delayLeave: r = 0, window: o = Ye } = t,
    s = ce(!1);
  let i;
  const a = (l) => {
    const c = l ? n : r;
    i && (clearTimeout(i), (i = void 0)), c ? (i = setTimeout(() => (s.value = l), c)) : (s.value = l);
  };
  return (
    o &&
      (be(e, 'mouseenter', () => a(!0), {
        passive: !0,
      }),
      be(e, 'mouseleave', () => a(!1), {
        passive: !0,
      })),
    s
  );
}
function m3(e, t, n = {}) {
  const { root: r, rootMargin: o = '0px', threshold: s = 0.1, window: i = Ye, immediate: a = !0 } = n,
    l = ds(() => i && 'IntersectionObserver' in i),
    c = ie(() => {
      const m = Pe(e);
      return (Array.isArray(m) ? m : [m]).map(Bt).filter(I0);
    });
  let u = At;
  const f = ce(a),
    d = l.value
      ? Re(
          () => [c.value, Bt(r), f.value],
          ([m, g]) => {
            if ((u(), !f.value || !m.length)) return;
            const v = new IntersectionObserver(t, {
              root: Bt(g),
              rootMargin: o,
              threshold: s,
            });
            m.forEach((y) => y && v.observe(y)),
              (u = () => {
                v.disconnect(), (u = At);
              });
          },
          {
            immediate: a,
            flush: 'post',
          },
        )
      : At,
    p = () => {
      u(), d(), (f.value = !1);
    };
  return (
    jt(p),
    {
      isSupported: l,
      isActive: f,
      pause() {
        u(), (f.value = !1);
      },
      resume() {
        f.value = !0;
      },
      stop: p,
    }
  );
}
function c4(e, { window: t = Ye, scrollTarget: n } = {}) {
  const r = ce(!1);
  return (
    m3(
      e,
      ([{ isIntersecting: o }]) => {
        r.value = o;
      },
      {
        root: n,
        window: t,
      },
    ),
    r
  );
}
var p3 = Object.defineProperty,
  _3 = Object.defineProperties,
  g3 = Object.getOwnPropertyDescriptors,
  Yi = Object.getOwnPropertySymbols,
  y3 = Object.prototype.hasOwnProperty,
  v3 = Object.prototype.propertyIsEnumerable,
  Ji = (e, t, n) =>
    t in e
      ? p3(e, t, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: n,
        })
      : (e[t] = n),
  ye = (e, t) => {
    for (var n in t || (t = {})) y3.call(t, n) && Ji(e, n, t[n]);
    if (Yi) for (var n of Yi(t)) v3.call(t, n) && Ji(e, n, t[n]);
    return e;
  },
  Et = (e, t) => _3(e, g3(t));
const b3 = {
  json: 'application/json',
  text: 'text/plain',
};
function Er(e) {
  return (
    e &&
    N0(
      e,
      'immediate',
      'refetch',
      'initialData',
      'timeout',
      'beforeFetch',
      'afterFetch',
      'onFetchError',
      'fetch',
    )
  );
}
function z3(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function xn(e) {
  return typeof Headers < 'u' && e instanceof Headers ? Object.fromEntries([...e.entries()]) : e;
}
function qt(e, ...t) {
  return e === 'overwrite'
    ? async (n) => {
        const r = t[t.length - 1];
        return r !== void 0 && (await r(n)), n;
      }
    : async (n) => (
        await t.reduce(
          (r, o) =>
            r.then(async () => {
              o && (n = ye(ye({}, n), await o(n)));
            }),
          Promise.resolve(),
        ),
        n
      );
}
function u4(e = {}) {
  const t = e.combination || 'chain',
    n = e.options || {},
    r = e.fetchOptions || {};
  function o(s, ...i) {
    const a = ie(() => {
      const u = Pe(e.baseUrl),
        f = Pe(s);
      return u && !z3(f) ? E3(u, f) : f;
    });
    let l = n,
      c = r;
    return (
      i.length > 0 &&
        (Er(i[0])
          ? (l = Et(ye(ye({}, l), i[0]), {
              beforeFetch: qt(t, n.beforeFetch, i[0].beforeFetch),
              afterFetch: qt(t, n.afterFetch, i[0].afterFetch),
              onFetchError: qt(t, n.onFetchError, i[0].onFetchError),
            }))
          : (c = Et(ye(ye({}, c), i[0]), {
              headers: ye(ye({}, xn(c.headers) || {}), xn(i[0].headers) || {}),
            }))),
      i.length > 1 &&
        Er(i[1]) &&
        (l = Et(ye(ye({}, l), i[1]), {
          beforeFetch: qt(t, n.beforeFetch, i[1].beforeFetch),
          afterFetch: qt(t, n.afterFetch, i[1].afterFetch),
          onFetchError: qt(t, n.onFetchError, i[1].onFetchError),
        })),
      w3(a, c, l)
    );
  }
  return o;
}
function w3(e, ...t) {
  var n;
  const r = typeof AbortController == 'function';
  let o = {},
    s = {
      immediate: !0,
      refetch: !1,
      timeout: 0,
    };
  const i = {
    method: 'GET',
    type: 'text',
    payload: void 0,
  };
  t.length > 0 && (Er(t[0]) ? (s = ye(ye({}, s), t[0])) : (o = t[0])),
    t.length > 1 && Er(t[1]) && (s = ye(ye({}, s), t[1]));
  const { fetch: a = (n = Ye) == null ? void 0 : n.fetch, initialData: l, timeout: c } = s,
    u = on(),
    f = on(),
    d = on(),
    p = ce(!1),
    m = ce(!1),
    g = ce(!1),
    v = ce(null),
    y = wn(null),
    z = wn(null),
    C = wn(l || null),
    S = ie(() => r && m.value);
  let O, k;
  const T = () => {
      r &&
        (O == null || O.abort(),
        (O = new AbortController()),
        (O.signal.onabort = () => (g.value = !0)),
        (o = Et(ye({}, o), {
          signal: O.signal,
        })));
    },
    I = (fe) => {
      (m.value = fe), (p.value = !fe);
    };
  c &&
    (k = B0(T, c, {
      immediate: !1,
    }));
  const A = async (fe = !1) => {
      var ee;
      T(), I(!0), (z.value = null), (v.value = null), (g.value = !1);
      const Y = {
        method: i.method,
        headers: {},
      };
      if (i.payload) {
        const Se = xn(Y.headers);
        i.payloadType && (Se['Content-Type'] = (ee = b3[i.payloadType]) != null ? ee : i.payloadType);
        const Ee = Pe(i.payload);
        Y.body = i.payloadType === 'json' ? JSON.stringify(Ee) : Ee;
      }
      let te = !1;
      const ve = {
        url: Pe(e),
        options: ye(ye({}, Y), o),
        cancel: () => {
          te = !0;
        },
      };
      if ((s.beforeFetch && Object.assign(ve, await s.beforeFetch(ve)), te || !a))
        return I(!1), Promise.resolve(null);
      let Ie = null;
      return (
        k && k.start(),
        new Promise((Se, Ee) => {
          var st;
          a(
            ve.url,
            Et(ye(ye({}, Y), ve.options), {
              headers: ye(ye({}, xn(Y.headers)), xn((st = ve.options) == null ? void 0 : st.headers)),
            }),
          )
            .then(async (Me) => {
              if (((y.value = Me), (v.value = Me.status), (Ie = await Me[i.type]()), !Me.ok))
                throw ((C.value = l || null), new Error(Me.statusText));
              return (
                s.afterFetch &&
                  ({ data: Ie } = await s.afterFetch({
                    data: Ie,
                    response: Me,
                  })),
                (C.value = Ie),
                u.trigger(Me),
                Se(Me)
              );
            })
            .catch(async (Me) => {
              let x = Me.message || Me.name;
              return (
                s.onFetchError &&
                  ({ error: x } = await s.onFetchError({
                    data: Ie,
                    error: Me,
                    response: y.value,
                  })),
                (z.value = x),
                f.trigger(Me),
                fe ? Ee(Me) : Se(null)
              );
            })
            .finally(() => {
              I(!1), k && k.stop(), d.trigger(null);
            });
        })
      );
    },
    N = eo(s.refetch);
  Re([N, eo(e)], ([fe]) => fe && A(), {
    deep: !0,
  });
  const B = {
    isFinished: p,
    statusCode: v,
    response: y,
    error: z,
    data: C,
    isFetching: m,
    canAbort: S,
    aborted: g,
    abort: T,
    execute: A,
    onFetchResponse: u.on,
    onFetchError: f.on,
    onFetchFinally: d.on,
    get: J('GET'),
    put: J('PUT'),
    post: J('POST'),
    delete: J('DELETE'),
    patch: J('PATCH'),
    head: J('HEAD'),
    options: J('OPTIONS'),
    json: ge('json'),
    text: ge('text'),
    blob: ge('blob'),
    arrayBuffer: ge('arrayBuffer'),
    formData: ge('formData'),
  };
  function J(fe) {
    return (ee, Y) => {
      if (!m.value) {
        (i.method = fe),
          (i.payload = ee),
          (i.payloadType = Y),
          Oe(i.payload) &&
            Re([N, eo(i.payload)], ([ve]) => ve && A(), {
              deep: !0,
            });
        const te = Pe(i.payload);
        return (
          !Y &&
            te &&
            Object.getPrototypeOf(te) === Object.prototype &&
            !(te instanceof FormData) &&
            (i.payloadType = 'json'),
          Et(ye({}, B), {
            then(ve, Ie) {
              return ze().then(ve, Ie);
            },
          })
        );
      }
    };
  }
  function ze() {
    return new Promise((fe, ee) => {
      V0(p)
        .toBe(!0)
        .then(() => fe(B))
        .catch((Y) => ee(Y));
    });
  }
  function ge(fe) {
    return () => {
      if (!m.value)
        return (
          (i.type = fe),
          Et(ye({}, B), {
            then(ee, Y) {
              return ze().then(ee, Y);
            },
          })
        );
    };
  }
  return (
    s.immediate && Promise.resolve().then(() => A()),
    Et(ye({}, B), {
      then(fe, ee) {
        return ze().then(fe, ee);
      },
    })
  );
}
function E3(e, t) {
  return !e.endsWith('/') && !t.startsWith('/') ? `${e}/${t}` : `${e}${t}`;
}
function cr(e, t, n = {}) {
  const { window: r = Ye } = n;
  return u3(e, t, r == null ? void 0 : r.localStorage, n);
}
const M3 = {
  ctrl: 'control',
  command: 'meta',
  cmd: 'meta',
  option: 'alt',
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright',
};
function C3(e = {}) {
  const { reactive: t = !1, target: n = Ye, aliasMap: r = M3, passive: o = !0, onEventFired: s = At } = e,
    i = Ot(new Set()),
    a = {
      toJSON() {
        return {};
      },
      current: i,
    },
    l = t ? Ot(a) : a,
    c = new Set(),
    u = new Set();
  function f(g, v) {
    g in l && (t ? (l[g] = v) : (l[g].value = v));
  }
  function d() {
    i.clear();
    for (const g of u) f(g, !1);
  }
  function p(g, v) {
    var y, z;
    const C = (y = g.key) == null ? void 0 : y.toLowerCase(),
      O = [(z = g.code) == null ? void 0 : z.toLowerCase(), C].filter(Boolean);
    C && (v ? i.add(C) : i.delete(C));
    for (const k of O) u.add(k), f(k, v);
    C === 'meta' && !v
      ? (c.forEach((k) => {
          i.delete(k), f(k, !1);
        }),
        c.clear())
      : typeof g.getModifierState == 'function' &&
        g.getModifierState('Meta') &&
        v &&
        [...i, ...O].forEach((k) => c.add(k));
  }
  be(n, 'keydown', (g) => (p(g, !0), s(g)), {
    passive: o,
  }),
    be(n, 'keyup', (g) => (p(g, !1), s(g)), {
      passive: o,
    }),
    be('blur', d, {
      passive: !0,
    }),
    be('focus', d, {
      passive: !0,
    });
  const m = new Proxy(l, {
    get(g, v, y) {
      if (typeof v != 'string') return Reflect.get(g, v, y);
      if (((v = v.toLowerCase()), v in r && (v = r[v]), !(v in l)))
        if (/[+_-]/.test(v)) {
          const C = v.split(/[+_-]/g).map((S) => S.trim());
          l[v] = ie(() => C.every((S) => Pe(m[S])));
        } else l[v] = ce(!1);
      const z = Reflect.get(g, v, y);
      return t ? Pe(z) : z;
    },
  });
  return m;
}
const A3 = {
  page: (e) => [e.pageX, e.pageY],
  client: (e) => [e.clientX, e.clientY],
  screen: (e) => [e.screenX, e.screenY],
  movement: (e) => (e instanceof Touch ? null : [e.movementX, e.movementY]),
};
function f4(e = {}) {
  const {
      type: t = 'page',
      touch: n = !0,
      resetOnTouchEnds: r = !1,
      initialValue: o = {
        x: 0,
        y: 0,
      },
      window: s = Ye,
      target: i = s,
      eventFilter: a,
    } = e,
    l = ce(o.x),
    c = ce(o.y),
    u = ce(null),
    f = typeof t == 'function' ? t : A3[t],
    d = (y) => {
      const z = f(y);
      z && (([l.value, c.value] = z), (u.value = 'mouse'));
    },
    p = (y) => {
      if (y.touches.length > 0) {
        const z = f(y.touches[0]);
        z && (([l.value, c.value] = z), (u.value = 'touch'));
      }
    },
    m = () => {
      (l.value = o.x), (c.value = o.y);
    },
    g = a ? (y) => a(() => d(y), {}) : (y) => d(y),
    v = a ? (y) => a(() => p(y), {}) : (y) => p(y);
  return (
    i &&
      (be(i, 'mousemove', g, {
        passive: !0,
      }),
      be(i, 'dragover', g, {
        passive: !0,
      }),
      n &&
        t !== 'movement' &&
        (be(i, 'touchstart', v, {
          passive: !0,
        }),
        be(i, 'touchmove', v, {
          passive: !0,
        }),
        r &&
          be(i, 'touchend', m, {
            passive: !0,
          }))),
    {
      x: l,
      y: c,
      sourceType: u,
    }
  );
}
function d4(e = {}) {
  const { touch: t = !0, drag: n = !0, initialValue: r = !1, window: o = Ye } = e,
    s = ce(r),
    i = ce(null);
  if (!o)
    return {
      pressed: s,
      sourceType: i,
    };
  const a = (u) => () => {
      (s.value = !0), (i.value = u);
    },
    l = () => {
      (s.value = !1), (i.value = null);
    },
    c = ie(() => Bt(e.target) || o);
  return (
    be(c, 'mousedown', a('mouse'), {
      passive: !0,
    }),
    be(o, 'mouseleave', l, {
      passive: !0,
    }),
    be(o, 'mouseup', l, {
      passive: !0,
    }),
    n &&
      (be(c, 'dragstart', a('mouse'), {
        passive: !0,
      }),
      be(o, 'drop', l, {
        passive: !0,
      }),
      be(o, 'dragend', l, {
        passive: !0,
      })),
    t &&
      (be(c, 'touchstart', a('touch'), {
        passive: !0,
      }),
      be(o, 'touchend', l, {
        passive: !0,
      }),
      be(o, 'touchcancel', l, {
        passive: !0,
      })),
    {
      pressed: s,
      sourceType: i,
    }
  );
}
function h4(e = {}) {
  const { window: t = Ye } = e,
    n = t == null ? void 0 : t.navigator,
    r = ds(() => n && 'language' in n),
    o = ce(n == null ? void 0 : n.language);
  return (
    be(t, 'languagechange', () => {
      n && (o.value = n.language);
    }),
    {
      isSupported: r,
      language: o,
    }
  );
}
function m4(e, t = At, n = {}) {
  const {
      immediate: r = !0,
      manual: o = !1,
      type: s = 'text/javascript',
      async: i = !0,
      crossOrigin: a,
      referrerPolicy: l,
      noModule: c,
      defer: u,
      document: f = e3,
      attrs: d = {},
    } = n,
    p = ce(null);
  let m = null;
  const g = (z) =>
      new Promise((C, S) => {
        const O = (I) => ((p.value = I), C(I), I);
        if (!f) {
          C(!1);
          return;
        }
        let k = !1,
          T = f.querySelector(`script[src="${Pe(e)}"]`);
        T
          ? T.hasAttribute('data-loaded') && O(T)
          : ((T = f.createElement('script')),
            (T.type = s),
            (T.async = i),
            (T.src = Pe(e)),
            u && (T.defer = u),
            a && (T.crossOrigin = a),
            c && (T.noModule = c),
            l && (T.referrerPolicy = l),
            Object.entries(d).forEach(([I, A]) => (T == null ? void 0 : T.setAttribute(I, A))),
            (k = !0)),
          T.addEventListener('error', (I) => S(I)),
          T.addEventListener('abort', (I) => S(I)),
          T.addEventListener('load', () => {
            T.setAttribute('data-loaded', 'true'), t(T), O(T);
          }),
          k && (T = f.head.appendChild(T)),
          z || O(T);
      }),
    v = (z = !0) => (m || (m = g(z)), m),
    y = () => {
      if (!f) return;
      (m = null), p.value && (p.value = null);
      const z = f.querySelector(`script[src="${Pe(e)}"]`);
      z && f.head.removeChild(z);
    };
  return (
    r && !o && F0(v),
    o || $0(y),
    {
      scriptTag: p,
      load: v,
      unload: y,
    }
  );
}
const nr = (e) => {
    var n;
    const t = (n = Xe.currentRoute.value.name) == null ? void 0 : n.split('__')[1];
    return ht.global.te(`${t}.${e}`) ? ht.global.t(`${t}.${e}`) : '';
  },
  Jt = Ot({
    title: null,
    meta: [],
    link: [],
  });
Xe.isReady().then(() => {
  Jt.title = ie(() => nr('metaInfo.title') || ht.global.t('pageNotFound.title'));
  const e = Xe.currentRoute,
    t = e.value.name.split('__')[1];
  if ((ht.global.locale.value, t.endsWith('page_not_found'))) return;
  const n = ie(
    () =>
      `https://vocalremover.org${
        Xe.resolve({
          name: Xe.currentRoute.value.name,
        }).href
      }`,
  );
  Jt.link.push({
    rel: 'canonical',
    href: n,
  }),
    Object.keys({
      ar: 'ar_AE',
      bg: 'bg_BG',
      cs: 'cs_CZ',
      da: 'da_DK',
      de: 'de_DE',
      el: 'el_GR',
      en: 'en_GB',
      es: 'es_ES',
      et: 'et_EE',
      fi: 'fi_FI',
      fr: 'fr_FR',
      he: 'he_IL',
      hi: 'hi_IN',
      hu: 'hu_HU',
      id: 'id_ID',
      it: 'it_IT',
      ja: 'ja_JP',
      ko: 'ko_KR',
      lt: 'lt_LT',
      lv: 'lv_LV',
      nb: 'nb_NO',
      nl: 'nl_NL',
      pl: 'pl_PL',
      pt: 'pt_BR',
      ro: 'ro_RO',
      ru: 'ru_RU',
      sk: 'sk_SK',
      sl: 'sl_SI',
      sv: 'sv_SE',
      th: 'th_TH',
      tr: 'tr_TR',
      uk: 'uk_UA',
      vi: 'vi_VN',
      zh: 'zh_CN',
    }).forEach((r) => {
      Jt.link.push({
        rel: 'alternate',
        hreflang: r,
        href: ie(
          () =>
            `https://vocalremover.org${
              Xe.resolve({
                name: `${r}__${t}`,
              }).href
            }`,
        ),
      });
    }),
    Jt.link.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: ie(
        () =>
          `https://vocalremover.org${
            Xe.resolve({
              name: `en__${t}`,
            }).href
          }`,
      ),
    }),
    (Jt.meta = ie(() => {
      const r = e.value.name.split('__')[1],
        o = ht.global.locale.value;
      if (r === 'support' || r === 'membership') return [];
      const s = [
        {
          name: 'description',
          content: nr('metaInfo.description'),
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: `https://vocalremover.org${
            Xe.resolve({
              name: Xe.currentRoute.value.name,
            }).href
          }`,
        },
        {
          property: 'og:title',
          content: nr('title'),
        },
        {
          property: 'og:description',
          content: nr('description'),
        },
      ];
      return (
        r === 'remover'
          ? s.push({
              property: 'og:image',
              content: `https://vocalremover.org/img/remover/player_${o}_1100x576.png`,
            })
          : r === 'recorder'
            ? s.push({
                property: 'og:image',
                content: 'https://vocalremover.org/img/recorder/1100x576.jpg',
              })
            : r === 'cutter' &&
              s.push({
                property: 'og:image',
                content: 'https://vocalremover.org/img/cutter/player@2x.jpg',
              }),
        s
      );
    }));
});
const P3 = k0(() => {
    const e = cr('token', null),
      t = cr('ipiso', null),
      n = cr('isPatron', null);
    return {
      authToken: e,
      ipISO: t,
      isPatron: n,
    };
  }),
  O3 = {
    class: 'app-menu-burger',
  },
  T3 = {
    class: 'bar',
  },
  x3 = {
    class: 'tools',
  },
  R3 = {
    class: 'help',
  },
  S3 = {
    class: 't',
  },
  k3 = {
    key: 0,
    class: 'locales',
  },
  I3 = {
    class: 'close',
  },
  L3 = {
    class: 'locale-list',
  },
  H3 = {
    __name: 'App',
    setup(e) {
      La(Jt);
      let t = P3(),
        n = bl(t, 'isPatron');
      const r = {
          ar: 'ar_AE',
          bg: 'bg_BG',
          cs: 'cs_CZ',
          da: 'da_DK',
          de: 'de_DE',
          el: 'el_GR',
          en: 'en_GB',
          es: 'es_ES',
          et: 'et_EE',
          fi: 'fi_FI',
          fr: 'fr_FR',
          he: 'he_IL',
          hi: 'hi_IN',
          hu: 'hu_HU',
          id: 'id_ID',
          it: 'it_IT',
          ja: 'ja_JP',
          ko: 'ko_KR',
          lt: 'lt_LT',
          lv: 'lv_LV',
          nb: 'nb_NO',
          nl: 'nl_NL',
          pl: 'pl_PL',
          pt: 'pt_BR',
          ro: 'ro_RO',
          ru: 'ru_RU',
          sk: 'sk_SK',
          sl: 'sl_SI',
          sv: 'sv_SE',
          th: 'th_TH',
          tr: 'tr_TR',
          uk: 'uk_UA',
          vi: 'vi_VN',
          zh: 'zh_CN',
        },
        o = ['remover', 'splitter', 'pitch', 'bpm', 'cutter', 'joiner', 'recorder', 'karaoke'],
        s = cr('isDisplayNavMenu', !0),
        i = ce(!1),
        a = () => (s.value = !s.value),
        l = () => (s.value = !1),
        c = () => (i.value = !0),
        u = () => (i.value = !1),
        f = () => (i.value ? u() : c());
      C3({
        passive: !1,
        onEventFired(v) {
          v.key === 'Escape' && v.type === 'keydown' && i.value && (f(), v.stopImmediatePropagation());
        },
      }),
        Pl(() => {
          s.value ? document.body.classList.add('with-menu') : document.body.classList.remove('with-menu');
        }),
        Re(y2(), (v) => {
          u(), d() && l(), 'patreon' in v.query && (n.value = '0fa00340-0b81-11ed-861d-0242ac120003');
        }),
        Bn(() => {
          p(),
            window.addEventListener('resize', p),
            document.addEventListener('drop', (v) => {
              v.preventDefault(), m(v);
            }),
            document.addEventListener('dragover', (v) => {
              v.preventDefault();
            });
        }),
        mn(() => {
          window.removeEventListener('resize', p);
        });
      const d = () => !window.matchMedia('(min-width: 40em)').matches,
        p = () => {
          const v = window.innerHeight * 0.01;
          (document.documentElement || document.body.parentNode || document.body).style.setProperty(
            '--vh',
            `${v}px`,
          ),
            d() && l();
        },
        m = async (v) => {
          await Wt();
          const y = document.querySelector('input[type="file"]');
          y && ((y.files = v.dataTransfer.files), y.dispatchEvent(new Event('change')));
        },
        g = (v) =>
          ({
            ar: 'العربية',
            bg: 'Български',
            cs: 'Čeština',
            da: 'Dansk',
            de: 'Deutsch',
            el: 'Ελληνικά',
            en: 'English',
            es: 'Español',
            et: 'Eesti',
            fi: 'Suomi',
            fr: 'Français',
            he: 'עברית',
            hi: 'हिंदी',
            hr: 'Hrvatski',
            hu: 'Magyar',
            id: 'Indonesia',
            it: 'Italiano',
            ja: '日本語',
            ko: '한국어',
            lt: 'Lietuvių',
            lv: 'Latviešu',
            ms: "Bahasa' Melayu",
            nl: 'Nederlands',
            nb: 'Bokmål',
            pl: 'Polski',
            pt: 'Português',
            ro: 'Română',
            ru: 'Русский',
            sk: 'Slovenčina',
            sl: 'Slovenščina',
            sv: 'Svenska',
            th: 'ไทย',
            tr: 'Türkçe',
            uk: 'Українська',
            vi: "Tiếng' Việt",
            zh: '中文',
          })[v];
      return (v, y) => {
        const z = S0,
          C = Ha,
          S = so('router-link'),
          O = so('router-view');
        return (
          dt(),
          Zt(
            Fe,
            null,
            [
              at('div', O3, [
                de(z, {
                  class: 'link',
                  name: 'menu-burger',
                  size: '2em',
                  onClick: a,
                }),
              ]),
              at('nav', T3, [
                at('div', x3, [
                  (dt(),
                  Zt(
                    Fe,
                    null,
                    Ts(o, (k) =>
                      de(
                        S,
                        {
                          key: k,
                          to: {
                            name: `${v.$i18n.locale}__${k}`,
                          },
                        },
                        {
                          default: sr(() => [
                            de(
                              C,
                              {
                                name: `menu-${k}`,
                                width: '2.5em',
                                height: '1.7em',
                                stroke: '',
                              },
                              null,
                              8,
                              ['name'],
                            ),
                            ho(' ' + Br(v.$t(`menu.${k}`)), 1),
                          ]),
                          _: 2,
                        },
                        1032,
                        ['to'],
                      ),
                    ),
                    64,
                  )),
                ]),
                at('div', R3, [
                  de(
                    S,
                    {
                      to: 'support',
                    },
                    {
                      default: sr(() => [
                        de(C, {
                          name: 'menu-help',
                          size: '1.75em',
                        }),
                        at('div', S3, Br(v.$t('menu.support')), 1),
                      ]),
                      _: 1,
                    },
                  ),
                  de(
                    z,
                    {
                      class: 'link',
                      name: `flag-${nt(r)[v.$i18n.locale]}`,
                      size: '2em',
                      onClick: f,
                    },
                    null,
                    8,
                    ['name'],
                  ),
                ]),
              ]),
              i.value
                ? (dt(),
                  Zt('div', k3, [
                    at('div', I3, [
                      de(z, {
                        class: 'link',
                        name: 'cancel',
                        size: '1.4em',
                        onClick: u,
                      }),
                    ]),
                    at('div', L3, [
                      (dt(!0),
                      Zt(
                        Fe,
                        null,
                        Ts(
                          nt(r),
                          (k, T) => (
                            dt(),
                            Ir(
                              S,
                              {
                                key: k,
                                to: {
                                  name: `${T}__${v.$route.name.split('__')[1]}`,
                                },
                              },
                              {
                                default: sr(() => [
                                  de(
                                    C,
                                    {
                                      name: `flag-${k}`,
                                      size: '2.5em',
                                    },
                                    null,
                                    8,
                                    ['name'],
                                  ),
                                  ho(' ' + Br(g(T)), 1),
                                ]),
                                _: 2,
                              },
                              1032,
                              ['to'],
                            )
                          ),
                        ),
                        128,
                      )),
                    ]),
                  ]))
                : xc('', !0),
              de(O),
            ],
            64,
          )
        );
      };
    },
  };
if (typeof window < 'u') {
  let e = function () {
    var t = document.body,
      n = document.getElementById('__svg__icons__dom__');
    n ||
      ((n = document.createElementNS('http://www.w3.org/2000/svg', 'svg')),
      (n.style.position = 'absolute'),
      (n.style.width = '0'),
      (n.style.height = '0'),
      (n.id = '__svg__icons__dom__'),
      n.setAttribute('xmlns', 'http://www.w3.org/2000/svg'),
      n.setAttribute('xmlns:link', 'http://www.w3.org/1999/xlink')),
      (n.innerHTML =
        '<symbol  viewBox="0 0 814 1000" id="icon-apple"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" /></symbol><symbol  viewBox="0 0 492 492" id="icon-arrow-left"><path d="M198.608 246.104 382.664 62.04c5.068-5.056 7.856-11.816 7.856-19.024 0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12C361.476 2.792 354.712 0 347.504 0s-13.964 2.792-19.028 7.864L109.328 227.008c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864 7.208 0 13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06L198.608 246.104z" /></symbol><symbol  viewBox="0 0 401.998 401.998" id="icon-arrows-up-down"><path d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zM328.905 237.549H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z" /></symbol><symbol viewBox="0 0 32 32"  id="icon-backward-10"><path d="M4 18A12 12 0 1 0 16 6h-4V1L6 7l6 6V8h4A10 10 0 1 1 6 18z" /><path d="M19.63 22.13a2.84 2.84 0 0 1-1.28-.27 2.44 2.44 0 0 1-.89-.77 3.57 3.57 0 0 1-.52-1.25 7.69 7.69 0 0 1-.17-1.68 7.83 7.83 0 0 1 .17-1.68 3.65 3.65 0 0 1 .52-1.25 2.44 2.44 0 0 1 .89-.77 2.84 2.84 0 0 1 1.28-.27 2.44 2.44 0 0 1 2.16 1 5.23 5.23 0 0 1 .7 2.93 5.23 5.23 0 0 1-.7 2.93 2.44 2.44 0 0 1-2.16 1.08zm0-1.22a1.07 1.07 0 0 0 1-.55 3.38 3.38 0 0 0 .37-1.51v-1.38a3.31 3.31 0 0 0-.29-1.5 1.23 1.23 0 0 0-2.06 0 3.31 3.31 0 0 0-.29 1.5v1.38a3.38 3.38 0 0 0 .29 1.51 1.06 1.06 0 0 0 .98.55zM10.63 22v-1.18h2v-5.19l-1.86 1-.55-1.06 2.32-1.3H14v6.5h1.78V22z" /></symbol><symbol  viewBox="0 0 512.001 512.001" id="icon-cancel"><path d="M294.111 256.001 504.109 46.003c10.523-10.524 10.523-27.586 0-38.109-10.524-10.524-27.587-10.524-38.11 0L256 217.892 46.002 7.894C35.478-2.63 18.416-2.63 7.893 7.894s-10.524 27.586 0 38.109l209.998 209.998L7.893 465.999c-10.524 10.524-10.524 27.586 0 38.109 10.524 10.524 27.586 10.523 38.109 0L256 294.11l209.997 209.998c10.524 10.524 27.587 10.523 38.11 0 10.523-10.524 10.523-27.586 0-38.109L294.111 256.001z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-checkbox-off"><path d="M512 58.668C512 26.305 485.695 0 453.332 0H58.668C26.305 0 0 26.305 0 58.668v394.664C0 485.695 26.305 512 58.668 512h394.664C485.695 512 512 485.695 512 453.332zm0 0" /></symbol><symbol  viewBox="0 0 512 512" id="icon-checkbox-on"><path d="M512 58.668C512 26.305 485.695 0 453.332 0H58.668C26.305 0 0 26.305 0 58.668v394.664C0 485.695 26.305 512 58.668 512h394.664C485.695 512 512 485.695 512 453.332zm0 0" /><path d="M385.75 171.586c8.34 8.34 8.34 21.82 0 30.164L247.082 340.414c-4.16 4.16-9.621 6.254-15.082 6.254s-10.922-2.094-15.082-6.254l-69.332-69.332c-8.344-8.34-8.344-21.824 0-30.164 8.34-8.344 21.82-8.344 30.164 0l54.25 54.25 123.586-123.582c8.34-8.344 21.82-8.344 30.164 0zm0 0" fill="#fafafa" /></symbol><symbol  viewBox="0 0 984 1080" id="icon-eq"><path d="M565.801 488.64H522V0h-60v488.64h-43.801a82.336 82.336 0 0 0-58.09 24.109A82.334 82.334 0 0 0 336 570.839v29.16a82.328 82.328 0 0 0 24.109 58.09 82.334 82.334 0 0 0 58.09 24.109h147.6a82.335 82.335 0 0 0 58.09-24.109 82.327 82.327 0 0 0 24.11-58.09v-29.16a82.335 82.335 0 0 0-24.11-58.09 82.334 82.334 0 0 0-58.09-24.109h.002zM588 600a22.202 22.202 0 0 1-22.199 22.199h-147.6A22.2 22.2 0 0 1 396.002 600v-29.16a22.202 22.202 0 0 1 22.199-22.199h147.6A22.2 22.2 0 0 1 588 570.84V600zM901.801 278.64H858V0h-60v278.64h-43.801a82.336 82.336 0 0 0-58.09 24.109A82.334 82.334 0 0 0 672 360.839v29.52a82.317 82.317 0 0 0 82.199 82.199h147.6a82.319 82.319 0 0 0 58.09-24.109 82.327 82.327 0 0 0 24.109-58.09v-29.52a82.335 82.335 0 0 0-24.11-58.09 82.334 82.334 0 0 0-58.09-24.109h.003zm22.2 111.72c0 5.887-2.34 11.535-6.505 15.699a22.185 22.185 0 0 1-15.695 6.5h-147.6a22.184 22.184 0 0 1-15.695-6.5 22.205 22.205 0 0 1-6.504-15.699v-29.52a22.201 22.201 0 0 1 22.199-22.199h147.6a22.2 22.2 0 0 1 22.2 22.199v29.52zM229.801 278.64H186V0h-60v278.64H82.199a82.336 82.336 0 0 0-58.09 24.109A82.334 82.334 0 0 0 0 360.839v29.52a82.317 82.317 0 0 0 82.199 82.199h147.6a82.32 82.32 0 0 0 58.09-24.109 82.327 82.327 0 0 0 24.109-58.09v-29.52a82.336 82.336 0 0 0-24.109-58.09 82.334 82.334 0 0 0-58.09-24.109h.002zM252 390.36c0 5.887-2.34 11.535-6.504 15.699a22.185 22.185 0 0 1-15.695 6.5h-147.6a22.184 22.184 0 0 1-15.695-6.5 22.205 22.205 0 0 1-6.504-15.699v-29.52a22.201 22.201 0 0 1 22.199-22.199h147.6A22.2 22.2 0 0 1 252 360.84v29.52zM462.001 1080h60V795.6a29.998 29.998 0 1 0-60 0V1080zM798.001 1080h60V585.6a29.998 29.998 0 1 0-60 0V1080zM126.001 1080h60V585.6a29.998 29.998 0 1 0-60 0V1080z" /></symbol><symbol  viewBox="0 0 506.86 506.86" id="icon-facebook"><path style="fill:#1877f2" d="M506.86 253.43C506.86 113.46 393.39 0 253.43 0S0 113.46 0 253.43c0 126.49 92.68 231.34 213.83 250.35V326.69h-64.35v-73.26h64.35V197.6c0-63.52 37.84-98.6 95.72-98.6 27.73 0 56.73 5 56.73 5v62.36h-31.95c-31.49 0-41.3 19.54-41.3 39.58v47.54h70.28l-11.23 73.26H293v177.04c121.18-19.01 213.86-123.86 213.86-250.35Z" /><path style="fill:#fff" d="m352.08 326.69 11.23-73.26H293v-47.54c0-20 9.81-39.58 41.3-39.58h31.95V104s-29-5-56.73-5c-57.88 0-95.72 35.08-95.72 98.6v55.83h-64.32v73.26h64.35v177.09a256.11 256.11 0 0 0 79.2 0V326.69Z" /></symbol><symbol  viewBox="0 0 25 16" id="icon-fadein"><path d="M1 15.787a1 1 0 0 1 0-2h.294c2.74.005 4.094-.163 5.705-.937 1.931-.927 3.601-2.653 5.035-5.476 1.37-2.697 2.882-4.55 4.583-5.718C18.64.267 20.274-.014 23.547.001H24a1 1 0 0 1 0 2h-.462c-2.893-.013-4.197.211-5.79 1.304-1.402.962-2.702 2.558-3.93 4.975-1.626 3.199-3.607 5.247-5.953 6.373-1.962.942-3.55 1.14-6.574 1.134H1Z" /></symbol><symbol  viewBox="0 0 25 15" id="icon-fadeout"><path d="M24 15.787a1 1 0 0 0 0-2h-.294c-2.74.005-4.094-.163-5.705-.937-1.931-.927-3.601-2.653-5.035-5.476-1.37-2.697-2.882-4.55-4.583-5.718C6.36.267 4.726-.014 1.453.001H1a1 1 0 0 0 0 2h.462c2.893-.013 4.197.211 5.79 1.304 1.402.962 2.702 2.558 3.93 4.975 1.626 3.199 3.607 5.247 5.953 6.373 1.962.942 3.55 1.14 6.574 1.134H24Z" /></symbol><symbol viewBox="0 0 32 32"  id="icon-forward-10"><path d="M26 18A10 10 0 1 1 16 8h4v5l6-6-6-6v5h-4a12 12 0 1 0 12 12z" /><path d="M19.63 22.13a2.84 2.84 0 0 1-1.28-.27 2.44 2.44 0 0 1-.89-.77 3.57 3.57 0 0 1-.52-1.25 7.69 7.69 0 0 1-.17-1.68 7.83 7.83 0 0 1 .17-1.68 3.65 3.65 0 0 1 .52-1.25 2.44 2.44 0 0 1 .89-.77 2.84 2.84 0 0 1 1.28-.27 2.44 2.44 0 0 1 2.16 1 5.23 5.23 0 0 1 .7 2.93 5.23 5.23 0 0 1-.7 2.93 2.44 2.44 0 0 1-2.16 1.08zm0-1.22a1.07 1.07 0 0 0 1-.55 3.38 3.38 0 0 0 .37-1.51v-1.38a3.31 3.31 0 0 0-.29-1.5 1.23 1.23 0 0 0-2.06 0 3.31 3.31 0 0 0-.29 1.5v1.38a3.38 3.38 0 0 0 .29 1.51 1.06 1.06 0 0 0 .98.55zM10.63 22v-1.18h2v-5.19l-1.86 1-.55-1.06 2.32-1.3H14v6.5h1.78V22z" /></symbol><symbol  viewBox="0 0 507.451 507.45" id="icon-gear"><path d="M440.813 280.5c0-7.65 2.55-15.3 2.55-25.5s0-17.85-2.55-25.5l53.55-43.35c5.1-5.1 5.1-10.2 2.55-15.3l-51-89.25c-2.55-2.55-7.649-5.1-15.3-2.55l-63.75 25.5c-12.75-10.2-28.05-17.85-43.35-25.5l-10.2-66.3C315.863 5.1 308.212 0 303.113 0h-102c-5.101 0-12.75 5.1-12.75 10.2l-10.2 68.85c-15.3 5.1-28.05 15.3-43.35 25.5l-61.2-25.5c-7.65-2.55-12.75 0-17.851 5.1l-51 89.25c-2.55 2.55 0 10.2 5.1 15.3l53.55 40.8c0 7.65-2.55 15.3-2.55 25.5s0 17.85 2.55 25.5l-53.55 43.35c-5.1 5.101-5.1 10.2-2.55 15.301l51 89.25c2.55 2.55 7.649 5.1 15.3 2.55l63.75-25.5c12.75 10.2 28.05 17.85 43.35 25.5l10.2 66.3c0 5.1 5.1 10.2 12.75 10.2h102c5.101 0 12.75-5.101 12.75-10.2l10.2-66.3c15.3-7.65 30.6-15.3 43.35-25.5l63.75 25.5c5.101 2.55 12.75 0 15.301-5.101l51-89.25c2.55-5.1 2.55-12.75-2.551-15.3l-58.649-40.8zm-188.7 63.75c-48.45 0-89.25-40.8-89.25-89.25s40.8-89.25 89.25-89.25 89.25 40.8 89.25 89.25-40.8 89.25-89.25 89.25z" /></symbol><symbol viewBox="0 0 24 24"  id="icon-google"><path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z" /><path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24Z" /><path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09Z" /><path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z" /></symbol><symbol  viewBox="0 0 390 560" id="icon-mic-denied"><path d="M217.78 19.21C235.49 7.093 256.915.003 279.997.003c60.922 0 110.3 49.375 110.3 110.3 0 60.922-49.375 110.3-110.3 110.3-8.761 0-17.28-1.02-25.453-2.949v79.312c0 51.551-41.78 93.336-93.332 93.336-51.535 0-93.336-41.809-93.336-93.316V93.316C67.877 41.777 109.658 0 161.213 0c20.332 0 39.703 6.54 55.68 18.445.32.238.614.492.887.762v.003zm-31.114 91.098c0 51.555 41.781 93.332 93.332 93.332 51.555 0 93.336-41.78 93.336-93.332 0-51.555-41.785-93.336-93.336-93.336-51.555 0-93.332 41.785-93.332 93.336zm50.91 186.66v-84.816c-39.863-16.617-67.879-55.957-67.879-101.85 0-31.547 13.238-60 34.465-80.102-12.55-8.566-27.39-13.234-42.949-13.234-42.184 0-76.367 34.18-76.367 76.348v203.67c0 42.133 34.207 76.344 76.367 76.344 42.18 0 76.363-34.184 76.363-76.363v.003zm-84.852 246.06V458.18h-8.484C64.588 458.18 0 393.618 0 314.02c0-4.687 3.8-8.484 8.484-8.484a8.482 8.482 0 0 1 8.485 8.484c0 70.23 56.992 127.19 127.27 127.19h33.94c70.337 0 127.27-56.922 127.27-127.19a8.482 8.482 0 0 1 8.485-8.484 8.485 8.485 0 0 1 8.485 8.484c0 79.641-64.535 144.16-144.24 144.16h-8.485v84.848h76.363a8.485 8.485 0 0 1 0 16.969h-169.7a8.485 8.485 0 0 1 0-16.969h76.367zm115.27-432.73-19.453-19.457c-3.312-3.312-3.312-8.683 0-12a8.487 8.487 0 0 1 12 0l19.453 19.457 19.457-19.457a8.483 8.483 0 0 1 11.996 0 8.48 8.48 0 0 1 0 12l-19.453 19.457 19.453 19.453a8.48 8.48 0 0 1 0 12 8.483 8.483 0 0 1-11.996 0l-19.457-19.457-19.453 19.457c-3.312 3.313-8.687 3.313-12 0s-3.312-8.687 0-12l19.453-19.453z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-mic"><path d="M256 320c37.712 0 68.571-30.924 68.571-68.714V100.714C324.571 62.924 293.712 32 256 32s-68.571 30.924-68.571 68.714v150.572c0 37.79 30.859 68.714 68.571 68.714zm121.139-75.452c0 68.714-58.282 116.815-121.139 116.815s-121.139-48.102-121.139-116.815H96c0 77.873 61.719 143.153 137.144 153.465V480h45.713v-81.987C354.281 386.561 416 322.421 416 244.548h-38.861z" /></symbol><symbol  viewBox="0 0 298.667 298.667" id="icon-pause"><path d="M192 0h85.333v298.667H192zM21.333 0h85.333v298.667H21.333z" /></symbol><symbol  viewBox="0 0 298.667 298.667" id="icon-play"><path d="M32 0v298.667l234.667-149.334z" /></symbol><symbol  viewBox="0 0 256 256" id="icon-playback"><path d="M0 0h42.667v256H0zM74.667 128 256 256V0z" /></symbol><symbol  viewBox="0 0 510 510" id="icon-plus-circle"><path d="M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm127.5 280.5h-102v102h-51v-102h-102v-51h102v-102h51v102h102v51z" /></symbol><symbol  viewBox="0 0 24.303 24.303" id="icon-power"><path d="M10.269 11.298V1.883a1.884 1.884 0 0 1 3.766 0v9.415a1.884 1.884 0 0 1-3.766 0zm9.347-8.537a1.413 1.413 0 0 0-1.749 2.218 9.196 9.196 0 0 1 3.524 7.261c0 5.094-4.145 9.239-9.238 9.239-5.094 0-9.239-4.145-9.239-9.239a9.194 9.194 0 0 1 3.521-7.258 1.413 1.413 0 0 0-1.75-2.218A12.004 12.004 0 0 0 .089 12.24c0 6.652 5.412 12.063 12.063 12.063s12.063-5.412 12.063-12.063c0-3.719-1.677-7.173-4.599-9.479z" /></symbol><symbol  viewBox="0 0 24 24" id="icon-redo"><path d="M17.7 3.29a1 1 0 0 0-1.4 1.42L19.62 8H13A10 10 0 0 0 3 18v2a1 1 0 0 0 2 0v-2a8 8 0 0 1 8-8h6.64l-3.34 3.29a1 1 0 1 0 1.4 1.42l5.06-5a1 1 0 0 0 .3-.71 1 1 0 0 0-.3-.71Z" /></symbol><symbol  viewBox="0 0 385 455" id="icon-security"><path d="M332.5 157.5H315v-35c0-43.767-23.348-84.208-61.25-106.09-37.902-21.88-84.598-21.88-122.5 0C93.348 38.291 70 78.732 70 122.5v35H52.5a52.51 52.51 0 0 0-37.125 15.374A52.51 52.51 0 0 0 0 210v192.5a52.51 52.51 0 0 0 15.375 37.125A52.51 52.51 0 0 0 52.5 455h280a52.51 52.51 0 0 0 37.125-15.375A52.51 52.51 0 0 0 385 402.5V210a52.51 52.51 0 0 0-15.375-37.125A52.51 52.51 0 0 0 332.5 157.5zm-227.5-35c0-31.263 16.676-60.149 43.75-75.778s60.426-15.629 87.5 0S280 91.238 280 122.5v35H105v-35zm245 280c0 4.64-1.844 9.093-5.125 12.374S337.141 420 332.5 420h-280c-4.64 0-9.094-1.844-12.375-5.125S35 407.14 35 402.5V210c0-4.64 1.844-9.094 5.125-12.375S47.859 192.5 52.5 192.5h280c4.64 0 9.094 1.844 12.375 5.125S350 205.36 350 210v192.5z" /><path d="M227.5 280a35.005 35.005 0 0 0-17.5-30.313 35.01 35.01 0 0 0-35 0A35.008 35.008 0 0 0 157.5 280a34.998 34.998 0 0 0 17.5 30.102V350a17.498 17.498 0 0 0 26.25 15.156A17.499 17.499 0 0 0 210 350v-39.898A34.996 34.996 0 0 0 227.5 280z" /></symbol><symbol viewBox="0 0 24 24"  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="icon-signin"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" /></symbol><symbol  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" id="icon-signout"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></symbol><symbol  viewBox="0 0 24 24" id="icon-spinner"><style>@keyframes spinner_zKoa{to{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,to{stroke-dasharray:42 150;stroke-dashoffset:-59}}</style><g style="transform-origin:center;animation:spinner_zKoa 2s linear infinite"><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="2" style="stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite" /></g></symbol><symbol  viewBox="0 0 513 374" id="icon-stereo"><path d="M198.337 69.951H136.5a11.86 11.86 0 0 1-7.23-2.566L56.933 7.655A35.205 35.205 0 0 0 32.45.288 35.24 35.24 0 0 0 0 35.187v303.33c-.042 6.656 1.825 13.184 5.384 18.809s8.652 10.113 14.684 12.926a34.096 34.096 0 0 0 19.094 3.25 34.062 34.062 0 0 0 17.773-7.684l72.332-58.332h.003a11.86 11.86 0 0 1 7.23-2.566h61.837a35.25 35.25 0 0 0 24.926-10.566 35.223 35.223 0 0 0 10.074-25.133v-165.2a35.239 35.239 0 0 0-35-34.066v-.004zm11.668 200.43H210a11.663 11.663 0 0 1-11.664 11.903h-61.836a35.923 35.923 0 0 0-21.934 7.699l-72.332 58.566a11.43 11.43 0 0 1-12.133 1.398 11.896 11.896 0 0 1-6.766-11.898V34.72a11.664 11.664 0 0 1 18.898-9.336l72.332 58.566a35.96 35.96 0 0 0 21.934 9.336h61.836a11.67 11.67 0 0 1 8.332 3.496 11.676 11.676 0 0 1 3.332 8.402l.005 165.198zm283.27-266.93a34.769 34.769 0 0 0-36.867 4.203L384.076 66.22h-.004a11.91 11.91 0 0 1-7.23 2.567h-61.837c-9.3.058-18.203 3.8-24.761 10.402a35.22 35.22 0 0 0-10.239 24.828v165.2c0 9.3 3.68 18.23 10.239 24.828a35.22 35.22 0 0 0 24.761 10.402h61.836a11.91 11.91 0 0 1 7.231 2.566l72.332 58.332.004.004a34.029 34.029 0 0 0 17.773 7.68 34.06 34.06 0 0 0 19.094-3.246c6.031-2.817 11.125-7.301 14.684-12.926s5.426-12.152 5.383-18.81V34.718a34.77 34.77 0 0 0-20.067-31.269v.003zm-3.27 334.6a11.9 11.9 0 0 1-6.765 10.734 10.966 10.966 0 0 1-12.133-1.402l-72.332-58.566a35.946 35.946 0 0 0-21.934-7.7h-61.836a11.664 11.664 0 0 1-11.664-11.898v-165.2a11.664 11.664 0 0 1 11.664-10.73h61.836a35.951 35.951 0 0 0 21.934-7.703l72.332-58.566a10.965 10.965 0 0 1 12.133-1.398 11.9 11.9 0 0 1 6.765 10.734V338.05z" /><text xml:space="preserve" font-family="sans-serif" font-size="130" stroke-width="0" y="227" x="74">L</text><text xml:space="preserve" font-family="sans-serif" font-size="130" stroke-width="0" y="225.471" x="358">R</text></symbol><symbol  viewBox="0 0 120 120" id="icon-track-mix"><circle cx="25" cy="25" r="25" fill="#39bb81" /><circle cx="25" cy="95" r="25" fill="#665dc3" /><path d="m95 35 25 25-25 25z" /><path stroke="currentColor" stroke-width="10" d="M75 60h20" /></symbol><symbol  viewBox="0 0 120 120" id="icon-track-music"><circle cx="95" cy="25" r="25" fill="#39bb81" /><circle cx="95" cy="95" r="21" stroke="currentColor" stroke-width="8" fill="transparent" /><path d="m20 0 25 25-25 25z" /><path stroke="#000" stroke-width="10" d="M0 25h20" /></symbol><symbol  viewBox="0 0 120 120" id="icon-track-stem"><path d="M0 8h120v14H0zM0 38h120v14H0zM0 68h120v14H0zM0 98h120v14H0z" /></symbol><symbol  viewBox="0 0 120 120" id="icon-track-vocal"><circle cx="95" cy="25" r="21" stroke="currentColor" stroke-width="8" fill="transparent" /><circle cx="95" cy="95" r="25" fill="#665dc3" /><path d="m20 70 25 25-25 25z" /><path stroke="#000" stroke-width="10" d="M0 95h20" /></symbol><symbol  viewBox="0 0 100 100" id="icon-trash"><path d="M17.8 91.8c.3 3.3 3 5.7 6.3 5.7h51.8c3.3 0 6-2.5 6.3-5.7L88 31H12l5.8 60.8zM62.7 50c0-1.7 1.4-3.2 3.2-3.2 1.7 0 3.2 1.4 3.2 3.2v28.5c0 1.7-1.4 3.2-3.2 3.2-1.7 0-3.2-1.4-3.2-3.2V50zm-15.9 0c0-1.7 1.4-3.2 3.2-3.2 1.7 0 3.2 1.4 3.2 3.2v28.5c0 1.7-1.4 3.2-3.2 3.2-1.7 0-3.2-1.4-3.2-3.2V50zM31 50c0-1.7 1.4-3.2 3.2-3.2 1.7 0 3.2 1.4 3.2 3.2v28.5c0 1.7-1.4 3.2-3.2 3.2-1.7 0-3.2-1.4-3.2-3.2V50zM88 12H62.7V8.8c0-3.5-2.8-6.3-6.3-6.3H43.7c-3.5 0-6.3 2.8-6.3 6.3V12H12c-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3h76c3.5 0 6.3-2.8 6.3-6.3S91.5 12 88 12z" /></symbol><symbol  viewBox="0 0 24 24" id="icon-undo"><path d="M6.3 14.71a1 1 0 1 0 1.4-1.42L4.36 10H11a8 8 0 0 1 8 8v2a1 1 0 0 0 2 0v-2A10 10 0 0 0 11 8H4.38L7.7 4.71a1 1 0 0 0-1.4-1.42l-5.06 5a1 1 0 0 0-.3.71 1 1 0 0 0 .3.71Z" /></symbol><symbol  viewBox="0 0 40 40" id="icon-vkontakte"><path d="M20 0C9 0 0 9 0 20s9 20 20 20 20-9 20-20S31 0 20 0z" fill="#1976d2" /><path d="M21.2 29.2c-9 0-14.1-6.1-14.3-16.4h4.5c.1 7.5 3.5 10.7 6.1 11.3V12.8h4.2v6.5c2.6-.3 5.3-3.2 6.2-6.5h4.2c-.7 4-3.7 7-5.8 8.2 2.1 1 5.5 3.6 6.7 8.2h-4.7c-1-3.1-3.5-5.5-6.8-5.9v5.9h-.3z" fill="#fff" /></symbol><symbol  viewBox="0 0 200 200" id="icon-write"><path d="M170 70.5a10 10 0 0 0-10 10V140a20.06 20.06 0 0 1-20 20H60a20.06 20.06 0 0 1-20-20V60a20.06 20.06 0 0 1 20-20h59.5a10 10 0 0 0 0-20H60a40.12 40.12 0 0 0-40 40v80a40.12 40.12 0 0 0 40 40h80a40.12 40.12 0 0 0 40-40V80.5a10 10 0 0 0-10-10Zm-77 39a9.67 9.67 0 0 0 14 0L164.5 52a9.9 9.9 0 0 0-14-14L93 95.5a9.67 9.67 0 0 0 0 14Z" /></symbol><symbol  viewBox="0 0 512.001 512.001" id="icon-flag-ar_AE"><path style="fill:#73af00" d="M473.655 88.276H158.897v111.816H512v-73.471c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#464655" d="M158.897 423.724h314.759c21.177 0 38.345-17.167 38.345-38.345v-73.471H158.897v111.816z" /><path style="fill:#f5f5f5" d="M158.9 200.09H512V311.9H158.9z" /><path style="fill:#ff4b55" d="M38.345 88.276C17.167 88.276 0 105.443 0 126.621V385.38c0 21.177 17.167 38.345 38.345 38.345h120.552V88.276H38.345z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-bg_BG"><path style="fill:#ff4b55" d="M38.345 423.724h435.31c21.177 0 38.345-17.167 38.345-38.345v-73.471H0v73.471c0 21.178 17.167 38.345 38.345 38.345z" /><path style="fill:#f5f5f5" d="M512 126.621c0-21.177-17.167-38.345-38.345-38.345H38.345C17.167 88.276 0 105.443 0 126.621v73.471h512v-73.471z" /><path style="fill:#73af00" d="M0 200.09h512V311.9H0z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-cs_CZ"><path style="fill:#41479b" d="M13.7 97.251C5.326 104.286 0 114.829 0 126.621V385.38c0 11.791 5.326 22.335 13.7 29.369L256 256 13.7 97.251z" /><path style="fill:#ff4b55" d="M13.7 414.749a38.18 38.18 0 0 0 24.644 8.975h435.31c21.177 0 38.345-17.167 38.345-38.345V256H256L13.7 414.749z" /><path style="fill:#f5f5f5" d="M473.655 88.276H38.345a38.188 38.188 0 0 0-24.644 8.975L256 256h256V126.621c0-21.178-17.167-38.345-38.345-38.345z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-da_DK"><path style="fill:#ff4b55" d="M473.655 423.724H38.345C17.167 423.724 0 406.557 0 385.379V126.621c0-21.177 17.167-38.345 38.345-38.345h435.31c21.177 0 38.345 17.167 38.345 38.345V385.38c0 21.177-17.167 38.344-38.345 38.344z" /><path style="fill:#f5f5f5" d="M512 229.517H211.862V88.276h-52.965v141.241H0v52.966h158.897v141.241h52.965V282.483H512z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-de_DE"><path style="fill:#464655" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621v73.471h512v-73.471c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#ffe15a" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345v-73.471H0v73.471z" /><path style="fill:#ff4b55" d="M0 200.09h512V311.9H0z" /></symbol><symbol  viewBox="0 0 512.4 512.4" id="icon-flag-el_GR"><path style="fill:#f5f5f5" d="M512 125.7c-.6-20.7-17.5-37.3-38.3-37.3H38.3C17.2 88.5 0 105.6 0 126.8V386.7c.1 5.2 1.3 10.1 3.3 14.5.2.6.5 1.1.8 1.6.3.5.5 1 .8 1.6v.1l.9 1.5s0 .1.1.1c.3.5.6.9.9 1.4l.1.1c.3.5.6.9 1 1.3 0 .1.1.1.1.2.3.4.7.8 1 1.2l.2.2c.3.4.7.8 1 1.2l.2.2c.3.4.7.7 1.1 1.1l.2.2c.4.3.7.7 1.1 1l.3.3c.4.3.7.6 1.1.9.1.1.2.2.4.3.4.3.7.6 1.1.8.1.1.3.2.4.3.4.3.7.5 1.1.7.2.1.3.2.5.3.4.2.7.5 1.1.7.2.1.4.2.5.3.3.2.7.4 1 .6l.6.3c.3.2.7.4 1 .5.2.1.4.2.7.3.3.2.7.3 1 .5.2.1.5.2.7.3.3.1.7.3 1 .4.3.1.5.2.8.3s.6.2 1 .3c.3.1.6.2.9.2l.9.3c.3.1.6.1.9.2.3.1.6.1.9.2.3.1.7.1 1 .2.3.1.6.1.9.2.4.1.7.1 1.1.1.3 0 .5.1.8.1.4 0 .8.1 1.3.1.2 0 .4 0 .7.1h439.3c.2 0 .4 0 .7-.1.4 0 .8-.1 1.3-.1.3 0 .5-.1.8-.1.4 0 .7-.1 1.1-.1.3 0 .6-.1.9-.2.3-.1.7-.1 1-.2.3-.1.6-.1.9-.2.3-.1.6-.1.9-.2l.9-.3c.3-.1.6-.2.9-.2.3-.1.6-.2 1-.3.3-.1.5-.2.8-.3.3-.1.7-.3 1-.4.2-.1.5-.2.7-.3.3-.1.7-.3 1-.5.2-.1.4-.2.7-.3.3-.2.7-.3 1-.5l.6-.3c.4-.2.7-.4 1-.6.2-.1.4-.2.5-.3.4-.2.7-.4 1.1-.7.2-.1.3-.2.5-.3.4-.2.7-.5 1.1-.7.1-.1.3-.2.4-.3.4-.3.7-.5 1.1-.8.1-.1.2-.2.4-.3.4-.3.7-.6 1.1-.9l.3-.3c.4-.3.7-.7 1.1-1 .1-.1.2-.2.3-.2l1.1-1.1.2-.2c.4-.4.7-.8 1-1.2l.2-.2c.3-.4.7-.8 1-1.2 0-.1.1-.1.1-.2.3-.4.7-.9 1-1.3l.1-.1c.3-.5.6-.9.9-1.4 0 0 0-.1.1-.1l.9-1.5v-.1c.3-.5.6-1 .8-1.6.3-.5.5-1.1.8-1.6 2-4.5 3.2-9.4 3.3-14.5V126.8c-.4-.3-.4-.7-.4-1.1z" /><path style="fill:#41479b" d="M0 312.1h512v37.3H0v-37.3zm3.3 89.1c.2.6.5 1.1.8 1.6.3.5.5 1 .8 1.6v.1l.9 1.5s0 .1.1.1c.3.5.6.9.9 1.4l.1.1c.3.5.6.9 1 1.3 0 .1.1.1.1.2.3.4.7.8 1 1.2l.2.2c.3.4.7.8 1 1.2l.2.2c.3.4.7.7 1.1 1.1l.2.2c.4.3.7.7 1.1 1l.3.3c.4.3.7.6 1.1.9.1.1.2.2.4.3.4.3.7.6 1.1.8.1.1.3.2.4.3.4.3.7.5 1.1.7.2.1.3.2.5.3.4.2.7.5 1.1.7.2.1.4.2.5.3.3.2.7.4 1 .6l.6.3c.3.2.7.4 1 .5.2.1.4.2.7.3.3.2.7.3 1 .5.2.1.5.2.7.3.3.1.7.3 1 .4.3.1.5.2.8.3.3.1.6.2 1 .3.3.1.6.2.9.2l.9.3c.3.1.6.1.9.2.3.1.6.1.9.2.3.1.7.1 1 .2.3.1.6.1.9.2.4.1.7.1 1.1.1.3 0 .5.1.8.1.4 0 .8.1 1.3.1.2 0 .4 0 .7.1h439.3c.2 0 .4 0 .7-.1.4 0 .8-.1 1.3-.1.3 0 .5-.1.8-.1.4 0 .7-.1 1.1-.1.3 0 .6-.1.9-.2.3-.1.7-.1 1-.2.3-.1.6-.1.9-.2.3-.1.6-.1.9-.2l.9-.3c.3-.1.6-.2.9-.2.3-.1.6-.2 1-.3.3-.1.5-.2.8-.3s.7-.3 1-.4c.2-.1.5-.2.7-.3.3-.1.7-.3 1-.5.2-.1.4-.2.7-.3.3-.2.7-.3 1-.5l.6-.3c.4-.2.7-.4 1-.6.2-.1.4-.2.5-.3.4-.2.7-.4 1.1-.7.2-.1.3-.2.5-.3.4-.2.7-.5 1.1-.7.1-.1.3-.2.4-.3.4-.3.7-.5 1.1-.8.1-.1.2-.2.4-.3.4-.3.7-.6 1.1-.9l.3-.3c.4-.3.7-.7 1.1-1 .1-.1.2-.2.3-.2l1.1-1.1.2-.2c.4-.4.7-.8 1-1.2l.2-.2c.3-.4.7-.8 1-1.2 0-.1.1-.1.1-.2.3-.4.7-.9 1-1.3l.1-.1c.3-.5.6-.9.9-1.4 0 0 0-.1.1-.1l.9-1.5v-.1c.3-.5.6-1 .8-1.6.3-.5.5-1.1.8-1.6 2-4.5 3.2-9.4 3.3-14.5H0c.2 5.1 1.3 10 3.3 14.5zM176.6 163v37.3H107v74.5h405v-37.3H176.6v-37.3H512v-37.3H176.6v.1zm-107 37.3H0v74.6h69.6v-74.6zM512 125.7c-.6-20.7-17.5-37.3-38.3-37.3H106.9v74.5h69.6v-37.3H512v.1zM69.6 88.5H38.3C17.2 88.5 0 105.6 0 126.8V163h69.6V88.5z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-en_GB"><path style="fill:#41479b" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621V385.38c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.621c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#f5f5f5" d="M511.469 120.282c-3.022-18.159-18.797-32.007-37.814-32.007h-9.977l-163.54 107.147V88.276h-88.276v107.147L48.322 88.276h-9.977c-19.017 0-34.792 13.847-37.814 32.007l139.778 91.58H0v88.276h140.309L.531 391.717c3.022 18.159 18.797 32.007 37.814 32.007h9.977l163.54-107.147v107.147h88.276V316.577l163.54 107.147h9.977c19.017 0 34.792-13.847 37.814-32.007l-139.778-91.58H512v-88.276H371.691l139.778-91.579z" /><path style="fill:#ff4b55" d="M282.483 88.276h-52.966v141.241H0v52.966h229.517v141.241h52.966V282.483H512v-52.966H282.483z" /><path style="fill:#ff4b55" d="m24.793 421.252 186.583-121.114h-32.428L9.224 410.31a38.393 38.393 0 0 0 15.569 10.942zM346.388 300.138H313.96l180.716 117.305a38.515 38.515 0 0 0 12.287-13.075l-160.575-104.23zM4.049 109.475l157.73 102.387h32.428L15.475 95.842a38.499 38.499 0 0 0-11.426 13.633zM332.566 211.862l170.035-110.375a38.4 38.4 0 0 0-15.699-10.86L300.138 211.862h32.428z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-es_ES"><path style="fill:#c8414b" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345v-32.276H0v32.276zM473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621v32.276h512v-32.276c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#ffd250" d="M0 158.9h512v194.21H0z" /><path style="fill:#c8414b" d="m216.276 256 7.485-33.681c.69-3.102-1.671-6.044-4.849-6.044h-5.272c-3.177 0-5.537 2.943-4.849 6.044L216.276 256z" /><path style="fill:#f5f5f5" d="M207.45 238.34h17.655v75.03H207.45z" /><path style="fill:#fab446" d="M203.03 229.52h26.483v8.828H203.03z" /><path style="fill:#c8414b" d="M185.38 256h44.14v8.828h-44.14zM229.517 291.31l-26.483-8.827v-8.828l26.483 8.828zM83.862 256l7.485-33.681c.69-3.102-1.671-6.044-4.849-6.044h-5.272c-3.177 0-5.537 2.943-4.849 6.044L83.862 256z" /><path style="fill:#f5f5f5" d="M114.759 229.517a8.829 8.829 0 0 0-8.828 8.828v57.379c0 10.725 10.01 30.897 44.138 30.897s44.138-20.171 44.138-30.897v-57.379a8.829 8.829 0 0 0-8.828-8.828h-70.62z" /><path style="fill:#c8414b" d="M150.069 273.655h-44.138v-35.31a8.829 8.829 0 0 1 8.828-8.828h35.31v44.138zM150.069 273.655h44.138v22.069c0 12.189-9.88 22.069-22.069 22.069-12.189 0-22.069-9.88-22.069-22.069v-22.069z" /><path style="fill:#fab446" d="M105.931 273.655h44.138v22.069c0 12.189-9.88 22.069-22.069 22.069-12.189 0-22.069-9.88-22.069-22.069v-22.069z" /><path style="fill:#c8414b" d="M141.241 313.28v-39.625h-8.828v43.693c3.284-.666 6.251-2.12 8.828-4.068zM123.586 317.348v-43.693h-8.828v39.625c2.578 1.948 5.545 3.402 8.828 4.068z" /><path style="fill:#ffb441" d="M114.76 256h26.483v8.828H114.76z" /><path style="fill:#fab446" d="M114.76 238.34h26.483v8.828H114.76z" /><path style="fill:#fab446" d="M119.17 243.59h17.655v15.992H119.17z" /><path style="fill:#f5f5f5" d="M75.03 238.34h17.655v75.03H75.03z" /><path style="fill:#fab446" d="M70.62 308.97h26.483v8.828H70.62zM70.62 229.52h26.483v8.828H70.62z" /><path style="fill:#5064aa" d="M66.21 317.79h35.31v8.828H66.21z" /><path style="fill:#fab446" d="M207.45 308.97h26.483v8.828H207.45z" /><path style="fill:#5064aa" d="M198.62 317.79h35.31v8.828h-35.31z" /><path style="fill:#fab446" d="M123.59 220.69h52.966v8.828H123.59z" /><path style="fill:#ffb441" d="M145.66 194.21h8.828v26.483h-8.828z" /><path style="fill:#f5f5f5" d="M141.241 207.448c-7.302 0-13.241-5.94-13.241-13.241 0-7.302 5.94-13.241 13.241-13.241 7.302 0 13.241 5.94 13.241 13.241.001 7.301-5.939 13.241-13.241 13.241zm0-17.655a4.417 4.417 0 0 0-4.414 4.414c0 2.435 1.978 4.414 4.414 4.414s4.414-1.978 4.414-4.414a4.417 4.417 0 0 0-4.414-4.414z" /><path style="fill:#f5f5f5" d="M158.897 207.448c-7.302 0-13.241-5.94-13.241-13.241 0-7.302 5.94-13.241 13.241-13.241 7.302 0 13.241 5.94 13.241 13.241s-5.94 13.241-13.241 13.241zm0-17.655a4.417 4.417 0 0 0-4.414 4.414 4.417 4.417 0 0 0 4.414 4.414 4.417 4.417 0 0 0 4.414-4.414 4.418 4.418 0 0 0-4.414-4.414z" /><path style="fill:#f5f5f5" d="M176.552 216.276c-7.302 0-13.241-5.94-13.241-13.241 0-7.302 5.94-13.241 13.241-13.241 7.302 0 13.241 5.94 13.241 13.241s-5.94 13.241-13.241 13.241zm0-17.655a4.417 4.417 0 0 0-4.414 4.414 4.417 4.417 0 0 0 4.414 4.414c2.435 0 4.414-1.978 4.414-4.414s-1.979-4.414-4.414-4.414zM123.586 216.276c-7.302 0-13.241-5.94-13.241-13.241 0-7.302 5.94-13.241 13.241-13.241 7.302 0 13.241 5.94 13.241 13.241.001 7.301-5.939 13.241-13.241 13.241zm0-17.655a4.417 4.417 0 0 0-4.414 4.414c0 2.435 1.978 4.414 4.414 4.414S128 205.47 128 203.034a4.416 4.416 0 0 0-4.414-4.413z" /><path style="fill:#fab446" d="M176.552 291.31v4.414c0 2.434-1.98 4.414-4.414 4.414s-4.414-1.98-4.414-4.414v-4.414h8.828m8.827-8.827h-26.483v13.241c0 7.302 5.94 13.241 13.241 13.241 7.302 0 13.241-5.94 13.241-13.241v-13.241h.001z" /><path style="fill:#ffa0d2" d="M172.138 264.828A8.829 8.829 0 0 1 163.31 256v-8.828a8.829 8.829 0 0 1 17.656 0V256a8.829 8.829 0 0 1-8.828 8.828z" /><circle style="fill:#5064aa" cx="150.07" cy="273.65" r="13.241" /><path style="fill:#fab446" d="M145.66 176.55h8.828v26.483h-8.828z" /><path style="fill:#c8414b" d="m123.586 220.69-8.828-8.828 5.171-5.171a42.627 42.627 0 0 1 60.28 0l5.171 5.171-8.828 8.828h-52.966z" /><circle style="fill:#ffd250" cx="150.07" cy="211.86" r="4.414" /><circle style="fill:#ffd250" cx="132.41" cy="211.86" r="4.414" /><circle style="fill:#ffd250" cx="167.72" cy="211.86" r="4.414" /><path style="fill:#c8414b" d="M70.62 256h44.14v8.828H70.62zM70.621 291.31l26.482-8.827v-8.828l-26.482 8.828z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-et_EE"><path style="fill:#4173cd" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621v73.471h512v-73.471c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#f5f5f5" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345v-73.471H0v73.471z" /><path style="fill:#464655" d="M0 200.09h512V311.9H0z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-fi_FI"><path style="fill:#f5f5f5" d="M473.655 423.724H38.345C17.167 423.724 0 406.557 0 385.379V126.621c0-21.177 17.167-38.345 38.345-38.345h435.31c21.177 0 38.345 17.167 38.345 38.345V385.38c0 21.177-17.167 38.344-38.345 38.344z" /><path style="fill:#41479b" d="M512 229.517H211.862V88.276h-52.965v141.241H0v52.966h158.897v141.241h52.965V282.483H512z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-fr_FR"><path style="fill:#41479b" d="M38.345 88.273C17.167 88.273 0 105.44 0 126.618v258.759c0 21.177 17.167 38.345 38.345 38.345h132.322V88.273H38.345z" /><path style="fill:#f5f5f5" d="M170.67 88.277h170.67v335.45H170.67z" /><path style="fill:#ff4b55" d="M473.655 88.273H341.333v335.448h132.322c21.177 0 38.345-17.167 38.345-38.345V126.618c0-21.178-17.167-38.345-38.345-38.345z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-ga_IE"><path style="fill:#73af00" d="M38.345 88.273C17.167 88.273 0 105.44 0 126.618v258.759c0 21.177 17.167 38.345 38.345 38.345h132.322V88.273H38.345z" /><path style="fill:#f5f5f5" d="M170.67 88.277h170.67v335.45H170.67z" /><path style="fill:#ff9b46" d="M473.655 88.273H341.333v335.448h132.322c21.177 0 38.345-17.167 38.345-38.345V126.618c0-21.178-17.167-38.345-38.345-38.345z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-he_IL"><path style="fill:#41479b" d="M473.655 88.275H38.345C17.167 88.275 0 105.442 0 126.62v258.76c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.62c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#f5f5f5" d="M0 150.07h512v211.86H0z" /><path style="fill:#41479b" d="m301.869 255.999 22.933-39.721h-45.865L256 176.551l-22.936 39.727h-45.865l22.933 39.721-22.933 39.721h45.865L256 335.448l22.936-39.727h45.865l-22.932-39.722zm.433-26.729-7.933 13.74-7.933-13.74h15.866zm-15.433 26.729-15.433 26.73h-30.873l-15.432-26.73 15.433-26.73h30.873l15.432 26.73zM256 202.533l7.936 13.746h-15.872L256 202.533zm-46.302 26.737h15.865l-7.933 13.74-7.932-13.74zm0 53.459 7.933-13.74 7.933 13.74h-15.866zM256 309.466l-7.936-13.746h15.872L256 309.466zm38.369-40.476 7.933 13.74h-15.865l7.932-13.74z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-hi_IN"><path style="fill:#fab446" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621v73.471h512v-73.471c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#73af00" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345v-73.471H0v73.471z" /><path style="fill:#f5f5f5" d="M0 200.09h512V311.9H0z" /><path style="fill:#41479b" d="M256 303.448c-26.164 0-47.448-21.284-47.448-47.448s21.284-47.448 47.448-47.448 47.448 21.284 47.448 47.448-21.284 47.448-47.448 47.448zm0-86.069c-21.298 0-38.621 17.323-38.621 38.621s17.323 38.621 38.621 38.621 38.621-17.323 38.621-38.621-17.323-38.621-38.621-38.621z" /><circle style="fill:#41479b" cx="256" cy="256" r="5.379" /><path style="fill:#41479b" d="m256 256.807-13.67 1.38-29.364-1.38v-1.614l29.364-1.38 13.67 1.38zM256 256.807l13.67 1.38 29.364-1.38v-1.614l-29.364-1.38-13.67 1.38z" /><path style="fill:#41479b" d="m255.193 256-1.38-13.67 1.38-29.364h1.614l1.38 29.364-1.38 13.67zM255.193 256l-1.38 13.67 1.38 29.364h1.614l1.38-29.364-1.38-13.67z" /><path style="fill:#41479b" d="m255.43 256.57-10.642-8.689L225 226.141l1.141-1.141 21.74 19.788 8.689 10.642z" /><path style="fill:#41479b" d="m255.43 256.57 8.689 10.642L285.859 287l1.141-1.141-19.788-21.74-10.642-8.689z" /><path style="fill:#41479b" d="m255.43 255.43 8.689-10.642L285.859 225l1.141 1.141-19.788 21.74-10.642 8.689z" /><path style="fill:#41479b" d="m255.43 255.43-10.642 8.689L225 285.859l1.141 1.141 21.74-19.788 8.689-10.642z" /><path style="fill:#41479b" d="m256.309 256.746-12.102 6.506-27.656 9.962-.618-1.491 26.601-12.512 13.157-3.957z" /><path style="fill:#41479b" d="m256.309 256.746 13.157-3.957 26.601-12.512-.618-1.491-27.656 9.962-12.102 6.506z" /><path style="fill:#41479b" d="m255.254 256.309-6.506-12.102-9.962-27.656 1.491-.618 12.512 26.601 3.957 13.157z" /><path style="fill:#41479b" d="m255.254 256.309 3.957 13.157 12.512 26.601 1.491-.618-9.962-27.656-6.506-12.102z" /><path style="fill:#41479b" d="m255.691 256.746-13.157-3.957-26.601-12.512.618-1.491 27.656 9.962 12.102 6.506zM255.691 256.746l12.102 6.506 27.656 9.962.618-1.491-26.601-12.512-13.157-3.957z" /><path style="fill:#41479b" d="m255.254 255.691 3.957-13.157 12.512-26.601 1.491.618-9.962 27.656-6.506 12.102zM255.254 255.691l-6.506 12.102-9.962 27.656 1.491.618 12.512-26.601 3.957-13.157z" /><circle style="fill:#f5f5f5" cx="256" cy="256" r="7.256" /><circle style="fill:#41479b" cx="256" cy="256" r="4.351" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-hr_HR"><path style="fill:#41479b" d="M0 385.38c0 21.176 17.167 38.345 38.345 38.345h435.311c21.165 0 38.324-17.148 38.344-38.307v-73.509H0v73.471z" /><path style="fill:#ff4b55" d="M473.656 88.275H38.345C17.167 88.275 0 105.443 0 126.62v73.471h512v-73.509c-.02-21.158-17.179-38.307-38.344-38.307z" /><path style="fill:#f5f5f5" d="M0 200.089h512v111.81H0z" /><path style="fill:#ff4b55" d="M194.21 203.029h24.717v28.25H194.21zM243.64 203.029h24.717v28.25H243.64zM218.93 231.279h24.717v28.25H218.93zM293.08 203.029h24.717v28.25H293.08zM268.36 231.279h24.717v28.25H268.36z" /><path style="fill:#f5f5f5" d="M218.93 203.029h24.717v28.25H218.93zM268.36 203.029h24.717v28.25H268.36zM194.21 231.279h24.717v28.25H194.21zM243.64 231.279h24.717v28.25H243.64zM293.08 231.279h24.717v28.25H293.08z" /><path style="fill:#ff4b55" d="M243.64 259.529h24.717v28.25H243.64zM218.93 287.779h24.717v28.25H218.93zM268.36 287.779h24.717v28.25H268.36z" /><path style="fill:#f5f5f5" d="M218.93 259.529h24.717v28.25H218.93zM268.36 259.529h24.717v28.25H268.36zM243.64 287.779h24.717v28.25H243.64z" /><path style="fill:#ff4b55" d="M317.793 203.035v79.448c0 34.128-27.666 61.793-61.793 61.793s-61.793-27.666-61.793-61.793v-79.448h123.586m4.413-4.415H189.792v83.862c0 36.507 29.7 66.207 66.207 66.207s66.207-29.701 66.207-66.207V198.62z" /><path style="fill:#ff4b55" d="M218.924 287.779V259.53h-24.717v22.953c0 1.789.118 3.546.267 5.297l24.45-.001z" /><path style="fill:#f5f5f5" d="M317.526 287.779h-24.45v28.248h14.774a61.375 61.375 0 0 0 9.676-28.248zM204.149 316.028h14.774V287.78h-24.45a61.383 61.383 0 0 0 9.676 28.248z" /><path style="fill:#ff4b55" d="M293.075 287.779h24.45c.149-1.749.267-3.508.267-5.297V259.53h-24.717v28.249zM218.924 331.833v-15.805H204.15c3.957 6.105 8.972 11.439 14.774 15.805zM307.849 316.028h-14.774v15.806c5.801-4.367 10.815-9.701 14.774-15.806z" /><path style="fill:#f5f5f5" d="M218.924 331.833c7.195 5.415 15.567 9.345 24.717 11.202v-27.007h-24.717v15.805zM268.358 343.034c9.15-1.857 17.523-5.788 24.717-11.202v-15.805h-24.717v27.007z" /><path style="fill:#ff4b55" d="M268.358 316.028h-24.717v27.008A62.043 62.043 0 0 0 256 344.277c4.233 0 8.365-.43 12.359-1.241v-27.008h-.001z" /><path style="fill:#4173cd" d="M211.27 156.29a180.927 180.927 0 0 0-16.489-1.779 189.969 189.969 0 0 0-12.398 11.15l11.823 28.545a161.574 161.574 0 0 1 24.247-7.867l-7.183-30.049zM271.002 151.604a184.805 184.805 0 0 0-15.003-6.765 185.653 185.653 0 0 0-15.003 6.765l2.41 30.803a161.163 161.163 0 0 1 25.186 0l2.41-30.803zM329.616 165.661a190.81 190.81 0 0 0-12.398-11.15c-5.609.346-11.111.947-16.489 1.779l-7.184 30.049a161.46 161.46 0 0 1 24.247 7.867l11.824-28.545z" /><path style="fill:#41479b" d="M240.996 151.604a183.1 183.1 0 0 0-15.894-4.346 187.354 187.354 0 0 0-13.832 9.033l7.183 30.049a161.442 161.442 0 0 1 24.952-3.933l-2.409-30.803zM300.729 156.29a187.453 187.453 0 0 0-13.832-9.033 183.718 183.718 0 0 0-15.894 4.346l-2.41 30.803a161.322 161.322 0 0 1 24.952 3.933l7.184-30.049z" /><path style="fill:#ff4b55" d="M241.96 163.925a179.702 179.702 0 0 0-27.817 4.385l-1.437-6.011a186.473 186.473 0 0 1 28.771-4.535l.483 6.161zM242.925 176.245a167.663 167.663 0 0 0-25.907 4.084l-1.437-6.009a173.602 173.602 0 0 1 26.862-4.234c.159 2.051.321 4.107.482 6.159z" /><path style="fill:#ffe15a" d="M285.326 178.32a167.55 167.55 0 0 0-6.482-1.022c-3.562-.492-6.215-3.516-5.906-6.915.308-3.398 3.713-5.863 7.59-5.327 2.325.32 4.646.685 6.959 1.097 3.859.682 6.357 4.082 5.604 7.406-.75 3.332-4.218 5.386-7.765 4.761z" /><path style="fill:#ff4b55" d="M320.157 188.497a167.924 167.924 0 0 0-25.175-8.168l1.437-6.009a173.739 173.739 0 0 1 26.103 8.468l-2.365 5.709z" /><path style="fill:#ffe15a" d="M317.952 169.958c-.873 2.407-3.817 3.552-6.599 2.647-2.781-.906-4.483-3.55-3.779-6.012.704-2.462 3.686-3.765 6.636-2.806 2.953.957 4.616 3.764 3.742 6.171zM204.424 166.594c.703 2.464-1 5.109-3.779 6.012-2.781.9-5.725-.245-6.599-2.647-.874-2.408.79-5.214 3.742-6.171 2.95-.956 5.934.346 6.636 2.806zM254.589 162.548c.006 2.047-1.834 3.714-4.114 3.784-2.279.073-4.222-1.481-4.342-3.52-.119-2.04 1.719-3.806 4.111-3.883 2.393-.075 4.336 1.572 4.345 3.619zM265.865 162.811c-.121 2.044-2.065 3.593-4.342 3.52-2.279-.07-4.119-1.737-4.114-3.784.009-2.045 1.953-3.697 4.344-3.619 2.393.073 4.229 1.842 4.112 3.883zM260.007 172.079c-.057 2.047-1.85 3.657-4.008 3.657-2.156-.001-3.949-1.609-4.008-3.657-.056-2.041 1.737-3.755 4.008-3.75 2.271-.005 4.064 1.707 4.008 3.75z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-hu_HU"><path style="fill:#ff4b55" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621v73.471h512v-73.471c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#73af00" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345v-73.471H0v73.471z" /><path style="fill:#f5f5f5" d="M0 200.09h512V311.9H0z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-id_ID"><path style="fill:#c8414b" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621V256h512V126.621c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#f5f5f5" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V256H0v129.379z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-it_IT"><path style="fill:#73af00" d="M38.345 88.273C17.167 88.273 0 105.44 0 126.618v258.759c0 21.177 17.167 38.345 38.345 38.345h132.322V88.273H38.345z" /><path style="fill:#f5f5f5" d="M170.67 88.277h170.67v335.45H170.67z" /><path style="fill:#ff4b55" d="M473.655 88.273H341.333v335.448h132.322c21.177 0 38.345-17.167 38.345-38.345V126.618c0-21.178-17.167-38.345-38.345-38.345z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-ja_JP"><path style="fill:#f5f5f5" d="M473.655 88.275H38.345C17.167 88.275 0 105.442 0 126.62v258.76c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.62c0-21.178-17.167-38.345-38.345-38.345z" /><circle style="fill:#ff4b55" cx="256" cy="255.999" r="97.1" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-ko_KR"><path style="fill:#f5f5f5" d="M473.655 88.275H38.345C17.167 88.275 0 105.442 0 126.62v258.76c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.62c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#ff4b55" d="M305.009 182.531c-40.563-27.042-95.35-15.986-122.374 24.506-13.555 20.211-8.045 47.674 12.235 61.195 20.265 13.521 47.64 8.03 61.161-12.252 13.521-20.281 40.914-25.704 61.178-12.254 20.298 13.521 25.757 40.984 12.217 61.195 27.042-40.559 16.111-95.347-24.417-122.39" /><path style="fill:#41479b" d="M182.634 207.038c-13.555 20.211-8.045 47.674 12.235 61.195 20.265 13.521 47.64 8.03 61.161-12.252 13.521-20.281 40.914-25.704 61.178-12.254 20.298 13.521 25.757 40.984 12.217 61.195-27.006 40.632-81.775 51.549-122.338 24.507-40.526-27.039-51.494-81.827-24.453-122.391" /><path style="fill:#464655" d="m349.92 149.189 16.035 24.102a4.414 4.414 0 0 1-1.219 6.112l-4.066 2.723a4.414 4.414 0 0 1-6.129-1.22l-16.055-24.096a4.415 4.415 0 0 1 1.223-6.119l4.086-2.728a4.414 4.414 0 0 1 6.125 1.226zM374.66 186.35l16.087 24.087a4.414 4.414 0 0 1-1.237 6.134l-4.084 2.699a4.413 4.413 0 0 1-6.103-1.23l-16.078-24.062a4.414 4.414 0 0 1 1.217-6.122l4.075-2.724a4.414 4.414 0 0 1 6.123 1.218zM367.089 137.731l40.829 61.273a4.413 4.413 0 0 1-1.225 6.12l-4.102 2.734a4.414 4.414 0 0 1-6.121-1.224l-40.843-61.269a4.415 4.415 0 0 1 1.227-6.123l4.115-2.739a4.418 4.418 0 0 1 6.12 1.228zM384.211 126.291l16.07 24.149a4.412 4.412 0 0 1-1.241 6.127l-4.087 2.7a4.412 4.412 0 0 1-6.105-1.234l-16.082-24.117a4.415 4.415 0 0 1 1.224-6.122l4.099-2.732a4.413 4.413 0 0 1 6.122 1.229zM408.967 163.531l16.045 24.099a4.413 4.413 0 0 1-1.22 6.115l-4.075 2.724a4.414 4.414 0 0 1-6.127-1.223l-16.045-24.099a4.414 4.414 0 0 1 1.22-6.115l4.075-2.724a4.411 4.411 0 0 1 6.127 1.223zM132.721 293.982l40.824 61.207a4.413 4.413 0 0 1-1.222 6.12l-4.088 2.73a4.414 4.414 0 0 1-6.123-1.222l-40.824-61.207a4.412 4.412 0 0 1 1.222-6.12l4.089-2.73a4.413 4.413 0 0 1 6.122 1.222zM115.582 305.43l16.028 24.041a4.413 4.413 0 0 1-1.217 6.116l-4.066 2.722a4.414 4.414 0 0 1-6.126-1.217l-16.047-24.035a4.413 4.413 0 0 1 1.22-6.122l4.086-2.728a4.414 4.414 0 0 1 6.122 1.223zM140.351 342.604l16.046 24.102a4.412 4.412 0 0 1-1.222 6.115l-4.078 2.727a4.414 4.414 0 0 1-6.126-1.222l-16.056-24.097a4.413 4.413 0 0 1 1.222-6.118l4.088-2.73a4.413 4.413 0 0 1 6.126 1.223zM98.442 316.875l40.798 61.21a4.416 4.416 0 0 1-1.219 6.118l-4.077 2.726a4.414 4.414 0 0 1-6.125-1.22l-40.822-61.202a4.415 4.415 0 0 1 1.224-6.122l4.102-2.734a4.412 4.412 0 0 1 6.119 1.224zM121.294 210.441l40.818-61.257a4.414 4.414 0 0 1 6.124-1.224l4.087 2.729a4.415 4.415 0 0 1 1.222 6.12l-40.834 61.223a4.414 4.414 0 0 1-6.108 1.231l-4.071-2.695a4.413 4.413 0 0 1-1.238-6.127zM104.147 199.008l40.825-61.269a4.414 4.414 0 0 1 6.126-1.222l4.077 2.726a4.413 4.413 0 0 1 1.22 6.116l-40.814 61.272a4.413 4.413 0 0 1-6.124 1.224l-4.088-2.729a4.413 4.413 0 0 1-1.222-6.118zM86.99 187.624l40.829-61.33a4.415 4.415 0 0 1 6.127-1.224l4.077 2.726a4.414 4.414 0 0 1 1.222 6.114l-40.804 61.339a4.415 4.415 0 0 1-6.123 1.228l-4.1-2.734a4.415 4.415 0 0 1-1.228-6.119zM338.493 355.188l16.047-24.035a4.414 4.414 0 0 1 6.126-1.217l4.066 2.722a4.413 4.413 0 0 1 1.216 6.116l-16.028 24.04a4.414 4.414 0 0 1-6.123 1.223l-4.086-2.728a4.413 4.413 0 0 1-1.218-6.121zM363.243 318.141l16.073-24.154a4.414 4.414 0 0 1 6.123-1.227l4.096 2.73a4.415 4.415 0 0 1 1.223 6.124l-16.107 24.116a4.413 4.413 0 0 1-6.109 1.227l-4.062-2.692a4.414 4.414 0 0 1-1.237-6.124zM355.626 366.698l16.057-24.098a4.414 4.414 0 0 1 6.122-1.225l4.104 2.737a4.415 4.415 0 0 1 1.225 6.119l-16.047 24.1a4.414 4.414 0 0 1-6.12 1.228l-4.115-2.739a4.416 4.416 0 0 1-1.226-6.122zM380.403 329.463l16.066-24.042a4.415 4.415 0 0 1 6.119-1.22l4.102 2.734a4.413 4.413 0 0 1 1.221 6.125l-16.066 24.043a4.414 4.414 0 0 1-6.118 1.22l-4.103-2.734a4.414 4.414 0 0 1-1.221-6.126zM372.771 378.081l16.075-24.056a4.414 4.414 0 0 1 6.103-1.23l4.086 2.7a4.414 4.414 0 0 1 1.239 6.131l-16.063 24.088a4.415 4.415 0 0 1-6.121 1.224l-4.098-2.732a4.413 4.413 0 0 1-1.221-6.125zM397.554 340.969l16.035-24.085a4.414 4.414 0 0 1 6.127-1.223l4.072 2.722a4.414 4.414 0 0 1 1.218 6.119l-16.049 24.053a4.413 4.413 0 0 1-6.11 1.229l-4.06-2.69a4.415 4.415 0 0 1-1.233-6.125z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-lt_LT"><path style="fill:#ff4b55" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345v-73.471H0v73.471z" /><path style="fill:#ffe15a" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621v73.471h512v-73.471c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#73af00" d="M0 200.09h512V311.9H0z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-lv_LV"><path style="fill:#c8414b" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621v98.483h512v-98.483c0-21.178-17.167-38.345-38.345-38.345zM0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345v-98.483H0v98.483z" /><path style="fill:#f5f5f5" d="M0 225.1h512v61.793H0z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-nb_NO"><path style="fill:#ff4b55" d="M473.655 423.724H38.345C17.167 423.724 0 406.557 0 385.379V126.621c0-21.177 17.167-38.345 38.345-38.345h435.31c21.177 0 38.345 17.167 38.345 38.345V385.38c0 21.177-17.167 38.344-38.345 38.344z" /><path style="fill:#f5f5f5" d="M512 211.862H229.517V88.276h-88.276v123.586H0v88.276h141.241v123.586h88.276V300.138H512z" /><path style="fill:#41479b" d="M512 229.517H211.862V88.276h-52.965v141.241H0v52.966h158.897v141.241h52.965V282.483H512z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-nl_NL"><path style="fill:#ff4b55" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621v73.471h512v-73.471c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#41479b" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345v-73.471H0v73.471z" /><path style="fill:#f5f5f5" d="M0 200.09h512V311.9H0z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-pl_PL"><path style="fill:#ff4b55" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V256H0v129.379z" /><path style="fill:#f5f5f5" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621V256h512V126.621c0-21.178-17.167-38.345-38.345-38.345z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-pt_BR"><path style="fill:#73af00" d="M473.655 88.275H38.345C17.167 88.275 0 105.442 0 126.62v258.76c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.62c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#ffe15a" d="M251.41 135.207 65.354 248.458c-5.651 3.439-5.651 11.641 0 15.081L251.41 376.792a8.828 8.828 0 0 0 9.18 0L446.646 263.54c5.651-3.439 5.651-11.641 0-15.081L260.59 135.207a8.833 8.833 0 0 0-9.18 0z" /><circle style="fill:#41479b" cx="256" cy="255.999" r="70.62" /><path style="fill:#f5f5f5" d="M195.4 219.872a70.117 70.117 0 0 0-7.605 18.077c39.149-2.946 97.062 8.006 133.922 43.773a70.079 70.079 0 0 0 4.59-19.522c-38.06-32.033-90.679-43.424-130.907-42.328zM258.925 280.099l1.88 5.638 5.943.046c.769.006 1.088.988.469 1.445l-4.781 3.531 1.793 5.666c.232.734-.604 1.341-1.229.893l-4.835-3.456-4.835 3.456c-.626.447-1.461-.159-1.229-.893l1.793-5.666-4.781-3.531c-.619-.457-.3-1.439.469-1.445l5.943-.046 1.88-5.638c.244-.731 1.276-.731 1.52 0zM282.024 294.683l.809 2.426 2.558.02a.345.345 0 0 1 .202.622l-2.058 1.519.771 2.439a.345.345 0 0 1-.53.384l-2.081-1.487-2.081 1.487a.344.344 0 0 1-.529-.384l.771-2.439-2.058-1.519c-.267-.196-.129-.619.202-.622l2.558-.02.809-2.426c.107-.315.552-.315.657 0zM248.938 269.388l.809 2.426 2.558.02a.345.345 0 0 1 .202.622l-2.058 1.519.771 2.439a.344.344 0 0 1-.529.384l-2.081-1.487-2.081 1.487a.345.345 0 0 1-.53-.384l.771-2.439-2.058-1.519a.345.345 0 0 1 .202-.622l2.558-.02.809-2.426c.107-.312.552-.312.657 0zM204.13 266.446l.809 2.426 2.558.02a.345.345 0 0 1 .202.622l-2.058 1.519.771 2.439a.345.345 0 0 1-.53.384l-2.081-1.487-2.081 1.487a.345.345 0 0 1-.529-.384l.771-2.439-2.058-1.519c-.267-.196-.129-.619.202-.622l2.558-.02.809-2.426c.108-.313.552-.313.657 0zM241.614 293.846l.809 2.426 2.558.02a.345.345 0 0 1 .202.622l-2.058 1.519.771 2.439a.344.344 0 0 1-.529.384l-2.081-1.487-2.081 1.487a.345.345 0 0 1-.53-.384l.771-2.439-2.058-1.519a.345.345 0 0 1 .202-.622l2.558-.02.809-2.426c.108-.314.553-.314.657 0zM220.99 264.753l.662 1.984 2.092.017c.27.002.383.348.166.509l-1.683 1.242.631 1.994a.282.282 0 0 1-.433.314l-1.702-1.216-1.702 1.216a.282.282 0 0 1-.433-.314l.631-1.994-1.683-1.242a.282.282 0 0 1 .166-.509l2.092-.017.662-1.984c.085-.256.448-.256.534 0zM283.819 223.794l.828 2.482 2.616.02c.339.002.479.435.206.637l-2.104 1.554.789 2.495a.352.352 0 0 1-.541.393l-2.129-1.522-2.129 1.522a.352.352 0 0 1-.541-.393l.789-2.495-2.104-1.554a.353.353 0 0 1 .206-.637l2.616-.02.828-2.482a.352.352 0 0 1 .67 0zM207.012 252.615l.662 1.984 2.092.017c.27.002.383.348.166.509l-1.683 1.242.631 1.994a.282.282 0 0 1-.433.314l-1.702-1.216-1.702 1.216a.282.282 0 0 1-.433-.314l.631-1.994-1.683-1.242a.282.282 0 0 1 .166-.509l2.092-.017.662-1.984a.281.281 0 0 1 .534 0zM217.112 280.581l1.002 3.005 3.168.024c.41.003.58.526.25.77l-2.549 1.882.956 3.02a.427.427 0 0 1-.655.476l-2.578-1.843-2.578 1.843a.427.427 0 0 1-.655-.476l.956-3.02-2.549-1.882a.427.427 0 0 1 .25-.77l3.168-.024 1.002-3.005c.133-.39.683-.39.812 0zM294.903 295.313l.631 1.891 1.993.015a.268.268 0 0 1 .158.484l-1.603 1.184.601 1.9a.269.269 0 0 1-.413.299l-1.621-1.159-1.622 1.159a.269.269 0 0 1-.413-.299l.601-1.9-1.603-1.184a.268.268 0 0 1 .158-.484l1.993-.015.63-1.891a.269.269 0 0 1 .51 0zM301.877 280.883l.809 2.426 2.558.02a.345.345 0 0 1 .202.622l-2.058 1.519.771 2.439a.344.344 0 0 1-.529.384l-2.081-1.487-2.081 1.487a.344.344 0 0 1-.529-.384l.771-2.439-2.058-1.519a.345.345 0 0 1 .202-.622l2.558-.02.809-2.426a.346.346 0 0 1 .656 0z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-ro_RO"><path style="fill:#41479b" d="M38.345 88.273C17.167 88.273 0 105.44 0 126.618v258.759c0 21.177 17.167 38.345 38.345 38.345h132.322V88.273H38.345z" /><path style="fill:#ffe15a" d="M170.67 88.277h170.67v335.45H170.67z" /><path style="fill:#ff4b55" d="M473.655 88.273H341.333v335.448h132.322c21.177 0 38.345-17.167 38.345-38.345V126.618c0-21.178-17.167-38.345-38.345-38.345z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-ru_RU"><path style="fill:#f5f5f5" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621v73.471h512v-73.471c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#ff4b55" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345v-73.471H0v73.471z" /><path style="fill:#41479b" d="M0 200.09h512V311.9H0z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-sk_SK"><path style="fill:#f5f5f5" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621v73.471h512v-73.471c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#ff4b55" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345v-73.471H0v73.471z" /><path style="fill:#41479b" d="M0 200.09h512V311.9H0z" /><path style="fill:#ff4b55" d="M130.225 339.285c-2.613-1.501-64.018-37.216-64.018-92.113v-75.034h132.414v75.034c0 54.897-61.405 90.612-64.018 92.113l-2.189 1.249-2.189-1.249z" /><path style="fill:#f5f5f5" d="m167.094 233.931-20.809 2.741h-6.935v-12.418h4.161l16.647 2.741-2.255-9.677 2.255-9.677-16.647 2.74h-4.161v-4.194l2.741-20.808-9.677 2.819-9.677-2.819 2.741 20.808v4.194h-4.163l-16.645-2.74 2.254 9.677-2.254 9.677 16.645-2.741h4.163v12.418h-6.936l-20.808-2.741 2.818 9.677-2.818 9.676 20.808-2.741h6.936v31.94h13.872v-31.94h6.935l20.809 2.741-2.818-9.676z" /><path style="fill:#41479b" d="M132.414 269.241c-9.118 0-16.938 5.532-20.302 13.419-.594-.049-1.162-.178-1.767-.178-11.751 0-21.266 9.21-21.94 20.791 17.875 22.004 40.264 35.116 41.82 36.011l2.189 1.25 2.189-1.25c1.556-.894 23.945-14.006 41.82-36.011-.673-11.581-10.189-20.791-21.94-20.791-.605 0-1.174.129-1.767.178-3.364-7.887-11.184-13.419-20.302-13.419z" /><path style="fill:#f5f5f5" d="M194.207 176.552v70.621c0 52.966-61.793 88.276-61.793 88.276s-61.793-35.31-61.793-88.276v-70.621h123.586m8.827-8.828H61.793v79.449c0 57.428 63.537 94.394 66.241 95.94l4.38 2.503 4.38-2.503c2.705-1.546 66.241-38.513 66.241-95.94v-79.449h-.001z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-sl_SI"><path style="fill:#f5f5f5" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621v73.471h512v-73.471c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#ff4b55" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345v-73.471H0v73.471z" /><path style="fill:#41479b" d="M0 200.09h512V311.9H0z" /><path style="fill:#41479b" d="M172.014 157.37s-1.778 56.628-9.724 72.53c-9.836 19.545-19.725 25.247-34.438 30.515-14.711-5.267-24.6-10.965-34.438-30.515-7.945-15.903-9.725-72.524-9.724-72.53a107.317 107.317 0 0 1 88.324 0z" /><path style="fill:#f5f5f5" d="M140.64 235.897c-1.076-.69-1.852-1.184-3.618-1.184-1.761 0-2.537.493-3.608 1.184-1.227.781-2.753 1.759-5.59 1.759-2.839 0-4.365-.978-5.592-1.763-1.071-.685-1.845-1.178-3.606-1.178s-2.535.493-3.606 1.178c-1.159.743-2.624 1.628-5.171 1.727 5.361 6.538 10.983 9.64 17.998 12.333 7.012-2.694 12.632-5.793 17.994-12.331-2.565-.093-4.038-.984-5.201-1.725zM105.832 225.437c1.071.685 1.843 1.178 3.598 1.178 1.761 0 2.535-.493 3.606-1.178 1.227-.786 2.753-1.763 5.59-1.763 2.837 0 4.363.978 5.59 1.759 1.071.69 1.847 1.184 3.608 1.184s2.535-.493 3.606-1.178c1.227-.786 2.753-1.763 5.592-1.763 2.841 0 4.371.978 5.597 1.759 1.076.69 1.849 1.184 3.616 1.184 1.766 0 2.542-.493 3.618-1.184 1.025-.653 2.312-1.409 4.35-1.651a41.937 41.937 0 0 0 1.536-4.9l-13.17-21.95-4.907 9.814-9.814-19.627-9.814 19.627-4.907-9.814-13.161 21.936a42.32 42.32 0 0 0 1.534 4.915c2.029.24 3.31.996 4.332 1.652zM151.831 228.537c-1.227.781-2.755 1.759-5.597 1.759-2.839 0-4.367-.978-5.594-1.759-1.076-.69-1.852-1.184-3.618-1.184-1.761 0-2.537.493-3.608 1.184-1.227.781-2.753 1.759-5.59 1.759-2.839 0-4.365-.978-5.592-1.763-1.071-.685-1.845-1.178-3.606-1.178s-2.535.493-3.606 1.178c-1.227.786-2.753 1.763-5.59 1.763-2.835 0-4.359-.978-5.582-1.763-.007-.003-.011-.007-.017-.011a71.188 71.188 0 0 0 2.881 4.803c.716.393 1.465.651 2.718.651 1.761 0 2.535-.493 3.606-1.178 1.227-.786 2.753-1.763 5.59-1.763s4.363.978 5.59 1.759c1.071.69 1.847 1.184 3.608 1.184s2.535-.493 3.606-1.178c1.227-.786 2.753-1.763 5.592-1.763 2.841 0 4.371.978 5.597 1.759 1.076.69 1.849 1.184 3.616 1.184 1.272 0 2.027-.262 2.754-.663a71.284 71.284 0 0 0 2.879-4.798c-.013.004-.024.011-.037.018z" /><path style="fill:#ffe15a" d="m128.046 170.222.861 2.814 2.867-.661c.194-.045.33.19.194.335l-2.006 2.153 2.006 2.153c.136.146.001.381-.194.335l-2.867-.661-.861 2.814c-.058.191-.329.191-.387 0l-.861-2.814-2.867.661c-.194.045-.33-.19-.194-.335l2.006-2.153-2.006-2.153c-.136-.147-.001-.381.194-.335l2.867.661.861-2.814c.059-.191.329-.191.387 0zM113.939 156.702l.861 2.814 2.867-.661c.195-.045.33.19.194.335l-2.006 2.153 2.006 2.153c.136.147.001.381-.194.335l-2.867-.661-.861 2.814c-.058.191-.329.191-.387 0l-.861-2.814-2.867.661c-.194.045-.33-.19-.194-.335l2.006-2.153-2.006-2.153c-.136-.146-.001-.381.194-.335l2.867.661.861-2.814c.058-.191.328-.191.387 0zM142.255 156.702l.861 2.814 2.867-.661c.194-.045.33.19.194.335l-2.006 2.153 2.006 2.153c.136.147.001.381-.194.335l-2.867-.661-.861 2.814c-.058.191-.329.191-.387 0l-.861-2.814-2.867.661c-.194.045-.33-.19-.194-.335l2.006-2.153-2.006-2.153c-.137-.146-.001-.381.194-.335l2.867.661.861-2.814c.059-.191.329-.191.387 0z" /><path style="fill:#ff1722" d="M166.934 155.238c.03 1.565.055 3.144.055 4.849-.708 17.704-3.342 56.258-9.082 67.87-8.463 16.996-16.277 22.614-30.055 27.791-13.778-5.176-21.591-10.793-30.048-27.778-5.761-11.656-8.414-50.866-9.091-67.882 0-1.707.028-3.268.052-4.846a106.754 106.754 0 0 0-5.058 2.123c.118 3.438.974 25.992 3.545 45.823 1.45 11.071 3.446 21.274 6.163 26.713 9.837 19.55 19.726 25.248 34.438 30.515 14.713-5.269 24.602-10.969 34.439-30.515 2.718-5.439 4.713-15.642 6.164-26.713 2.57-19.831 3.425-42.385 3.544-45.823a105.632 105.632 0 0 0-5.066-2.127z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-sv_SE"><path style="fill:#4173cd" d="M473.655 88.275H38.345C17.167 88.275 0 105.442 0 126.62v258.76c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.62c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#ffe15a" d="M512 229.516H211.862V88.275h-52.965v141.241H0v52.966h158.897v141.242h52.965V282.482H512z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-th_TH"><path style="fill:#f5f5f5" d="M473.7 88.3H38.3C17.1 88.3 0 105.5 0 126.6v258.8c0 21.2 17.2 38.3 38.3 38.3h435.3c21.2 0 38.3-17.2 38.3-38.3V126.6c.1-21.2-17.1-38.3-38.2-38.3z" /><path style="fill:#ff4b55" d="M0 385.4c0 21.2 17.2 38.3 38.3 38.3h435.3c21.2 0 38.3-17.2 38.3-38.3v-14.6H0v14.6zM473.7 88.3H38.3C17.1 88.3 0 105.5 0 126.6v14.6h512v-14.6c0-21.2-17.2-38.3-38.3-38.3z" /><path style="fill:#41479b" d="M0 194.2h512v123.6H0z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-tr_TR"><path style="fill:#d80027" d="M473.655 88.275H38.345C17.167 88.275 0 105.442 0 126.62v258.76c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.62c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#eee" d="m245.5 209.2 21 29 34-11.1-21 29 21 28.9-34-11.1-21 29V267l-34-11.1 34-11z" /><path style="fill:#eee" d="M188.2 328.3a72.3 72.3 0 1 1 34.4-136 89 89 0 1 0 0 127.3 72 72 0 0 1-34.4 8.7z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-uk_UA"><path style="fill:#ffe15a" d="M0 385.379c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V256H0v129.379z" /><path style="fill:#4173cd" d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621V256h512V126.621c0-21.178-17.167-38.345-38.345-38.345z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-vi_VN"><path style="fill:#f42f4c" d="M473.655 88.275H38.345C17.167 88.275 0 105.442 0 126.62v258.76c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.62c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#ffe62e" d="m256 133.565 27.628 85.029h89.405l-72.331 52.55 27.628 85.03L256 303.623l-72.33 52.551 27.628-85.03-72.33-52.55h89.404z" /></symbol><symbol  viewBox="0 0 512 512" id="icon-flag-zh_CN"><path style="fill:#ff4b55" d="M473.655 88.275H38.345C17.167 88.275 0 105.442 0 126.62v258.76c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.62c0-21.178-17.167-38.345-38.345-38.345z" /><path style="fill:#ffe15a" d="m85.007 140.731 8.416 25.234 26.6.206c3.444.026 4.872 4.422 2.101 6.467l-21.398 15.801 8.023 25.362c1.038 3.284-2.7 5.999-5.502 3.997l-21.64-15.469-21.64 15.468c-2.802 2.003-6.54-.714-5.502-3.997l8.023-25.362-21.398-15.8c-2.771-2.046-1.343-6.441 2.101-6.467l26.6-.206 8.416-25.234c1.09-3.267 5.711-3.267 6.8 0zM181.599 146.949l6.035 8.228 9.739-3.046c1.261-.394 2.298 1.044 1.526 2.115l-5.962 8.281 5.906 8.321c.765 1.077-.282 2.508-1.54 2.105l-9.719-3.111-6.089 8.189c-.788 1.06-2.473.506-2.478-.814l-.045-10.205-9.67-3.261c-1.252-.423-1.246-2.195.009-2.609l9.69-3.196.114-10.204c.014-1.317 1.703-1.858 2.484-.793zM144.857 122.419l10.144 1.102 4.328-9.241c.561-1.196 2.322-.991 2.591.302l2.086 9.988 10.126 1.26c1.311.163 1.66 1.901.513 2.558l-8.855 5.07 1.931 10.02c.25 1.298-1.295 2.166-2.274 1.279l-7.559-6.855-8.932 4.932c-1.156.639-2.461-.563-1.919-1.768l4.183-9.308-7.452-6.972c-.963-.898-.224-2.509 1.089-2.367zM160.895 221.313l-6.034 8.23-9.739-3.046c-1.261-.394-2.298 1.043-1.526 2.115l5.962 8.281-5.906 8.321c-.765 1.077.282 2.508 1.54 2.105l9.718-3.111 6.089 8.189c.788 1.06 2.473.506 2.478-.814l.045-10.205 9.67-3.261c1.252-.423 1.246-2.195-.009-2.609l-9.69-3.196-.114-10.204c-.016-1.319-1.703-1.861-2.484-.795zM197.635 198.261l-10.145 1.102-4.328-9.241c-.561-1.196-2.321-.991-2.591.302l-2.087 9.988-10.126 1.26c-1.311.163-1.66 1.901-.513 2.558l8.855 5.07-1.931 10.02c-.25 1.298 1.295 2.166 2.274 1.279l7.559-6.855 8.932 4.932c1.156.639 2.461-.563 1.919-1.768l-4.183-9.308 7.452-6.972c.967-.898.228-2.509-1.087-2.367z" /></symbol><symbol  viewBox="0 0 369 504" id="icon-menu-bpm"><path d="m66.484 178.533 13.512-7.22-15.113-52.147-23.438 12.504-21.652-40.555-18.023 9.621 21.668 40.551L0 153.807l34.941 41.559 13.512-7.207 108.3 202.78H70.827l24.508-83.887-14.793-27.703-65.57 224.65h354.16l-134.66-461.64L192.042 0l-42.41 42.359-48.754 168.33 14.801 27.703 48.367-167.05h58.723l93.238 319.6h-136.1" /></symbol><symbol  viewBox="0 0 32 32" id="icon-menu-burger"><path d="M30 7H2a1 1 0 0 1 0-2h28a1 1 0 0 1 0 2Zm-6 9a1 1 0 0 0-1-1H2a1 1 0 0 0 0 2h21a1 1 0 0 0 1-1Zm-7 10a1 1 0 0 0-1-1H2a1 1 0 0 0 0 2h14a1 1 0 0 0 1-1Z" /></symbol><symbol  viewBox="0 0 35 35" id="icon-menu-cutter"><path d="M29.486 3.241a.982.982 0 0 0-.699.293L17.502 14.819 6.219 3.534c-.195-.195-.446-.289-.701-.289s-.504.094-.699.289a.982.982 0 0 0 0 1.4l11.283 11.285-4.85 4.85-.336-.207a5.833 5.833 0 0 0-3.074-.865 5.832 5.832 0 0 0-4.158 1.721c-1.115 1.112-1.726 2.585-1.725 4.162s.611 3.045 1.725 4.156c1.113 1.113 2.584 1.723 4.158 1.723s3.044-.61 4.158-1.723a5.819 5.819 0 0 0 1.723-4.156 5.83 5.83 0 0 0-.865-3.074l-.207-.336 4.85-4.852 4.852 4.852-.207.336a5.837 5.837 0 0 0-.867 3.074 5.82 5.82 0 0 0 1.725 4.156c1.113 1.113 2.584 1.722 4.158 1.723s3.045-.61 4.158-1.723c1.113-1.112 1.723-2.581 1.723-4.156s-.608-3.048-1.721-4.16a5.831 5.831 0 0 0-4.158-1.723 5.83 5.83 0 0 0-3.074.865l-.336.207-4.85-4.85L30.187 4.934a.982.982 0 0 0 0-1.4.983.983 0 0 0-.699-.293zm-2.324 18.735c1.039 0 2.025.41 2.76 1.145.734.733 1.143 1.719 1.143 2.758s-.409 2.023-1.143 2.756c-.735.735-1.722 1.143-2.76 1.143s-2.024-.408-2.76-1.143c-.734-.733-1.143-1.718-1.143-2.756s.409-2.024 1.143-2.758l.002-.002a3.891 3.891 0 0 1 2.758-1.143zm-19.318.002c1.038 0 2.024.409 2.758 1.143.735.735 1.143 1.721 1.143 2.76s-.409 2.021-1.143 2.754c-.735.735-1.721 1.145-2.76 1.145s-2.024-.409-2.76-1.145c-.734-.733-1.143-1.718-1.143-2.756s.409-2.023 1.145-2.758a3.885 3.885 0 0 1 2.76-1.143z" /></symbol><symbol  viewBox="0 0 509 509" id="icon-menu-help"><path d="M434.466 74.582C388.392 28.512 324.756 0 254.506 0s-133.89 28.508-179.96 74.582C24.484 124.644-4.786 195.492.644 272.872c9.418 134.32 125.91 236.22 260.57 236.22h168.43c43.867 0 79.418-35.551 79.418-79.418v-175.13c0-70.254-28.512-133.89-74.582-179.96l-.014-.002zm-161.81 339.9c-4.836 5.008-11.285 7.55-18.156 7.55-3.394 0-6.703-.507-9.758-1.866-3.308-1.36-6.023-3.223-8.398-5.684-4.836-4.75-7.55-11.285-7.55-18.156 0-6.703 2.714-13.406 7.55-18.156 9.418-9.586 26.98-9.586 36.398 0 4.836 4.75 7.55 11.453 7.55 18.156-.081 6.875-2.8 13.406-7.636 18.156zm12.473-124.64c-2.887.848-4.922 4.156-4.922 7.723v13.238c0 14.168-11.539 25.71-25.71 25.71-14.169 0-25.712-11.538-25.712-25.71v-13.238c0-26.047 16.97-49.383 41.238-56.934C292 233.84 311.937 210 305.574 179.2c-4.074-19.602-19.938-35.465-39.453-39.453-16.207-3.309-32.074.34-44.46 10.438-12.306 10.012-19.263 24.777-19.263 40.559 0 14.168-11.539 25.71-25.71 25.71-14.169 0-25.712-11.538-25.712-25.71 0-31.395 13.914-60.668 38.266-80.438 24.352-19.77 56.168-27.406 87.395-20.957 39.371 8.144 71.273 40.047 79.418 79.418 10.953 53.109-19.508 105.21-70.926 121.07v.004z" /></symbol><symbol  viewBox="0 0 477 470" id="icon-menu-joiner"><path d="M13.999 152.324c6.16 0 11.199-5.04 11.199-11.199V61.602c0-21.84 17.359-39.199 39.199-39.199h119.28c6.16 0 11.199-5.04 11.199-11.199S189.836.005 183.676.005H64.397A61.425 61.425 0 0 0 2.796 61.607v78.961c0 6.715 5.043 11.758 11.203 11.758v-.002zM183.679 448.004H64.399c-21.84 0-39.2-17.359-39.2-39.199v-79.523c0-6.16-5.038-11.199-11.198-11.199s-11.2 5.04-11.2 11.199l-.003 79.523A61.425 61.425 0 0 0 64.4 470.407h119.28c6.16 0 11.199-5.04 11.199-11.199M461.999 318.084c-6.16 0-11.2 5.04-11.2 11.199l-.003 79.523c0 21.84-17.359 39.199-39.199 39.199h-119.28c-6.16 0-11.199 5.04-11.199 11.199s5.04 11.199 11.199 11.199h119.28a61.425 61.425 0 0 0 61.602-61.602l-.004-79.52c0-6.156-5.039-11.199-11.199-11.199l.003.002zM292.319 22.403h119.28c21.84 0 39.199 17.359 39.199 39.199v78.961c0 6.16 5.039 11.199 11.199 11.199s11.199-5.04 11.199-11.199V61.602A61.425 61.425 0 0 0 411.594 0l-119.28.004c-6.16 0-11.2 5.039-11.2 11.199-.003 6.16 5.04 11.199 11.2 11.199l.005.001zM212.239 238.564c0-.559 0-.559.558-1.121 0-.559 0-.559.56-1.121.558-1.68.558-2.801 0-4.48 0-.56 0-.56-.56-1.122 0-.558 0-.558-.558-1.12 0-.56-.559-.56-.559-1.122 0 0 0-.559-.558-.559l-1.68-1.68-77.281-77.272c-4.48-4.48-11.199-4.48-15.68 0s-4.48 11.199 0 15.68l58.238 58.238H11.199C5.039 222.885 0 227.924 0 234.084s5.04 11.199 11.199 11.199h163.52l-58.238 58.8c-4.48 4.481-4.48 11.2 0 15.68 2.238 2.239 5.04 3.36 7.84 3.36s5.601-1.121 7.84-3.36l79.52-79.52c0-.558 0-1.116.558-1.679zM465.919 223.444h-157.92l58.238-58.238c4.48-4.48 4.48-11.199 0-15.68-4.48-4.48-11.2-4.48-15.68 0l-79.52 79.52c0 .559-.559.559-.559 1.121 0 .559 0 .559-.558 1.121 0 .559 0 .559-.559 1.121-.558 1.68-.558 2.801 0 4.48 0 .56 0 .56.559 1.122 0 .558 0 .558.558 1.121 0 .559.559.559.559 1.121 0 0 0 .559.558.559.56.558 1.122 1.12 1.68 1.68l77.281 77.272c2.238 2.239 5.04 3.36 7.84 3.36s5.602-1.121 7.84-3.36c4.48-4.48 4.48-11.199 0-15.68l-58.238-58.238h157.92c6.16 0 11.199-5.039 11.199-11.199-.004-6.16-5.043-11.203-11.203-11.203h.005z" /></symbol><symbol  viewBox="0 0 39.989 39.989" id="icon-menu-karaoke"><path d="M19.994 0C8.952 0 0 8.952 0 19.995c0 11.043 8.952 19.994 19.994 19.994s19.995-8.952 19.995-19.994C39.989 8.952 31.037 0 19.994 0zm0 27.745a7.75 7.75 0 1 1 0-15.5 7.75 7.75 0 0 1 0 15.5z" /></symbol><symbol  viewBox="0 0 197 362" id="icon-menu-pitch"><path d="M82.03 272.056v89.973h32.812v-89.973a98.565 98.565 0 0 0 58.742-33.547 98.57 98.57 0 0 0 23.29-63.512V16.407A16.405 16.405 0 0 0 188.67 2.2a16.392 16.392 0 0 0-16.406 0 16.405 16.405 0 0 0-8.203 14.207v158.59a65.625 65.625 0 0 1-131.249 0V16.407A16.405 16.405 0 0 0 24.61 2.2a16.392 16.392 0 0 0-16.406 0A16.405 16.405 0 0 0 0 16.407v158.59a98.573 98.573 0 0 0 23.289 63.512 98.564 98.564 0 0 0 58.742 33.547z" /></symbol><symbol  viewBox="0 0 385 525" id="icon-menu-recorder"><path d="M192.498 332.5a105 105 0 0 1-105-105V105a105.003 105.003 0 0 1 52.5-90.935 105.012 105.012 0 0 1 105 0 105.003 105.003 0 0 1 52.5 90.934v122.5a104.998 104.998 0 0 1-105 105zm0-297.5a69.986 69.986 0 0 0-49.496 20.504A69.986 69.986 0 0 0 122.498 105v122.5c0 25.008 13.344 48.117 35 60.62s48.344 12.505 70 0 35-35.613 35-60.62V105a69.986 69.986 0 0 0-20.504-49.496A69.986 69.986 0 0 0 192.498 35z" /><path d="M209.998 437.5h-35a174.978 174.978 0 0 1-123.74-51.258A174.985 174.985 0 0 1 0 262.502a17.498 17.498 0 0 1 26.25-15.156A17.499 17.499 0 0 1 35 262.502c0 37.129 14.75 72.738 41.004 98.995A140.013 140.013 0 0 0 175 402.502h35c37.129 0 72.738-14.75 98.996-41.005A140.013 140.013 0 0 0 350 262.502a17.498 17.498 0 0 1 26.25-15.156 17.499 17.499 0 0 1 8.75 15.156 174.999 174.999 0 0 1-175 175l-.002-.002z" /><path d="M244.998 525h-105a17.498 17.498 0 0 1-15.156-26.25 17.499 17.499 0 0 1 15.156-8.75h35v-52.5a17.498 17.498 0 0 1 26.25-15.156 17.499 17.499 0 0 1 8.75 15.156V490h35a17.498 17.498 0 0 1 15.156 26.25 17.499 17.499 0 0 1-15.156 8.75z" /></symbol><symbol  viewBox="0 0 120 120" id="icon-menu-remover"><circle cx="25" cy="25" r="25" fill="#39bb81" /><circle cx="25" cy="95" r="25" fill="#665dc3" /><path d="m95 35 25 25-25 25z" /><path stroke="currentColor" stroke-width="10" d="M75 60h20" /></symbol><symbol  viewBox="0 0 495 281" id="icon-menu-splitter"><path d="m486.87 209.81-124.71-31.422c-.915-.23-1.821-.3-2.723-.3l-14.207-24.59 137.12 22.233c.605.098 1.214.14 1.804.14 5.399 0 10.156-3.91 11.047-9.405.989-6.11-3.16-11.863-9.265-12.852l-153.28-24.852c-.602-.098-1.192-.106-1.782-.106l-14.98-25.926 167.11 17.086c.383.04.77.059 1.149.059 5.676 0 10.543-4.297 11.129-10.06.629-6.155-3.844-11.651-10.004-12.28l-183.2-18.742-40.95-70.867A15.903 15.903 0 0 0 247.399 0h-.01a15.889 15.889 0 0 0-13.73 7.945L189.45 84.746 8.33 132.77c-5.976 1.586-9.539 7.715-7.953 13.695 1.328 5.02 5.863 8.336 10.816 8.336.953 0 1.918-.12 2.879-.379l159.64-42.328-83.758 145.52a15.91 15.91 0 0 0 .016 15.848 15.902 15.902 0 0 0 13.727 7.918h287.97c5.648 0 10.91-3.039 13.73-7.933a15.904 15.904 0 0 0-.004-15.855l-30.578-52.918 106.61 26.859c.918.23 1.836.34 2.746.34 5.008 0 9.57-3.387 10.852-8.465 1.504-5.992-2.133-12.086-8.133-13.594l-.02-.003zm-371.88 49.168 132.4-230.02 132.91 230.02H114.99z" /></symbol>'),
      t.insertBefore(n, t.lastChild);
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', e) : e();
}
if (AudioNode && AudioNode.prototype.__enableCustomConnects__ === void 0) {
  const e = AudioNode.prototype.connect,
    t = AudioNode.prototype.disconnect;
  (AudioNode.prototype.connect = function (...n) {
    return (
      n[0] && n[0].input ? this.connect(n[0].input, ...n.slice(1)) : e.apply(this, n), n[0].output || n[0]
    );
  }),
    (AudioNode.prototype.disconnect = function (...n) {
      n[0] && n[0].input ? this.disconnect(n[0].input, ...n.slice(1)) : t.apply(this, n);
    }),
    (AudioNode.prototype.native$connect = e),
    (AudioNode.prototype.native$disconnect = t),
    (AudioNode.prototype.__enableCustomConnects__ = !0);
}
function hs(e, t) {
  if (!(e instanceof Blob)) throw new TypeError('Must be a File or Blob');
  return new Promise(function (n, r) {
    var o = new FileReader();
    (o.onload = function (s) {
      n(s.target.result);
    }),
      (o.onerror = function (s) {
        r(new Error('Error reading' + e.name + ': ' + s.target.result));
      }),
      o['readAs' + t](e);
  });
}
function D3(e) {
  return hs(e, 'DataURL');
}
function N3(e) {
  return hs(e, 'Text');
}
function F3(e) {
  return hs(e, 'ArrayBuffer');
}
var $3 = {
  readAsDataURL: D3,
  readAsText: N3,
  readAsArrayBuffer: F3,
};
window.PromiseFileReader = $3;
const $a = new URLSearchParams(window.location.search),
  Zi = $a.get('auth_token');
if (Zi) {
  const e = $a.get('close');
  localStorage.setItem('token', Zi), e === null ? (window.location.href = '/') : (window.close(), exit());
}
fu(H3).use(Xe).use(ht).use(P0()).mount('#app');
export {
  Pe as $,
  J3 as A,
  s4 as B,
  Oe as C,
  Ro as D,
  S0 as E,
  Fe as F,
  R1 as G,
  C3 as H,
  X3 as I,
  Z3 as J,
  cs as K,
  Bn as L,
  Pl as M,
  wn as N,
  K3 as O,
  l4 as P,
  le as Q,
  Rc as R,
  f4 as S,
  G3 as T,
  d4 as U,
  a4 as V,
  Q3 as W,
  r4 as X,
  n4 as Y,
  At as Z,
  ra as _,
  V3 as __vite_legacy_guard,
  ie as a,
  I0 as a0,
  jt as a1,
  eo as a2,
  fn as a3,
  xt as a4,
  i4 as a5,
  e4 as a6,
  Wt as a7,
  Y3 as a8,
  c4 as a9,
  h4 as aa,
  La as ab,
  q3 as ac,
  t4 as ad,
  V0 as ae,
  m4 as af,
  o4 as ag,
  u4 as ah,
  ht as ai,
  Zt as b,
  Ir as c,
  at as d,
  P3 as e,
  bl as f,
  W3 as g,
  Ts as h,
  de as i,
  U3 as j,
  ho as k,
  xc as l,
  Ha as m,
  xo as n,
  dt as o,
  B3 as p,
  j3 as q,
  ce as r,
  Ot as s,
  Br as t,
  nt as u,
  Re as v,
  sr as w,
  y2 as x,
  mn as y,
  so as z,
};
