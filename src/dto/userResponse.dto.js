export class UserResponseDto {
    constructor(user) {
      // this.first_name = user.first_name;
      // this.last_name = user.last_name;
      this.fullName = `${user.first_name} ${user.last_name}`;
      this.email = user.email;
      this.age = user.age;
      this.role = user.role;
    }
  
    age(user) {
      try { 
        const today = new Date();
        const birthDate = new Date(user.birthDate);
  
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
  
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
  
        return age;
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
  }