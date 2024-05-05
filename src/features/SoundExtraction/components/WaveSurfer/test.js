import {
  t as $,
  m as $e,
  w as Be,
  i as C,
  f as Ce,
  D as E,
  c as Ie,
  _ as K,
  V as Me,
  O as N,
  W as Ne,
  E as Q,
  n as Re,
  a as S,
  N as Se,
  b as T,
  B as Te,
  s as V,
  l as W,
  U as Y,
  F as Z,
  o as _,
  j as ce,
  R as fe,
  d as g,
  M as he,
  P as j,
  h as ke,
  S as me,
  L as q,
  u as r,
  H as ue,
  r as w,
  y as we,
  J as x,
  T as xe,
  v as y,
  I as z,
} from './index-ae152a00.js';
import { _ as Oe, v as Pe, F as Ve, a as pe } from './index-fd2fb30e.js';

var _e = (t, n, e) => {
  if (!n.has(t)) throw TypeError('Cannot ' + e);
};
var L = (t, n, e) => (_e(t, n, 'read from private field'), e ? e.call(t) : n.get(t)),
  ne = (t, n, e) => {
    if (n.has(t)) throw TypeError('Cannot add the same private member more than once');
    n instanceof WeakSet ? n.add(t) : n.set(t, e);
  };
const De = ['onDrop'],
  We = {
    class: 'player-cancel',
  },
  Fe = {
    class: 'player-waveform',
  },
  Le = g(
    'div',
    {
      class: 'player-line',
    },
    null,
    -1,
  ),
  Ae = {
    class: 'player-effects',
  },
  ze = {
    class: 'player-action',
  },
  Ee = {
    class: 'player-encode',
  },
  Ke = {
    class: 'player-play',
  },
  Lt = {
    __name: 'AudioPlayer',
    props: {
      audio: {
        type: Object,
        required: !0,
      },
    },
    emits: ['destroy'],
    setup(t, { emit: n }) {
      const e = t,
        { space: i } = ue();
      Te(i, () => {
        e.audio.isReady && e.audio.togglePause();
      }),
        we(() => e.audio.destructor());
      const s = () => {
          e.audio.destructor(), n('destroy');
        },
        l = (o) => {
          document.querySelector('input[type="file"]') || s(),
            document.dispatchEvent(
              new DragEvent('drop', {
                dataTransfer: o.dataTransfer,
              }),
            );
        };
      return (o, a) => {
        const d = Oe,
          m = Q;
        return (
          _(),
          T(
            'main',
            {
              class: 'page-player',
              onDrop: x(l, ['stop', 'prevent']),
            },
            [
              N(o.$slots, 'default'),
              g('div', We, [
                C(d, {
                  onRestart: s,
                }),
              ]),
              g('div', Fe, [N(o.$slots, 'waveform')]),
              Le,
              g('div', Ae, [N(o.$slots, 'effects')]),
              g('div', ze, [N(o.$slots, 'action')]),
              g('div', Ee, [N(o.$slots, 'encode')]),
              g('div', Ke, [
                C(m, {
                  class: 'backward link',
                  name: 'backward-10',
                  onClick: a[0] || (a[0] = x((u) => t.audio.backward(10), ['prevent'])),
                }),
                C(m, {
                  class: 'forward link',
                  name: 'forward-10',
                  onClick: a[1] || (a[1] = x((u) => t.audio.forward(10), ['prevent'])),
                }),
                C(m, {
                  class: 'playback link',
                  name: 'playback',
                  size: '0.7em',
                  onClick: a[2] || (a[2] = x((u) => t.audio.rewind(), ['prevent'])),
                }),
                C(
                  m,
                  {
                    class: 'play',
                    name: t.audio.isPlaying ? 'pause' : 'play',
                    onClick: a[3] || (a[3] = x((u) => t.audio.togglePause(), ['prevent'])),
                    onKeyup:
                      a[4] ||
                      (a[4] = z(
                        x(() => {}, ['prevent']),
                        ['space'],
                      )),
                  },
                  null,
                  8,
                  ['name'],
                ),
              ]),
            ],
            40,
            De,
          )
        );
      };
    },
  },
  qe = {
    class: 'progress-bar',
  },
  Je = {
    __name: 'ProgressBar',
    props: {
      value: {
        type: Number,
        default: 0,
      },
    },
    setup(t) {
      return (n, e) => (
        _(),
        T('div', qe, [
          g(
            'div',
            {
              class: 'value',
              style: Re({
                width: `${t.value}%`,
              }),
            },
            null,
            4,
          ),
        ])
      );
    },
  };
const Ue = ['disabled'],
  Xe = {
    class: 'text',
  },
  Ge = ['onClick', 'onKeyup'],
  He = {
    inheritAttrs: !1,
  },
  Ye = Object.assign(He, {
    __name: 'InputSelect',
    props: {
      modelValue: {
        type: [String, Number, Object],
        default: null,
      },
      disabled: {
        type: Boolean,
        default: !1,
      },
      options: {
        type: Array,
        default: () => [],
      },
      dir: {
        type: String,
        validator: (t) => ['top', 'bottom'].includes(t),
        default: 'top',
      },
      showShifters: {
        type: Boolean,
        default: !1,
      },
    },
    emits: ['update:modelValue'],
    setup(t, { emit: n }) {
      const e = t,
        i = w(null),
        s = w(null),
        l = V({
          root: i,
          list: s,
        }),
        o = w(!1);
      q(() => {
        document.body.getBoundingClientRect(), l.root.getBoundingClientRect(), l.list.querySelector('.list');
      });
      const a = () => (o.value = !o.value),
        d = () => (o.value = !1),
        m = (p) => {
          n('update:modelValue', p), d();
        },
        u = () => {
          let p = e.options.findIndex((b) => f(b, e.modelValue));
          (p -= 1),
            p < 0 && (p += e.options.length),
            p >= e.options.length && (p -= e.options.length),
            m(e.options[p]);
        },
        h = () => {
          let p = e.options.findIndex((b) => f(b, e.modelValue));
          (p += 1),
            p < 0 && (p += e.options.length),
            p >= e.options.length && (p -= e.options.length),
            m(e.options[p]);
        },
        f = (p, b) => JSON.stringify(p) === JSON.stringify(b);
      return (p, b) => {
        const M = $e;
        return (
          _(),
          T(
            'div',
            {
              ref_key: 'htmlRootRef',
              ref: i,
              class: E([
                'input-select-container',
                {
                  open: o.value,
                },
              ]),
            },
            [
              t.showShifters
                ? (_(),
                  T(
                    'button',
                    {
                      key: 0,
                      class: 'shift',
                      onClick: u,
                    },
                    [
                      C(M, {
                        name: 'arrow-left',
                        size: '0.6em',
                      }),
                    ],
                  ))
                : W('', !0),
              ce(
                (_(),
                T(
                  'button',
                  fe(
                    {
                      class: 'main',
                      disabled: t.disabled,
                    },
                    p.$attrs,
                    {
                      onClick: a,
                    },
                  ),
                  [
                    N(p.$slots, 'label', {}, void 0, !0),
                    N(
                      p.$slots,
                      'default',
                      {},
                      () => [g('div', Xe, $(t.modelValue.name || t.modelValue), 1)],
                      !0,
                    ),
                    N(p.$slots, 'arrows', {}, void 0, !0),
                  ],
                  16,
                  Ue,
                )),
                [[r(Pe), d]],
              ),
              t.showShifters
                ? (_(),
                  T(
                    'button',
                    {
                      key: 1,
                      class: 'shift next',
                      onClick: h,
                    },
                    [
                      C(M, {
                        name: 'arrow-left',
                        size: '0.6em',
                      }),
                    ],
                  ))
                : W('', !0),
              g(
                'div',
                {
                  ref_key: 'htmlListRef',
                  ref: s,
                  class: 'options',
                },
                [
                  (_(!0),
                  T(
                    Z,
                    null,
                    ke(
                      t.options,
                      (B) => (
                        _(),
                        T(
                          'div',
                          {
                            key: B.id,
                            tabindex: '0',
                            class: E([
                              'option',
                              {
                                selected: f(B, t.modelValue),
                              },
                            ]),
                            onClick: (D) => m(B),
                            onKeyup: z((D) => m(B), ['enter']),
                          },
                          $(B.name || B),
                          43,
                          Ge,
                        )
                      ),
                    ),
                    128,
                  )),
                ],
                512,
              ),
            ],
            2,
          )
        );
      };
    },
  }),
  Qe = K(Ye, [['__scopeId', 'data-v-c9c9c4b6']]);
function Ze() {
  return new Worker('/assets/shifter-17487f34.js');
}
const je = (t) => {
    const n = t.rangeDuration || t.duration,
      e = t.numberOfChannels,
      i = t.playbackRate || 1,
      s = t.sampleRate,
      l = Math.round((n * s) / i),
      o = new pe({
        offline: !0,
        channels: e,
        sampleRate: s,
        length: l,
      });
    return o.length || (o.length = l), o;
  },
  et = () => {
    const t = V({
        isRun: !1,
        progress: 0,
      }),
      n = (s) => (s.isPitchShifter ? i(s) : e(s)),
      e = (s) => {
        const l = je(s);
        (t.isRun = !0), (t.progress = 0);
        const o = y(
          () => s.currentTime,
          (d) => (t.progress = d / (s.rangeDuration || s.duration)),
        );
        let a = s.clone(l);
        return (
          a.play(),
          l
            .startRendering()
            .then((d) => ((t.isRun = !1), (t.progress = 1), o(), a.destructor(), (a = null), d))
        );
      },
      i = (s) =>
        new Promise((l, o) => {
          try {
            const a = new Ze();
            (a.onmessage = (d) => {
              switch (d.data.command) {
                case 'progress':
                  t.progress = d.data.progress;
                  break;
                case 'done': {
                  (t.progress = 1), (t.isRun = !1);
                  const m = pe().createBuffer(
                    d.data.arrayPCM.length,
                    s.buffer.length / s.playbackRate,
                    s.sampleRate,
                  );
                  m.copyToChannel(d.data.arrayPCM[0], 0, 0),
                    m.copyToChannel(d.data.arrayPCM[1], 1, 0),
                    l(m),
                    a.terminate();
                  break;
                }
              }
            }),
              (a.onerror = (d) => {
                o(d), a.terminate();
              }),
              a.postMessage({
                command: 'start',
                pitch: s.pitch,
                tempo: s.tempo,
                bufferLength: s.buffer.length / s.playbackRate,
                arrayPCM: [
                  s.buffer.getChannelData(0),
                  s.buffer.getChannelData(s.numberOfChannels === 1 ? 0 : 1),
                ],
              });
          } catch (a) {
            o(a);
          }
        });
    return {
      render: n,
      state: t,
    };
  };
function tt() {
  return new Worker('/assets/wav-encoder-b3a7411e.js');
}
function nt() {
  return new Worker('/assets/mp3-encoder-6cfdd9e2.js');
}
const H = V({}),
  se = (t, n = void 0) => {
    let e = localStorage.getItem(t);
    return (
      !e && n !== void 0 && (localStorage.setItem(t, JSON.stringify(n)), (e = localStorage.getItem(t))),
      (H[t] = e ? JSON.parse(e) : void 0),
      y(
        () => H[t],
        (i) => {
          localStorage.setItem(t, JSON.stringify(i));
        },
        {
          deep: !0,
        },
      ),
      Ce(H, t)
    );
  },
  ae = ['wav', 'mp3'],
  oe = [8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
  st = () => {
    let t;
    const n = V({
      codecs: ae,
      codec: se('codec', ae[1]),
      bitRate: se('bitrate', oe[oe.length - 1]),
      isRun: !1,
      isReady: !1,
      progress: 0,
    });
    return {
      encode: (s) =>
        new Promise((l, o) => {
          try {
            t = n.codec === 'mp3' ? new nt() : new tt();
            const a =
              n.codec === 'mp3'
                ? {
                    bitRate: n.bitRate,
                  }
                : {
                    numChannels: s.numberOfChannels,
                  };
            (t.onmessage = (d) => {
              switch (d.data.command) {
                case 'progress':
                  (n.isRun = !0), (n.progress = d.data.value);
                  break;
                case 'done':
                  (n.isReady = !0), (n.isRun = !1), (n.progress = 0), l(d.data.blob), t.terminate();
                  break;
              }
            }),
              (t.onerror = (d) => {
                o(d), t.terminate();
              }),
              t.postMessage({
                command: 'start',
                sampleRate: s.sampleRate,
                arrayPCM: [s.getChannelData(0), s.getChannelData(s.numberOfChannels === 1 ? 0 : 1)],
                ...a,
              });
          } catch (a) {
            o(a);
          }
        }),
      cancel: () => {
        t == null || t.terminate(), (n.isReady = !1), (n.isRun = !1), (n.progress = 0);
      },
      state: n,
    };
  };
const at = {
    class: 'label',
  },
  ot = {
    class: 'title',
  },
  it = {
    key: 0,
    class: 'encode-modal',
  },
  lt = {
    class: 'cancel',
  },
  rt = {
    class: 'main',
  },
  dt = {
    class: 'status',
  },
  ut = {
    __name: 'ButtonsAudioRender',
    props: {
      audio: {
        type: Object,
        required: !0,
      },
      suffix: {
        type: String,
        default: '',
      },
    },
    setup(t) {
      const n = t,
        e = Se(!1),
        { render: i, state: s } = et(),
        { encode: l, state: o, cancel: a } = st(),
        d = S(() => !o.isRun),
        m = () => {
          var p;
          e.value = !0;
          const f = `${((p = n.audio.filename) == null ? void 0 : p.replace(/\.[^/.]+$/, '')) || 'audio'}${n.suffix}`;
          i(n.audio)
            .then((b) => l(b))
            .then((b) => {
              Ve.saveAs(b, `${f}.${o.codec}`, {
                type: b.type,
              });
            })
            .finally(() => {
              e.value = !1;
            });
        },
        u = () => {
          a(), (e.value = !1);
        };
      return (
        ue({
          passive: !1,
          onEventFired(h) {
            h.type === 'keydown' &&
              h.key === 's' &&
              (h.ctrlKey || h.metaKey) &&
              (e.value || (m(), h.stopImmediatePropagation(), h.preventDefault()));
          },
        }),
        (h, f) => {
          const p = Qe,
            b = Q,
            M = Je;
          return (
            _(),
            T(
              Z,
              null,
              [
                C(
                  p,
                  {
                    modelValue: r(o).codec,
                    'onUpdate:modelValue': f[0] || (f[0] = (B) => (r(o).codec = B)),
                    class: 'outline',
                    options: r(o).codecs,
                  },
                  {
                    default: Be(() => [
                      g('span', at, $(h.$t('player.labels.file_format')) + ':', 1),
                      g('span', ot, $(r(o).codec), 1),
                    ]),
                    _: 1,
                  },
                  8,
                  ['modelValue', 'options'],
                ),
                N(
                  h.$slots,
                  'save',
                  {
                    save: m,
                  },
                  () => [
                    g(
                      'button',
                      {
                        class: 'white',
                        onClick: m,
                      },
                      $(h.$t('button.save')),
                      1,
                    ),
                  ],
                  !0,
                ),
                (_(),
                Ie(
                  xe,
                  {
                    to: 'body',
                  },
                  [
                    r(e)
                      ? (_(),
                        T('div', it, [
                          g('div', lt, [
                            C(
                              b,
                              {
                                class: 'link',
                                name: 'cancel',
                                size: '1.4em',
                                disabled: r(d),
                                onClick: u,
                              },
                              null,
                              8,
                              ['disabled'],
                            ),
                          ]),
                          g('div', rt, [
                            g('h2', null, $(h.$t('button.wait')), 1),
                            C(
                              M,
                              {
                                class: 'stripes',
                                value: r(o).progress * 100,
                              },
                              null,
                              8,
                              ['value'],
                            ),
                          ]),
                          g(
                            'p',
                            dt,
                            $(r(o).isRun ? h.$t('player.status.encoding') : h.$t('player.status.processing')),
                            1,
                          ),
                        ]))
                      : W('', !0),
                  ],
                )),
              ],
              64,
            )
          );
        }
      );
    },
  },
  At = K(ut, [['__scopeId', 'data-v-17c94321']]);
const ct = ['disabled'],
  ft = {
    class: 'track',
  },
  mt = ['onKeydown'],
  ht = {
    __name: 'InputRange',
    props: {
      modelValue: {
        type: Number,
        default: null,
      },
      dir: {
        type: String,
        default: 'horizontal',
        validator: (t) => ['horizontal', 'vertical'].includes(t),
      },
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 1,
      },
      step: {
        type: Number,
        default: 0.1,
      },
      origin: {
        type: Number,
        default: 0,
      },
      disabled: {
        type: Boolean,
        default: null,
      },
      showTooltip: {
        type: Boolean,
        default: !0,
      },
      valueTooltip: {
        type: [String, Number],
        default: null,
      },
    },
    emits: ['update:modelValue'],
    setup(t, { emit: n }) {
      const e = t,
        i = w(null),
        s = w(null),
        l = w(null),
        o = w(null),
        a = V({}),
        d = me(),
        { pressed: m } = Y({
          target: o,
        }),
        u = e.dir === 'vertical',
        h = S(() => 'input-range' + (u ? ' vertical' : '')),
        f = S(() => e.max - e.min),
        p = S(() => {
          var k, I;
          let c = e.valueTooltip;
          if (!c && ((c = e.modelValue), c && e.step < 1)) {
            const F =
              ((I = (k = e.step.toString().split('.')) == null ? void 0 : k[1]) == null
                ? void 0
                : I.length) || 0;
            c = c.toFixed(F);
          }
          return e.showTooltip
            ? {
                'data-title': c,
              }
            : {};
        });
      y(
        () => e.modelValue,
        (c) => O(),
      ),
        y(
          () => e.step,
          (c) => O(),
        ),
        y(
          () => e.min,
          (c) => O(),
        ),
        y(
          () => e.max,
          (c) => O(),
        ),
        y(m, (c) => U(c ? '0s' : '0.1s')),
        he(() => {
          r(m) && D(r(d.x), r(d.y));
        }),
        j(i, (c) => J()),
        q(() => {
          (i.value = document.querySelector('main')), O();
        });
      const b = (c) => {
          c >= e.min && c <= e.max && n('update:modelValue', Math.round(1e3 * c) / 1e3);
        },
        M = () => b(e.modelValue - e.step),
        B = () => b(e.modelValue + e.step),
        D = (c, k) => {
          let I;
          u
            ? ((k = Math.max(a.top, k)), (k = Math.min(a.bottom, k)), (I = (a.bottom - k) / a.height))
            : ((c = Math.max(a.left, c)), (c = Math.min(a.right, c)), (I = (c - a.left) / a.width));
          const F = e.min + I * r(f),
            X = e.step * Math.round(F / e.step);
          b(X);
        },
        J = () => {
          (a.top = r(s).getBoundingClientRect().top),
            (a.bottom = r(s).getBoundingClientRect().bottom),
            (a.left = r(s).getBoundingClientRect().left),
            (a.right = r(s).getBoundingClientRect().right),
            (a.width = r(s).getBoundingClientRect().width),
            (a.height = r(s).getBoundingClientRect().height);
        },
        U = (c) => {
          (r(o).style.transitionDuration = c), (r(l).style.transitionDuration = c);
        },
        O = () => {
          const c = (100 * (e.modelValue - e.min)) / r(f);
          u ? (r(o).style.bottom = `${c}%`) : (r(o).style.left = `${c}%`),
            e.min < e.origin
              ? e.modelValue >= e.origin
                ? u
                  ? ((r(l).style.top = `${100 - c}%`), (r(l).style.height = `${c - 50}%`))
                  : ((r(l).style.left = '50%'), (r(l).style.width = `${c - 50}%`))
                : u
                  ? ((r(l).style.top = '50%'), (r(l).style.height = `${50 - c}%`))
                  : ((r(l).style.left = `${c}%`), (r(l).style.width = `${50 - c}%`))
              : u
                ? (r(l).style.height = `${c}%`)
                : (r(l).style.width = `${c}%`);
        };
      return (c, k) => (
        _(),
        T(
          'div',
          {
            ref_key: 'htmlRootRef',
            ref: s,
            class: E(r(h)),
            disabled: t.disabled,
            onMousedown:
              k[0] ||
              (k[0] = x(
                (I) => {
                  o.value.focus(), D(I.clientX, I.clientY);
                },
                ['prevent'],
              )),
          },
          [
            g('div', ft, [
              g(
                'div',
                {
                  ref_key: 'htmlInnerRef',
                  ref: l,
                  class: 'inner',
                },
                null,
                512,
              ),
            ]),
            g(
              'div',
              fe(
                {
                  ref_key: 'htmlThumbRef',
                  ref: o,
                  class: 'thumb',
                  tabindex: '0',
                },
                r(p),
                {
                  onKeydown: [
                    z(x(M, ['prevent', 'stop']), ['down', 'left']),
                    z(x(B, ['prevent', 'stop']), ['up', 'right']),
                  ],
                },
              ),
              null,
              16,
              mt,
            ),
          ],
          42,
          ct,
        )
      );
    },
  },
  pt = K(ht, [['__scopeId', 'data-v-d4d4449c']]),
  gt = (t, n = null) => {
    let e;
    return (
      n === 'seconds' ? (e = t < 3600 ? [14, 5] : [11, 6]) : (e = t < 3600 ? [14, 7] : [11, 8]),
      new Date(t * 1e3).toISOString().substr(...e)
    );
  };
const vt = ['data-title'],
  yt = ['onMousedown'],
  bt = ['data-content'],
  _t = ['data-content'],
  Tt = {
    class: 'duration',
  },
  wt = {
    key: 0,
    class: 'fades in',
  },
  Rt = {
    key: 0,
    class: 'range',
  },
  kt = {
    class: 'title',
  },
  $t = {
    key: 1,
    class: 'tooltip',
  },
  Ct = {
    key: 1,
    class: 'fades out',
  },
  St = {
    key: 0,
    class: 'range',
  },
  Bt = {
    class: 'title',
  },
  It = {
    key: 1,
    class: 'tooltip',
  },
  xt = {
    __name: 'AudioTrack',
    props: {
      name: {
        type: String,
        default: null,
      },
      playbackRate: {
        type: Number,
        default: 1,
      },
      duration: {
        type: Number,
        default: null,
      },
      currentTime: {
        type: Number,
        default: 0,
      },
      beginTime: {
        type: Number,
        default: 0,
      },
      endTime: {
        type: Number,
        default: null,
      },
      showThumbs: {
        type: Boolean,
        default: !0,
      },
      showFades: {
        type: Boolean,
        default: !1,
      },
      name: {
        type: String,
        default: null,
      },
      fadeIn: {
        type: Boolean,
        default: !1,
      },
      fadeOut: {
        type: Boolean,
        default: !1,
      },
      fadeInTime: {
        type: Number,
        default: 1,
      },
      fadeOutTime: {
        type: Number,
        default: 1,
      },
    },
    emits: [
      'update:currentTime',
      'update:beginTime',
      'update:endTime',
      'update:fadeIn',
      'update:fadeOut',
      'update:fadeInTime',
      'update:fadeOutTime',
    ],
    setup(t, { emit: n }) {
      const e = t,
        i = (v) => {
          const R = v < 3600 ? [14, 7] : [11, 8];
          return new Date(v * 1e3).toISOString().substr(...R);
        },
        s = w(null),
        l = w(null),
        o = w(null),
        a = w(null),
        d = w(null),
        m = w(null),
        u = w(null),
        h = w(null),
        f = V({});
      S(() => e.duration / e.playbackRate);
      const p = S(() => i(e.beginTime / e.playbackRate)),
        b = S(() => i(e.endTime / e.playbackRate)),
        M = S(() => e.endTime - e.beginTime),
        B = S(() => (100 * e.currentTime) / e.duration),
        D = S(() => (100 * e.beginTime) / e.duration),
        J = S(() => (100 * (e.endTime - e.beginTime)) / e.duration),
        U = S(() => !e.endTime || (e.currentTime > e.beginTime + 0.1 && e.currentTime < e.endTime - 0.1)),
        O = me(),
        { pressed: c } = e.showThumbs
          ? Y({
              target: m,
            })
          : {
              pressed: !1,
            },
        { pressed: k } = e.showThumbs
          ? Y({
              target: u,
            })
          : {
              pressed: !1,
            },
        I = Me(l),
        F = S(() => r(I) && !r(c) && !r(k));
      y(D, (v) => (o.value.style.left = `${v}%`)),
        y(J, (v) => (o.value.style.width = `${v}%`)),
        y(B, (v) => {
          (d.value.style.left = `${v}%`), (d.value.dataset.content = i(e.currentTime / e.playbackRate));
        }),
        y(F, (v) => {
          a.value.style.visibility = v ? 'visible' : 'hidden';
        }),
        he(() => {
          if (r(c)) {
            const v = Math.max(f.left, r(O.x)),
              R = (e.duration * (v - f.left)) / f.width;
            R < e.endTime && n('update:beginTime', R);
          } else if (r(k)) {
            const v = Math.min(f.right, r(O.x)),
              R = (e.duration * (v - f.left)) / f.width;
            R > e.beginTime && n('update:endTime', R);
          } else if (r(I)) {
            const v = r(O.x) - f.left;
            v >= 0 &&
              ((a.value.style.left = `${v}px`), (a.value.dataset.content = i(e.duration * (v / f.width))));
          }
        }),
        j(h, (v) => X()),
        q(() => {
          h.value = document.querySelector('main');
        });
      const X = () => {
          (f.top = r(s).getBoundingClientRect().top),
            (f.bottom = r(s).getBoundingClientRect().bottom),
            (f.left = r(s).getBoundingClientRect().left),
            (f.right = r(s).getBoundingClientRect().right),
            (f.width = r(s).getBoundingClientRect().width),
            (f.height = r(s).getBoundingClientRect().height);
        },
        ve = (v) => {
          const R = (e.duration * (v.clientX - f.left)) / f.width;
          R < (e.endTime || e.duration) && n('update:currentTime', Math.max(e.beginTime, R));
        },
        ye = () => n('update:fadeIn', !e.fadeIn),
        be = () => n('update:fadeOut', !e.fadeOut);
      return (v, R) => {
        const ee = pt,
          te = Q;
        return (
          _(),
          T(
            'div',
            {
              ref_key: 'htmlRootRef',
              ref: s,
              class: E([
                'audio-track',
                {
                  'no-thumbs': !t.showThumbs,
                },
              ]),
              'data-title': e.name,
            },
            [
              g(
                'div',
                {
                  ref_key: 'htmlSliderRef',
                  ref: o,
                  class: 'slider',
                  onMousedown: x(ve, ['prevent']),
                },
                [
                  t.showThumbs
                    ? (_(),
                      T(
                        Z,
                        {
                          key: 0,
                        },
                        [
                          g(
                            'div',
                            {
                              ref_key: 'htmlThumbLeftRef',
                              ref: m,
                              class: 'thumb-left',
                            },
                            [
                              g(
                                'div',
                                {
                                  class: 'inner',
                                  'data-content': r(p),
                                },
                                null,
                                8,
                                bt,
                              ),
                            ],
                            512,
                          ),
                          g(
                            'div',
                            {
                              ref_key: 'htmlThumbRightRef',
                              ref: u,
                              class: 'thumb-right',
                            },
                            [
                              g(
                                'div',
                                {
                                  class: 'inner',
                                  'data-content': r(b),
                                },
                                null,
                                8,
                                _t,
                              ),
                            ],
                            512,
                          ),
                        ],
                        64,
                      ))
                    : W('', !0),
                  g('div', Tt, $(r(gt)(r(M) / t.playbackRate)), 1),
                  g(
                    'div',
                    {
                      ref_key: 'htmlSliderInnerRef',
                      ref: l,
                      class: 'hoverable',
                    },
                    null,
                    512,
                  ),
                ],
                40,
                yt,
              ),
              ce(
                g(
                  'div',
                  {
                    ref_key: 'htmlProgressRef',
                    ref: d,
                    class: 'progress-line',
                  },
                  null,
                  512,
                ),
                [[Ne, r(U)]],
              ),
              g(
                'div',
                {
                  ref_key: 'htmlGhostRef',
                  ref: a,
                  class: 'help-line',
                },
                null,
                512,
              ),
              t.showFades
                ? (_(),
                  T('div', wt, [
                    t.fadeIn
                      ? (_(),
                        T('div', Rt, [
                          g('div', kt, [
                            g('span', null, $(v.$t('effects.echo.time')), 1),
                            g('span', null, $(t.fadeInTime.toFixed(1)), 1),
                          ]),
                          C(
                            ee,
                            {
                              'model-value': t.fadeInTime,
                              min: 0.1,
                              max: 5,
                              step: 0.1,
                              'show-tooltip': !1,
                              'onUpdate:modelValue': R[0] || (R[0] = (G) => n('update:fadeInTime', G)),
                            },
                            null,
                            8,
                            ['model-value', 'min', 'step'],
                          ),
                        ]))
                      : (_(), T('div', $t, $(v.$t('effects.volume.fade-in')), 1)),
                    C(
                      te,
                      {
                        name: 'fadein',
                        color: t.fadeIn ? 'var(--greenColor)' : 'currentColor',
                        onClick: x(ye, ['stop']),
                      },
                      null,
                      8,
                      ['color', 'onClick'],
                    ),
                  ]))
                : W('', !0),
              t.showFades
                ? (_(),
                  T('div', Ct, [
                    t.fadeOut
                      ? (_(),
                        T('div', St, [
                          g('div', Bt, [
                            g('span', null, $(v.$t('effects.echo.time')), 1),
                            g('span', null, $(t.fadeOutTime.toFixed(1)), 1),
                          ]),
                          C(
                            ee,
                            {
                              'model-value': t.fadeOutTime,
                              min: 0.1,
                              max: 5,
                              step: 0.1,
                              'show-tooltip': !1,
                              'onUpdate:modelValue': R[1] || (R[1] = (G) => n('update:fadeOutTime', G)),
                            },
                            null,
                            8,
                            ['model-value', 'min', 'step'],
                          ),
                        ]))
                      : (_(), T('div', It, $(v.$t('effects.volume.fade-out')), 1)),
                    C(
                      te,
                      {
                        name: 'fadeout',
                        color: t.fadeOut ? 'var(--greenColor)' : 'currentColor',
                        onClick: x(be, ['stop']),
                      },
                      null,
                      8,
                      ['color', 'onClick'],
                    ),
                  ]))
                : W('', !0),
              N(
                v.$slots,
                'default',
                {
                  class: 'item',
                },
                void 0,
                !0,
              ),
            ],
            10,
            vt,
          )
        );
      };
    },
  },
  zt = K(xt, [['__scopeId', 'data-v-04c9b4b1']]);
function Mt(t) {
  for (var n = 1 / 0, e = -1 / 0, i = 0, s = t.length, l; i < s; i++)
    (l = t[i]), n > l && (n = l), e < l && (e = l);
  return {
    min: n,
    max: e,
  };
}
function ie(t, n) {
  var e = Math.pow(2, n - 1),
    i = t < 0 ? t * e : t * (e - 1);
  return Math.max(-e, Math.min(e - 1, i));
}
function le(t, n, e) {
  var i,
    s = t.length,
    l = Math.ceil(s / n),
    o,
    a,
    d,
    m,
    u,
    h,
    f = ge(e, l * 2);
  for (i = 0; i < l; i++)
    (o = i * n),
      (a = (i + 1) * n > s ? s : (i + 1) * n),
      (d = t.subarray(o, a)),
      (h = Mt(d)),
      (u = ie(h.min, e)),
      (m = ie(h.max, e)),
      (f[i * 2] = u),
      (f[i * 2 + 1] = m);
  return f;
}
function ge(t, n) {
  return new (new Function(`return Int${t}Array`)())(n);
}
function Nt(t, n) {
  var e = t.length,
    i = 1 / e,
    s = t[0].length / 2,
    l = 0,
    o = 0,
    a,
    d,
    m = ge(n, s * 2);
  for (o = 0; o < s; o++) {
    for (a = 0, d = 0, l = 0; l < e; l++) (a += i * t[l][o * 2]), (d += i * t[l][o * 2 + 1]);
    (m[o * 2] = a), (m[o * 2 + 1] = d);
  }
  return [m];
}
function A(t, n) {
  return typeof t == 'number' ? t : n;
}
var Ot = function (t, n, e, i, s, l) {
    if (((n = A(n, 1e3)), (l = A(l, 16)), e == null && (e = !0), [8, 16, 32].indexOf(l) < 0))
      throw new Error('Invalid number of bits specified for peaks.');
    var o = t.numberOfChannels,
      a = [],
      d,
      m,
      u,
      h;
    if (((i = A(i, 0)), (s = A(s, t.length)), typeof t.subarray > 'u'))
      for (d = 0; d < o; d++) (u = t.getChannelData(d)), (h = u.subarray(i, s)), a.push(le(h, n, l));
    else a.push(le(t.subarray(i, s), n, l));
    return (
      e && a.length > 1 && (a = Nt(a, l)),
      (m = a[0].length / 2),
      {
        length: m,
        data: a,
        bits: l,
      }
    );
  },
  P;
class Pt {
  constructor(n) {
    ne(this, P, V({}));
    for (const e in n) L(this, P)[e] = n[e];
    Object.keys(L(this, P)).forEach((e) => {
      Object.defineProperty(this, e, {
        get() {
          return L(this, P)[e];
        },
        set(i) {
          L(this, P)[e] = i;
        },
      });
    });
  }
}
P = new WeakMap();
const re = (t, n) => (t / 32768) * (n / 4),
  de = (t, n, e) => t >= n && t <= e;
class Vt extends Pt {
  constructor(n, e, i = {}) {
    super({
      duration: i.duration || e.duration,
      beginTime: i.beginTime || 0,
      endTime: i.endTime || i.virtualDuration || e.duration,
      padTime: i.padTime || 0,
      fadeInTime: i.fadeInTime || 0,
      fadeOutTime: i.fadeOutTime || 0,
    }),
      (this.canvas = n),
      (this.audioBuffer = e),
      (this.color = i.color || '0, 255, 142'),
      (this.bgColor = i.bgColor || '0, 255, 142, 0.4'),
      this.audioBuffer ||
        (this.audioBuffer = {
          duration: i.duration || 10,
        }),
      y(
        () => this.beginTime,
        (s) => this.draw(),
      ),
      y(
        () => this.endTime,
        (s) => this.draw(),
      ),
      y(
        () => this.padTime,
        (s) => this.draw(),
      ),
      y(
        () => this.fadeInTime,
        (s) => this.draw(),
      ),
      y(
        () => this.fadeOutTime,
        (s) => this.draw(),
      );
  }
  setBuffer(n) {
    (this.audioBuffer = n),
      (this.duration = n.duration),
      this.endTime > n.duration && (this.endTime = n.duration),
      this.extractPeaks(),
      this.draw();
  }
  extractPeaks() {
    const e =
      (Math.max(1, this.endTime / this.audioBuffer.duration) * this.audioBuffer.length) / this.canvas.width;
    (this.peaks = Ot(this.audioBuffer, e, 8).data[0]), (this.peaksCount = this.peaks.length / 2);
  }
  draw() {
    const n = this.canvas.width,
      e = this.canvas.height,
      i = n * (this.beginTime / this.duration),
      s = n * (this.endTime / this.duration),
      l = (n * this.padTime) / this.duration,
      o = n * (this.fadeInTime / this.audioBuffer.duration),
      a = n * (this.fadeOutTime / this.audioBuffer.duration),
      d = e / 2;
    let m = !1;
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath(),
      ctx.clearRect(0, 0, n, e),
      (ctx.fillStyle = `rgba(${this.bgColor}, 0.2)`),
      ctx.fillRect(0, 0, n, e),
      (ctx.fillStyle = `rgba(${this.bgColor}, 1)`),
      ctx.fillRect(i, 0, s - i, e),
      (ctx.strokeStyle = `rgba(${this.color}, 1)`),
      (ctx.lineWidth = 1);
    for (let h = 0; h < this.peaksCount; h++) {
      const f = Math.ceil(h + l);
      m &&
        i < f &&
        f < s &&
        (ctx.stroke(),
        ctx.closePath(),
        ctx.beginPath(),
        (ctx.strokeStyle = `rgba(${this.color}, 1)`),
        (m = !1)),
        !m &&
          (f < i || f > s) &&
          (ctx.stroke(),
          ctx.closePath(),
          ctx.beginPath(),
          (ctx.strokeStyle = `rgba(${this.color}, 0.2)`),
          (m = !0));
      let p = 1;
      o && de(h, i, i + o) && (p = (h - i) / o), a && de(h, s - a, s) && (p = (s - h) / a);
      const b = re(this.peaks[2 * h], e),
        M = re(this.peaks[2 * h + 1], e);
      ctx.moveTo(f + 0.5, d + p * b), ctx.lineTo(f + 0.5, d + p * M);
    }
    ctx.stroke(), ctx.closePath();
  }
}
const Et = {
  __name: 'WaveForm',
  props: {
    buffer: AudioBuffer,
    color: {
      type: String,
      default: '0, 255, 142',
    },
    bgColor: {
      type: String,
      default: '37, 116, 74',
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: 50,
    },
    duration: {
      type: Number,
      default: null,
    },
    beginTime: {
      type: Number,
      default: 0,
    },
    endTime: {
      type: Number,
      default: null,
    },
    padTime: {
      type: Number,
      default: 0,
    },
    fadeInTime: {
      type: Number,
      default: 0,
    },
    fadeOutTime: {
      type: Number,
      default: 0,
    },
  },
  setup(t) {
    const n = t,
      e = w(null),
      i = w(null);
    let s;
    const l = () => {
      const o = window.devicePixelRatio || 1,
        a = i.value;
      (a.style.width = `${n.width || a.parentNode.clientWidth}px`),
        (a.style.height = `${n.height}px`),
        (a.width = o * (n.width || a.parentNode.clientWidth)),
        (a.height = o * n.height),
        (s = new Vt(a, n.buffer, {
          color: n.color,
          bgColor: n.bgColor,
          duration: n.duration || n.buffer.duration,
          beginTime: n.beginTime,
          endTime: n.endTime,
          padTime: n.padTime,
          fadeInTime: n.fadeInTime,
          fadeOutTime: n.fadeOutTime,
        })),
        s.extractPeaks(),
        s.draw();
    };
    return (
      j(e, (o) => l()),
      q(() => {
        e.value = document.querySelector('main');
      }),
      y(
        () => n.beginTime,
        (o) => (s.beginTime = o),
      ),
      y(
        () => n.endTime,
        (o) => (s.endTime = o),
      ),
      y(
        () => n.padTime,
        (o) => (s.padTime = o),
      ),
      y(
        () => n.fadeInTime,
        (o) => (s.fadeInTime = o),
      ),
      y(
        () => n.fadeOutTime,
        (o) => (s.fadeOutTime = o),
      ),
      y(
        () => n.buffer,
        (o, a) => {
          a && s.setBuffer(o);
        },
      ),
      (o, a) => (
        _(),
        T(
          'canvas',
          {
            ref_key: 'htmlCanvasRef',
            ref: i,
          },
          null,
          512,
        )
      )
    );
  },
};
export { Pt as S, pt as _, Et as a, zt as b, At as c, Lt as d, Qe as e, se as u };
