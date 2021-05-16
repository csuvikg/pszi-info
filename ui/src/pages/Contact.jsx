import Obfuscate from "react-obfuscate";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";

export const Contact = () =>
    <Card>
        <CardHeader
            title="Kapcsolatfelvétel, észrevételek jelzése"
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                A projekt egy egyetemi szakdolgozat keretében jött létre, készítője Csuvik Gábor.
                Fenntartása önkéntes munkával történik, amiben szívesen látott a segítség.
                Kérem, vegye fel velem a kapcsolatot, például a következő esetek valamelyikében:
            </Typography>
            <ul>
                {[
                    "hibás adatot talál az oldalon",
                    "tudomása van hiányzó intézményről",
                    "programhibát, szokatlan viselkedést tapasztal",
                    "új funkciót szeretne",
                    "szeretne együttműködni, önkéntes feladatokat vállalna a Pszi-Infó fenntartásában",
                    "egyéb javaslata van"
                ].map(item => <li key={item}>
                    <Typography variant="body2" color="textSecondary" component="p">{item}
                    </Typography>
                </li>)}
            </ul>
            <Typography variant="body2" color="textSecondary" component="p">
                Keressen a következő email címen:&nbsp;
                <Obfuscate style={{fontWeight: "bold", textDecoration: "none"}}
                    email="kapcsolat@pszi.info"
                />
            </Typography>
        </CardContent>
    </Card>;
