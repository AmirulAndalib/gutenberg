"use strict";(self.webpackChunkgutenberg=self.webpackChunkgutenberg||[]).push([[8738],{"./packages/components/build-module/input-control/input-base.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return input_base}});var react=__webpack_require__("./node_modules/react/index.js"),use_instance_id=__webpack_require__("./packages/compose/build-module/hooks/use-instance-id/index.js"),input_control_styles=__webpack_require__("./packages/components/build-module/input-control/styles/input-control-styles.js");function Backdrop({disabled:disabled=!1,isFocused:isFocused=!1}){return(0,react.createElement)(input_control_styles.Kg,{"aria-hidden":"true",className:"components-input-control__backdrop",disabled:disabled,isFocused:isFocused})}var backdrop=(0,react.memo)(Backdrop);Backdrop.__docgenInfo={description:"",methods:[],displayName:"Backdrop",props:{disabled:{defaultValue:{value:"false",computed:!1},required:!1},isFocused:{defaultValue:{value:"false",computed:!1},required:!1}}};var component=__webpack_require__("./packages/components/build-module/visually-hidden/component.js");function Label({children:children,hideLabelFromVision:hideLabelFromVision,htmlFor:htmlFor,...props}){return children?hideLabelFromVision?(0,react.createElement)(component.Z,{as:"label",htmlFor:htmlFor},children):(0,react.createElement)(input_control_styles.ub,null,(0,react.createElement)(input_control_styles.__,{htmlFor:htmlFor,...props},children)):null}Label.__docgenInfo={description:"",methods:[],displayName:"Label"};var context_system_provider=__webpack_require__("./packages/components/build-module/context/context-system-provider.js"),use_deprecated_props=__webpack_require__("./packages/components/build-module/utils/use-deprecated-props.js");function getUIFlexProps(labelPosition){const props={};switch(labelPosition){case"top":props.direction="column",props.expanded=!1,props.gap=0;break;case"bottom":props.direction="column-reverse",props.expanded=!1,props.gap=0;break;case"edge":props.justify="space-between"}return props}function InputBase(props,ref){const{__next40pxDefaultSize:__next40pxDefaultSize,__unstableInputWidth:__unstableInputWidth,children:children,className:className,disabled:disabled=!1,hideLabelFromVision:hideLabelFromVision=!1,labelPosition:labelPosition,id:idProp,isFocused:isFocused=!1,label:label,prefix:prefix,size:size="default",suffix:suffix,...restProps}=(0,use_deprecated_props.s)(props,"wp.components.InputBase","6.4"),id=function useUniqueId(idProp){const instanceId=(0,use_instance_id.Z)(InputBase);return idProp||`input-base-control-${instanceId}`}(idProp),hideLabel=hideLabelFromVision||!label,{paddingLeft:paddingLeft,paddingRight:paddingRight}=(0,input_control_styles.j7)({inputSize:size,__next40pxDefaultSize:__next40pxDefaultSize}),prefixSuffixContextValue=(0,react.useMemo)((()=>({InputControlPrefixWrapper:{paddingLeft:paddingLeft},InputControlSuffixWrapper:{paddingRight:paddingRight}})),[paddingLeft,paddingRight]);return(0,react.createElement)(input_control_styles.fC,{...restProps,...getUIFlexProps(labelPosition),className:className,gap:2,isFocused:isFocused,labelPosition:labelPosition,ref:ref},(0,react.createElement)(Label,{className:"components-input-control__label",hideLabelFromVision:hideLabelFromVision,labelPosition:labelPosition,htmlFor:id},label),(0,react.createElement)(input_control_styles.W2,{__unstableInputWidth:__unstableInputWidth,className:"components-input-control__container",disabled:disabled,hideLabel:hideLabel,labelPosition:labelPosition},(0,react.createElement)(context_system_provider.G8,{value:prefixSuffixContextValue},prefix&&(0,react.createElement)(input_control_styles.oT,{className:"components-input-control__prefix"},prefix),children,suffix&&(0,react.createElement)(input_control_styles.CM,{className:"components-input-control__suffix"},suffix)),(0,react.createElement)(backdrop,{disabled:disabled,isFocused:isFocused})))}InputBase.__docgenInfo={description:"",methods:[],displayName:"InputBase"};var input_base=(0,react.forwardRef)(InputBase)},"./packages/components/build-module/spacer/component.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return spacer_component}});var react=__webpack_require__("./node_modules/react/index.js"),context_connect=__webpack_require__("./packages/components/build-module/context/context-connect.js"),component=__webpack_require__("./packages/components/build-module/view/component.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),use_context_system=__webpack_require__("./packages/components/build-module/context/use-context-system.js"),space=__webpack_require__("./packages/components/build-module/utils/space.js"),use_cx=__webpack_require__("./packages/components/build-module/utils/hooks/use-cx.js"),rtl=__webpack_require__("./packages/components/build-module/utils/rtl.js");const isDefined=o=>null!=o;function UnconnectedSpacer(props,forwardedRef){const spacerProps=function useSpacer(props){const{className:className,margin:margin,marginBottom:marginBottom=2,marginLeft:marginLeft,marginRight:marginRight,marginTop:marginTop,marginX:marginX,marginY:marginY,padding:padding,paddingBottom:paddingBottom,paddingLeft:paddingLeft,paddingRight:paddingRight,paddingTop:paddingTop,paddingX:paddingX,paddingY:paddingY,...otherProps}=(0,use_context_system.y)(props,"Spacer");return{...otherProps,className:(0,use_cx.I)()(isDefined(margin)&&(0,emotion_react_browser_esm.iv)("margin:",(0,space.D)(margin),";","","",""),isDefined(marginY)&&(0,emotion_react_browser_esm.iv)("margin-bottom:",(0,space.D)(marginY),";margin-top:",(0,space.D)(marginY),";","","",""),isDefined(marginX)&&(0,emotion_react_browser_esm.iv)("margin-left:",(0,space.D)(marginX),";margin-right:",(0,space.D)(marginX),";","","",""),isDefined(marginTop)&&(0,emotion_react_browser_esm.iv)("margin-top:",(0,space.D)(marginTop),";","","",""),isDefined(marginBottom)&&(0,emotion_react_browser_esm.iv)("margin-bottom:",(0,space.D)(marginBottom),";","","",""),isDefined(marginLeft)&&(0,rtl.b)({marginLeft:(0,space.D)(marginLeft)})(),isDefined(marginRight)&&(0,rtl.b)({marginRight:(0,space.D)(marginRight)})(),isDefined(padding)&&(0,emotion_react_browser_esm.iv)("padding:",(0,space.D)(padding),";","","",""),isDefined(paddingY)&&(0,emotion_react_browser_esm.iv)("padding-bottom:",(0,space.D)(paddingY),";padding-top:",(0,space.D)(paddingY),";","","",""),isDefined(paddingX)&&(0,emotion_react_browser_esm.iv)("padding-left:",(0,space.D)(paddingX),";padding-right:",(0,space.D)(paddingX),";","","",""),isDefined(paddingTop)&&(0,emotion_react_browser_esm.iv)("padding-top:",(0,space.D)(paddingTop),";","","",""),isDefined(paddingBottom)&&(0,emotion_react_browser_esm.iv)("padding-bottom:",(0,space.D)(paddingBottom),";","","",""),isDefined(paddingLeft)&&(0,rtl.b)({paddingLeft:(0,space.D)(paddingLeft)})(),isDefined(paddingRight)&&(0,rtl.b)({paddingRight:(0,space.D)(paddingRight)})(),className)}}(props);return(0,react.createElement)(component.Z,{...spacerProps,ref:forwardedRef})}var spacer_component=(0,context_connect.Iq)(UnconnectedSpacer,"Spacer");UnconnectedSpacer.__docgenInfo={description:"",methods:[],displayName:"UnconnectedSpacer"}},"./packages/components/build-module/utils/use-deprecated-props.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{s:function(){return useDeprecated36pxDefaultSizeProp}});var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/deprecated/build-module/index.js");function useDeprecated36pxDefaultSizeProp(props,componentIdentifier,since="6.3"){const{__next36pxDefaultSize:__next36pxDefaultSize,__next40pxDefaultSize:__next40pxDefaultSize,...otherProps}=props;return void 0!==__next36pxDefaultSize&&(0,_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_0__.Z)("`__next36pxDefaultSize` prop in "+componentIdentifier,{alternative:"`__next40pxDefaultSize`",since:since}),{...otherProps,__next40pxDefaultSize:null!=__next40pxDefaultSize?__next40pxDefaultSize:__next36pxDefaultSize}}}}]);