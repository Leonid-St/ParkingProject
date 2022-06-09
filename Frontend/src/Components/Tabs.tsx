import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
interface TabsComponent {
    label: string;
    component: JSX.Element;
    index?: number;
    value?: number;
}

interface TabsSwitcherProps {
    tabsList: TabsComponent[];
}

const useStyles = makeStyles((theme: any) => {
    return createStyles({
        root: {
            "& .MuiTabs-indicator": {
                color: "aqua",
                background: "aqua",
            },
        },
    });
});

export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function TabProps(index: number) {
    return {
        id: `tab-${index}`,
        "aria-controls": `tabpanel-${index}`,
    };
}

export function TabsSwitcher({ tabsList }: TabsSwitcherProps) {
    const [value, setValue] = React.useState(0);

    const classes = useStyles();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    className={classes.root}
                >
                    {tabsList.map((tab, i) => {
                        return <Tab style={{ color: "aqua", textShadow: "0 0 10px aqua, 0 0 20px aqua, 0 0 30px aqua, 0 0 40px aqua" }} key={`${tab.label}_${i}`} label={`${tab.label}`} {...TabProps(i)} />;
                    })}
                </Tabs>
            </Box>
            {tabsList.map((tab, i) => {
                return (
                    <TabPanel value={value} index={i} key={`${tab.label}_${i}`}>
                        {tab.component}
                    </TabPanel>
                );
            })}
        </Box>
    );
}
