"use strict";(self.webpackChunkpolygon_nft_generator_react=self.webpackChunkpolygon_nft_generator_react||[]).push([[923],{882:function(e,n,r){r.r(n);var t=r(437),u=r(791),o=r(540),a=r.n(o),l=r(577),c=r(77),i=r.n(c),f=(r(947),function(e){var n=function(e){var n=(0,u.useRef)(e);return(0,u.useEffect)((function(){n.current=e}),[e]),n}(e);return(0,u.useCallback)((function(){return n.current&&n.current.apply(n,arguments)}),[n])});var s=function(e,n){var r=e.id,o=e.name,a=e.value,c=e.onFileSelect,s=e.onChange,d=e.onDialogOpen,C=e.onDialogClose,p=e.onTabChange,A=e.apiRef,E=e.customTabs,L=e.validators,v=e.tabsCss,g=e.locale,_=e.localeTranslations,O=e.localePluralize,R=e.previewUrlCallback,w=(0,t.a)(e,["id","name","value","onFileSelect","onChange","onDialogOpen","onDialogClose","onTabChange","apiRef","customTabs","validators","tabsCss","locale","localeTranslations","localePluralize","previewUrlCallback"]),b=(0,u.useRef)(null),h=(0,u.useRef)(null),U=f(c),m=f(s),D=f(d),P=f(C),T=f(p);(0,l.u)(E,n);var I=function(e,n){var r=!0,t=(0,u.useRef)();t.current?r=!!(n&&t.current.deps&&i()(n,t.current.deps)):t.current={deps:n,result:e()};var o=r?t.current:{deps:n,result:e()};return t.current=o,o.result}((function(){return e=w,Object.entries(e).reduce((function(e,n){var r=(0,t.b)(n,2),u=r[0],o=r[1];return(0,t.c)((0,t.c)({},e),{},(0,t.d)({},"data-".concat(u.replace(/([a-zA-Z])(?=[A-Z])/g,"$1-").toLowerCase()),o))}),{});var e}),[w]);return(0,l.a)((function(){return g&&(window.UPLOADCARE_LOCALE=g),O&&(window.UPLOADCARE_LOCALE_PLURALIZE=O),_&&(window.UPLOADCARE_LOCALE_TRANSLATIONS=_),R&&(window.UPLOADCARE_PREVIEW_URL_CALLBACK=R),n.plugin((function(e){e.locale.rebuild({locale:g||null,localeTranslations:_||null,localePluralize:O||null})})),function(){g&&delete window.UPLOADCARE_LOCALE,O&&delete window.UPLOADCARE_LOCALE_PLURALIZE,_&&delete window.UPLOADCARE_LOCALE_TRANSLATIONS,R&&delete window.UPLOADCARE_PREVIEW_URL_CALLBACK}}),[g,_,O,R]),(0,u.useEffect)((function(){h.current=n.Widget(b.current);var e=b.current.nextSibling;return function(){return e&&e.parentNode.removeChild(e)}}),[n,I]),function(e,n){(0,u.useEffect)((function(){if(null!=n){var r=e.current;return n.forEach((function(e){r.validators.push(e)})),function(){r.validators.length=0}}}),[e,n])}(h,L),(0,u.useEffect)((function(){return h.current.onUploadComplete.add(m),h.current.onChange.add(U),function(){h.current.onUploadComplete.remove(m),h.current.onChange.remove(U)}}),[m,U,n,I]),(0,u.useEffect)((function(){var e,n=function(n){(e=n).done(P).fail(P).progress(T),D(n)};return h.current.onDialogOpen.add(n),function(){h.current.onDialogOpen.remove(n),e&&e.reject()}}),[I,P,D,T]),(0,u.useEffect)((function(){var e=[],n=function(n){e=n?n.files?n.files():[n]:[]};return h.current.onChange.add(n),function(){e.forEach((function(e){return e.cancel()})),h.current.onChange.remove(n)}}),[I]),(0,u.useEffect)((function(){h.current.value(a)}),[a]),(0,u.useEffect)((function(){n&&v&&"string"===typeof v&&(0===v.indexOf("https://")?n.tabsCss.addUrl(v):n.tabsCss.addStyle(v))}),[n,v]),(0,u.useImperativeHandle)(A,(function(){return{openDialog:function(){return h.current.openDialog()},reloadInfo:function(){return h.current.reloadInfo()},getInput:function(){return h.current.inputElement}}}),[]),(0,u.useCallback)((function(){return u.createElement("input",(0,t._)({type:"hidden",ref:b,id:r,name:o},I))}),[I,r,o])};n.default=function(e){var n=s(e,a());return u.createElement(n,null)}}}]);
//# sourceMappingURL=ucare-widget-chunk.93dcd259.chunk.js.map