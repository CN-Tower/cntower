(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{424:function(t,s,a){"use strict";a.r(s);var e=a(46),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"linux"}},[t._v("Linux")]),t._v(" "),a("h2",{attrs:{id:"常用指令"}},[t._v("常用指令")]),t._v(" "),a("h4",{attrs:{id:"查看子目录大小"}},[t._v("查看子目录大小")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# linux")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("du")]),t._v(" -h —max-depth"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# mac")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("du")]),t._v(" -hd1\n")])])]),a("h4",{attrs:{id:"查看端口进程"}},[t._v("查看端口进程")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("lsof")]),t._v(" -i:3010\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("netstat")]),t._v(" -tunlp "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3010")]),t._v("\n")])])]),a("h2",{attrs:{id:"防火墙设置"}},[t._v("防火墙设置")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 启动防火墙")]),t._v("\nsystemctl start firewalld.service\nsystemctl unmask firewalld.service\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 开放80和443端口")]),t._v("\nfirewall-cmd --permanent --zone"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("public --add-port"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("/tcp\nfirewall-cmd --permanent --zone"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("public --add-port"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("443")]),t._v("/tcp\n\nfirewall-cmd --reload\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);