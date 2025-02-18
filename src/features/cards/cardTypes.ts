export enum CardType {
 Credit = 'Credit',
 Debit = 'Debit',
}

export interface Card {
 id: string;
 name: string;
 bankName: string;
 cardType: CardType;
 cardNumber: string;
 validTill: string;
 cvv: string;
 isDefault: boolean;
 isLocked: boolean;
 isArchived: boolean;
 isAddedToGPay: boolean;
}
