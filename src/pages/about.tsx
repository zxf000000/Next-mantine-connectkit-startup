import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/layouts/site-layout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Center, Container, Flex, List, Space, Text, Title} from "@mantine/core";
import {useTranslation} from "next-i18next";

const About: NextPageWithLayout = () => {
    const {t} = useTranslation("common");
    return (
        <Container size={"xl"} bg={"dark.8"}>
            <Flex direction={"column"} align={"center"}>
                <Title>{t('frameworks')}</Title>
                <List>
                    <List.Item>
                        <Text>Nextjs</Text>
                    </List.Item>
                    <List.Item>
                        <Text>Mantine</Text>
                    </List.Item>
                    <List.Item>
                        <Text>ConnectKit</Text>
                    </List.Item>
                    <List.Item>
                        <Text>Next-i18next</Text>
                    </List.Item>
                </List>
                <Space h={"md"}></Space>
                <Title>{t('other')}</Title>
                <Text></Text>
            </Flex>

        </Container>
    )
}

type Props = {
    locale: any,
}
export async function getStaticProps({ locale }: Props) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
            ])),
            // Will be passed to the page component as props
        },
    }
}


About.getLayout = getLayout;

export default About;
