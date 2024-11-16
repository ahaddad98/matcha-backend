class UserSettingService {
  static async resetPassword() {}

  static async resetEmail(args) {
    const { email, id } = args;
    const reset_key = this.generate_key();
    const reset_end_date = new Date(new Date().getTime() + 5 * 60000);
  }
}

export default UserSettingService;
