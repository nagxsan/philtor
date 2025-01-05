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

const Home = () => {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string, filter?: string }>();
  
  const {
    data: latestProperties,
    loading: latestPropertiesLoading
  } = useAppwrite({
    fn: getLatestProperties
  })
  
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
      limit: 6
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
          <View className="px-5 flex flex-col gap-y-5">
            <View className={"flex flex-row justify-between items-center mt-5"}>
              <View className={"flex flex-row items-center justify-center gap-x-3"}>
                <Image source={{ uri: user?.avatar}} className={"size-12 relative rounded-full"} />
                <View className={"flex flex-col items-start justify-center"}>
                  <Text className={"text-xs font-rubik text-black-100"}>Good Morning</Text>
                  <Text className={"text-base font-rubik-medium text-black-300"}>{user?.name}</Text>
                </View>
              </View>
              <Image source={icons.bell} className={"size-6"} />
            </View>
            <Search />
            <View>
              <View className={"flex flex-row items-center justify-between"}>
                <Text className={"text-xl font-rubik-bold text-black-300"}>Featured</Text>
                <TouchableOpacity>
                  <Text className={"text-base font-rubik-bold text-primary-300"}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {
                latestPropertiesLoading ? (
                  <ActivityIndicator size="large" className={"text-primary-300"} />
                ) : (
                  !latestProperties || latestProperties.length === 0 ? <NoResults /> : (
                    <FlatList
                      data={latestProperties}
                      renderItem={({item}) => <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />}
                      keyExtractor={(item, index) => item.$id}
                      horizontal={true}
                      bounces={false}
                      showsHorizontalScrollIndicator={false}
                      contentContainerClassName={"flex gap-5 mt-5"}
                    />
                  )
                )
              }
            </View>
            <View className={"flex flex-row items-center justify-between"}>
              <Text className={"text-xl font-rubik-bold text-black-300"}>Our recommendations</Text>
              <TouchableOpacity>
                <Text className={"text-base font-rubik-bold text-primary-300"}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
          </View>
        }
      />
      
    </SafeAreaView>
  )
}
export default Home
