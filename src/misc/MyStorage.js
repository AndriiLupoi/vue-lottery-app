export default class MyStorage {
    static storageKey = "participants";
    static saveParticipants(participants) {
        localStorage.setItem(this.storageKey, JSON.stringify(participants));
    }
    static getParticipants() {
        const participantsData = localStorage.getItem(this.storageKey);
        return participantsData ? JSON.parse(participantsData) : [];
    }
    static clearParticipants() {
        localStorage.removeItem(this.storageKey);
    }
}
//# sourceMappingURL=MyStorage.js.map