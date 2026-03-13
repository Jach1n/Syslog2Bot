import { uploadProps } from './upload.mjs';
import { defineComponent, shallowRef, computed, onBeforeUnmount, provide, toRef, createElementBlock, openBlock, createBlock, createCommentVNode, renderSlot, unref, createSlots, withCtx, createVNode, mergeProps } from 'vue';
import { uploadContextKey } from './constants.mjs';
import _sfc_main$1 from './upload-list.vue2.mjs';
import _sfc_main$2 from './upload-content.vue2.mjs';
import { useHandlers } from './use-handlers.mjs';
import { useFormDisabled } from '../../form/src/hooks/use-form-common-props.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElUpload"
  },
  __name: "upload",
  props: uploadProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const disabled = useFormDisabled();
    const uploadRef = shallowRef();
    const {
      abort,
      submit,
      clearFiles,
      uploadFiles,
      handleStart,
      handleError,
      handleRemove,
      handleSuccess,
      handleProgress,
      revokeFileObjectURL
    } = useHandlers(props, uploadRef);
    const isPictureCard = computed(() => props.listType === "picture-card");
    const uploadContentProps = computed(() => ({
      ...props,
      fileList: uploadFiles.value,
      onStart: handleStart,
      onProgress: handleProgress,
      onSuccess: handleSuccess,
      onError: handleError,
      onRemove: handleRemove
    }));
    onBeforeUnmount(() => {
      uploadFiles.value.forEach(revokeFileObjectURL);
    });
    provide(uploadContextKey, {
      accept: toRef(props, "accept")
    });
    __expose({
      /** @description cancel upload request */
      abort,
      /** @description upload the file list manually */
      submit,
      /** @description clear the file list  */
      clearFiles,
      /** @description select the file manually */
      handleStart,
      /** @description remove the file manually */
      handleRemove
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        isPictureCard.value && __props.showFileList ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          disabled: unref(disabled),
          "list-type": __props.listType,
          files: unref(uploadFiles),
          crossorigin: __props.crossorigin,
          "handle-preview": __props.onPreview,
          onRemove: unref(handleRemove)
        }, createSlots({
          append: withCtx(() => [
            createVNode(
              _sfc_main$2,
              mergeProps({
                ref_key: "uploadRef",
                ref: uploadRef
              }, uploadContentProps.value),
              {
                default: withCtx(() => [
                  _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "trigger", { key: 0 }) : createCommentVNode("v-if", true),
                  !_ctx.$slots.trigger && _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("v-if", true)
                ]),
                _: 3
                /* FORWARDED */
              },
              16
              /* FULL_PROPS */
            )
          ]),
          _: 2
          /* DYNAMIC */
        }, [
          _ctx.$slots.file ? {
            name: "default",
            fn: withCtx(({ file, index }) => [
              renderSlot(_ctx.$slots, "file", {
                file,
                index
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["disabled", "list-type", "files", "crossorigin", "handle-preview", "onRemove"])) : createCommentVNode("v-if", true),
        !isPictureCard.value || isPictureCard.value && !__props.showFileList ? (openBlock(), createBlock(
          _sfc_main$2,
          mergeProps({
            key: 1,
            ref_key: "uploadRef",
            ref: uploadRef
          }, uploadContentProps.value),
          {
            default: withCtx(() => [
              _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "trigger", { key: 0 }) : createCommentVNode("v-if", true),
              !_ctx.$slots.trigger && _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          },
          16
          /* FULL_PROPS */
        )) : createCommentVNode("v-if", true),
        _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "default", { key: 2 }) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "tip"),
        !isPictureCard.value && __props.showFileList ? (openBlock(), createBlock(_sfc_main$1, {
          key: 3,
          disabled: unref(disabled),
          "list-type": __props.listType,
          files: unref(uploadFiles),
          crossorigin: __props.crossorigin,
          "handle-preview": __props.onPreview,
          onRemove: unref(handleRemove)
        }, createSlots({
          _: 2
          /* DYNAMIC */
        }, [
          _ctx.$slots.file ? {
            name: "default",
            fn: withCtx(({ file, index }) => [
              renderSlot(_ctx.$slots, "file", {
                file,
                index
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["disabled", "list-type", "files", "crossorigin", "handle-preview", "onRemove"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=upload.vue2.mjs.map
