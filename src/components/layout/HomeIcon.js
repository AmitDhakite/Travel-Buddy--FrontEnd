import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > svg": {
        margin: theme.spacing(2, "45%"),
      },
    },
  })
);

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function SvgIconsColor() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HomeIcon style={{ color: "rgb(42, 187, 172)", fontSize: "2rem" }} />
    </div>
  );
}
