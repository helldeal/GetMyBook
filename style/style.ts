import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
  header: {
    width: "100%",
    paddingHorizontal: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    color: "#888888",
    fontWeight: "400",
    fontSize: 16,
  },
  AvatarIcon: {
    width: 45,
    height: 45,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 25,
    fontSize: 18,
    fontWeight: "900",
    color: "white",
  },
  avatarText: {
    fontSize: 16,
  },
  chevron: {
    backgroundColor: "#F1F1F1",
    borderRadius: 50,
  },
  bar: {
    backgroundColor: "#dddddd",
    height: 25,
    width: 2,
  },
  searchContainer: {
    display: "flex",
    gap: 10,
    marginHorizontal: 25,
  },
  searchBarwQR: {
    display: "flex",
    gap: 19,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  searchBarContainer: {
    borderBottomWidth: 0,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    padding: 12,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: "#eeeeee",
    borderRadius: 10,
  },
  searchBarInput: {
    display: "flex",
    flex: 1,
    color: "#000",
    fontSize: 16,
  },
  searchQR: {
    width: 50,
    display: "flex",
    backgroundColor: "#A0DB3050",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
