"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[95],{2777:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var t=n(4848),r=n(8453);const s={id:"prefixing",title:"Prefixing",sidebar_label:"Prefixing",slug:"/prefixing"},o=void 0,c={id:"prefixing",title:"Prefixing",description:"Introduction",source:"@site/docs/prefixing.md",sourceDirName:".",slug:"/prefixing",permalink:"/nestjs-s3/prefixing",draft:!1,unlisted:!1,editUrl:"https://github.com/LabO8/nestjs-s3/docs/prefixing.md",tags:[],version:"current",frontMatter:{id:"prefixing",title:"Prefixing",sidebar_label:"Prefixing",slug:"/prefixing"},sidebar:"docsSidebar",previous:{title:"Download helper",permalink:"/nestjs-s3/download-helper"},next:{title:"Deletion helper",permalink:"/nestjs-s3/deletion-helper"}},l={},d=[{value:"Introduction",id:"introduction",level:2},{value:"Usage",id:"usage",level:2},{value:"Custom prefixing",id:"custom-prefixing",level:2}];function a(e){const i={code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.h2,{id:"introduction",children:"Introduction"}),"\n",(0,t.jsx)(i.p,{children:"As our app grows, we might want to store our objects in a more organized way. This is where the prefix comes in."}),"\n",(0,t.jsx)(i.p,{children:"The prefix is a string that is prepended to the object key. This allows us to organize our objects in a folder-like structure."}),"\n",(0,t.jsxs)(i.p,{children:["For example, if we have a bucket called ",(0,t.jsx)(i.code,{children:"my-bucket"})," and we want to store our objects in a folder called ",(0,t.jsx)(i.code,{children:"my-folder"}),", we can do that by prepending the prefix ",(0,t.jsx)(i.code,{children:"my-folder/"})," to the object key."]}),"\n",(0,t.jsx)(i.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(i.p,{children:"By default, the prefix is an empty string. This means that the object key is not modified, but if you set a prefix, when you initialize the module, the prefix will be prepended to the object key."}),"\n",(0,t.jsx)(i.p,{children:"The default algorithm for prefixing will just prepend the prefix to the object key, but you can also specify a custom algorithm."}),"\n",(0,t.jsx)(i.p,{children:(0,t.jsxs)(i.strong,{children:["All services like the ",(0,t.jsx)(i.code,{children:"ObjectService"})," will use the prefix service by default."]})}),"\n",(0,t.jsx)(i.h2,{id:"custom-prefixing",children:"Custom prefixing"}),"\n",(0,t.jsxs)(i.p,{children:["In order to use a custom prefixing algorithm, you need to specify the ",(0,t.jsx)(i.code,{children:"prefixingAlgorithm"})," when initializing the module."]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-typescript",children:"class CustomPrefixService implements IPrefixAlgorithm {\n  prefix(remote: string, prefix: string, bucket?: string): string {\n    return `${bucket}/${prefix}${remote}`;\n  }\n}\n\nS3Module.forRoot({\n  region: 'region',\n  accessKeyId: '***',\n  secretAccessKey: '***',\n  prefix: 'test/',\n  prefixAlgorithm: new CustomPrefixService(),\n})\n"})}),"\n",(0,t.jsx)(i.p,{children:"you can also use injectables"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-typescript",children:" class CustomPrefixWithDIService implements IPrefixAlgorithm {\n  public constructor(private readonly globalPrefix: string) {}\n\n  prefix(remote: string, prefix: string, bucket?: string): string {\n    return `${bucket}/${this.globalPrefix}${prefix}${remote}`;\n  }\n}\n\nS3Module.forRootAsync({\n  imports: [SomeModuleThatProvidesTheGlobalPrefix],\n  prefixAlgorithmInject: ['GLOBAL_PREFIX'],\n  prefixAlgorithmFactory: (globalPrefix: string) => new CustomPrefixWithDIService(globalPrefix),\n  useFactory: () => ({\n    region: 'region',\n    accessKeyId: '***',\n    secretAccessKey: '***',\n    prefix: 'test/',\n  }),\n})\n"})})]})}function p(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>o,x:()=>c});var t=n(6540);const r={},s=t.createContext(r);function o(e){const i=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),t.createElement(s.Provider,{value:i},e.children)}}}]);