import{S as ne,i as oe,s as ie,e as I,t as q,k as N,c as E,a as M,h as A,m as C,d as h,b as _,g as F,J as r,E as re,F as ce,N as fe,O as ue,w as L,x as Q,y as W,G as de,H as pe,I as me,T as _e,q as J,o as R,B as X,M as he,r as ge,K as ve,R as z,j as B}from"../../../../chunks/index-a824c1dc.js";import{P as we}from"../../../../chunks/page-header-3ab69ddf.js";import{F as be}from"../../../../chunks/fbutton-96603ec9.js";import{M as $e}from"../../../../chunks/modal-confirmation-0078935f.js";import"../../../../chunks/backdrop-e9b958d8.js";function te(t,a,s){const i=t.slice();return i[12]=a[s],i}function ke(t){let a;return{c(){a=q("hapus pegawai")},l(s){a=A(s,"hapus pegawai")},m(s,i){F(s,a,i)},d(s){s&&h(a)}}}function Ie(t){let a,s,i,d,o,l,p,w,D,m=t[0].nama+"",$,f,j,n=t[0].user.username+"",G,S,e,c,b=t[0].nip+"",y,u,P=t[0].nik+"",U,Y,O,x,H,K,V;return K=new be({props:{size:"sm",danger:!0,$$slots:{default:[ke]},$$scope:{ctx:t}}}),K.$on("click",t[4]),{c(){a=I("div"),s=I("img"),d=N(),o=I("div"),l=I("img"),w=N(),D=I("div"),$=q(m),f=N(),j=I("div"),G=q(n),S=N(),e=I("div"),c=q("NIP: "),y=q(b),u=q(", NIK: "),U=q(P),Y=N(),O=I("div"),x=N(),H=I("div"),L(K.$$.fragment),this.h()},l(g){a=E(g,"DIV",{class:!0});var v=M(a);s=E(v,"IMG",{class:!0,src:!0}),d=C(v),o=E(v,"DIV",{class:!0});var k=M(o);l=E(k,"IMG",{class:!0,src:!0}),w=C(k),D=E(k,"DIV",{class:!0});var Z=M(D);$=A(Z,m),Z.forEach(h),f=C(k),j=E(k,"DIV",{class:!0});var ee=M(j);G=A(ee,n),ee.forEach(h),S=C(k),e=E(k,"DIV",{class:!0});var T=M(e);c=A(T,"NIP: "),y=A(T,b),u=A(T,", NIK: "),U=A(T,P),T.forEach(h),Y=C(k),O=E(k,"DIV",{class:!0});var le=M(O);le.forEach(h),k.forEach(h),x=C(v),H=E(v,"DIV",{class:!0});var ae=M(H);Q(K.$$.fragment,ae),ae.forEach(h),v.forEach(h),this.h()},h(){_(s,"class","hidden md:block h-20 rounded"),z(s.src,i=t[0].avatar)||_(s,"src",i),_(l,"class","h-32 md:hidden rounded"),z(l.src,p=t[0].avatar)||_(l,"src",p),_(D,"class","font-black text-lg md:text-xl text-black"),_(j,"class","font-black text-lg text-black"),_(e,"class","text-sm font-semibold"),_(O,"class","text-sm flex flex-wrap gap-x-4"),_(o,"class","col-span-12 md:col-span-6 flex flex-col items-center md:items-start justify-center text-gray-500 mb-4"),_(H,"class","col-span-12 md:col-span-4 flex items-center justify-center md:justify-end"),_(a,"class","container grid grid-cols-12")},m(g,v){F(g,a,v),r(a,s),r(a,d),r(a,o),r(o,l),r(o,w),r(o,D),r(D,$),r(o,f),r(o,j),r(j,G),r(o,S),r(o,e),r(e,c),r(e,y),r(e,u),r(e,U),r(o,Y),r(o,O),r(a,x),r(a,H),W(K,H,null),V=!0},p(g,v){(!V||v&1&&!z(s.src,i=g[0].avatar))&&_(s,"src",i),(!V||v&1&&!z(l.src,p=g[0].avatar))&&_(l,"src",p),(!V||v&1)&&m!==(m=g[0].nama+"")&&B($,m),(!V||v&1)&&n!==(n=g[0].user.username+"")&&B(G,n),(!V||v&1)&&b!==(b=g[0].nip+"")&&B(y,b),(!V||v&1)&&P!==(P=g[0].nik+"")&&B(U,P);const k={};v&512&&(k.$$scope={dirty:v,ctx:g}),K.$set(k)},i(g){V||(J(K.$$.fragment,g),V=!0)},o(g){R(K.$$.fragment,g),V=!1},d(g){g&&h(a),X(K)}}}function se(t){let a,s=t[12].label+"",i,d,o;return{c(){a=I("a"),i=q(s),d=N(),this.h()},l(l){a=E(l,"A",{href:!0,class:!0});var p=M(a);i=A(p,s),d=C(p),p.forEach(h),this.h()},h(){_(a,"href",o=t[12].path),_(a,"class","text-gray-600 px-4 py-2 hover:bg-gray-50 hover:bg-gray-200 rounded flex-grow md:flex-grow-0")},m(l,p){F(l,a,p),r(a,i),r(a,d)},p:re,d(l){l&&h(a)}}}function Ee(t){let a,s,i,d,o,l,p,w,D,m;a=new we({props:{$$slots:{default:[Ie]},$$scope:{ctx:t}}});let $=t[3],f=[];for(let e=0;e<$.length;e+=1)f[e]=se(te(t,$,e));const j=t[7].default,n=ce(j,t,t[9],null);function G(e){t[8](e)}let S={message:t[2],title:"Konfirmasi Hapus Absen",onYes:t[5]};return t[1]!==void 0&&(S.show=t[1]),w=new $e({props:S}),fe.push(()=>ue(w,"show",G)),{c(){L(a.$$.fragment),s=N(),i=I("section"),d=I("div"),o=I("div");for(let e=0;e<f.length;e+=1)f[e].c();l=N(),n&&n.c(),p=N(),L(w.$$.fragment),this.h()},l(e){Q(a.$$.fragment,e),s=C(e),i=E(e,"SECTION",{class:!0});var c=M(i);d=E(c,"DIV",{class:!0});var b=M(d);o=E(b,"DIV",{class:!0});var y=M(o);for(let u=0;u<f.length;u+=1)f[u].l(y);y.forEach(h),b.forEach(h),c.forEach(h),l=C(e),n&&n.l(e),p=C(e),Q(w.$$.fragment,e),this.h()},h(){_(o,"class","container flex items-center justify-start md:gap-x-4 whitespace-nowrap"),_(d,"class","bg-gray-50 border-b"),_(i,"class","section border-b border-gray-200")},m(e,c){W(a,e,c),F(e,s,c),F(e,i,c),r(i,d),r(d,o);for(let b=0;b<f.length;b+=1)f[b].m(o,null);F(e,l,c),n&&n.m(e,c),F(e,p,c),W(w,e,c),m=!0},p(e,[c]){const b={};if(c&513&&(b.$$scope={dirty:c,ctx:e}),a.$set(b),c&8){$=e[3];let u;for(u=0;u<$.length;u+=1){const P=te(e,$,u);f[u]?f[u].p(P,c):(f[u]=se(P),f[u].c(),f[u].m(o,null))}for(;u<f.length;u+=1)f[u].d(1);f.length=$.length}n&&n.p&&(!m||c&512)&&de(n,j,e,e[9],m?me(j,e[9],c,null):pe(e[9]),null);const y={};c&4&&(y.message=e[2]),!D&&c&2&&(D=!0,y.show=e[1],_e(()=>D=!1)),w.$set(y)},i(e){m||(J(a.$$.fragment,e),J(n,e),J(w.$$.fragment,e),m=!0)},o(e){R(a.$$.fragment,e),R(n,e),R(w.$$.fragment,e),m=!1},d(e){X(a,e),e&&h(s),e&&h(i),he(f,e),e&&h(l),n&&n.d(e),e&&h(p),X(w,e)}}}async function Ce({params:t,session:a,fetch:s}){const d=await(await s(`/app/pegawai/${t.nik}/layout-data`,{headers:{accept:"application/json","content-type":"application/json"}})).json();return{status:200,props:d}}function De(t,a,s){let i,{$$slots:d={},$$scope:o}=a,{pegawai:l}=a,{user:p}=a;ge("pegawai",l);const{getUser:w}=ve("currentUser");w();const D=[{label:"overview",path:`/app/pegawai/${l.nik}/overview`,icon:'<ion-icon name="apps-outline"></ion-icon>'},{label:"jadwal",path:`/app/pegawai/${l.nik}/jadwal`},{label:"edit data",path:`/app/pegawai/${l.nik}/edit-data`},{label:"hapus",path:`/app/pegawai/${l.nik}/hapus`}];let m=!1;function $(){s(1,m=!0),console.log(`deleteModal = ${m}`)}async function f(){window.location=`/app/pegawai/${l.id}/delete`}function j(n){m=n,s(1,m)}return t.$$set=n=>{"pegawai"in n&&s(0,l=n.pegawai),"user"in n&&s(6,p=n.user),"$$scope"in n&&s(9,o=n.$$scope)},t.$$.update=()=>{t.$$.dirty&1&&s(2,i=`Apakah anda menghapus data pegawai #${l?l.id:""}`)},[l,m,i,D,$,f,p,d,j,o]}class Ke extends ne{constructor(a){super(),oe(this,a,De,Ee,ie,{pegawai:0,user:6})}}export{Ke as default,Ce as load};