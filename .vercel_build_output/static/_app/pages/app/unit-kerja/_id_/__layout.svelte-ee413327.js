import{S as B,i as J,s as N,F as O,N as R,O as T,w as S,k as v,x as q,m as k,y,g as E,G as Y,H as z,I as L,T as Q,q as D,o as H,B as F,d as w,r as W,e as K,t as C,c as M,a as I,h as G,b as j,R as V,J as g,j as A}from"../../../../chunks/index-a824c1dc.js";import{P as X}from"../../../../chunks/page-header-3ab69ddf.js";import{F as Z}from"../../../../chunks/fbutton-96603ec9.js";import{S as x}from"../../../../chunks/submenus-eeb51221.js";import{M as ee}from"../../../../chunks/modal-confirmation-0078935f.js";import"../../../../chunks/backdrop-e9b958d8.js";function ae(n){let a;return{c(){a=C("Hapus Data")},l(t){a=G(t,"Hapus Data")},m(t,r){E(t,a,r)},d(t){t&&w(a)}}}function te(n){let a,t,r,_,f,s,u=n[0].nama+"",p,$,l,h=n[0].alamat+"",m,e,o,d;return o=new Z({props:{danger:!0,$$slots:{default:[ae]},$$scope:{ctx:n}}}),o.$on("click",n[3]),{c(){a=K("div"),t=K("img"),_=v(),f=K("div"),s=K("h1"),p=C(u),$=v(),l=K("h2"),m=C(h),e=v(),S(o.$$.fragment),this.h()},l(i){a=M(i,"DIV",{class:!0});var c=I(a);t=M(c,"IMG",{class:!0,src:!0}),_=k(c),f=M(c,"DIV",{class:!0});var b=I(f);s=M(b,"H1",{class:!0});var P=I(s);p=G(P,u),P.forEach(w),$=k(b),l=M(b,"H2",{class:!0});var U=I(l);m=G(U,h),U.forEach(w),b.forEach(w),e=k(c),q(o.$$.fragment,c),c.forEach(w),this.h()},h(){j(t,"class","hidden md:block h-20 rounded"),V(t.src,r=n[0].avatar)||j(t,"src",r),j(s,"class","font-black text-3xl"),j(l,"class","text-sm"),j(f,"class","flex-grow"),j(a,"class","flex flex-col md:flex-row items-center gap-y-2 gap-x-4")},m(i,c){E(i,a,c),g(a,t),g(a,_),g(a,f),g(f,s),g(s,p),g(f,$),g(f,l),g(l,m),g(a,e),y(o,a,null),d=!0},p(i,c){(!d||c&1&&!V(t.src,r=i[0].avatar))&&j(t,"src",r),(!d||c&1)&&u!==(u=i[0].nama+"")&&A(p,u),(!d||c&1)&&h!==(h=i[0].alamat+"")&&A(m,h);const b={};c&256&&(b.$$scope={dirty:c,ctx:i}),o.$set(b)},i(i){d||(D(o.$$.fragment,i),d=!0)},o(i){H(o.$$.fragment,i),d=!1},d(i){i&&w(a),F(o)}}}function se(n){let a,t,r,_,f,s,u,p;a=new X({props:{$$slots:{default:[te]},$$scope:{ctx:n}}}),r=new x({props:{menus:n[5]}});const $=n[6].default,l=O($,n,n[8],null);function h(e){n[7](e)}let m={message:n[2],title:"Konfirmasi Hapus Unit Kerja",onYes:n[4]};return n[1]!==void 0&&(m.show=n[1]),s=new ee({props:m}),R.push(()=>T(s,"show",h)),{c(){S(a.$$.fragment),t=v(),S(r.$$.fragment),_=v(),l&&l.c(),f=v(),S(s.$$.fragment)},l(e){q(a.$$.fragment,e),t=k(e),q(r.$$.fragment,e),_=k(e),l&&l.l(e),f=k(e),q(s.$$.fragment,e)},m(e,o){y(a,e,o),E(e,t,o),y(r,e,o),E(e,_,o),l&&l.m(e,o),E(e,f,o),y(s,e,o),p=!0},p(e,[o]){const d={};o&257&&(d.$$scope={dirty:o,ctx:e}),a.$set(d),l&&l.p&&(!p||o&256)&&Y(l,$,e,e[8],p?L($,e[8],o,null):z(e[8]),null);const i={};o&4&&(i.message=e[2]),!u&&o&2&&(u=!0,i.show=e[1],Q(()=>u=!1)),s.$set(i)},i(e){p||(D(a.$$.fragment,e),D(r.$$.fragment,e),D(l,e),D(s.$$.fragment,e),p=!0)},o(e){H(a.$$.fragment,e),H(r.$$.fragment,e),H(l,e),H(s.$$.fragment,e),p=!1},d(e){F(a,e),e&&w(t),F(r,e),e&&w(_),l&&l.d(e),e&&w(f),F(s,e)}}}async function me({params:n,session:a,fetch:t}){const _=await(await t(`/app/unit-kerja/${n.id}/layout-data`,{headers:{accept:"application/json","content-type":"application/json"}})).json();return{status:200,props:_}}function ne(n,a,t){let r,{$$slots:_={},$$scope:f}=a,{unitKerja:s={}}=a;W("unitKerja",s);let u=!1;function p(){t(1,u=!0),console.log(`deleteModal = ${u}`)}async function $(){window.location=`/app/unit-kerja/${s.id}/delete`}const l=[{label:"overview",path:`/app/unit-kerja/${s.id}/overview`},{label:"jadwal",path:`/app/unit-kerja/${s.id}/jadwal`}];function h(m){u=m,t(1,u)}return n.$$set=m=>{"unitKerja"in m&&t(0,s=m.unitKerja),"$$scope"in m&&t(8,f=m.$$scope)},n.$$.update=()=>{n.$$.dirty&1&&t(2,r=`Apakah anda menghapus data Unit Kerja #${s?s.nama:""}`)},[s,u,r,p,$,l,_,h,f]}class ce extends B{constructor(a){super(),J(this,a,ne,se,N,{unitKerja:0})}}export{ce as default,me as load};