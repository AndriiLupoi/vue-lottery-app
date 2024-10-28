import { Participant } from "@/models/Participant";

export default class MyStorage {
  private static storageKey = "participants";

  static saveParticipants(participants: Participant[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(participants));
  }

  static getParticipants(): Participant[] {
    const participantsData = localStorage.getItem(this.storageKey);
    return participantsData ? JSON.parse(participantsData) : [];
  }

  static clearParticipants() {
    localStorage.removeItem(this.storageKey);
  }
}
