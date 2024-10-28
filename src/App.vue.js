import { defineComponent, ref } from "vue";
import WinnersBlock from "@/components/WinnersBlock.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import ParticipantsTable from "@/components/ParticipantsTable.vue";
import { Validator } from "@/misc/Validator";
import MyStorage from "@/misc/MyStorage";
export default defineComponent({
    name: "App",
    components: { WinnersBlock, RegistrationForm, ParticipantsTable },
    setup() {
        const today = new Date().toISOString().split("T")[0]; // Current date
        const newParticipant = ref({
            name: "",
            dateOfBirth: "",
            email: "",
            phoneNumber: "",
        });
        // Participants
        const participants = ref(MyStorage.getParticipants());
        const winners = ref([]);
        // Error messages
        const nameError = ref("");
        const dateError = ref("");
        const emailError = ref("");
        const phoneError = ref("");
        const registerParticipant = (participantData) => {
            if (!participantData) {
                console.error("participantData is undefined");
                return;
            }
            nameError.value = Validator.validateName(participantData.name);
            dateError.value = Validator.validateDateOfBirth(participantData.dateOfBirth, today);
            emailError.value = Validator.validateEmail(participantData.email, false);
            phoneError.value = Validator.validatePhoneNumber(participantData.phoneNumber);
            if (nameError.value ||
                dateError.value ||
                emailError.value ||
                phoneError.value) {
                return;
            }
            participants.value.push(participantData);
            MyStorage.saveParticipants(participants.value);
            // Reset the newParticipant object
            newParticipant.value = {
                name: "",
                dateOfBirth: "",
                email: "",
                phoneNumber: "",
            };
        };
        const selectWinner = () => {
            if (participants.value.length > 0 && winners.value.length < 3) {
                const randomIndex = Math.floor(Math.random() * participants.value.length);
                const winner = participants.value[randomIndex];
                winners.value.push(winner);
                participants.value.splice(randomIndex, 1);
            }
        };
        const removeWinner = (index) => {
            participants.value.push(winners.value[index]);
            winners.value.splice(index, 1);
        };
        return {
            newParticipant,
            participants,
            winners,
            nameError,
            dateError,
            emailError,
            phoneError,
            today,
            registerParticipant,
            selectWinner,
            removeWinner,
        };
    },
});
;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{ WinnersBlock, RegistrationForm, ParticipantsTable },
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    __VLS_styleScopedClasses['winner-tags'];
    __VLS_styleScopedClasses['winner-tags'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("lottery-app") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.WinnersBlock;
    /** @type { [typeof __VLS_components.WinnersBlock, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onRemoveWinner': {} }, ...{ 'onSelectWinner': {} }, winners: ((__VLS_ctx.winners)), participants: ((__VLS_ctx.participants)), }));
    const __VLS_2 = __VLS_1({ ...{ 'onRemoveWinner': {} }, ...{ 'onSelectWinner': {} }, winners: ((__VLS_ctx.winners)), participants: ((__VLS_ctx.participants)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        onRemoveWinner: (__VLS_ctx.removeWinner)
    };
    const __VLS_8 = {
        onSelectWinner: (__VLS_ctx.selectWinner)
    };
    let __VLS_3;
    let __VLS_4;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    const __VLS_9 = __VLS_resolvedLocalAndGlobalComponents.RegistrationForm;
    /** @type { [typeof __VLS_components.RegistrationForm, ] } */
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({ ...{ 'onRegisterParticipant': {} }, newParticipant: ((__VLS_ctx.newParticipant)), nameError: ((__VLS_ctx.nameError)), dateError: ((__VLS_ctx.dateError)), emailError: ((__VLS_ctx.emailError)), phoneError: ((__VLS_ctx.phoneError)), today: ((__VLS_ctx.today)), }));
    const __VLS_11 = __VLS_10({ ...{ 'onRegisterParticipant': {} }, newParticipant: ((__VLS_ctx.newParticipant)), nameError: ((__VLS_ctx.nameError)), dateError: ((__VLS_ctx.dateError)), emailError: ((__VLS_ctx.emailError)), phoneError: ((__VLS_ctx.phoneError)), today: ((__VLS_ctx.today)), }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_15;
    const __VLS_16 = {
        onRegisterParticipant: (__VLS_ctx.registerParticipant)
    };
    let __VLS_12;
    let __VLS_13;
    const __VLS_14 = __VLS_pickFunctionalComponentCtx(__VLS_9, __VLS_11);
    const __VLS_17 = __VLS_resolvedLocalAndGlobalComponents.ParticipantsTable;
    /** @type { [typeof __VLS_components.ParticipantsTable, ] } */
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({ participants: ((__VLS_ctx.participants)), }));
    const __VLS_19 = __VLS_18({ participants: ((__VLS_ctx.participants)), }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_styleScopedClasses['lottery-app'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
let __VLS_self;
//# sourceMappingURL=App.vue.js.map