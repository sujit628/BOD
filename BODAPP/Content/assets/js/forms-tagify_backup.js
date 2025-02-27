"use strict";!function(){var a=document.querySelector("#TagifyBasic"),a=(new Tagify(a),document.querySelector("#TagifyReadonly")),a=(new Tagify(a),document.querySelector("#TagifyCustomInlineSuggestion")),e=document.querySelector("#TagifyCustomListSuggestion"),t=["A# .NET","A# (Axiom)","A-0 System","A+","A++","ABAP","ABC","ABC ALGOL","ABSET","ABSYS","ACC","Accent","Ace DASL","ACL2","Avicsoft","ACT-III","Action!","ActionScript","Ada","Adenine","Agda","Agilent VEE","Agora","AIMMS","Alef","ALF","ALGOL 58","ALGOL 60","ALGOL 68","ALGOL W","Alice","Alma-0","AmbientTalk","Amiga E","AMOS","AMPL","Apex (Salesforce.com)","APL","AppleScript","Arc","ARexx","Argus","AspectJ","Assembly language","ATS","Ateji PX","AutoHotkey","Autocoder","AutoIt","AutoLISP / Visual LISP","Averest","AWK","Axum","Active Server Pages","ASP.NET"],a=(new Tagify(a,{whitelist:t,maxTags:10,dropdown:{maxItems:20,classname:"tags-inline",enabled:0,closeOnSelect:!1}}),new Tagify(e,{whitelist:t,maxTags:10,dropdown:{maxItems:20,classname:"",enabled:0,closeOnSelect:!1}}),document.querySelector("#TagifyUserList"));let i=new Tagify(a,{tagTextProp:"name",enforceWhitelist:!0,skipInvalid:!0,dropdown:{closeOnSelect:!1,enabled:0,classname:"users-list",searchKeys:["name","email"]},templates:{tag:function(a){return`
    <tag title="${a.title||a.email}"
      contenteditable='false'
      spellcheck='false'
      tabIndex="-1"
      class="${this.settings.classNames.tag} ${a.class||""}"
      ${this.getAttributes(a)}
    >
      <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
      <div>
        <div class='tagify__tag__avatar-wrap'>
          <img onerror="this.style.visibility='hidden'" src="${a.avatar}">
        </div>
        <span class='tagify__tag-text'>${a.name}</span>
      </div>
    </tag>
  `},dropdownItem:function(a){return`
    <div ${this.getAttributes(a)}
      class='tagify__dropdown__item align-items-center ${a.class||""}'
      tabindex="0"
      role="option"
    >
      ${a.avatar?`<div class='tagify__dropdown__item__avatar-wrap'>
          <img onerror="this.style.visibility='hidden'" src="${a.avatar}">
        </div>`:""}
      <div class="fw-medium">${a.name}</div>
      <span>${a.email}</span>
    </div>
  `},dropdownHeader:function(a){return`
        <div class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
            <strong>${this.value.length?"Add remaning":"Add All"}</strong>
            <span>${a.length} members</span>
        </div>
    `}},whitelist:[]});i.on("dropdown:select",function(a){a.detail.elm.classList.contains(i.settings.classNames.dropdownItem+"__addAll")&&i.dropdown.selectAll()}).on("edit:start",function({detail:{tag:a,data:e}}){i.setTagTextNode(a,`${e.name} <${e.email}>`)});e=Array.apply(null,Array(100)).map(function(){return Array.apply(null,Array(~~(10*Math.random()+3))).map(function(){return String.fromCharCode(26*Math.random()+97)}).join("")+"@gmail.com"});const n=document.querySelector("#QuestionList"),s=new Tagify(n,{whitelist:e,callbacks:{invalid:function(a){console.log("invalid",a.detail)}},dropdown:{position:"text",enabled:1}}),l=n.nextElementSibling;l.addEventListener("click",function(){s.addEmptyTag()})}();


