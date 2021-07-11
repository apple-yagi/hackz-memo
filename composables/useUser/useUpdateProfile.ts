import { ref, useContext } from '@nuxtjs/composition-api';

export default function useUpdateProfile() {
  const { $userRepository } = useContext();
  const updateUserIsLoading = ref(false);
  const updateUserError = ref('');

  const updateProfile = async (uid: string, profile: string) => {
    updateUserIsLoading.value = true;
    try {
      await $userRepository.updateProfile({ uid, profile });
    } catch (err) {
      updateUserError.value = err.message;
    } finally {
      updateUserIsLoading.value = false;
    }
  };

  return {
    updateProfile,
    updateUserIsLoading,
    updateUserError,
  };
}
