import { ref, useAsync, useContext } from '@nuxtjs/composition-api'
import { Post } from '~/types/entity'

export default function usePosts() {
  const posts = ref<Post[]>([])
  const postsIsLoading = ref(true)
  const postsError = ref('')
  const { $postRepository } = useContext()

  useAsync(async () => {
    try {
      await $postRepository.getList({
        callback: (ps: Post[]) => (posts.value = ps),
      })
    } catch (err) {
      console.log(err)
      postsError.value = 'データの取得に失敗しました'
    } finally {
      postsIsLoading.value = false
    }
  })

  return { posts, postsIsLoading, postsError }
}
