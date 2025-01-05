import {View, Text, Image, TouchableOpacity, ScrollView, FlatList, Button, ActivityIndicator} from 'react-native'
import React, {useEffect} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "@/lib/global-provider";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {Card, FeaturedCard} from "@/components/Cards";
import Filters from "@/components/Filters";
import seed from "@/lib/seed";
import {router, useLocalSearchParams} from "expo-router";
import {useAppwrite} from "@/lib/useAppwrite";
import {getLatestProperties, getProperties} from "@/lib/appwrite";
import NoResults from "@/components/NoResults";

const Explore = () => {
  const params = useLocalSearchParams<{ query?: string, filter?: string }>();
  
  const {
    data: properties,
    loading: propertiesLoading,
    refetch
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6
    },
    skip: true
  })
  
  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20
    })
  }, [params.filter, params.query]);
  
  const handleCardPress = (id: string) => router.push(`/properties/${id}`);
  
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        renderItem={({item}) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
        keyExtractor={(item, index) => item.$id}
        numColumns={2}
        contentContainerClassName={"pb-32"}
        columnWrapperClassName={"flex gap-5 px-5"}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          propertiesLoading ? (
            <ActivityIndicator size="large" className={"text-primary-300 mt-5"} />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className={"flex flex-row items-center justify-between mt-5"}>
              <TouchableOpacity onPress={() => router.back()} className={"flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"}>
                <Image source={icons.backArrow} className={"size-5"} />
              </TouchableOpacity>
              <Text className={"text-xl mr-2 text-center font-rubik-medium text-primary-300"}>Explore amazing homes</Text>
              <Image source={icons.bell} className={"w-6 h-6"} />
            </View>
            <View className="mt-5">
              <Search />
              <Filters />
              <Text className={"text-xl font-rubik-bold text-black-300 mt-5"}>Found {properties?.length} properties</Text>
            </View>
          </View>
        }
      />
    
    </SafeAreaView>
  )
}
export default Explore
