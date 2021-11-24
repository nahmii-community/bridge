import{r as U}from"./singletons-12a22614.js";import{C as c,S as m,i as _,s as p,L as g,e as w,c as b,a as E,d as f,b as d,f as u,N as C,O as v,P as y,x as N,u as A,t as L,g as I,h as D}from"./vendor-9691cc84.js";const M=U,J=q;async function q(e,t){return M.goto(e,t,[])}const k=c("light");function x(e){return e=e==="light"||e==="dark"}function P(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function R(){return localStorage.getItem("mode")}function Q(){k.update(e=>(e=e=="light"?"dark":"light",localStorage.setItem("mode",e),document.querySelector("html").dataset.mode=e,e))}function Y(){const e=R(),t=P();let s;x(e)?s=e:s=t?"dark":"light",k.set(s),document.querySelector("html").dataset.mode=s}function B(e){let t;return{c(){t=L(e[0])},l(s){t=I(s,e[0])},m(s,o){u(s,t,o)},p(s,o){o&1&&D(t,s[0])},d(s){s&&f(t)}}}function W(e){let t,s,o;const n=e[4].default,a=g(n,e,e[3],null),r=a||B(e);return{c(){t=w("h1"),r&&r.c(),this.h()},l(i){t=b(i,"H1",{class:!0,style:!0});var l=E(t);r&&r.l(l),l.forEach(f),this.h()},h(){d(t,"class","title svelte-1951ugc"),d(t,"style",s=""+((e[1]?`margin-top: ${e[1]};`:"")+" "+(e[2]?`margin-bottom: ${e[2]};`:"")))},m(i,l){u(i,t,l),r&&r.m(t,null),o=!0},p(i,[l]){a?a.p&&(!o||l&8)&&C(a,n,i,i[3],o?y(n,i[3],l,null):v(i[3]),null):r&&r.p&&(!o||l&1)&&r.p(i,o?l:-1),(!o||l&6&&s!==(s=""+((i[1]?`margin-top: ${i[1]};`:"")+" "+(i[2]?`margin-bottom: ${i[2]};`:""))))&&d(t,"style",s)},i(i){o||(N(r,i),o=!0)},o(i){A(r,i),o=!1},d(i){i&&f(t),r&&r.d(i)}}}function G(e,t,s){let{$$slots:o={},$$scope:n}=t,{title:a="Nahmii"}=t,{marginTop:r=""}=t,{marginBottom:i=""}=t;return e.$$set=l=>{"title"in l&&s(0,a=l.title),"marginTop"in l&&s(1,r=l.marginTop),"marginBottom"in l&&s(2,i=l.marginBottom),"$$scope"in l&&s(3,n=l.$$scope)},[a,r,i,n,o]}class $ extends m{constructor(t){super();_(this,t,G,W,p,{title:0,marginTop:1,marginBottom:2})}}function O(e){let t,s;const o=e[1].default,n=g(o,e,e[0],null);return{c(){t=w("div"),n&&n.c(),this.h()},l(a){t=b(a,"DIV",{class:!0});var r=E(t);n&&n.l(r),r.forEach(f),this.h()},h(){d(t,"class","card svelte-di3y99")},m(a,r){u(a,t,r),n&&n.m(t,null),s=!0},p(a,[r]){n&&n.p&&(!s||r&1)&&C(n,o,a,a[0],s?y(o,a[0],r,null):v(a[0]),null)},i(a){s||(N(n,a),s=!0)},o(a){A(n,a),s=!1},d(a){a&&f(t),n&&n.d(a)}}}function F(e,t,s){let{$$slots:o={},$$scope:n}=t;return e.$$set=a=>{"$$scope"in a&&s(0,n=a.$$scope)},[n,o]}class ee extends m{constructor(t){super();_(this,t,F,O,p,{})}}const te=33e4,se=13e5,ae={mainnet:["0x1","0x15af"],testnet:["0x3","0x15b1"]},ne="0x4200000000000000000000000000000000000010",oe="0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",re="0x4200000000000000000000000000000000000006",ie="10000000000000000",le="0",H=[{chainId:"0x1",chainName:"Ethereum Mainnet",isSupported:!0,L2:!1,rpcUrls:["https://mainnet.infura.io/v3/f36942ff00514b7fb154a652fa510972"],blockExplorerUrls:["https://etherscan.io"],companionChainId:"0x15af",standardBridge:"0x2fCE9b92a64c1DDf14a1A9E5Ec6D4e4C7C9F4Fdd",fraudProofWindow:604800},{chainId:"0x3",chainName:"Ropsten Testnet",isSupported:!0,L2:!1,rpcUrls:["https://ropsten.infura.io/v3/f36942ff00514b7fb154a652fa510972"],blockExplorerUrls:["https://ropsten.etherscan.io"],companionChainId:"0x15b1",standardBridge:"0x21De2607E90edb1736bc460a4cd58c0FCd74ABcc",fraudProofWindow:604800},{chainId:"0x15af",chainName:"Nahmii Mainnet",isSupported:!0,L2:!0,companionChainId:"0x1",rpcUrls:["https://l2.nahmii.io"],blockExplorerUrls:["https://explorer.nahmii.io"],fraudProofWindow:604800},{chainId:"0x15b1",chainName:"Nahmii Testnet",isSupported:!0,L2:!0,companionChainId:"0x3",rpcUrls:["https://l2.testnet.nahmii.io"],blockExplorerUrls:["https://explorer.testnet.nahmii.io"],fraudProofWindow:604800}],S=c(""),h=c("0x"),T=c(!1);async function j(e){S.set(e)}async function V(e){let t;const s=h.subscribe(o=>{t=o[0]});e.length===0?T.set(!1):e[0]!==t&&h.set(e),s()}const fe=async()=>{const e=window.ethereum;if(e)try{const t=await e.request({method:"eth_chainId"});S.set(t),e.on("chainChanged",await j);const s=await e.request({method:"eth_requestAccounts"});return e.on("accountsChanged",await V),h.set(s),T.set(!0),!0}catch(t){return t.code===4001&&console.log("User rejected request"),!1}else return!1},K=async e=>{let t=H.find(s=>s.chainId==e);return t||(t={chainId:e,chainName:"Unsupported",isSupported:!1}),t},ce=async e=>{const t=window.ethereum;if(t)try{await t.request({method:"wallet_switchEthereumChain",params:[{chainId:e}]})}catch(s){if(s.code===4902){const{chainName:o,rpcUrls:n,blockExplorerUrls:a}=await K(e);await Z(e,o,n,a)}else console.error(s)}else console.log("User does not have an Ethereum provider installed")},Z=async(e,t,s,o)=>{const n=window.ethereum;if(n)try{await n.request({method:"wallet_addEthereumChain",params:[{chainId:e,chainName:t,rpcUrls:s,blockExplorerUrls:o,nativeCurrency:{name:"Ethereum",symbol:"ETH",decimals:18}}]})}catch(a){console.log(a)}},de=async(e,t,s,o)=>{const n=window.ethereum;let a;if(n)try{return a=await n.request({method:"wallet_watchAsset",params:{type:"ERC20",options:{address:e,symbol:t,decimals:s,image:o}}}),a}catch(r){console.log(r)}};export{ee as C,se as D,$ as G,ae as L,oe as M,re as N,ie as W,le as Z,ce as a,de as b,fe as c,te as d,ne as e,K as f,J as g,T as i,k as m,S as n,Y as s,Q as t,h as w};