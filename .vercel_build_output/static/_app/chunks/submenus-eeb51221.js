import{S as y,i as E,s as S,e as u,t as w,k,c as d,a as _,h as I,m as j,d as i,b as h,g as x,J as m,j as C,E as p,M as D}from"./index-a824c1dc.js";function v(o,t,r){const l=o.slice();return l[1]=t[r],l}function b(o){let t,r=o[1].label+"",l,c,a;return{c(){t=u("a"),l=w(r),c=k(),this.h()},l(e){t=d(e,"A",{href:!0,class:!0});var n=_(t);l=I(n,r),c=j(n),n.forEach(i),this.h()},h(){h(t,"href",a=o[1].path),h(t,"class","text-gray-600 px-4 py-2 hover:bg-gray-50 hover:bg-gray-200 rounded flex-grow md:flex-grow-0")},m(e,n){x(e,t,n),m(t,l),m(t,c)},p(e,n){n&1&&r!==(r=e[1].label+"")&&C(l,r),n&1&&a!==(a=e[1].path)&&h(t,"href",a)},d(e){e&&i(t)}}}function V(o){let t,r,l,c=o[0],a=[];for(let e=0;e<c.length;e+=1)a[e]=b(v(o,c,e));return{c(){t=u("section"),r=u("div"),l=u("div");for(let e=0;e<a.length;e+=1)a[e].c();this.h()},l(e){t=d(e,"SECTION",{class:!0});var n=_(t);r=d(n,"DIV",{class:!0});var s=_(r);l=d(s,"DIV",{class:!0});var f=_(l);for(let g=0;g<a.length;g+=1)a[g].l(f);f.forEach(i),s.forEach(i),n.forEach(i),this.h()},h(){h(l,"class","container flex items-center justify-start md:gap-x-4 whitespace-nowrap"),h(r,"class","bg-gray-50 border-b"),h(t,"class","section border-b border-gray-200")},m(e,n){x(e,t,n),m(t,r),m(r,l);for(let s=0;s<a.length;s+=1)a[s].m(l,null)},p(e,[n]){if(n&1){c=e[0];let s;for(s=0;s<c.length;s+=1){const f=v(e,c,s);a[s]?a[s].p(f,n):(a[s]=b(f),a[s].c(),a[s].m(l,null))}for(;s<a.length;s+=1)a[s].d(1);a.length=c.length}},i:p,o:p,d(e){e&&i(t),D(a,e)}}}function q(o,t,r){let{menus:l=[]}=t;return o.$$set=c=>{"menus"in c&&r(0,l=c.menus)},[l]}class J extends y{constructor(t){super(),E(this,t,q,V,S,{menus:0})}}export{J as S};