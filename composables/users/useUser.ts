import { ref, useAsync, useContext } from '@nuxtjs/composition-api';
import { User } from '~/types/entity';

export default function useUser(id: string) {
  const user = ref<User>({
    uid: '',
    displayName: '',
    photoUrl: '',
  });
  const userIsLoading = ref(true);
  const userError = ref('');
  const { $userRepository } = useContext();

  useAsync(async () => {
    try {
      const result = await $userRepository.getByIdwithPosts(id);
      if (!result) {
        throw { message: 'Not Found User!' };
      }

      user.value = result;
    } catch (err) {
      console.log(err);
      userError.value = err.message;
    } finally {
      userIsLoading.value = false;
    }
  });

  return { user, userIsLoading, userError };
}
