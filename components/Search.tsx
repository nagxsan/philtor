import {View, Image, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {router, useLocalSearchParams, usePathname} from "expo-router";
import icons from "@/constants/icons";
import {useDebouncedCallback} from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState<string>(params?.query ?? '');
  
  const debouncedSearch = useDebouncedCallback((text: string) => router.setParams({ query: text }), 500);
  
  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  }
  
  return (
    <View className="flex flex-row items-center justify-between w-full rounded-lg bg-accent-100 px-4 py-2 border border-primary-100">
      <View className="flex flex-1 flex-row gap-x-2 items-center justify-start z-50">
        <Image source={icons.search} className={"size-5"} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder={"Search for anything"}
          className={"text-sm text-black-300 font-rubik flex items-center justify-center"}
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className={"size-5"} />
      </TouchableOpacity>
    </View>
  )
}
export default Search
