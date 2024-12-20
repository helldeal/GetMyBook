import { View, StatusBar } from "react-native";
import Navigation from "./Navigation";
import { IcsProvider } from "./hooks/icsProvider";
import { EventsProvider } from "./hooks/eventsProvider";
import { CalendarProvider } from "./hooks/calendarProvider";

export default function App() {
  return (
    <IcsProvider>
      <CalendarProvider>
        <EventsProvider>
          <View style={{ flex: 1 }} className="mt-0">
            <Navigation />
            <StatusBar
              barStyle={"dark-content"}
              backgroundColor="transparent"
            />
          </View>
        </EventsProvider>
      </CalendarProvider>
    </IcsProvider>
  );
}
