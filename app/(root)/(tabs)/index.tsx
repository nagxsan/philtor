import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "@/lib/global-provider";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {Card, FeaturedCard} from "@/components/Cards";
import Filters from "@/components/Filters";

const Home = () => {
  const { user } = useGlobalContext();
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName={"pb-32"}>
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
          </View>
          <View className={"flex flex-row gap-5 my-3"}>
            <FeaturedCard />
            <FeaturedCard />
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
          <View className={"flex flex-row gap-5 my-2"}>
            <Card />
            <Card />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Home
