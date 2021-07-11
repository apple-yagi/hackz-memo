import { ref, useContext } from '@nuxtjs/composition-api';

export default function useAddPost() {
  const addPostIsLoading = ref(false);
  const addPostError = ref('');
  const { $postRepository } = useContext();

  const addPost = async (uid: string, text: string) => {
    addPostIsLoading.value = true;
    try {
      await $postRepository.store({ uid, text });
    } catch (err) {
      addPostError.value = err.message;
    } finally {
      addPostIsLoading.value = false;
    }
  };

  return { addPost, addPostIsLoading, addPostError };
}
