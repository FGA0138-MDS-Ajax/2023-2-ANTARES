import useFeedApi from 'src/composables/UseFeedApi'

export default function FeedService(params: any) {
  return {
    listarFeed: useFeedApi(params).listarFeed
  };
}