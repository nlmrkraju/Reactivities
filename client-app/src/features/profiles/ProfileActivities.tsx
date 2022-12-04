import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Card, Grid, Header, Tab, Image, Menu } from "semantic-ui-react";
import { UserActivity } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileActivities() {
  const { profileStore } = useStore();
  const { loadingActivities, loadUserActivities, userActivities } =
    profileStore;

  const [activeActivity, setActiveActivity] = useState("future");

  useEffect(() => {
    loadUserActivities(activeActivity);
  }, [loadUserActivities, activeActivity]);

  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content="Activities" />
        </Grid.Column>
        <Grid.Column width={16}>
          <Menu pointing secondary>
            <Menu.Item
              name="Future Events"
              active={activeActivity === "future"}
              onClick={() => {
                setActiveActivity("future");
              }}
            />
            <Menu.Item
              name="Past Events"
              active={activeActivity === "past"}
              onClick={() => {
                setActiveActivity("past");
              }}
            />
            <Menu.Item
              name="Hosting"
              active={activeActivity === "hosting"}
              onClick={() => {
                setActiveActivity("hosting");
              }}
            />
          </Menu>
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={4}>
            {userActivities.map((activity: UserActivity) => (
              <Card key={activity.id}>
                <Image
                  src={`/assets/categoryImages/${activity.category}.jpg`}
                />
                <Card.Content textAlign="center">
                  <Card.Header>{activity.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(activity.date!), "do LLL")}</div>
                    <div>{format(new Date(activity.date!), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
