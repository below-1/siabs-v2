import{S as p,i as h,s as k,e as b,c as v,a as g,d as c,b as w,g as m,P as y,Q as j,G as q,H as B,I,q as f,o as u,l as _,n as S,p as C,F as D}from"./index-a824c1dc.js";function d(n){let s,a,e,l;const i=n[2].default,o=D(i,n,n[1],null);return{c(){s=b("div"),o&&o.c(),this.h()},l(t){s=v(t,"DIV",{class:!0});var r=g(s);o&&o.l(r),r.forEach(c),this.h()},h(){w(s,"class","backdrop flex items-center justify-center md:p-4 svelte-43mxjo")},m(t,r){m(t,s,r),o&&o.m(s,null),a=!0,e||(l=y(s,"click",j(n[3])),e=!0)},p(t,r){o&&o.p&&(!a||r&2)&&q(o,i,t,t[1],a?I(i,t[1],r,null):B(t[1]),null)},i(t){a||(f(o,t),a=!0)},o(t){u(o,t),a=!1},d(t){t&&c(s),o&&o.d(t),e=!1,l()}}}function E(n){let s,a,e=n[0]&&d(n);return{c(){e&&e.c(),s=_()},l(l){e&&e.l(l),s=_()},m(l,i){e&&e.m(l,i),m(l,s,i),a=!0},p(l,[i]){l[0]?e?(e.p(l,i),i&1&&f(e,1)):(e=d(l),e.c(),f(e,1),e.m(s.parentNode,s)):e&&(S(),u(e,1,1,()=>{e=null}),C())},i(l){a||(f(e),a=!0)},o(l){u(e),a=!1},d(l){e&&e.d(l),l&&c(s)}}}function F(n,s,a){let{$$slots:e={},$$scope:l}=s,{show:i=!1}=s;const o=()=>{a(0,i=!1)};return n.$$set=t=>{"show"in t&&a(0,i=t.show),"$$scope"in t&&a(1,l=t.$$scope)},[i,l,e,o]}class H extends p{constructor(s){super(),h(this,s,F,E,k,{show:0})}}export{H as B};