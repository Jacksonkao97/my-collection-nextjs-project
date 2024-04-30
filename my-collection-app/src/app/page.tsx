// Components
import CollectionList from '@/app/components/CollectionList'
import CreateCollectionBtn from '@/app/components/CreateCollectionBtn';

// Actions
import getCollectionList from '@/app/actions/getCollectionList';

export default async function Home() {
  const collections = await getCollectionList()
  return (
    <div className='flex justify-center w-full min-w-[400px] sm:px-[50px] md:px-[100px]'>
      <CollectionList collections={collections} />
      <div className="fixed right-[25px] bottom-[25px]">
        <CreateCollectionBtn />
      </div>
    </div>
  );
}