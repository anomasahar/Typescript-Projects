
export class Person{
    private personality: string;

    constructor() {
        // Initialize the personality variable to "Mystery"
        this.personality = "Mystery";
    }

    askQustion(answer:number){
        if(answer == 1){
            this.personality = "Extrovert";
        }else if(answer == 2){
            this.personality = "Introvert";
        }
        else{
            this.personality = "Mystery";
        }
    }

    getPersonality(){
        return this.personality;
    }
}