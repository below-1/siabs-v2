import{i as f}from"./util-64b1bb88.js";import{S as l,i as m,s as c,e as d,c as p,b as a,g as h,E as o,d as y}from"./index-a824c1dc.js";function k(n){return e=>{if(e==null||e==="")return n}}function q(n,e){return t=>{if(!!t&&t.length<n)return e}}function E(n,e){let t={};for(let r of Object.keys(n)){const i=n[r];for(let u of i){const s=u(e[r]);if(s){t[r]=s;break}}}return{fields:t,valid:f(t)}}function _(n){let e;return{c(){e=d("input"),this.h()},l(t){e=p(t,"INPUT",{class:!0,name:!0,type:!0}),this.h()},h(){a(e,"class","rounded px-2 py-1 font-semibold text-gray-700 border"),a(e,"name",n[0]),a(e,"type","file")},m(t,r){h(t,e,r)},p(t,[r]){r&1&&a(e,"name",t[0])},i:o,o,d(t){t&&y(e)}}}function b(n,e,t){let{name:r=""}=e;return n.$$set=i=>{"name"in i&&t(0,r=i.name)},[r]}class F extends l{constructor(e){super(),m(this,e,b,_,c,{name:0})}}export{F,q as m,k as r,E as u};
